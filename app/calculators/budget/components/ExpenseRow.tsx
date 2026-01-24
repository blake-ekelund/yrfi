"use client";

import { useEffect, useState } from "react";
import {
  ExpenseItem,
  ExpenseFrequency,
  ExpenseCategory,
} from "../types";

const FREQUENCIES: ExpenseFrequency[] = [
  "Daily",
  "Weekly",
  "Every 2 Weeks",
  "Twice a Month",
  "Monthly",
  "Quarterly",
  "Annually",
];

const CATEGORIES: ExpenseCategory[] = [
  "Housing",
  "Utilities",
  "Food",
  "Transportation",
  "Insurance",
  "Subscriptions",
  "Healthcare",
  "Debt",
  "Other",
];

export function ExpenseRow({
  item,
  onChange,
  onDelete,
}: {
  item: ExpenseItem;
  onChange: (item: ExpenseItem) => void;
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
          ? "1.4fr 1fr 1fr 1fr 1fr 40px"
          : "1.6fr 1fr 1fr 40px",
        gap: 8,
        alignItems: "center",
      }}
    >
      {/* Expense name */}
      <input
        placeholder="Expense"
        value={item.name}
        onChange={(e) =>
          onChange({ ...item, name: e.target.value })
        }
        style={input}
      />

      {/* Category */}
      <select
        value={item.category}
        onChange={(e) =>
          onChange({
            ...item,
            category: e.target.value as ExpenseCategory,
          })
        }
        style={input}
      >
        {CATEGORIES.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>

      {/* Frequency — DESKTOP ONLY */}
      {isDesktop && (
        <select
          value={item.frequency}
          onChange={(e) =>
            onChange({
              ...item,
              frequency: e.target.value as ExpenseFrequency,
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
      )}

      {/* Next date — DESKTOP ONLY */}
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

      {/* Amount */}
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
        aria-label="Remove expense"
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
