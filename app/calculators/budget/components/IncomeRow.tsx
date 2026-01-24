"use client";

import { useEffect, useState } from "react";
import { IncomeItem, IncomeFrequency } from "../types";

const FREQUENCIES: IncomeFrequency[] = [
  "Daily",
  "Weekly",
  "Every 2 Weeks",
  "Twice a Month",
  "Monthly",
  "Quarterly",
  "Annually",
];

export function IncomeRow({
  item,
  onChange,
  onDelete,
}: {
  item: IncomeItem;
  onChange: (item: IncomeItem) => void;
  onDelete: () => void;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: isDesktop
          ? "1.4fr 1fr 1fr 1fr 40px"
          : "1.6fr 1fr 1fr 40px",
        gap: 8,
        alignItems: "center",
      }}
    >
      {/* Income source */}
      <input
        placeholder="Income source"
        value={item.source}
        onChange={(e) =>
          onChange({ ...item, source: e.target.value })
        }
        style={input}
      />

      {/* Frequency */}
      <select
        value={item.frequency}
        onChange={(e) =>
          onChange({
            ...item,
            frequency: e.target.value as IncomeFrequency,
          })
        }
        style={input}
      >
        {FREQUENCIES.map((f) => (
          <option key={f} value={f}>
            {f}
          </option>
        ))}
      </select>

      {/* Next income date — DESKTOP ONLY */}
      {isDesktop && (
        <input
          type="date"
          value={item.nextDate}
          onChange={(e) =>
            onChange({ ...item, nextDate: e.target.value })
          }
          style={input}
        />
      )}

      {/* Amount (text input) */}
      <input
        placeholder="$0.00"
        value={item.amount}
        onChange={(e) =>
          onChange({ ...item, amount: e.target.value })
        }
        style={{ ...input, textAlign: "right" }}
      />

      {/* Delete */}
      <button
        onClick={onDelete}
        aria-label="Remove income"
        style={{
          border: "none",
          background: "transparent",
          color: "#C94C4C",
          fontSize: 18,
          cursor: "pointer",
        }}
      >
        ×
      </button>
    </div>
  );
}

const input = {
  padding: "10px 12px",
  borderRadius: 8,
  border: "1px solid rgba(54,101,107,0.2)",
  fontSize: 14,
  width: "100%",
  boxSizing: "border-box" as const,
  background: "#fff",
  color: "#36656B",
};
