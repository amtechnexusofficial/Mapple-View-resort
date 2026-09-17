"use client";

import { useState } from "react";
import Link from "next/link";
import Icon from "@/components/ui/Icon";
import { RoomViewScene } from "@/components/site/MountainArt";

const personas = [
  {
    label: "01 / Retreat",
    title: "Quiet Escape",
    tag: "Unplugged stillness",
    badge: "Restorative Retreat",
    heading: "Time to switch off completely",
    body: "For anyone who just needs distance from notifications and noise. Slow mornings, long walks, and a room with a view — the Nilgiri stillness does most of the work.",
    variant: "dawn" as const,
  },
  {
    label: "02 / Romance",
    title: "Couple's Getaway",
    tag: "Slow mornings together",
    badge: "Shared Escape",
    heading: "A little more time together",
    body: "Misty mornings and quiet evenings, away from the usual routine. A simple, comfortable base for a couple who just want some unhurried time in the hills.",
    variant: "dusk" as const,
  },
  {
    label: "03 / Together",
    title: "Family Holiday",
    tag: "Room to breathe",
    badge: "Family Sanctuary",
    heading: "Room to breathe, places to explore",
    body: "Space to relax at the resort and plenty within reach outside it — lakes, gardens, and the hill air itself. An easy base for a family trip to Ooty.",
    variant: "day" as const,
  },
  {
    label: "04 / Discovery",
    title: "Nilgiri Explorer",
    tag: "Toy train & summit hikes",
    badge: "Active Escape",
    heading: "Base camp for the Nilgiris",
    body: "For guests planning to see as much of the hills as possible — the mountain railway, Doddabetta, the tea estates. Come back each evening to rest and go again the next day.",
    variant: "day" as const,
  },
];

export default function ChooseYourEscape() {
  const [active, setActive] = useState(0);
  const current = personas[active];

  return (
    <div>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {personas.map((p, i) => (
          <button
            key={p.title}
            type="button"
            onClick={() => setActive(i)}
            className={`border-b-2 p-5 text-left transition-all ${
              i === active
                ? "border-charcoal bg-petrol-50"
                : "border-transparent bg-white hover:bg-petrol-50/60"
            }`}
          >
            <span className="label-caps block text-petrol-500">{p.label}</span>
            <h4 className="mt-1 font-display text-lg font-medium text-ink">{p.title}</h4>
            <p className="mt-1 line-clamp-1 text-sm font-light text-ink-soft/70">{p.tag}</p>
          </button>
        ))}
      </div>

      <div className="mt-4 bg-petrol-50 p-6 lg:p-10">
        <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-12">
          <div className="relative h-[280px] overflow-hidden lg:col-span-6">
            <RoomViewScene variant={current.variant} className="h-full w-full" />
          </div>
          <div className="space-y-4 lg:col-span-6">
            <span className="label-caps text-petrol-500">{current.badge}</span>
            <h3 className="font-display text-2xl font-normal text-ink">{current.heading}</h3>
            <p className="text-sm font-light leading-relaxed text-ink/70">{current.body}</p>
            <Link
              href="/rooms"
              className="label-caps inline-flex items-center gap-2 bg-charcoal px-6 py-3 text-stone transition hover:bg-charcoal-light"
            >
              Explore Rooms for This Escape
              <Icon name="north_east" className="text-sm" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
