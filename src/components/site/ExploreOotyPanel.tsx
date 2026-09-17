"use client";

import { useState } from "react";
import Icon from "@/components/ui/Icon";
import { attractions } from "@/lib/ooty";

export default function ExploreOotyPanel() {
  const [active, setActive] = useState(0);
  const current = attractions[active];

  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="flex flex-col gap-2 lg:col-span-5">
        {attractions.map((a, i) => (
          <button
            key={a.title}
            type="button"
            onClick={() => setActive(i)}
            className={`flex items-center gap-4 border-l-2 px-4 py-3 text-left transition-colors ${
              i === active
                ? "border-charcoal bg-petrol-50"
                : "border-transparent hover:bg-petrol-50/60"
            }`}
          >
            <Icon name={a.icon} className="text-xl text-petrol-500" />
            <span className="font-display text-base font-medium text-ink">{a.title}</span>
          </button>
        ))}
      </div>
      <div className="flex flex-col justify-center bg-charcoal p-8 text-stone lg:col-span-7 lg:p-10">
        <span className="label-caps text-petrol-300">{current.proximity}</span>
        <h3 className="mt-3 font-display text-2xl font-normal">{current.title}</h3>
        <p className="mt-3 max-w-lg text-sm font-light leading-relaxed text-stone/80">
          {current.desc}
        </p>
      </div>
    </div>
  );
}
