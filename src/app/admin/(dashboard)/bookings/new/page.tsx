import { RoomModel } from "@/lib/models";
import AdminBookingForm from "@/components/admin/AdminBookingForm";

export default async function NewAdminBookingPage() {
  const rooms = await RoomModel.all(true);

  return (
    <div>
      <h1 className="font-sans text-2xl font-bold text-ink">Add Booking</h1>
      <p className="mt-1 text-sm text-ink/60">
        Record a booking taken on another platform, a walk-in, or a maintenance block. This
        blocks the dates here too, so the site won&apos;t double-book them.
      </p>
      <div className="mt-6">
        {rooms.length === 0 ? (
          <p className="text-sm text-ink/50">Add a room first before recording a booking.</p>
        ) : (
          <AdminBookingForm rooms={rooms} />
        )}
      </div>
    </div>
  );
}
