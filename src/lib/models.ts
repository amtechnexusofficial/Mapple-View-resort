import { db } from "@/lib/db";
import type { Room, Booking, Settings, BookingStatus } from "@/lib/types";

type RoomRow = Omit<Room, "images" | "amenities"> & {
  images: string;
  amenities: string;
};

function mapRoom(row: RoomRow): Room {
  return {
    ...row,
    images: JSON.parse(row.images || "[]"),
    amenities: JSON.parse(row.amenities || "[]"),
  };
}

export const RoomModel = {
  all(includeInactive = false): Room[] {
    const rows = includeInactive
      ? (db
          .prepare("SELECT * FROM rooms ORDER BY sort_order ASC, created_at ASC")
          .all() as RoomRow[])
      : (db
          .prepare(
            "SELECT * FROM rooms WHERE is_active = 1 ORDER BY sort_order ASC, created_at ASC"
          )
          .all() as RoomRow[]);
    return rows.map(mapRoom);
  },
  bySlug(slug: string): Room | undefined {
    const row = db.prepare("SELECT * FROM rooms WHERE slug = ?").get(slug) as
      | RoomRow
      | undefined;
    return row ? mapRoom(row) : undefined;
  },
  byId(id: string): Room | undefined {
    const row = db.prepare("SELECT * FROM rooms WHERE id = ?").get(id) as
      | RoomRow
      | undefined;
    return row ? mapRoom(row) : undefined;
  },
  create(data: {
    name: string;
    slug: string;
    summary: string;
    description: string;
    price_per_night: number;
    max_guests: number;
    bed_type: string;
    size_sqft: number;
    images: string[];
    amenities: string[];
    sort_order?: number;
  }): Room {
    const id = crypto.randomUUID();
    db.prepare(
      `INSERT INTO rooms (id, name, slug, summary, description, price_per_night, max_guests, bed_type, size_sqft, images, amenities, sort_order)
       VALUES (@id, @name, @slug, @summary, @description, @price_per_night, @max_guests, @bed_type, @size_sqft, @images, @amenities, @sort_order)`
    ).run({
      id,
      name: data.name,
      slug: data.slug,
      summary: data.summary,
      description: data.description,
      price_per_night: data.price_per_night,
      max_guests: data.max_guests,
      bed_type: data.bed_type,
      size_sqft: data.size_sqft,
      images: JSON.stringify(data.images),
      amenities: JSON.stringify(data.amenities),
      sort_order: data.sort_order ?? 0,
    });
    return RoomModel.byId(id)!;
  },
  update(
    id: string,
    data: Partial<{
      name: string;
      slug: string;
      summary: string;
      description: string;
      price_per_night: number;
      max_guests: number;
      bed_type: string;
      size_sqft: number;
      images: string[];
      amenities: string[];
      is_active: number;
      sort_order: number;
    }>
  ): Room | undefined {
    const existing = RoomModel.byId(id);
    if (!existing) return undefined;
    const merged = {
      name: data.name ?? existing.name,
      slug: data.slug ?? existing.slug,
      summary: data.summary ?? existing.summary,
      description: data.description ?? existing.description,
      price_per_night: data.price_per_night ?? existing.price_per_night,
      max_guests: data.max_guests ?? existing.max_guests,
      bed_type: data.bed_type ?? existing.bed_type,
      size_sqft: data.size_sqft ?? existing.size_sqft,
      images: JSON.stringify(data.images ?? existing.images),
      amenities: JSON.stringify(data.amenities ?? existing.amenities),
      is_active: data.is_active ?? existing.is_active,
      sort_order: data.sort_order ?? existing.sort_order,
    };
    db.prepare(
      `UPDATE rooms SET name=@name, slug=@slug, summary=@summary, description=@description,
       price_per_night=@price_per_night, max_guests=@max_guests, bed_type=@bed_type, size_sqft=@size_sqft,
       images=@images, amenities=@amenities, is_active=@is_active, sort_order=@sort_order,
       updated_at=datetime('now') WHERE id=@id`
    ).run({ ...merged, id });
    return RoomModel.byId(id);
  },
  remove(id: string) {
    db.prepare("DELETE FROM rooms WHERE id = ?").run(id);
  },
};

