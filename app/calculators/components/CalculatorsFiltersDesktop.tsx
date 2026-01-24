"use client";

import { Search } from "lucide-react";
import type { CalculatorTag } from "./types";

const TAGS: CalculatorTag[] = [
  "Debt",
  "Savings",
  "Investing",
  "Retirement",
];

export function CalculatorsFiltersDesktop({
  search,
  setSearch,
  activeTag,
  setActiveTag,
}: {
  search: string;
  setSearch: (v: string) => void;
  activeTag: CalculatorTag | null;
  setActiveTag: (v: CalculatorTag | null) => void;
}) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
      {/* Search */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          background: "#fff",
          padding: "10px 12px",
          borderRadius: 12,
          border: "1px solid rgba(54,101,107,0.2)",
          flex: "1 1 280px",
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

      {/* Tags */}
      <div style={{ display: "flex", gap: 8 }}>
        {TAGS.map((tag) => {
          const active = tag === activeTag;
          return (
            <button
              key={tag}
              onClick={() =>
                setActiveTag(active ? null : tag)
              }
              style={{
                padding: "8px 14px",
                borderRadius: 999,
                fontSize: 13,
                border: "1px solid rgba(54,101,107,0.2)",
                background: active ? "#36656B" : "#fff",
                color: active ? "#F0F8A4" : "#36656B",
                cursor: "pointer",
              }}
            >
              {tag}
            </button>
          );
        })}
      </div>
    </div>
  );
}
