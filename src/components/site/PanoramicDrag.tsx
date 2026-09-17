"use client";

import { useState } from "react";
import { RoomViewScene } from "@/components/site/MountainArt";

export default function PanoramicDrag() {
  const [pan, setPan] = useState(0);

  return (
    <div className="relative h-[420px] w-full overflow-hidden bg-charcoal shadow-2xl lg:h-[550px]">
      <div
        className="absolute inset-0 h-full w-[170%] transition-[left] duration-100"
        style={{ left: `-${pan}%` }}
      >
        <RoomViewScene variant="day" className="h-full w-full" />
      </div>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/70 via-transparent to-transparent" />

      <div className="absolute bottom-6 left-6 z-10 text-stone">
        <span className="label-caps block text-petrol-300">The Nilgiris</span>
        <h4 className="font-display text-2xl font-normal">Some views don&apos;t need a filter.</h4>
      </div>

      <div className="absolute bottom-6 right-6 z-10 flex items-center gap-3 bg-stone/85 px-4 py-2 backdrop-blur-md">
        <span className="label-caps text-ink">Pan Horizon</span>
        <input
          type="range"
          min={0}
          max={70}
          value={pan}
          onChange={(e) => setPan(Number(e.target.value))}
          className="w-32 cursor-pointer accent-charcoal"
          aria-label="Pan across the panoramic view"
        />
      </div>
    </div>
  );
}
