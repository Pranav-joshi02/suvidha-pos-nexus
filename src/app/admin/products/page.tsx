"use client";

import { AdminLayout } from "@/components/layouts/AdminLayout";
import Products from "@/pages/admin/Products";

export default function Page() {
  return (
    <AdminLayout>
      <Products />
    </AdminLayout>
  );
}

