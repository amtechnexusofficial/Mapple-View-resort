"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, format, addDays } from "date-fns";
import { formatInr } from "@/lib/format";
import type { Room } from "@/lib/types";

export default function BookingForm({ room }: { room: Room }) {
  const router = useRouter();
  const today = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const tomorrow = useMemo(
    () => format(addDays(new Date(), 1), "yyyy-MM-dd"),
    []
  );

  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guests, setGuests] = useState(1);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const nights = Math.max(
    0,
    differenceInCalendarDays(new Date(checkOut), new Date(checkIn))
  );
  const total = nights * room.price_per_night;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (nights < 1) {
      setError("Check-out date must be after check-in date.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId: room.id,
          guestName,
          guestPhone,
          guestEmail,
          checkIn,
          checkOut,
          guests,
          notes,
        }),
      });
      const data = (await res.json()) as {
        error?: string;
        booking?: { id: string };
      };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      router.push(`/booking/${data.booking!.id}`);
    } catch {
      setError("Network error. Please check your connection and try again.");
      setSubmitting(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm"
    >
      <h3 className="font-display text-xl font-semibold text-ink">
        Book This Room
      </h3>

      <div className="mt-5 grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-ink/60">Check-in</label>
          <input
            type="date"
            required
            min={today}
            value={checkIn}
            onChange={(e) => {
              setCheckIn(e.target.value);
              if (e.target.value >= checkOut) {
                setCheckOut(format(addDays(new Date(e.target.value), 1), "yyyy-MM-dd"));
              }
            }}
            className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">Check-out</label>
          <input
            type="date"
            required
            min={format(addDays(new Date(checkIn), 1), "yyyy-MM-dd")}
            value={checkOut}
            onChange={(e) => setCheckOut(e.target.value)}
            className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink/60">Guests</label>
        <input
          type="number"
          required
          min={1}
          max={room.max_guests}
          value={guests}
          onChange={(e) => setGuests(Number(e.target.value))}
          className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
        />
        <p className="mt-1 text-xs text-ink/50">Max {room.max_guests} guests</p>
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink/60">Full Name</label>
        <input
          type="text"
          required
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Your full name"
          className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink/60">Phone Number</label>
        <input
          type="tel"
          required
          value={guestPhone}
          onChange={(e) => setGuestPhone(e.target.value)}
          placeholder="+91 98765 43210"
          className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink/60">
          Email <span className="text-ink/40">(optional)</span>
        </label>
        <input
          type="email"
          value={guestEmail}
          onChange={(e) => setGuestEmail(e.target.value)}
          placeholder="you@example.com"
          className="mt-1 min-h-11 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="mt-4">
        <label className="text-xs font-medium text-ink/60">
          Special Requests <span className="text-ink/40">(optional)</span>
        </label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          rows={2}
          className="mt-1 w-full rounded-lg border border-line px-3 py-2.5 text-base focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="mt-6 space-y-1 rounded-xl bg-petrol-50 p-4 text-sm">
        <div className="flex justify-between text-ink/70">
          <span>{formatInr(room.price_per_night)} x {nights || 0} night{nights === 1 ? "" : "s"}</span>
          <span>{formatInr(total)}</span>
        </div>
        <div className="flex justify-between border-t border-petrol-100 pt-2 font-semibold text-ink">
          <span>Total</span>
          <span>{formatInr(total)}</span>
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <button
        type="submit"
        disabled={submitting || nights < 1}
        className="mt-6 w-full min-h-12 rounded-full bg-ink px-6 py-3 text-base font-semibold text-stone transition hover:bg-charcoal-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Processing..." : "Continue to Payment"}
      </button>
      <p className="mt-3 text-center text-xs text-ink/50">
        You&apos;ll pay securely via UPI on the next step.
      </p>
    </form>
  );
}
