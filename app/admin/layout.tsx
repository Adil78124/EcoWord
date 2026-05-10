import { AdminShell } from "@/components/admin/admin-shell";
import { AdminToaster } from "@/components/admin/admin-toaster";

export default function AdminLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <AdminShell>{children}</AdminShell>
      <AdminToaster />
    </>
  );
}
