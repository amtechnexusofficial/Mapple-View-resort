import "server-only";
import { sql } from "@/lib/db";

export type Room = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  image_url: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
};

export async function listActiveRooms(): Promise<Room[]> {
  const rows = await sql`
    SELECT * FROM rooms WHERE is_active = true ORDER BY sort_order ASC, id ASC
  `;
  return rows as Room[];
}

export async function listAllRooms(): Promise<Room[]> {
  const rows = await sql`SELECT * FROM rooms ORDER BY sort_order ASC, id ASC`;
  return rows as Room[];
}

export async function getRoomBySlug(slug: string): Promise<Room | null> {
  const rows = await sql`SELECT * FROM rooms WHERE slug = ${slug}`;
  return (rows[0] as Room | undefined) ?? null;
}

export async function getRoomById(id: number): Promise<Room | null> {
  const rows = await sql`SELECT * FROM rooms WHERE id = ${id}`;
  return (rows[0] as Room | undefined) ?? null;
}

export type RoomInput = {
  slug: string;
  name: string;
  description: string;
  price_per_night: number;
  capacity: number;
  amenities: string[];
  image_url: string;
  is_active: boolean;
  sort_order: number;
};

export async function createRoom(input: RoomInput): Promise<number> {
  const rows = await sql`
    INSERT INTO rooms (slug, name, description, price_per_night, capacity, amenities, image_url, is_active, sort_order)
    VALUES (
      ${input.slug}, ${input.name}, ${input.description}, ${input.price_per_night}, ${input.capacity},
      ${JSON.stringify(input.amenities)}::jsonb, ${input.image_url}, ${input.is_active}, ${input.sort_order}
    )
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function updateRoom(id: number, input: RoomInput): Promise<void> {
  await sql`
    UPDATE rooms SET
      slug = ${input.slug},
      name = ${input.name},
      description = ${input.description},
      price_per_night = ${input.price_per_night},
      capacity = ${input.capacity},
      amenities = ${JSON.stringify(input.amenities)}::jsonb,
      image_url = ${input.image_url},
      is_active = ${input.is_active},
      sort_order = ${input.sort_order}
    WHERE id = ${id}
  `;
}

export async function deleteRoom(id: number): Promise<void> {
  await sql`DELETE FROM rooms WHERE id = ${id}`;
}
