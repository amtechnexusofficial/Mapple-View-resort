import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { formatInr } from "@/lib/format";

export default function RoomCard({ room }: { room: Room }) {
  const image = room.images[0];
  return (
    <div className="group flex flex-col overflow-hidden rounded-2xl border border-forest-100 bg-white shadow-sm transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-forest-100">
        {image ? (
          <Image
            src={image}
            alt={room.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-600 to-forest-800 text-cream/70">
            <span className="font-display text-lg">{room.name}</span>
          </div>
        )}
        <div className="absolute left-3 top-3 rounded-full bg-cream/95 px-3 py-1 text-xs font-semibold text-forest-800 shadow">
          {formatInr(room.price_per_night)} / night
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-semibold text-forest-800">
          {room.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm text-ink/70">
          {room.summary}
        </p>
        <div className="mt-4 flex items-center justify-between text-xs text-ink/60">
          <span>Up to {room.max_guests} guests</span>
          {room.bed_type && <span>{room.bed_type}</span>}
        </div>
        <Link
          href={`/rooms/${room.slug}`}
          className="mt-4 inline-flex items-center justify-center rounded-full bg-forest-700 px-4 py-2.5 text-sm font-semibold text-cream transition hover:bg-forest-800"
        >
          View &amp; Book
        </Link>
      </div>
    </div>
  );
}
