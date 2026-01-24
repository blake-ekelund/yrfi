"use client";

import { useEffect, useState } from "react";

export function ResultsSummary({
  results,
  target,
}: {
  results: any[];
  target: number;
}) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!results.length) return null;

  const final = results[results.length - 1];

  return (
    <div
      style={{
        marginTop: 24,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        display: "grid",
        gridTemplateColumns: isDesktop
          ? "repeat(4, 1fr)"
          : "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      <Metric
        label="Years to target"
        value={final.year}
        format="years"
        highlight
      />
      <Metric
        label="Target amount"
        value={target}
        format="currency"
      />
      <Metric
        label="Total contributions"
        value={final.contributions}
        format="currency"
      />
      <Metric
        label="Interest earned"
        value={final.interestEarned}
        format="currency"
      />
    </div>
  );
}

/* -----------------------------
   Metric
------------------------------ */

function Metric({
  label,
  value,
  format,
  highlight,
}: {
  label: string;
  value: number;
  format: "currency" | "years";
  highlight?: boolean;
}) {
  const display =
    format === "currency"
      ? `$${Math.round(value).toLocaleString()}`
      : `${value.toFixed(1)} yrs`;

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
        {display}
      </div>
    </div>
  );
}
