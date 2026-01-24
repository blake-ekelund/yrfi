"use client";

import { useMemo, useEffect, useState } from "react";
import {
  ExpenseItem,
  ExpenseFrequency,
} from "../types";
import { ExpenseRow } from "../components/ExpenseRow";

/* -----------------------------
   Helpers
------------------------------ */

function annualMultiplier(freq: ExpenseFrequency) {
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

function parseAmount(value: unknown): number {
  if (typeof value === "number") return value;
  if (typeof value === "string") {
    const n = Number(value.replace(/[^0-9.]/g, ""));
    return isNaN(n) ? 0 : n;
  }
  return 0;
}

/* -----------------------------
   Expenses Section
------------------------------ */

export function ExpensesSection({
  items,
  setItems,
}: {
  items: ExpenseItem[];
  setItems: (items: ExpenseItem[]) => void;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const annualExpenses = useMemo(() => {
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
        name: "",
        category: "Other",
        frequency: "Monthly",
        nextDate: "",
        amount: "",
      },
    ]);
  }

  function updateItem(index: number, updated: ExpenseItem) {
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
      <h2 style={{ marginBottom: 4 }}>Expenses</h2>
      <p style={{ fontSize: 14, opacity: 0.75, marginBottom: 16 }}>
        Add your recurring expenses. Annual expenses are calculated
        automatically.
      </p>

      {/* Column labels */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: isDesktop
            ? "1.4fr 1fr 1fr 1fr 1fr 40px"
            : "1.6fr 1fr 1fr 40px",
          gap: 8,
          fontSize: 12,
          opacity: 0.7,
          marginBottom: 6,
        }}
      >
        <div>Expense</div>
        <div>Category</div>
        <div>Frequency</div>

        {isDesktop && <div>Next date</div>}

        <div style={{ textAlign: "right" }}>Amount</div>
        <div />
      </div>

      {/* Rows */}
      <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
        {items.map((item, idx) => (
          <ExpenseRow
            key={item.id}
            item={item}
            onChange={(updated) => updateItem(idx, updated)}
            onDelete={() => removeItem(idx)}
          />
        ))}
      </div>

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
        + Add expense
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
        <span>Total annual expenses</span>
        <span>${Math.round(annualExpenses).toLocaleString()}</span>
      </div>
    </div>
  );
}
