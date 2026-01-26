"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/formatters";

export function ResultsSummary({
  results,
}: {
  results: {
    loanAmount: number;
    monthlyPayment: number;
    totalInterest: number;
    schedule: any[];
  };
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!results) return null;

  const totalPaid =
    results.monthlyPayment * results.schedule.length;

  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        display: "grid",
        gridTemplateColumns: isDesktop
          ? "repeat(4, minmax(0, 1fr))" // 🖥 4 across
          : "50% 50%",                 // 📱 HARD 2×2
        columnGap: 16,
        rowGap: 16,
      }}
    >
      <Metric
        label="Loan amount"
        value={results.loanAmount}
      />

      <Metric
        label="Monthly payment"
        value={results.monthlyPayment}
        highlight
      />

      <Metric
        label="Total interest"
        value={results.totalInterest}
      />

      <Metric
        label="Total paid"
        value={totalPaid}
      />
    </div>
  );
}

function Metric({
  label,
  value,
  highlight,
}: {
  label: string;
  value: number;
  highlight?: boolean;
}) {
  return (
    <div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>
        {label}
      </div>
      <div
        style={{
          fontSize: highlight ? 22 : 18,
          fontWeight: highlight ? 600 : 400,
        }}
      >
        {formatCurrency(value)}
      </div>
    </div>
  );
}
