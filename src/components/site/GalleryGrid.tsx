"use client";

import { useState } from "react";
import Image from "next/image";
import Icon from "@/components/ui/Icon";
import { RoomViewScene } from "@/components/site/MountainArt";

export type GalleryItem = {
  id: string;
  category: "rooms" | "views";
  src?: string;
  variant?: "dawn" | "day" | "dusk";
  caption: string;
  span?: "wide" | "tall" | "normal";
};

const categories = [
  { key: "all", label: "All" },
  { key: "rooms", label: "Rooms" },
  { key: "views", label: "Mountain Views" },
] as const;

export default function GalleryGrid({ items }: { items: GalleryItem[] }) {
  const [filter, setFilter] = useState<(typeof categories)[number]["key"]>("all");
  const [lightbox, setLightbox] = useState<GalleryItem | null>(null);

  const visible = filter === "all" ? items : items.filter((i) => i.category === filter);

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        {categories.map((c) => (
          <button
            key={c.key}
            type="button"
            onClick={() => setFilter(c.key)}
            className={`label-caps px-3 py-1.5 transition-colors ${
              filter === c.key ? "bg-charcoal text-stone" : "bg-petrol-50 text-ink-soft hover:bg-petrol-100"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-4">
        {visible.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setLightbox(item)}
            className={`group relative overflow-hidden bg-petrol-100 ${
              item.span === "wide" ? "col-span-2 aspect-[16/9]" : item.span === "tall" ? "row-span-2 aspect-[3/4]" : "aspect-square"
            }`}
          >
            {item.src ? (
              <Image
                src={item.src}
                alt={item.caption}
                fill
                sizes="(min-width: 768px) 25vw, 50vw"
                className="object-cover transition duration-500 group-hover:scale-105"
              />
            ) : (
              <RoomViewScene variant={item.variant || "day"} className="h-full w-full transition duration-500 group-hover:scale-105" />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/60 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
            <span className="label-caps absolute bottom-3 left-3 text-stone opacity-0 transition-opacity group-hover:opacity-100">
              View
            </span>
          </button>
        ))}
      </div>

      <div
        className={`fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 bg-charcoal/95 p-6 backdrop-blur-md transition-opacity ${
          lightbox ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={() => setLightbox(null)}
      >
        <button
          type="button"
          aria-label="Close"
          onClick={() => setLightbox(null)}
          className="absolute right-6 top-6 text-stone hover:text-petrol-300"
        >
          <Icon name="close" className="text-3xl" />
        </button>
        {lightbox && (
          <>
            <div className="relative max-h-[70vh] w-full max-w-4xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
              {lightbox.src ? (
                <Image src={lightbox.src} alt={lightbox.caption} width={1200} height={800} className="h-auto max-h-[70vh] w-full object-contain" />
              ) : (
                <RoomViewScene variant={lightbox.variant || "day"} className="aspect-[4/3] w-full" />
              )}
            </div>
            <span className="font-display text-lg font-normal text-stone">{lightbox.caption}</span>
          </>
        )}
      </div>
    </div>
  );
}
