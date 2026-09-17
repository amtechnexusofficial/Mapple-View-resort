import { notFound } from "next/navigation";
import { RoomModel, RoomBlockModel } from "@/lib/models";
import RoomForm from "@/components/admin/RoomForm";
import RoomBlocks from "@/components/admin/RoomBlocks";

export default async function EditRoomPage({
  params,
}: PageProps<"/admin/rooms/[id]/edit">) {
  const { id } = await params;
  const room = await RoomModel.byId(id);
  if (!room) notFound();
  const blocks = await RoomBlockModel.byRoom(id);

  return (
    <div>
      <h1 className="font-sans text-2xl font-bold text-ink">Edit Room</h1>
      <p className="mt-1 text-sm text-ink/60">{room.name}</p>
      <div className="mt-6">
        <RoomForm room={room} />
      </div>
      <div className="mt-8 max-w-2xl">
        <RoomBlocks roomId={room.id} blocks={blocks} />
      </div>
    </div>
  );
}
