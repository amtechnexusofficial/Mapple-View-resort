import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";

const databaseUrl = process.env.DATABASE_URL;
if (!databaseUrl) {
  console.error("DATABASE_URL is not set. Set it in .env.local or the environment before running this script.");
  process.exit(1);
}

const sql = neon(databaseUrl);

async function migrate() {
  await sql`
    CREATE TABLE IF NOT EXISTS admin_users (
      id SERIAL PRIMARY KEY,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS rooms (
      id SERIAL PRIMARY KEY,
      slug TEXT NOT NULL UNIQUE,
      name TEXT NOT NULL,
      description TEXT NOT NULL DEFAULT '',
      price_per_night INTEGER NOT NULL,
      capacity INTEGER NOT NULL DEFAULT 2,
      amenities JSONB NOT NULL DEFAULT '[]',
      image_url TEXT NOT NULL DEFAULT '',
      is_active BOOLEAN NOT NULL DEFAULT true,
      sort_order INTEGER NOT NULL DEFAULT 0,
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS bookings (
      id SERIAL PRIMARY KEY,
      room_id INTEGER NOT NULL REFERENCES rooms(id),
      guest_name TEXT NOT NULL,
      guest_phone TEXT NOT NULL,
      guest_email TEXT NOT NULL DEFAULT '',
      check_in DATE NOT NULL,
      check_out DATE NOT NULL,
      guests_count INTEGER NOT NULL DEFAULT 1,
      nights INTEGER NOT NULL,
      total_amount INTEGER NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      notes TEXT NOT NULL DEFAULT '',
      created_at TIMESTAMPTZ NOT NULL DEFAULT now()
    )
  `;

  await sql`
    CREATE TABLE IF NOT EXISTS settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    )
  `;

  const adminHash = bcrypt.hashSync("changeme123", 10);
  await sql`
    INSERT INTO admin_users (username, password_hash)
    VALUES ('admin', ${adminHash})
    ON CONFLICT (username) DO NOTHING
  `;

  const defaultSettings = {
    hotel_name: "Mapple View Resort",
    tagline: "Wake up to the mountains, every morning.",
    address: "Mapple Valley Road, Near Pine Ridge, Himachal Pradesh, India",
    owner_phone: "919999999999",
    upi_id: "mapleviewresort@upi",
    upi_payee_name: "Mapple View Resort",
    contact_email: "stay@mappleviewresort.example",
    hero_image: "",
    about_text:
      "Mapple View Resort sits on a quiet hillside with sweeping valley views, home-style dining, and rooms built for slowing down. Family-run since day one, we look after every guest like they're staying with kin.",
  };
  for (const [key, value] of Object.entries(defaultSettings)) {
    await sql`
      INSERT INTO settings (key, value) VALUES (${key}, ${value})
      ON CONFLICT (key) DO NOTHING
    `;
  }

  const seedRooms = [
    {
      slug: "valley-view-deluxe",
      name: "Valley View Deluxe",
      description:
        "A bright, spacious room facing the valley, with a private balcony perfect for morning coffee and sunset views.",
      price: 4500,
      capacity: 2,
      amenities: ["Free Wi-Fi", "Balcony", "Valley View", "Hot Water", "Breakfast Included"],
    },
    {
      slug: "family-cottage",
      name: "Family Cottage",
      description:
        "A standalone cottage with two bedrooms, a sitting area, and a private garden patch — ideal for families and small groups.",
      price: 7500,
      capacity: 5,
      amenities: ["Free Wi-Fi", "Private Garden", "Two Bedrooms", "Kitchenette", "Breakfast Included"],
    },
    {
      slug: "pine-view-standard",
      name: "Pine View Standard",
      description: "A cosy, comfortable room surrounded by pine trees — great value for couples and solo travellers.",
      price: 2800,
      capacity: 2,
      amenities: ["Free Wi-Fi", "Hot Water", "Pine View", "Breakfast Included"],
    },
  ];

  for (const [i, room] of seedRooms.entries()) {
    await sql`
      INSERT INTO rooms (slug, name, description, price_per_night, capacity, amenities, image_url, sort_order)
      VALUES (${room.slug}, ${room.name}, ${room.description}, ${room.price}, ${room.capacity}, ${JSON.stringify(room.amenities)}, '', ${i})
      ON CONFLICT (slug) DO NOTHING
    `;
  }

  console.log("Migration complete: tables created, default admin + settings + sample rooms seeded.");
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
