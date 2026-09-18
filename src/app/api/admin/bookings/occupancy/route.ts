import { NextRequest, NextResponse } from "next/server";
import { BookingModel, RoomModel } from "@/lib/models";

/**
 * Occupancy for the admin calendar: active rooms + non-cancelled bookings
 * overlapping [from, to).
 */
export async function GET(request: NextRequest) {
  const from = request.nextUrl.searchParams.get("from");
  const to = request.nextUrl.searchParams.get("to");
  if (!from || !to || from >= to) {
    return NextResponse.json(
      { error: "Provide from and to as YYYY-MM-DD with to after from." },
      { status: 400 }
    );
  }

  const [rooms, bookings] = await Promise.all([
    RoomModel.all(false),
    BookingModel.inRange(from, to),
  ]);

  return NextResponse.json({
    from,
    to,
    rooms,
    bookings,
  });
}
