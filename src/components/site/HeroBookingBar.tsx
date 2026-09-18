"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { format, addDays } from "date-fns";
import Icon from "@/components/ui/Icon";

const MIN_GUESTS = 1;
const MAX_GUESTS = 20;

export default function HeroBookingBar() {
  const router = useRouter();
  const today = format(new Date(), "yyyy-MM-dd");
  const tomorrow = format(addDays(new Date(), 1), "yyyy-MM-dd");

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(2);

  function handleReserve(e: React.FormEvent) {
    e.preventDefault();
    const params = new URLSearchParams({
      checkIn,
      checkOut,
      guests: String(guests),
    });
    router.push(`/rooms?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleReserve}
      className="relative z-10 w-full bg-stone/95 p-4 shadow-2xl backdrop-blur-md sm:p-5 lg:p-6"
      id="quick-booking"
    >
      <div className="grid grid-cols-1 items-end gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-4">
        <label className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Arrival</span>
          <div className="flex min-h-11 items-center gap-2">
            <Icon name="calendar_today" className="shrink-0 text-lg text-petrol-500" />
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
              className="w-full min-w-0 bg-transparent font-display text-base text-ink focus:outline-none"
            />
          </div>
        </label>
        <label className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Departure</span>
          <div className="flex min-h-11 items-center gap-2">
            <Icon name="calendar_month" className="shrink-0 text-lg text-petrol-500" />
            <input
              type="date"
              required
              value={checkOut}
              min={checkIn}
              onChange={(e) => setCheckOut(e.target.value)}
              className="w-full min-w-0 bg-transparent font-display text-base text-ink focus:outline-none"
            />
          </div>
        </label>
        <div className="space-y-1">
          <span className="label-caps block text-ink-soft/70">Guests</span>
          <div className="flex min-h-11 items-center gap-3">
            <Icon name="group" className="shrink-0 text-lg text-petrol-500" />
            <div className="flex items-center gap-2">
              <button
                type="button"
                aria-label="Decrease guests"
                disabled={guests <= MIN_GUESTS}
                onClick={() => setGuests((g) => Math.max(MIN_GUESTS, g - 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-petrol-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="remove" className="text-base" />
              </button>
              <span className="min-w-[4.5rem] text-center text-base font-medium text-ink" aria-live="polite">
                {guests} {guests === 1 ? "Guest" : "Guests"}
              </span>
              <button
                type="button"
                aria-label="Increase guests"
                disabled={guests >= MAX_GUESTS}
                onClick={() => setGuests((g) => Math.min(MAX_GUESTS, g + 1))}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-ink transition hover:bg-petrol-50 disabled:cursor-not-allowed disabled:opacity-40"
              >
                <Icon name="add" className="text-base" />
              </button>
            </div>
          </div>
        </div>
        <div className="sm:col-span-2 lg:col-span-1">
          <button
            type="submit"
            className="label-caps flex min-h-12 w-full items-center justify-center gap-2 bg-charcoal px-4 py-4 text-stone transition hover:bg-charcoal-light"
          >
            <span>See Rooms</span>
            <Icon name="arrow_forward" className="text-sm" />
          </button>
        </div>
      </div>
    </form>
  );
}
