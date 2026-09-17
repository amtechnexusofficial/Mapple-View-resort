import Image from "next/image";
import Link from "next/link";
import type { Room } from "@/lib/types";
import { formatInr } from "@/lib/format";
import RoomImagePlaceholder from "@/components/site/RoomImagePlaceholder";

export default function FeaturedRoomCard({ room }: { room: Room }) {
  const image = room.images[0];
  return (
    <div className="group grid overflow-hidden bg-stone-dark/40 transition hover:shadow-lg sm:grid-cols-2">
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-petrol-100 sm:aspect-auto">
        {image ? (
          <Image
            src={image}
            alt={room.name}
            fill
            sizes="(min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-500 group-hover:scale-105"
          />
        ) : (
          <RoomImagePlaceholder name={room.name} />
        )}
      </div>
      <div className="flex flex-col justify-center p-8 sm:p-10">
        <span className="label-caps text-petrol-500">Signature Residence</span>
        <h3 className="mt-2 font-display text-2xl font-medium text-ink sm:text-3xl">
          {room.name}
        </h3>
        <p className="mt-3 text-sm font-light leading-relaxed text-ink/70">
          {room.summary}
        </p>
        <div className="label-caps mt-5 flex flex-wrap gap-x-5 gap-y-1 text-ink-soft/70">
          <span>Up to {room.max_guests} guests</span>
          {room.bed_type && <span>{room.bed_type}</span>}
          {room.size_sqft > 0 && <span>{room.size_sqft} sq ft</span>}
        </div>
        <div className="mt-7 flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
          <span className="font-display text-lg font-medium text-petrol-600">
            {formatInr(room.price_per_night)}{" "}
            <span className="label-caps text-ink/50">/ night</span>
          </span>
          <Link
            href={`/rooms/${room.slug}`}
            className="label-caps inline-flex items-center justify-center bg-ink px-5 py-3 text-stone transition hover:bg-charcoal-light"
          >
            View &amp; Book
          </Link>
        </div>
      </div>
    </div>
  );
}
