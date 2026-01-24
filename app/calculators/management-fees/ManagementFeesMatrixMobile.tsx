"use client";

import { useMemo } from "react";
import { calculateManagementFeeDrag } from "./math";

export function ManagementFeesMatrixMobile({
  startingPortfolio,
  returnRate,
  baseFeeRate,
  years,
}: any) {
  const yearScenarios = useMemo(
    () =>
      [10, 20, years, years + 10, years + 20].filter(
        (y, i, a) => y > 0 && a.indexOf(y) === i
      ),
    [years]
  );

  const feeScenarios = useMemo(
    () =>
      [baseFeeRate - 0.0025, baseFeeRate, baseFeeRate + 0.0025].filter(
        (f) => f >= 0
      ),
    [baseFeeRate]
  );

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
        <div
          style={{
            padding: "16px 20px",
            background: "rgb(255, 255, 255)",
            borderBottom: "1px solid rgba(54,101,107,0.15)",
          }}
        >
          <strong>Wealth Lost to Fees Sensitivity Matrix</strong>
          <div style={{ fontSize: 13, opacity: 0.75 }}>
            # of Years in the market x Management Fee %
          </div>
        </div>

        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 14 }}>
          <thead>
            <tr style={{ background: "#FAFCFD" }}>
              <th style={thLeft}>Years</th>
              {feeScenarios.map((f, i) => (
                <th key={i} style={thRight}>
                  {(f * 100).toFixed(2)}%
                </th>
              ))}
            </tr>
          </thead>

          <tbody>
            {yearScenarios.map((y, rowIdx) => (
              <tr key={rowIdx}>
                <td style={tdLeft}>{y}</td>
                {feeScenarios.map((f, colIdx) => {
                  const res = calculateManagementFeeDrag({
                    startingPortfolio,
                    annualFeeRate: f,
                    annualReturnRate: returnRate,
                    years: y,
                  });
                  const last = res[res.length - 1];

                  return (
                    <td key={colIdx} style={tdRight}>
                      ${Math.round(last.opportunityCost).toLocaleString()}
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

const thLeft = { padding: "10px 12px", fontSize: 12, opacity: 0.7 };
const thRight = { padding: "10px 12px", textAlign: "right" as const, fontSize: 12, opacity: 0.7 };
const tdLeft = { padding: "12px", fontWeight: 500 };
const tdRight = { padding: "12px", textAlign: "right" as const };
