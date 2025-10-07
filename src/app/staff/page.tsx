"use client";

import { StaffLayout } from "@/components/layouts/StaffLayout";
import StaffDashboard from "@/pages/staff/StaffDashboard";

export default function Page() {
  return (
    <StaffLayout>
      <StaffDashboard />
    </StaffLayout>
  );
}

