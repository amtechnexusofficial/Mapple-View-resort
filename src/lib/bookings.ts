import "server-only";
import { sql } from "@/lib/db";

export type BookingStatus = "pending" | "confirmed" | "cancelled";

export type Booking = {
  id: number;
  room_id: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  nights: number;
  total_amount: number;
  status: BookingStatus;
  notes: string;
  created_at: string;
};

export type BookingInput = {
  room_id: number;
  guest_name: string;
  guest_phone: string;
  guest_email: string;
  check_in: string;
  check_out: string;
  guests_count: number;
  nights: number;
  total_amount: number;
  notes: string;
};

export async function createBooking(input: BookingInput): Promise<number> {
  const rows = await sql`
    INSERT INTO bookings
      (room_id, guest_name, guest_phone, guest_email, check_in, check_out, guests_count, nights, total_amount, notes)
    VALUES (
      ${input.room_id}, ${input.guest_name}, ${input.guest_phone}, ${input.guest_email},
      ${input.check_in}, ${input.check_out}, ${input.guests_count}, ${input.nights},
      ${input.total_amount}, ${input.notes}
    )
    RETURNING id
  `;
  return (rows[0] as { id: number }).id;
}

export async function getBookingById(id: number): Promise<Booking | null> {
  const rows = await sql`SELECT * FROM bookings WHERE id = ${id}`;
  return (rows[0] as Booking | undefined) ?? null;
}

export async function listBookings(): Promise<(Booking & { room_name: string })[]> {
  const rows = await sql`
    SELECT bookings.*, rooms.name as room_name
    FROM bookings JOIN rooms ON rooms.id = bookings.room_id
    ORDER BY bookings.created_at DESC
  `;
  return rows as (Booking & { room_name: string })[];
}

export async function updateBookingStatus(id: number, status: BookingStatus): Promise<void> {
  await sql`UPDATE bookings SET status = ${status} WHERE id = ${id}`;
}
