import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { formatInr } from "@/lib/format";
import RoomImagePlaceholder from "@/components/site/RoomImagePlaceholder";

export default function RoomCard({ room }: { room: Room }) {
  const image = room.images[0];
  return (
    <div className="group flex flex-col bg-stone-dark/40 transition hover:shadow-lg">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-petrol-100">
        {image ? (
          <Image
            src={image}
            alt={room.name}
            fill
            sizes="(min-width: 768px) 33vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <RoomImagePlaceholder name={room.name} />
        )}
        <div className="label-caps absolute left-0 top-0 bg-charcoal/85 px-3 py-1.5 text-stone backdrop-blur-sm">
          {formatInr(room.price_per_night)} / night
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="font-display text-xl font-medium text-ink">
          {room.name}
        </h3>
        <p className="mt-2 line-clamp-2 flex-1 text-sm font-light text-ink/70">
          {room.summary}
        </p>
        <div className="label-caps mt-4 flex items-center justify-between text-ink-soft/70">
          <span>Up to {room.max_guests} guests</span>
          {room.bed_type && <span>{room.bed_type}</span>}
        </div>
        <Link
          href={`/rooms/${room.slug}`}
          className="label-caps mt-4 inline-flex items-center justify-center bg-ink px-4 py-3 text-stone transition hover:bg-charcoal-light"
        >
          View &amp; Book
        </Link>
      </div>
    </div>
  );
}
