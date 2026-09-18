"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { differenceInCalendarDays, format, addDays } from "date-fns";
import { formatInr } from "@/lib/format";
import type { Room, BookingStatus } from "@/lib/types";

const SOURCE_OPTIONS = [
  "Booking.com",
  "Airbnb",
  "MakeMyTrip",
  "Goibibo",
  "Walk-in",
  "Phone",
  "Maintenance",
  "Other",
];

const STATUS_OPTIONS: { value: BookingStatus; label: string }[] = [
  { value: "confirmed", label: "Confirmed" },
  { value: "pending", label: "Pending" },
  { value: "payment_claimed", label: "Payment Claimed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function AdminBookingForm({ rooms }: { rooms: Room[] }) {
  const router = useRouter();
  const today = useMemo(() => format(new Date(), "yyyy-MM-dd"), []);
  const tomorrow = useMemo(() => format(addDays(new Date(), 1), "yyyy-MM-dd"), []);

  const [roomId, setRoomId] = useState(rooms[0]?.id ?? "");
  const [checkIn, setCheckIn] = useState(today);
  const [checkOut, setCheckOut] = useState(tomorrow);
  const [guestName, setGuestName] = useState("");
  const [guestPhone, setGuestPhone] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guests, setGuests] = useState(1);
  const [source, setSource] = useState(SOURCE_OPTIONS[0]);
  const [status, setStatus] = useState<BookingStatus>("confirmed");
  const [notes, setNotes] = useState("");
  const [amountTouched, setAmountTouched] = useState(false);
  const [amount, setAmount] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const room = rooms.find((r) => r.id === roomId);
  const nights = Math.max(0, differenceInCalendarDays(new Date(checkOut), new Date(checkIn)));
  const suggestedAmount = room ? nights * room.price_per_night : 0;
  const effectiveAmount = amountTouched ? amount : suggestedAmount;
  const isBlockOnly = source === "Maintenance";

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (checkIn < today) {
      setError("Check-in cannot be in the past.");
      return;
    }
    if (nights < 1) {
      setError("Check-out date must be after check-in date.");
      return;
    }
    if (!roomId) {
      setError("Select a room.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch("/api/admin/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          roomId,
          guestName: guestName || `${source} guest`,
          guestPhone,
          guestEmail,
          checkIn,
          checkOut,
          guests,
          totalAmount: isBlockOnly ? 0 : effectiveAmount,
          status: isBlockOnly ? "confirmed" : status,
          source,
          notes,
        }),
      });
      const data = (await res.json()) as { error?: string; booking?: { id: string } };
      if (!res.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setSubmitting(false);
        return;
      }
      router.push("/admin/bookings");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl space-y-5 rounded-2xl border border-petrol-100 bg-white p-6 shadow-sm">
      <div>
        <label className="text-xs font-medium text-ink/60">Source</label>
        <select
          value={source}
          onChange={(e) => setSource(e.target.value)}
          className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
        >
          {SOURCE_OPTIONS.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
        <p className="mt-1 text-xs text-ink/40">
          {isBlockOnly
            ? "Maintenance blocks the dates with no charge and no revenue impact."
            : "Recorded as a real booking, so it blocks these dates here and counts toward revenue in Reports & Billing."}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink/60">Room</label>
          <select
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          >
            {rooms.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">Guests</label>
          <input
            type="number"
            min={1}
            max={room?.max_guests ?? 20}
            value={guests}
            onChange={(e) => setGuests(Number(e.target.value))}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
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
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
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
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
      </div>

      <div>
        <label className="text-xs font-medium text-ink/60">
          Guest Name <span className="text-ink/40">(optional for a plain block)</span>
        </label>
        <input
          type="text"
          value={guestName}
          onChange={(e) => setGuestName(e.target.value)}
          placeholder="Guest's name, if known"
          className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-ink/60">
            Phone <span className="text-ink/40">(optional)</span>
          </label>
          <input
            type="tel"
            value={guestPhone}
            onChange={(e) => setGuestPhone(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">
            Email <span className="text-ink/40">(optional)</span>
          </label>
          <input
            type="email"
            value={guestEmail}
            onChange={(e) => setGuestEmail(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
      </div>

      {!isBlockOnly && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="text-xs font-medium text-ink/60">Amount (₹)</label>
            <input
              type="number"
              min={0}
              value={effectiveAmount}
              onChange={(e) => {
                setAmountTouched(true);
                setAmount(Number(e.target.value));
              }}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
            />
            <p className="mt-1 text-xs text-ink/40">
              Suggested: {formatInr(suggestedAmount)} ({nights || 0} night{nights === 1 ? "" : "s"})
            </p>
          </div>
          <div>
            <label className="text-xs font-medium text-ink/60">Status</label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as BookingStatus)}
              className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
            >
              {STATUS_OPTIONS.map((s) => (
                <option key={s.value} value={s.value}>
                  {s.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      <div>
        <label className="text-xs font-medium text-ink/60">
          Notes <span className="text-ink/40">(optional)</span>
        </label>
        <input
          type="text"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="e.g. Booking.com reservation #12345"
          className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
        />
      </div>

      {error && (
        <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
      )}

      <button
        type="submit"
        disabled={submitting || nights < 1 || !roomId}
        className="w-full rounded-full bg-ink px-6 py-3 text-sm font-semibold text-stone transition hover:bg-charcoal-light disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Saving..." : isBlockOnly ? "Block These Dates" : "Add Booking"}
      </button>
    </form>
  );
}
