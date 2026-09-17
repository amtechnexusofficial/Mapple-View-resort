import type { Metadata } from "next";
import RoomCard from "@/components/site/RoomCard";
import SectionLabel from "@/components/site/SectionLabel";
import { RoomModel } from "@/lib/models";

export const metadata: Metadata = {
  title: "Rooms & Suites | Mapple View Resort",
};

export default async function RoomsPage() {
  const rooms = await RoomModel.all();

  return (
    <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6">
      <div className="text-center">
        <SectionLabel eyebrow="Accommodation Portfolio" className="justify-center" />
        <h1 className="mt-5 font-display text-4xl font-normal leading-[1.05] text-ink">
          Rooms &amp; Suites
        </h1>
        <p className="mx-auto mt-4 max-w-xl font-light text-ink/70">
          Choose from our range of comfortable rooms, each designed for a relaxing mountain stay.
        </p>
      </div>

      {rooms.length === 0 ? (
        <p className="mt-14 text-center text-ink/60">
          No rooms available right now. Please check back soon.
        </p>
      ) : (
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {rooms.map((room, i) => (
            <RoomCard key={room.id} room={room} index={i} />
          ))}
        </div>
      )}
    </div>
  );
}
