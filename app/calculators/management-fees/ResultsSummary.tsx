"use client";

import { useEffect, useState } from "react";

export function ResultsSummary({ results }: { results: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!results.length) return null;
  const last = results[results.length - 1];

  return (
    <div
      style={{
        marginTop: 32,
        paddingTop: 16,
        borderTop: "1px solid rgba(54,101,107,0.25)",
        display: "grid",
        gridTemplateColumns: isDesktop
          ? "repeat(4, 1fr)"
          : "repeat(2, 1fr)",
        gap: 16,
      }}
    >
      <Metric label="Ending value (no fees)" value={last.withoutFees} />
      <Metric label="Ending value (with fees)" value={last.withFees} />
      <Metric label="Fees paid" value={last.feesPaid} />
      <Metric
        label="Wealth lost to fees"
        value={last.opportunityCost}
        highlight
      />
    </div>
  );
}

function Metric({ label, value, highlight }: any) {
  return (
    <div>
      <div style={{ fontSize: 13, opacity: 0.7 }}>{label}</div>
      <div
        style={{
          fontSize: highlight ? 22 : 18,
          fontWeight: highlight ? 600 : 400,
          color: highlight ? "#C94C4C" : "inherit",
        }}
      >
        ${Math.round(value).toLocaleString()}
      </div>
    </div>
  );
}
