"use client";

import { useMemo } from "react";
import { calculateYearsToTarget } from "./math";

function roundToNearest10(n: number) {
  return Math.round(n / 10) * 10;
}

export function TargetReachMatrixMobile({
  target,
  current,
  contribution,
  returnRate,
}: any) {
  /* ----------------------------
     Memoized scenarios
  ----------------------------- */

  const contributionScenarios = useMemo(() => {
    return [
      roundToNearest10(contribution * 0.75),
      roundToNearest10(contribution * 0.9),
      roundToNearest10(contribution),
      roundToNearest10(contribution * 1.1),
      roundToNearest10(contribution * 1.25),
    ];
  }, [contribution]);

  const rateScenarios = useMemo(() => {
    return [
      returnRate - 0.01,
      returnRate,
      returnRate + 0.01,
    ].filter((r) => r > 0);
  }, [returnRate]);

  return (
    <div style={{ marginTop: 32 }}>
      <div
        style={{
          background: "#ffffff",
          borderRadius: 16,
          border: "1px solid rgba(54,101,107,0.15)",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "14px 16px",
            background: "rgba(117,176,111,0.12)",
            borderBottom: "1px solid rgba(54,101,107,0.15)",
            fontWeight: 500,
          }}
        >
          Years to Target — Sensitivity
        </div>

        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            fontSize: 14,
          }}
        >
          <thead>
            <tr
              style={{
                background: "#FAFCFD",
                borderBottom:
                  "1px solid rgba(54,101,107,0.15)",
              }}
            >
              <th style={thLeft}>Monthly</th>
              {rateScenarios.map((r, colIdx) => (
                <th key={colIdx} style={thRight}>
                  {(r * 100).toFixed(0)}%
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {contributionScenarios.map((c, rowIdx) => (
              <tr
                key={rowIdx}
                style={{
                  background:
                    rowIdx % 2 === 0 ? "#ffffff" : "#FAFCFD",
                }}
              >
                {/* First column */}
                <td
                  style={{
                    ...tdLeft,
                    background: "rgba(54,101,107,0.04)",
                    fontWeight: 500,
                    borderRight:
                      "1px solid rgba(54,101,107,0.12)",
                  }}
                >
                  ${c.toLocaleString()}
                </td>

                {rateScenarios.map((r, colIdx) => {
                  const res = calculateYearsToTarget({
                    targetAmount: target,
                    startingAmount: current,
                    monthlyContribution: c,
                    annualReturnRate: r,
                  });

                  return (
                    <td
                      key={colIdx}
                      style={{
                        ...tdRight,
                        borderBottom:
                          "1px solid rgba(54,101,107,0.08)",
                      }}
                    >
                      {res[res.length - 1].year} yrs
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* ----------------------------
   Styles
----------------------------- */

const thLeft = {
  padding: "10px 12px",
  textAlign: "left" as const,
  fontSize: 12,
  opacity: 0.7,
};

const thRight = {
  padding: "10px 12px",
  textAlign: "right" as const,
  fontSize: 12,
  opacity: 0.7,
};

const tdLeft = {
  padding: "12px",
  textAlign: "left" as const,
};

const tdRight = {
  padding: "12px",
  textAlign: "right" as const,
};
