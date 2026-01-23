"use client";

import { useEffect, useState } from "react";
import { formatCurrencyInput, formatPercentInput } from "@/lib/formatters";

export function InputsPanel({
  startingPortfolio,
  setStartingPortfolio,
  monthlyContribution,
  setMonthlyContribution,
  years,
  setYears,
  returnRate,
  setReturnRate,
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
        label="Starting portfolio"
        help="The amount you already have invested today. If you are just starting out, this can be $0. Typical range: $0-$500,000+."
        value={startingPortfolio}
        onChange={setStartingPortfolio}
        placeholder="25,000"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Monthly contribution"
        help="How much you plan to add every month. Consistency matters more than size. Typical range: $100-$2,500 per month."
        value={monthlyContribution}
        onChange={setMonthlyContribution}
        placeholder="250"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Time horizon (years)"
        help="How long you plan to keep investing before using the money. Longer time horizons benefit more from compounding. Typical range: 20-40 years."
        value={years}
        onChange={setYears}
        placeholder="40"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Annual return rate (%)"
        help="Your expected average annual return. This is an estimate, not a guarantee. A common long-term assumption for diversified stock portfolios is 6-10%."
        value={returnRate}
        onChange={setReturnRate}
        placeholder="8.00"
        formatter={formatPercentInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />
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
