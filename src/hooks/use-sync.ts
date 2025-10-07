"use client";

import { useState, useCallback } from "react";
import { toast } from "@/components/ui/sonner";

export function useSync() {
  const [isSyncing, setIsSyncing] = useState(false);

  const sync = useCallback(async () => {
    setIsSyncing(true);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      if (!res.ok) throw new Error(`Sync failed: ${res.status}`);
      const data = await res.json();
      toast.success(data.message ?? "Synced successfully");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error";
      toast.error(message);
    } finally {
      setIsSyncing(false);
    }
  }, []);

  return { isSyncing, sync };
}

