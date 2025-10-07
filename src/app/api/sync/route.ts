import { NextResponse } from "next/server";

export async function POST() {
  // Simulate a sync task; in real usage, call your backend or DB here
  await new Promise((r) => setTimeout(r, 300));
  return NextResponse.json({ ok: true, message: "Sync completed" });
}

