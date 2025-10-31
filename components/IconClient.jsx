"use client";

import React from "react";
import { FileText, BarChart2 } from "lucide-react";

/**
 * Simple client-side icon wrapper for Lucide icons.
 * name: "file-text" | "bar-chart"
 */
export default function IconClient({ name, className = "" }) {
  const common = { className };

  switch (name) {
    case "file-text":
      return <FileText {...common} />;
    case "bar-chart":
      return <BarChart2 {...common} />;
    default:
      return null;
  }
}
