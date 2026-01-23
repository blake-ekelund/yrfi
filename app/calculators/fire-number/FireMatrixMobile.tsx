"use client";

import { calculateFireNumber } from "./math";

export function FireMatrixMobile({
  annualSpending,
  withdrawalRate,
}: {
  annualSpending: number;
  withdrawalRate: number;
}) {
  const scenarios = [
    annualSpending - 20000,
    annualSpending - 10000,
    annualSpending,
    annualSpending + 10000,
    annualSpending + 20000,
  ].filter((v) => v > 0);

  return (
    <div style={{ marginTop: 32 }}>
      {/* Card */}
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
          }}
        >
          <div style={{ fontSize: 15, fontWeight: 500 }}>
            FIRE Scenarios
          </div>
          <div
            style={{
              fontSize: 12,
              opacity: 0.75,
              marginTop: 2,
            }}
          >
            Withdrawal rate: {(withdrawalRate * 100).toFixed(1)}%
          </div>
        </div>

        {/* Table */}
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
                borderBottom: "1px solid rgba(54,101,107,0.15)",
              }}
            >
              <th
                style={{
                  textAlign: "left",
                  padding: "10px 16px",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  opacity: 0.7,
                }}
              >
                Annual Spending
              </th>
              <th
                style={{
                  textAlign: "right",
                  padding: "10px 16px",
                  fontWeight: 500,
                  fontSize: 12,
                  letterSpacing: "0.02em",
                  opacity: 0.7,
                }}
              >
                FIRE Number
              </th>
            </tr>
          </thead>

          <tbody>
            {scenarios.map((spend, i) => {
              const fire = calculateFireNumber({
                annualSpending: spend,
                withdrawalRate,
              });

              const isBase = spend === annualSpending;

              return (
                <tr
                  key={spend}
                  style={{
                    background: isBase
                      ? "rgba(117,176,111,0.08)"
                      : i % 2 === 0
                      ? "#ffffff"
                      : "#FAFCFD",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight: isBase ? 600 : 400,
                    }}
                  >
                    ${spend.toLocaleString()}
                  </td>
                  <td
                    style={{
                      padding: "14px 16px",
                      textAlign: "right",
                      fontWeight: isBase ? 600 : 500,
                    }}
                  >
                    ${Math.round(fire).toLocaleString()}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Footnote */}
      <div
        style={{
          fontSize: 12,
          opacity: 0.7,
          marginTop: 8,
          lineHeight: 1.4,
        }}
      >
        Assumes a constant withdrawal rate. Lower spending materially reduces
        required portfolio size.
      </div>
    </div>
  );
}
