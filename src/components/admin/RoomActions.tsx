"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function RoomActions({
  roomId,
  isActive,
}: {
  roomId: string;
  isActive: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggleActive() {
    setBusy(true);
    await fetch(`/api/admin/rooms/${roomId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isActive: !isActive }),
    });
    router.refresh();
    setBusy(false);
  }

  async function handleDelete() {
    if (!confirm("Delete this room? This cannot be undone.")) return;
    setBusy(true);
    await fetch(`/api/admin/rooms/${roomId}`, { method: "DELETE" });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex items-center gap-3 text-sm">
      <Link href={`/admin/rooms/${roomId}/edit`} className="font-medium text-gold-600 hover:underline">
        Edit
      </Link>
      <button onClick={toggleActive} disabled={busy} className="text-forest-700 hover:underline disabled:opacity-50">
        {isActive ? "Hide" : "Show"}
      </button>
      <button onClick={handleDelete} disabled={busy} className="text-red-600 hover:underline disabled:opacity-50">
        Delete
      </button>
    </div>
  );
}
