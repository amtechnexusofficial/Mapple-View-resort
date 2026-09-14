import { NextRequest, NextResponse } from "next/server";
import { BookingModel, RoomModel } from "@/lib/models";
import type { BookingStatus } from "@/lib/types";

export async function GET(request: NextRequest) {
  const status = request.nextUrl.searchParams.get("status") as
    | BookingStatus
    | null;
  const bookings = BookingModel.all(status || undefined);
  const rooms = RoomModel.all(true);
  const roomMap = new Map(rooms.map((r) => [r.id, r]));
  const withRoom = bookings.map((b) => ({
    ...b,
    room: roomMap.get(b.room_id) || null,
  }));
  return NextResponse.json({ bookings: withRoom, stats: BookingModel.stats() });
}
