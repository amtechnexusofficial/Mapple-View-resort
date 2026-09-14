import { NextRequest, NextResponse } from "next/server";
import { getSession, verifyPassword, updateAdminPassword } from "@/lib/auth";
import { changePasswordSchema } from "@/lib/validation";
import { db } from "@/lib/db";
import type { AdminUser } from "@/lib/types";

export async function POST(request: NextRequest) {
  const session = await getSession();
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  const body = await request.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }
  const parsed = changePasswordSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "New password must be at least 6 characters" },
      { status: 400 }
    );
  }
  const user = db
    .prepare("SELECT * FROM admin_users WHERE id = ?")
    .get(session.sub) as AdminUser | undefined;
  if (!user || !verifyPassword(parsed.data.currentPassword, user.password_hash)) {
    return NextResponse.json({ error: "Current password is incorrect" }, { status: 401 });
  }
  updateAdminPassword(user.id, parsed.data.newPassword);
  return NextResponse.json({ ok: true });
}
