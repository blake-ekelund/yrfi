"use client";

import { useEffect, useState } from "react";
import { formatCurrencyInput, formatPercentInput } from "@/lib/formatters";

export function InputsPanel({
  annualSpending,
  setAnnualSpending,
  withdrawalRate,
  setWithdrawalRate,
}: any) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const labelSize = isDesktop ? 14 : 12;
  const inputPadding = isDesktop ? "10px 12px" : "8px 10px";
  const inputFontSize = isDesktop ? 16 : 14;
  const gap = isDesktop ? 20 : 12;

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
        gap,
      }}
    >
      <Input
        label="Annual spending"
        help="How much you expect to spend per year in retirement, including housing, healthcare, taxes, and lifestyle expenses. Typical range: $40,000–$100,000+."
        value={annualSpending}
        onChange={setAnnualSpending}
        placeholder="60,000"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Withdrawal rate (%)"
        help="The percentage of your portfolio you plan to withdraw each year. A 4% rate is a commonly cited baseline from historical studies. Higher rates reduce the required portfolio but increase long-term risk."
        value={withdrawalRate}
        onChange={setWithdrawalRate}
        placeholder="4.00"
        formatter={formatPercentInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      {/* Spacer cells to preserve 2×2 rhythm on desktop */}
      {isDesktop && <div />}
      {isDesktop && <div />}
    </div>
  );
}

function Input({
  label,
  help,
  value,
  onChange,
  placeholder,
  formatter,
  labelSize,
  padding,
  fontSize,
}: any) {
  const [open, setOpen] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      {/* Label + info */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          fontSize: labelSize,
          opacity: 0.85,
        }}
      >
        <span>{label}</span>

        <button
          type="button"
          aria-label={`Info about ${label}`}
          onClick={() => setOpen(!open)}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
          style={{
            width: 16,
            height: 16,
            borderRadius: "50%",
            border: "1px solid rgba(54,101,107,0.4)",
            background: "transparent",
            fontSize: 11,
            lineHeight: "14px",
            textAlign: "center",
            cursor: "pointer",
            color: "#36656B",
            padding: 0,
          }}
        >
          i
        </button>
      </div>

      {/* Tooltip */}
      {open && (
        <div
          style={{
            position: "absolute",
            top: "100%",
            left: 0,
            marginTop: 6,
            background: "#ffffff",
            border: "1px solid rgba(54,101,107,0.2)",
            borderRadius: 8,
            padding: 10,
            fontSize: 12,
            lineHeight: 1.4,
            color: "#36656B",
            zIndex: 10,
            maxWidth: 260,
            boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
          }}
        >
          {help}
        </div>
      )}

      <input
        type="text"
        value={value}
        onChange={(e) => onChange(formatter(e.target.value))}
        placeholder={placeholder}
        style={{
          marginTop: 6,
          padding,
          borderRadius: 8,
          border: "none",
          fontSize,
          background: "#fff",
          color: "#36656B",
          width: "100%",
          boxSizing: "border-box",
        }}
      />
    </div>
  );
}