export const BookingModel = {
  all(status?: BookingStatus): Booking[] {
    if (status) {
      return db
        .prepare("SELECT * FROM bookings WHERE status = ? ORDER BY created_at DESC")
        .all(status) as Booking[];
    }
    return db
      .prepare("SELECT * FROM bookings ORDER BY created_at DESC")
      .all() as Booking[];
  },
  byId(id: string): Booking | undefined {
    return db.prepare("SELECT * FROM bookings WHERE id = ?").get(id) as
      | Booking
      | undefined;
  },
  create(data: {
    room_id: string;
    guest_name: string;
    guest_phone: string;
    guest_email: string;
    check_in: string;
    check_out: string;
    guests: number;
    nights: number;
    total_amount: number;
    notes: string;
  }): Booking {
    const id = crypto.randomUUID();
    db.prepare(
      `INSERT INTO bookings (id, room_id, guest_name, guest_phone, guest_email, check_in, check_out, guests, nights, total_amount, notes)
       VALUES (@id, @room_id, @guest_name, @guest_phone, @guest_email, @check_in, @check_out, @guests, @nights, @total_amount, @notes)`
    ).run({ id, ...data });
    return BookingModel.byId(id)!;
  },
  updateStatus(
    id: string,
    status: BookingStatus,
    extra?: Partial<{
      payment_ref: string;
      whatsapp_sent: number;
      whatsapp_error: string;
    }>
  ): Booking | undefined {
    const existing = BookingModel.byId(id);
    if (!existing) return undefined;
    const merged = {
      status,
      payment_ref: extra?.payment_ref ?? existing.payment_ref,
      whatsapp_sent: extra?.whatsapp_sent ?? existing.whatsapp_sent,
      whatsapp_error: extra?.whatsapp_error ?? existing.whatsapp_error,
    };
    db.prepare(
      `UPDATE bookings SET status=@status, payment_ref=@payment_ref, whatsapp_sent=@whatsapp_sent,
       whatsapp_error=@whatsapp_error, updated_at=datetime('now') WHERE id=@id`
    ).run({ ...merged, id });
    return BookingModel.byId(id);
  },
  stats() {
    const total = db.prepare("SELECT COUNT(*) as c FROM bookings").get() as {
      c: number;
    };
    const pending = db
      .prepare("SELECT COUNT(*) as c FROM bookings WHERE status IN ('pending','payment_claimed')")
      .get() as { c: number };
    const confirmed = db
      .prepare("SELECT COUNT(*) as c FROM bookings WHERE status = 'confirmed'")
      .get() as { c: number };
    const revenue = db
      .prepare(
        "SELECT COALESCE(SUM(total_amount),0) as s FROM bookings WHERE status = 'confirmed'"
      )
      .get() as { s: number };
    return {
      total: total.c,
      pending: pending.c,
      confirmed: confirmed.c,
      revenue: revenue.s,
    };
  },
};

export const SettingsModel = {
  get(): Settings {
    return db.prepare("SELECT * FROM settings WHERE id = 1").get() as Settings;
  },
  update(data: Partial<Omit<Settings, "id" | "updated_at">>): Settings {
    const existing = SettingsModel.get();
    const merged = { ...existing, ...data };
    db.prepare(
      `UPDATE settings SET resort_name=@resort_name, tagline=@tagline, description=@description,
       address=@address, contact_phone=@contact_phone, contact_email=@contact_email, hero_image=@hero_image,
       upi_id=@upi_id, upi_payee_name=@upi_payee_name, whatsapp_owner_number=@whatsapp_owner_number,
       whatsapp_api_token=@whatsapp_api_token, whatsapp_phone_number_id=@whatsapp_phone_number_id,
       check_in_time=@check_in_time, check_out_time=@check_out_time, updated_at=datetime('now')
       WHERE id = 1`
    ).run(merged);
    return SettingsModel.get();
  },
};
