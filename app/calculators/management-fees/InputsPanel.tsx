"use client";

import { useEffect, useState } from "react";
import { formatCurrencyInput, formatPercentInput } from "@/lib/formatters";

export function InputsPanel({
  startingPortfolio,
  setStartingPortfolio,
  feeRate,
  setFeeRate,
  returnRate,
  setReturnRate,
  years,
  setYears,
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
        gridTemplateColumns: "repeat(2, minmax(0, 1fr))", // 🔒 fixed 2x2
        gap,
      }}
    >
      <Input
        label="Starting portfolio"
        value={startingPortfolio}
        onChange={setStartingPortfolio}
        placeholder="100,000"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Annual management fee (%)"
        value={feeRate}
        onChange={setFeeRate}
        placeholder="1.00"
        formatter={formatPercentInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Expected annual return (%)"
        value={returnRate}
        onChange={setReturnRate}
        placeholder="8.00"
        formatter={formatPercentInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
      />

      <Input
        label="Time horizon (years)"
        value={years}
        onChange={setYears}
        placeholder="30"
        formatter={formatCurrencyInput}
        labelSize={labelSize}
        padding={inputPadding}
        fontSize={inputFontSize}
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
  labelSize,
  padding,
  fontSize,
}: any) {
  return (
    // 🔑 THIS is the fix
    <div style={{ minWidth: 0 }}>
      <label
        style={{
          fontSize: labelSize,
          opacity: 0.8,
          display: "block",
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
          marginTop: 4,
          padding,
          borderRadius: 8,
          border: "none",
          fontSize,
          background: "#fff",
          color: "#36656B",
          width: "100%",
          boxSizing: "border-box", // 🔑 also required
        }}
      />
    </div>
  );
}
