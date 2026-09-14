"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { BookingStatus } from "@/lib/types";

const options: { value: BookingStatus; label: string }[] = [
  { value: "pending", label: "Pending" },
  { value: "payment_claimed", label: "Payment Claimed" },
  { value: "confirmed", label: "Confirmed" },
  { value: "cancelled", label: "Cancelled" },
];

export default function BookingStatusControl({
  bookingId,
  status,
}: {
  bookingId: string;
  status: BookingStatus;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function updateStatus(newStatus: BookingStatus) {
    if (newStatus === status) return;
    setBusy(true);
    await fetch(`/api/admin/bookings/${bookingId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status: newStatus }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((o) => (
        <button
          key={o.value}
          onClick={() => updateStatus(o.value)}
          disabled={busy || o.value === status}
          className={`rounded-full px-4 py-1.5 text-sm font-medium transition disabled:cursor-not-allowed ${
            o.value === status
              ? "bg-forest-700 text-cream"
              : "bg-white text-forest-700 ring-1 ring-forest-200 hover:bg-forest-50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
