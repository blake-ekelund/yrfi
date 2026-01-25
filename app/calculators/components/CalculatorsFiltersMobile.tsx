"use client";

import { Search, LayoutGrid, Table as TableIcon } from "lucide-react";

type ViewMode = "grid" | "table";

export function CalculatorsFiltersMobile({
  search,
  setSearch,
  view,
  setView,
}: {
  search: string;
  setSearch: (v: string) => void;
  view: ViewMode;
  setView: (v: ViewMode) => void;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        background: "#fff",
        padding: "8px 10px",
        borderRadius: 12,
        border: "1px solid rgba(54,101,107,0.2)",
        marginBottom: 6,
      }}
    >
      {/* Search icon */}
      <Search size={16} opacity={0.6} />

      {/* Input */}
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

      {/* View toggle */}
      <div
        style={{
          display: "flex",
          gap: 4,
          borderLeft: "1px solid rgba(54,101,107,0.15)",
          paddingLeft: 6,
        }}
      >
        <ToggleButton
          active={view === "grid"}
          onClick={() => setView("grid")}
          icon={<LayoutGrid size={16} />}
        />
        <ToggleButton
          active={view === "table"}
          onClick={() => setView("table")}
          icon={<TableIcon size={16} />}
        />
      </div>
    </div>
  );
}

/* -----------------------------
   Toggle button
------------------------------ */

function ToggleButton({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: active ? "#36656B" : "transparent",
        color: active ? "#F0F8A4" : "#36656B",
        padding: "5px",
        borderRadius: 8,
        cursor: "pointer",
      }}
      aria-pressed={active}
    >
      {icon}
    </button>
  );
}
