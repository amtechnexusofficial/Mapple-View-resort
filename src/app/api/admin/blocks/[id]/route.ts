import { NextRequest, NextResponse } from "next/server";
import { RoomBlockModel } from "@/lib/models";

export async function DELETE(
  _request: NextRequest,
  context: RouteContext<"/api/admin/blocks/[id]">
) {
  const { id } = await context.params;
  const existing = await RoomBlockModel.byId(id);
  if (!existing) {
    return NextResponse.json({ error: "Block not found" }, { status: 404 });
  }
  await RoomBlockModel.remove(id);
  return NextResponse.json({ ok: true });
}
