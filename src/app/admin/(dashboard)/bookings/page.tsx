import Link from "next/link";
import { BookingModel, RoomModel } from "@/lib/models";
import { formatInr, formatDate } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";
import type { BookingStatus } from "@/lib/types";

const tabs: { label: string; value: BookingStatus | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Pending", value: "pending" },
  { label: "Payment Claimed", value: "payment_claimed" },
  { label: "Confirmed", value: "confirmed" },
  { label: "Cancelled", value: "cancelled" },
];

export default async function AdminBookingsPage({
  searchParams,
}: PageProps<"/admin/bookings">) {
  const sp = await searchParams;
  const statusParam = typeof sp.status === "string" ? sp.status : "all";
  const status = statusParam === "all" ? undefined : (statusParam as BookingStatus);

  const [bookings, rooms] = await Promise.all([
    BookingModel.all(status),
    RoomModel.all(true),
  ]);
  const roomMap = new Map(rooms.map((r) => [r.id, r]));

  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-sans text-2xl font-bold text-ink">Bookings</h1>
          <p className="mt-1 text-sm text-ink/60">
            Manage guest booking requests, and record bookings taken on other platforms.
          </p>
        </div>
        <Link
          href="/admin/bookings/new"
          className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-stone hover:bg-charcoal-light"
        >
          + Add Booking
        </Link>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {tabs.map((t) => (
          <Link
            key={t.value}
            href={t.value === "all" ? "/admin/bookings" : `/admin/bookings?status=${t.value}`}
            className={`rounded-full px-4 py-1.5 text-sm font-medium transition ${
              statusParam === t.value
                ? "bg-ink text-stone"
                : "bg-white text-ink-soft ring-1 ring-line hover:bg-petrol-50"
            }`}
          >
            {t.label}
          </Link>
        ))}
      </div>

      <div className="mt-6 rounded-2xl border border-petrol-100 bg-white shadow-sm">
        {bookings.length === 0 ? (
          <p className="px-6 py-10 text-center text-sm text-ink/50">
            No bookings found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-petrol-100 text-xs uppercase text-ink/50">
                  <th className="px-6 py-3 font-medium">Guest</th>
                  <th className="px-6 py-3 font-medium">Room</th>
                  <th className="px-6 py-3 font-medium">Dates</th>
                  <th className="px-6 py-3 font-medium">Amount</th>
                  <th className="px-6 py-3 font-medium">Source</th>
                  <th className="px-6 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((b) => (
                  <tr key={b.id} className="border-b border-petrol-50 last:border-0">
                    <td className="px-6 py-3">
                      <Link href={`/admin/bookings/${b.id}`} className="font-medium text-ink hover:underline">
                        {b.guest_name}
                      </Link>
                      <p className="text-xs text-ink/50">{b.guest_phone}</p>
                    </td>
                    <td className="px-6 py-3 text-ink/70">
                      {roomMap.get(b.room_id)?.name || "—"}
                    </td>
                    <td className="px-6 py-3 text-ink/70">
                      {formatDate(b.check_in)} → {formatDate(b.check_out)}
                    </td>
                    <td className="px-6 py-3 text-ink/70">{formatInr(b.total_amount)}</td>
                    <td className="px-6 py-3 text-ink/70">{b.source}</td>
                    <td className="px-6 py-3">
                      <StatusBadge status={b.status} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
