import { NextRequest, NextResponse } from "next/server";
import { RoomModel, RoomBlockModel } from "@/lib/models";
import { roomBlockSchema } from "@/lib/validation";

export async function GET(
  _request: NextRequest,
  context: RouteContext<"/api/admin/rooms/[id]/blocks">
) {
  const { id } = await context.params;
  const blocks = await RoomBlockModel.byRoom(id);
  return NextResponse.json({ blocks });
}

export async function POST(
  request: NextRequest,
  context: RouteContext<"/api/admin/rooms/[id]/blocks">
) {
  const { id } = await context.params;
  const room = await RoomModel.byId(id);
  if (!room) {
    return NextResponse.json({ error: "Room not found" }, { status: 404 });
  }

  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = roomBlockSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Validation failed", issues: parsed.error.flatten() },
      { status: 400 }
    );
  }
  const d = parsed.data;

  const available = await RoomModel.isAvailable(id, d.startDate, d.endDate);
  if (!available) {
    return NextResponse.json(
      { error: "Those dates overlap an existing booking or block for this room." },
      { status: 409 }
    );
  }

  const block = await RoomBlockModel.create({
    room_id: id,
    start_date: d.startDate,
    end_date: d.endDate,
    source: d.source,
    notes: d.notes,
  });

  return NextResponse.json({ block }, { status: 201 });
}
