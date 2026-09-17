"use server";

import { redirect } from "next/navigation";
import bcrypt from "bcryptjs";
import { sql } from "@/lib/db";
import { createAdminSession, destroyAdminSession } from "@/lib/session";
import { LoginFormSchema } from "@/lib/validation";

export type LoginState = { error?: string } | undefined;

export async function loginAction(_prevState: LoginState, formData: FormData): Promise<LoginState> {
  const parsed = LoginFormSchema.safeParse({
    username: formData.get("username"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { error: "Enter both username and password." };
  }

  const { username, password } = parsed.data;
  const rows = (await sql`
    SELECT id, username, password_hash FROM admin_users WHERE username = ${username}
  `) as { id: number; username: string; password_hash: string }[];
  const row = rows[0];

  if (!row || !bcrypt.compareSync(password, row.password_hash)) {
    return { error: "Invalid username or password." };
  }

  await createAdminSession({ adminId: row.id, username: row.username });
  redirect("/admin");
}

export async function logoutAction() {
  await destroyAdminSession();
  redirect("/admin/login");
}
