import type { ReactNode } from "react";
import { getSession } from "@/lib/auth";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminDashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();

  return (
    <div className="flex min-h-screen flex-col bg-petrol-50 md:flex-row">
      <Sidebar username={session?.username ?? "admin"} />
      <main className="flex-1 p-6 md:p-10">{children}</main>
    </div>
  );
}
