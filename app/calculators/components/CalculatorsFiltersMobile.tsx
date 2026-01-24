"use client";

import { Search } from "lucide-react";

export function CalculatorsFiltersMobile({
  search,
  setSearch,
}: {
  search: string;
  setSearch: (v: string) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: "#fff",
        padding: "10px 12px",
        borderRadius: 12,
        border: "1px solid rgba(54,101,107,0.2)",
        marginBottom: 24,
      }}
    >
      <Search size={16} opacity={0.6} />
      <input
        placeholder="Search calculators…"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{
          border: "none",
          outline: "none",
          fontSize: 14,
          width: "100%",
          color: "#36656B",
        }}
      />
    </div>
  );
}
