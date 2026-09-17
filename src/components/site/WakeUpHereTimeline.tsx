"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { RoomViewScene } from "@/components/site/MountainArt";

const moments = [
  {
    time: "06:30 AM",
    label: "First Light",
    title: "Mist Over the Nilgiris",
    desc: "The world wakes gently at over 2,200 metres. Cloud drifts through the valley below as the first light reaches the hills. Step onto your verandah wrapped against the cold for a quiet look at the morning.",
    variant: "dawn" as const,
  },
  {
    time: "08:00 AM",
    label: "Morning",
    title: "A Slow Breakfast",
    desc: "No rush to be anywhere. Mornings here are unhurried, with the cool mountain air still lingering outside the window.",
    variant: "day" as const,
  },
  {
    time: "11:00 AM",
    label: "Midday",
    title: "Out Into Ooty",
    desc: "Lakes, gardens, tea estates, and the old mountain railway are all within reach. Come and go as you please through the day.",
    variant: "day" as const,
  },
  {
    time: "03:30 PM",
    label: "Afternoon",
    title: "Tea Among the Hills",
    desc: "The Nilgiris are tea country. An afternoon spent slowly, with a hot cup and a view, is very much in keeping with the place.",
    variant: "day" as const,
  },
  {
    time: "06:30 PM",
    label: "Golden Hour",
    title: "Return to the Resort",
    desc: "Evenings cool quickly at this elevation. As the light turns gold over the ridgeline, it's a good time to head back and settle in.",
    variant: "dusk" as const,
  },
  {
    time: "09:00 PM",
    label: "Night",
    title: "Warm Lights, Quiet Evenings",
    desc: "Little to do after dark except enjoy the stillness — a warm room, a hot drink, and the kind of quiet that's hard to find outside the hills.",
    variant: "dusk" as const,
  },
];

export default function WakeUpHereTimeline() {
  const [active, setActive] = useState(0);
  const current = moments[active];

  return (
    <div>
      <div className="flex items-center gap-2 overflow-x-auto border-b border-line pb-4">
        {moments.map((m, i) => (
          <button
            key={m.time}
            type="button"
            onClick={() => setActive(i)}
            className={`label-caps whitespace-nowrap px-4 py-2.5 transition-all ${
              i === active ? "bg-charcoal text-stone" : "bg-petrol-50 text-ink-soft hover:bg-petrol-100"
            }`}
          >
            {m.time} &middot; {m.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid grid-cols-1 items-center gap-8 bg-white p-6 lg:grid-cols-12 lg:p-10">
        <div className="relative h-[320px] overflow-hidden lg:col-span-7 lg:h-[420px]">
          <RoomViewScene variant={current.variant} className="h-full w-full" />
        </div>
        <div className="space-y-4 lg:col-span-5">
          <div className="label-caps inline-flex items-center gap-2 bg-petrol-50 px-3 py-1.5 text-ink">
            <Icon name="schedule" className="text-base text-petrol-500" />
            {current.time} &middot; {current.label}
          </div>
          <h3 className="font-display text-2xl font-normal leading-tight text-ink lg:text-3xl">
            {current.title}
          </h3>
          <p className="text-sm font-light leading-relaxed text-ink/70">{current.desc}</p>
        </div>
      </div>
    </div>
  );
}
