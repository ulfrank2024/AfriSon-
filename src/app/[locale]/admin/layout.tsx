import type { ReactNode } from "react";
import { requireAppUser } from "@/modules/auth/require-app-user";
import { AdminShell } from "@/modules/admin/admin-shell";

export default async function AdminLayout({ children }: { children: ReactNode }) {
  const appUser = await requireAppUser("admin");

  return (
    <AdminShell user={{ fullName: appUser?.fullName ?? "Admin", email: appUser?.email ?? null }}>
      {children}
    </AdminShell>
  );
}
