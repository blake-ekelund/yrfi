"use client";

import { formatCurrencyInput, formatPercentInput } from "@/lib/formatters";

export function InputsPanel({
  annualSpending,
  setAnnualSpending,
  withdrawalRate,
  setWithdrawalRate,
}: any) {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap: 16,
        color: "#36656B",
      }}
    >
      <Input
        label="Annual spending"
        value={annualSpending}
        onChange={setAnnualSpending}
        placeholder="60,000"
        formatter={formatCurrencyInput}
      />

      <Input
        label="Withdrawal rate (%)"
        value={withdrawalRate}
        onChange={setWithdrawalRate}
        placeholder="4.00"
        formatter={formatPercentInput}
      />
    </div>
  );
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  formatter,
}: any) {
  return (
    <div style={{ minWidth: 0 }}>
      <label
        style={{
          fontSize: 13,
          opacity: 0.8,
          display: "block",
          marginBottom: 4,
        }}
      >
        {label}
      </label>

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(formatter(e.target.value))}
        placeholder={placeholder}
        style={{
          padding: "10px 12px",
          width: "100%",
          borderRadius: 8,
          border: "none",
          boxSizing: "border-box",
          background: "#fff",
          color: "#36656B",
          fontSize: 16,
        }}
      />
    </div>
  );
}
