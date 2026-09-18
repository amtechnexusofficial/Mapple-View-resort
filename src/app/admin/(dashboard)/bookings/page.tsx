import Link from "next/link";
import { BookingModel, RoomModel } from "@/lib/models";
import { formatInr, formatDate } from "@/lib/format";
import StatusBadge from "@/components/admin/StatusBadge";
import BookingCalendar from "@/components/admin/BookingCalendar";
import type { BookingStatus } from "@/lib/types";

const statusTabs: { label: string; value: BookingStatus | "all" }[] = [
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
  const view = typeof sp.view === "string" ? sp.view : "calendar";
  const statusParam = typeof sp.status === "string" ? sp.status : "all";
  const status = statusParam === "all" ? undefined : (statusParam as BookingStatus);
  const isList = view === "list";

  const [bookings, rooms] = isList
    ? await Promise.all([BookingModel.all(status), RoomModel.all(true)])
    : [[], []];
  const roomMap = new Map(rooms.map((r) => [r.id, r]));

  return (
    <div className="min-w-0 w-full max-w-full">
      <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-4">
        <div className="min-w-0">
          <h1 className="font-sans text-xl font-bold text-ink sm:text-2xl">Bookings</h1>
          <p className="mt-1 text-sm text-ink/60">
            {isList
              ? "Browse and filter every booking on record."
              : "See all rooms by day, mark stays, and free dates by cancelling."}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Link
            href="/admin/bookings"
            className={`min-h-10 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:px-4 ${
              !isList ? "bg-ink text-stone" : "bg-white text-ink ring-1 ring-line hover:bg-petrol-50"
            }`}
          >
            Calendar
          </Link>
          <Link
            href="/admin/bookings?view=list"
            className={`min-h-10 rounded-full px-3.5 py-2 text-sm font-semibold transition sm:px-4 ${
              isList ? "bg-ink text-stone" : "bg-white text-ink ring-1 ring-line hover:bg-petrol-50"
            }`}
          >
            List
          </Link>
          <Link
            href="/admin/bookings/new"
            className="min-h-10 rounded-full bg-petrol-500 px-3.5 py-2 text-sm font-semibold text-stone hover:bg-petrol-600 sm:px-4"
          >
            <span className="sm:hidden">+ Add</span>
            <span className="hidden sm:inline">+ Add Booking</span>
          </Link>
        </div>
      </div>

      {!isList ? (
        <div className="mt-4 min-w-0 sm:mt-6">
          <BookingCalendar />
        </div>
      ) : (
        <>
          <div className="mt-4 flex gap-2 overflow-x-auto pb-1 [-webkit-overflow-scrolling:touch] sm:mt-6 sm:flex-wrap">
            {statusTabs.map((t) => (
              <Link
                key={t.value}
                href={
                  t.value === "all"
                    ? "/admin/bookings?view=list"
                    : `/admin/bookings?view=list&status=${t.value}`
                }
                className={`shrink-0 rounded-full px-3.5 py-1.5 text-sm font-medium transition sm:px-4 ${
                  statusParam === t.value
                    ? "bg-ink text-stone"
                    : "bg-white text-ink-soft ring-1 ring-line hover:bg-petrol-50"
                }`}
              >
                {t.label}
              </Link>
            ))}
          </div>

          <div className="mt-4 rounded-2xl border border-petrol-100 bg-white shadow-sm sm:mt-6">
            {bookings.length === 0 ? (
              <p className="px-4 py-10 text-center text-sm text-ink/50 sm:px-6">No bookings found.</p>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-petrol-100 text-xs uppercase text-ink/50">
                      <th className="px-3 py-3 font-medium sm:px-6">Guest</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Room</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Dates</th>
                      <th className="hidden px-3 py-3 font-medium sm:table-cell sm:px-6">Amount</th>
                      <th className="hidden px-3 py-3 font-medium md:table-cell md:px-6">Source</th>
                      <th className="px-3 py-3 font-medium sm:px-6">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map((b) => (
                      <tr key={b.id} className="border-b border-petrol-50 last:border-0">
                        <td className="px-3 py-3 sm:px-6">
                          <Link
                            href={`/admin/bookings/${b.id}`}
                            className="font-medium text-ink hover:underline"
                          >
                            {b.guest_name}
                          </Link>
                          <p className="text-xs text-ink/50">{b.guest_phone}</p>
                        </td>
                        <td className="px-3 py-3 text-ink/70 sm:px-6">
                          {roomMap.get(b.room_id)?.name || "—"}
                        </td>
                        <td className="whitespace-nowrap px-3 py-3 text-ink/70 sm:px-6">
                          {formatDate(b.check_in)} → {formatDate(b.check_out)}
                        </td>
                        <td className="hidden px-3 py-3 text-ink/70 sm:table-cell sm:px-6">
                          {formatInr(b.total_amount)}
                        </td>
                        <td className="hidden px-3 py-3 text-ink/70 md:table-cell md:px-6">
                          {b.source}
                        </td>
                        <td className="px-3 py-3 sm:px-6">
                          <StatusBadge status={b.status} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}
