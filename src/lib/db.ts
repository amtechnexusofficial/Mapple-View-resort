import Database from "better-sqlite3";
import path from "path";
import fs from "fs";
import bcrypt from "bcryptjs";

const DATA_DIR = path.join(process.cwd(), "data");
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, "mapple.db");

declare global {
  var __mapple_db__: Database.Database | undefined;
}

function createConnection() {
  const db = new Database(DB_PATH);
  db.pragma("journal_mode = WAL");
  db.pragma("foreign_keys = ON");
  return db;
}

export const db = globalThis.__mapple_db__ ?? createConnection();
if (process.env.NODE_ENV !== "production") {
  globalThis.__mapple_db__ = db;
}

function migrate() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY CHECK (id = 1),
      resort_name TEXT NOT NULL DEFAULT 'Mapple View Resort',
      tagline TEXT NOT NULL DEFAULT 'Your Mountain Escape Awaits',
      description TEXT NOT NULL DEFAULT '',
      address TEXT NOT NULL DEFAULT '',
      contact_phone TEXT NOT NULL DEFAULT '',
      contact_email TEXT NOT NULL DEFAULT '',
      hero_image TEXT NOT NULL DEFAULT '',
      upi_id TEXT NOT NULL DEFAULT '',
      upi_payee_name TEXT NOT NULL DEFAULT '',
      whatsapp_owner_number TEXT NOT NULL DEFAULT '',
      whatsapp_api_token TEXT NOT NULL DEFAULT '',
      whatsapp_phone_number_id TEXT NOT NULL DEFAULT '',
      check_in_time TEXT NOT NULL DEFAULT '12:00 PM',
      check_out_time TEXT NOT NULL DEFAULT '11:00 AM',
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS rooms (
      id TEXT PRIMARY KEY,
      name TEXT NOT NULL,
      slug TEXT NOT NULL UNIQUE,
      summary TEXT NOT NULL DEFAULT '',
      description TEXT NOT NULL DEFAULT '',
      price_per_night INTEGER NOT NULL DEFAULT 0,
      max_guests INTEGER NOT NULL DEFAULT 2,
      bed_type TEXT NOT NULL DEFAULT '',
      size_sqft INTEGER NOT NULL DEFAULT 0,
      images TEXT NOT NULL DEFAULT '[]',
      amenities TEXT NOT NULL DEFAULT '[]',
      is_active INTEGER NOT NULL DEFAULT 1,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS bookings (
      id TEXT PRIMARY KEY,
      room_id TEXT NOT NULL REFERENCES rooms(id) ON DELETE RESTRICT,
      guest_name TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      guest_email TEXT NOT NULL DEFAULT '',
      check_in TEXT NOT NULL,
      check_out TEXT NOT NULL,
      guests INTEGER NOT NULL DEFAULT 1,
      nights INTEGER NOT NULL DEFAULT 1,
      total_amount INTEGER NOT NULL DEFAULT 0,
      status TEXT NOT NULL DEFAULT 'pending',
      payment_ref TEXT NOT NULL DEFAULT '',
      notes TEXT NOT NULL DEFAULT '',
      whatsapp_sent INTEGER NOT NULL DEFAULT 0,
      whatsapp_error TEXT NOT NULL DEFAULT '',
      created_at TEXT NOT NULL DEFAULT (datetime('now')),
      updated_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS admin_users (
      id TEXT PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_bookings_room ON bookings(room_id);
    CREATE INDEX IF NOT EXISTS idx_bookings_status ON bookings(status);
  `);

  db.prepare(
    `INSERT OR IGNORE INTO settings (id, resort_name, tagline, description, address, contact_phone, contact_email, hero_image, upi_id, upi_payee_name, whatsapp_owner_number)
     VALUES (1, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
      "Mapple View Resort",
      "Your Mountain Escape Awaits",
      "Nestled in the hills, Mapple View Resort offers a peaceful retreat with breathtaking views, comfortable rooms, and warm hospitality.",
      "Mapple View Resort, Hill Road, Mussoorie, Uttarakhand, India",
      "+91 98765 43210",
      "info@mapleviewresort.com",
      "",
      "",
      "Mapple View Resort",
      ""
    );

  const adminRow = db.prepare("SELECT id FROM admin_users LIMIT 1").get();
  if (!adminRow) {
    const username = process.env.ADMIN_USERNAME || "admin";
    const password = process.env.ADMIN_PASSWORD || "changeme123";
    const hash = bcrypt.hashSync(password, 10);
    db.prepare(
      "INSERT OR IGNORE INTO admin_users (id, username, password_hash) VALUES (?, ?, ?)"
    ).run(crypto.randomUUID(), username, hash);
    if (!process.env.ADMIN_PASSWORD) {
      console.warn(
        `\n[Mapple View Resort] No ADMIN_PASSWORD set. Created default admin user "${username}" / "${password}". Please change this immediately in Admin > Settings or via env vars.\n`
      );
    }
  }

  const roomCountRow = db
    .prepare("SELECT COUNT(*) as count FROM rooms")
    .get() as { count: number };
  if (roomCountRow.count === 0) {
    const sampleRooms = [
      {
        name: "Deluxe Valley View Room",
        slug: "deluxe-valley-view-room",
        summary: "Spacious room with a private balcony overlooking the valley.",
        description:
          "Wake up to stunning valley views from your private balcony. This deluxe room features a king-size bed, modern en-suite bathroom, and thoughtful amenities for a relaxing stay.",
        price_per_night: 4500,
        max_guests: 3,
        bed_type: "King Bed",
        size_sqft: 320,
        images: JSON.stringify([]),
        amenities: JSON.stringify([
          "Free Wi-Fi",
          "Valley View Balcony",
          "Air Conditioning",
          "Complimentary Breakfast",
          "Flat-screen TV",
          "Hot Water",
        ]),
        sort_order: 1,
      },
      {
        name: "Premium Mountain Suite",
        slug: "premium-mountain-suite",
        summary: "Our largest suite with a living area and panoramic mountain views.",
        description:
          "The Premium Mountain Suite offers a separate living area, panoramic mountain views, and premium furnishings — perfect for families or those seeking extra space and comfort.",
        price_per_night: 7500,
        max_guests: 4,
        bed_type: "King Bed + Sofa Bed",
        size_sqft: 500,
        images: JSON.stringify([]),
        amenities: JSON.stringify([
          "Free Wi-Fi",
          "Living Area",
          "Mountain View",
          "Air Conditioning",
          "Complimentary Breakfast",
          "Mini Fridge",
          "Bathtub",
        ]),
        sort_order: 2,
      },
      {
        name: "Cozy Garden Room",
        slug: "cozy-garden-room",
        summary: "Comfortable and affordable room facing our landscaped gardens.",
        description:
          "A warm and cozy room facing the resort's landscaped gardens. Ideal for solo travelers or couples looking for comfort at a great value.",
        price_per_night: 3000,
        max_guests: 2,
        bed_type: "Queen Bed",
        size_sqft: 220,
        images: JSON.stringify([]),
        amenities: JSON.stringify([
          "Free Wi-Fi",
          "Garden View",
          "Complimentary Breakfast",
          "Hot Water",
          "Work Desk",
        ]),
        sort_order: 3,
      },
    ];
    const insert = db.prepare(
      `INSERT OR IGNORE INTO rooms (id, name, slug, summary, description, price_per_night, max_guests, bed_type, size_sqft, images, amenities, sort_order)
       VALUES (@id, @name, @slug, @summary, @description, @price_per_night, @max_guests, @bed_type, @size_sqft, @images, @amenities, @sort_order)`
    );
    for (const room of sampleRooms) {
      insert.run({ id: crypto.randomUUID(), ...room });
    }
  }
}

migrate();
