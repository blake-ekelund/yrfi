"use client";

import { calculateFireNumber } from "./math";

export function FireMatrixDesktop({
  annualSpending,
  withdrawalRate,
}: {
  annualSpending: number;
  withdrawalRate: number;
}) {
  const spendingScenarios = [
    annualSpending - 20000,
    annualSpending - 10000,
    annualSpending,
    annualSpending + 10000,
    annualSpending + 20000,
  ].filter((v) => v > 0);

  const withdrawalScenarios = [
    withdrawalRate - 0.01,
    withdrawalRate - 0.005,
    withdrawalRate,
    withdrawalRate + 0.005,
    withdrawalRate + 0.01,
  ].filter((v) => v > 0);

  return (
    <div style={{ marginTop: 40 }}>
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
            padding: "16px 20px",
            background: "rgba(117,176,111,0.12)",
            borderBottom: "1px solid rgba(54,101,107,0.15)",
          }}
        >
          <div style={{ fontSize: 17, fontWeight: 500 }}>
            FIRE Decision Matrix
          </div>
          <div
            style={{
              fontSize: 13,
              opacity: 0.75,
              marginTop: 4,
              maxWidth: 820,
            }}
          >
            Rows vary annual spending. Columns vary withdrawal rate assumptions.
            Each cell shows the portfolio required to sustain that combination.
          </div>
        </div>

        {/* Matrix */}
        <div style={{ overflowX: "auto" }}>
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
                    padding: "12px 16px",
                    fontSize: 12,
                    letterSpacing: "0.02em",
                    opacity: 0.7,
                    verticalAlign: "bottom",
                  }}
                >
                  Annual Spending →
                </th>

                {withdrawalScenarios.map((rate) => (
                  <th
                    key={rate}
                    style={{
                      textAlign: "right",
                      padding: "12px 16px",
                      fontSize: 12,
                      letterSpacing: "0.02em",
                      opacity: rate === withdrawalRate ? 1 : 0.7,
                      fontWeight: rate === withdrawalRate ? 600 : 500,
                    }}
                  >
                    {(rate * 100).toFixed(1)}%
                  </th>
                ))}
              </tr>
            </thead>

            <tbody>
              {spendingScenarios.map((spend, rowIdx) => (
                <tr
                  key={spend}
                  style={{
                    background:
                      spend === annualSpending
                        ? "rgba(117,176,111,0.06)"
                        : rowIdx % 2 === 0
                        ? "#ffffff"
                        : "#FAFCFD",
                  }}
                >
                  <td
                    style={{
                      padding: "14px 16px",
                      fontWeight:
                        spend === annualSpending ? 600 : 500,
                      borderRight:
                        "1px solid rgba(54,101,107,0.12)",
                    }}
                  >
                    ${spend.toLocaleString()}
                  </td>

                  {withdrawalScenarios.map((rate) => {
                    const fire = calculateFireNumber({
                      annualSpending: spend,
                      withdrawalRate: rate,
                    });

                    const isCurrent =
                      spend === annualSpending &&
                      rate === withdrawalRate;

                    return (
                      <td
                        key={rate}
                        style={{
                          padding: "14px 16px",
                          textAlign: "right",
                          fontWeight: isCurrent ? 600 : 500,
                          background: isCurrent
                            ? "rgba(117,176,111,0.12)"
                            : undefined,
                        }}
                      >
                        ${Math.round(fire).toLocaleString()}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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
        Lower withdrawal rates require more capital but historically reduce
        failure risk. Rates above 4% increase sensitivity to market downturns
        (Trinity Study).
      </div>
    </div>
  );
}
