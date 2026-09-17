import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { RoomModel } from "@/lib/models";
import { formatInr } from "@/lib/format";
import BookingForm from "@/components/site/BookingForm";

export async function generateMetadata(
  { params }: PageProps<"/rooms/[slug]">
): Promise<Metadata> {
  const { slug } = await params;
  const room = await RoomModel.bySlug(slug);
  return { title: room ? `${room.name} | Mapple View Resort` : "Room Not Found" };
}

export default async function RoomDetailPage({
  params,
}: PageProps<"/rooms/[slug]">) {
  const { slug } = await params;
  const room = await RoomModel.bySlug(slug);
  if (!room || !room.is_active) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
      <div className="grid gap-10 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <div className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl bg-forest-100">
            {room.images[0] ? (
              <Image
                src={room.images[0]}
                alt={room.name}
                fill
                sizes="(min-width: 1024px) 60vw, 100vw"
                className="object-cover"
                priority
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-forest-600 to-forest-800 text-cream/70">
                <span className="font-display text-2xl">{room.name}</span>
              </div>
            )}
          </div>

          {room.images.length > 1 && (
            <div className="mt-4 grid grid-cols-4 gap-3">
              {room.images.slice(1, 5).map((img, i) => (
                <div
                  key={i}
                  className="relative aspect-square overflow-hidden rounded-lg bg-forest-100"
                >
                  <Image
                    src={img}
                    alt={`${room.name} photo ${i + 2}`}
                    fill
                    sizes="150px"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}

          <h1 className="mt-8 font-display text-3xl font-bold text-forest-800 sm:text-4xl">
            {room.name}
          </h1>
          <p className="mt-2 text-lg font-semibold text-gold-600">
            {formatInr(room.price_per_night)}{" "}
            <span className="text-sm font-normal text-ink/60">/ night</span>
          </p>

          <div className="mt-4 flex flex-wrap gap-4 text-sm text-ink/70">
            <span className="rounded-full bg-forest-50 px-3 py-1">
              Up to {room.max_guests} guests
            </span>
            {room.bed_type && (
              <span className="rounded-full bg-forest-50 px-3 py-1">
                {room.bed_type}
              </span>
            )}
            {room.size_sqft > 0 && (
              <span className="rounded-full bg-forest-50 px-3 py-1">
                {room.size_sqft} sq ft
              </span>
            )}
          </div>

          <p className="mt-6 whitespace-pre-line leading-relaxed text-ink/80">
            {room.description || room.summary}
          </p>

          {room.amenities.length > 0 && (
            <div className="mt-8">
              <h2 className="font-display text-xl font-semibold text-forest-800">
                Amenities
              </h2>
              <ul className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {room.amenities.map((a) => (
                  <li
                    key={a}
                    className="flex items-center gap-2 text-sm text-ink/75"
                  >
                    <span className="h-1.5 w-1.5 rounded-full bg-gold-500" />
                    {a}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        <div className="lg:col-span-2">
          <div className="lg:sticky lg:top-24">
            <BookingForm room={room} />
          </div>
        </div>
      </div>
    </div>
  );
}
