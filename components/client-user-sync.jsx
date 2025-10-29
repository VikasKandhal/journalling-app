"use client";

import { useEffect } from "react";

export default function ClientUserSync() {
  useEffect(() => {
    // fire-and-forget; the API will ensure the user exists in the DB
    fetch("/api/create-user").catch((err) => {
      // swallow network errors in the client (optional: log to console for dev)
      if (process.env.NODE_ENV === "development") {
        console.error("create-user sync failed:", err);
      }
    });
  }, []);

  // This component renders nothing visible
  return null;
}
