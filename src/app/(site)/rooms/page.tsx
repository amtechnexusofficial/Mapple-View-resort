import type { Metadata } from "next";
import RoomCard from "@/components/site/RoomCard";
import { RoomModel } from "@/lib/models";

export const metadata: Metadata = {
  title: "Rooms & Suites | Mapple View Resort",
};

export default async function RoomsPage() {
  const rooms = await RoomModel.all();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <span className="text-sm font-semibold uppercase tracking-widest text-petrol-600">
          Accommodation
        </span>
        <h1 className="mt-2 font-display text-4xl font-bold text-ink">
          Rooms &amp; Suites
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-ink/70">
          Choose from our range of comfortable rooms, each designed for a relaxing mountain stay.
        </p>
      </div>

      {rooms.length === 0 ? (
        <p className="mt-14 text-center text-ink/60">
          No rooms available right now. Please check back soon.
        </p>
      ) : (
        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room) => (
            <RoomCard key={room.id} room={room} />
          ))}
        </div>
      )}
    </div>
  );
}
