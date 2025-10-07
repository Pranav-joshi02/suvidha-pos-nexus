"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard";

export default function Page() {
  return (
    <AdminLayout>
      <Dashboard />
    </AdminLayout>
  );
}

