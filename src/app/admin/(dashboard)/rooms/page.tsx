import Link from "next/link";
import { RoomModel, RoomBlockModel } from "@/lib/models";
import { formatInr } from "@/lib/format";
import RoomActions from "@/components/admin/RoomActions";

export default async function AdminRoomsPage() {
  const [rooms, allBlocks] = await Promise.all([
    RoomModel.all(true),
    RoomBlockModel.all(),
  ]);
  const today = new Date().toISOString().slice(0, 10);
  const activeBlockCounts = new Map<string, number>();
  for (const b of allBlocks) {
    if (b.end_date < today) continue;
    activeBlockCounts.set(b.room_id, (activeBlockCounts.get(b.room_id) ?? 0) + 1);
  }

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-sans text-2xl font-bold text-ink">Rooms</h1>
          <p className="mt-1 text-sm text-ink/60">Manage your room listings.</p>
        </div>
        <Link
          href="/admin/rooms/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-stone hover:bg-charcoal-light"
        >
          + Add Room
        </Link>
      </div>

      <div className="mt-6 rounded-2xl border border-petrol-100 bg-white shadow-sm">
        {rooms.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-ink/50">
            No rooms yet. Add your first room to get started.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-petrol-100 text-xs uppercase text-ink/50">
                  <th className="px-6 py-3 font-medium">Room</th>
                  <th className="px-6 py-3 font-medium">Price/Night</th>
                  <th className="px-6 py-3 font-medium">Max Guests</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                  <th className="px-6 py-3 font-medium">Blocked Dates</th>
                  <th className="px-6 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {rooms.map((room) => (
                  <tr key={room.id} className="border-b border-petrol-50 last:border-0">
                    <td className="px-6 py-3">
                      <p className="font-medium text-ink">{room.name}</p>
                      <p className="text-xs text-ink/50">/{room.slug}</p>
                    </td>
                    <td className="px-6 py-3 text-ink/70">{formatInr(room.price_per_night)}</td>
                    <td className="px-6 py-3 text-ink/70">{room.max_guests}</td>
                    <td className="px-6 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${
                          room.is_active
                            ? "bg-green-100 text-green-800"
                            : "bg-gray-100 text-gray-700"
                        }`}
                      >
                        {room.is_active ? "Active" : "Hidden"}
                      </span>
                    </td>
                    <td className="px-6 py-3">
                      {activeBlockCounts.get(room.id) ? (
                        <Link
                          href={`/admin/rooms/${room.id}/edit`}
                          className="inline-flex rounded-full bg-amber-100 px-2.5 py-1 text-xs font-semibold text-amber-800 hover:underline"
                        >
                          {activeBlockCounts.get(room.id)} active
                        </Link>
                      ) : (
                        <span className="text-xs text-ink/40">None</span>
                      )}
                    </td>
                    <td className="px-6 py-3">
                      <RoomActions roomId={room.id} isActive={Boolean(room.is_active)} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
