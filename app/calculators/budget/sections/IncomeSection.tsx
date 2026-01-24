"use client";

import { useMemo, useEffect, useState } from "react";
import { IncomeItem, IncomeFrequency } from "../types";
import { IncomeRow } from "../components/IncomeRow";

/* -----------------------------
   Helpers (robust + defensive)
------------------------------ */

function annualMultiplier(freq: IncomeFrequency) {
  switch (freq) {
    case "Daily":
      return 365;
    case "Weekly":
      return 52;
    case "Every 2 Weeks":
      return 26;
    case "Twice a Month":
      return 24;
    case "Monthly":
      return 12;
    case "Quarterly":
      return 4;
    case "Annually":
      return 1;
    default:
      return 0;
  }
}

/**
 * Amount is intentionally TEXT.
 * This function safely normalizes it.
 */
function parseAmount(value: unknown): number {
  if (typeof value === "number") return value;

  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 0 : n;
  }

  return 0;
}

/* -----------------------------
   Income Section
------------------------------ */

export function IncomeSection({
  items,
  setItems,
}: {
  items: IncomeItem[];
  setItems: (items: IncomeItem[]) => void;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const annualIncome = useMemo(() => {
    return items.reduce((sum, item) => {
      return (
        sum +
        parseAmount(item.amount) *
          annualMultiplier(item.frequency)
      );
    }, 0);
  }, [items]);

  function addItem() {
    setItems([
      ...items,
      {
        id: crypto.randomUUID(),
        source: "",
        frequency: "Monthly",
        nextDate: "",
        amount: "", // must remain string
      },
    ]);
  }

  function updateItem(index: number, updated: IncomeItem) {
    const copy = [...items];
    copy[index] = updated;
    setItems(copy);
  }

  function removeItem(index: number) {
    setItems(items.filter((_, i) => i !== index));
  }

  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 16,
        padding: 20,
        border: "1px solid rgba(54,101,107,0.15)",
      }}
    >
      {/* Header */}
      <h2 style={{ marginBottom: 4 }}>Income</h2>
      <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
        Add all income sources and how often you receive them.
        Annual income is calculated automatically.
      </p>

      {/* Column labels (responsive) */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop
            ? "1.4fr 1fr 1fr 1fr 40px"
            : "1.6fr 1fr 1fr 40px",
          gap: 8,
          fontSize: 12,
          opacity: 0.7,
          marginBottom: 6,
        }}
      >
        <div>Source</div>
        <div>Frequency</div>

        {isDesktop && <div>Next date</div>}

        <div style={{ textAlign: "right" }}>Amount</div>
        <div />
      </div>

      {/* Rows */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
        }}
      >
        {items.map((item, idx) => (
          <IncomeRow
            key={item.id}
            item={item}
            onChange={(updated) => updateItem(idx, updated)}
            onDelete={() => removeItem(idx)}
          />
        ))}
      </div>

      {/* Add row */}
      <button
        onClick={addItem}
        style={{
          marginTop: 16,
          width: "100%",
          padding: "10px 12px",
          borderRadius: 8,
          border: "1px dashed rgba(54,101,107,0.4)",
          background: "transparent",
          fontSize: 14,
          cursor: "pointer",
        }}
      >
        + Add income source
      </button>

      {/* Annual total */}
      <div
        style={{
          marginTop: 20,
          paddingTop: 16,
          borderTop: "1px solid rgba(54,101,107,0.2)",
          display: "flex",
          justifyContent: "space-between",
          fontSize: 16,
          fontWeight: 600,
        }}
      >
        <span>Total annual income</span>
        <span>${Math.round(annualIncome).toLocaleString()}</span>
      </div>
    </div>
  );
}
