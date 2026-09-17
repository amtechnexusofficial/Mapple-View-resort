"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import Icon from "@/components/ui/Icon";

export default function HeroBookingBar() {
  const router = useRouter();
  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState("2");

  function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({ checkIn, checkOut, guests });
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleReserve}
      className="relative z-10 w-full bg-stone/95 p-4 shadow-2xl backdrop-blur-md lg:p-6"
      id="quick-booking"
    >
      <div className="grid grid-cols-1 items-end gap-4 md:grid-cols-4 lg:grid-cols-5">
        <label className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Arrival</span>
          <div className="flex items-center gap-2">
            <Icon name="calendar_today" className="text-lg text-petrol-500" />
            <input
              type="date"
              required
              value={checkIn}
              min={today}
              onChange={(e) => {
                setCheckIn(e.target.value);
                if (e.target.value >= checkOut) {
                  setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd"));
                }
              }}
              className="w-full bg-transparent font-display text-lg text-ink focus:outline-none"
            />
          </div>
        </label>
        <label className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Departure</span>
          <div className="flex items-center gap-2">
            <Icon name="calendar_month" className="text-lg text-petrol-500" />
            <input
              type="date"
              required
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full bg-transparent font-display text-lg text-ink focus:outline-none"
            />
          </div>
        </label>
        <label className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Guests</span>
          <div className="flex items-center gap-2">
            <Icon name="group" className="text-lg text-petrol-500" />
            <select
              value={guests}
              onChange={(e) => setGuests(e.target.value)}
              className="w-full bg-transparent text-sm font-medium text-ink focus:outline-none"
            >
              <option value="1">1 Guest</option>
              <option value="2">2 Guests</option>
              <option value="3">3 Guests</option>
              <option value="4">4 Guests</option>
              <option value="5">5+ Guests</option>
            </select>
          </div>
        </label>
        <div className="space-y-1 text-ink-soft/70 md:block">
          <span className="label-caps block">Setting</span>
          <div className="flex items-center gap-2">
            <Icon name="filter_drama" className="text-lg text-petrol-500" />
            <span className="text-sm text-ink">Mountain &amp; Valley Views</span>
          </div>
        </div>
        <div className="md:col-span-4 lg:col-span-1">
          <button
            type="submit"
            className="label-caps flex w-full items-center justify-center gap-2 bg-charcoal px-4 py-4 text-stone transition hover:bg-charcoal-light"
          >
            <span>See Rooms</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </form>
  );
}
