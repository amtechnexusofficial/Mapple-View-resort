"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { formatDate } from "@/lib/format";
import type { RoomBlock } from "@/lib/types";

const SOURCE_OPTIONS = ["Booking.com", "Airbnb", "MakeMyTrip", "Goibibo", "Walk-in", "Maintenance", "Other"];

export default function RoomBlocks({
  roomId,
  blocks,
}: {
  roomId: string;
  blocks: RoomBlock[];
}) {
  const router = useRouter();
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [source, setSource] = useState(SOURCE_OPTIONS[0]);
  const [notes, setNotes] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [busyId, setBusyId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      const res = await fetch(`/api/admin/rooms/${roomId}/blocks`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ startDate, endDate, source, notes }),
      });
      const data = (await res.json()) as { error?: string };
      if (!res.ok) {
        setError(data.error || "Failed to add block");
        return;
      }
      setStartDate("");
      setEndDate("");
      setNotes("");
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  async function handleRelease(id: string) {
    if (!confirm("Release this block? The dates will become available again.")) return;
    setBusyId(id);
    setError(null);
    try {
      const res = await fetch(`/api/admin/blocks/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const data = (await res.json().catch(() => ({}))) as { error?: string };
        setError(data.error || "Failed to release block");
        return;
      }
      router.refresh();
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setBusyId(null);
    }
  }

  return (
    <div className="rounded-2xl border border-line bg-white p-6 shadow-sm">
      <h2 className="font-sans text-lg font-semibold text-ink">Blocked Dates</h2>
      <p className="mt-1 text-sm text-ink/60">
        Block dates this room is taken on another platform (Booking.com, Airbnb, a walk-in guest,
        maintenance) so it can&apos;t be double-booked here. Release a block once it no longer applies.
      </p>

      {blocks.length === 0 ? (
        <p className="mt-5 text-sm text-ink/50">No blocked dates for this room.</p>
      ) : (
        <div className="mt-5 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-line text-xs uppercase text-ink/50">
                <th className="py-2 pr-4 font-medium">Dates</th>
                <th className="py-2 pr-4 font-medium">Source</th>
                <th className="py-2 pr-4 font-medium">Notes</th>
                <th className="py-2 pr-4 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((b) => (
                <tr key={b.id} className="border-b border-petrol-50 last:border-0">
                  <td className="py-2.5 pr-4 text-ink/80">
                    {formatDate(b.start_date)} → {formatDate(b.end_date)}
                  </td>
                  <td className="py-2.5 pr-4 text-ink/70">{b.source}</td>
                  <td className="py-2.5 pr-4 text-ink/60">{b.notes || "—"}</td>
                  <td className="py-2.5 pr-4 text-right">
                    <button
                      onClick={() => handleRelease(b.id)}
                      disabled={busyId === b.id}
                      className="text-xs font-medium text-red-600 hover:underline disabled:opacity-50"
                    >
                      Release
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <form onSubmit={handleAdd} className="mt-6 grid gap-4 border-t border-petrol-100 pt-5 sm:grid-cols-2">
        <div>
          <label className="text-xs font-medium text-ink/60">Start Date</label>
          <input
            type="date"
            required
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-medium text-ink/60">End Date</label>
          <input
            type="date"
            required
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
            className="mt-1 w-full rounded-lg border border-line px-3 py-2 text-sm focus:border-petrol-500 focus:outline-none"
          />
        </div>
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
        </div>
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
          <p className="sm:col-span-2 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700">{error}</p>
        )}

        <div className="sm:col-span-2">
          <button
            type="submit"
            disabled={submitting}
            className="rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-stone hover:bg-charcoal-light disabled:cursor-not-allowed disabled:opacity-60"
          >
            {submitting ? "Adding..." : "Add Block"}
          </button>
        </div>
      </form>
    </div>
  );
}
