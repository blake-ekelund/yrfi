"use client";

import { useState, useEffect } from "react";

export function GrowthTable({ results }: { results: any[] }) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!results.length) return null;

  return (
    <div
      style={{
        marginTop: 40,
        background: "#ffffff",
        borderRadius: 16,
        padding: isDesktop ? 28 : 16,
        border: "1px solid rgba(54,101,107,0.15)",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 12 }}>
        <div
          style={{
            fontSize: isDesktop ? 17 : 15,
            fontWeight: 500,
            marginBottom: 6,
          }}
        >
          Year-by-Year Breakdown
        </div>

        <div
          style={{
            fontSize: isDesktop ? 14 : 13,
            lineHeight: 1.5,
            opacity: 0.85,
            maxWidth: 680,
          }}
        >
          Detailed annual view showing how contributions and growth affect your
          portfolio each year. Values below are annual, not cumulative.
        </div>
      </div>

      {/* Toggle */}
      <button
        onClick={() => setOpen(!open)}
        aria-expanded={open}
        style={{
          background: "none",
          border: "none",
          padding: 0,
          fontSize: isDesktop ? 14 : 13,
          fontWeight: 500,
          color: "#36656B",
          cursor: "pointer",
        }}
      >
        {open ? "▼ Hide details" : "▶ Show details"}
      </button>

      {!open ? null : (
        <div style={{ marginTop: 20 }}>
          {/* ---------------- MOBILE ---------------- */}
          {!isDesktop && (
            <div style={{ display: "grid", gap: 12 }}>
              {results.map((r, i) => {
                const prev = results[i - 1];

                const contribution = prev
                  ? r.contributions - prev.contributions
                  : r.contributions;

                const interest = prev
                  ? r.interestEarned - prev.interestEarned
                  : r.interestEarned;

                return (
                  <div
                    key={r.year}
                    style={{
                      borderRadius: 12,
                      padding: 12,
                      background: "#F7FAFB",
                      border: "1px solid rgba(54,101,107,0.12)",
                    }}
                  >
                    <div
                      style={{
                        fontSize: 13,
                        fontWeight: 500,
                        marginBottom: 8,
                      }}
                    >
                      Year {r.year}
                    </div>

                    <Row label="Starting" value={r.startingValue} />
                    <Row label="Contribution" value={contribution} />
                    <Row label="Interest" value={interest} />
                    <Row
                      label="Ending"
                      value={r.endingValue}
                      strong
                    />
                  </div>
                );
              })}
            </div>
          )}

          {/* ---------------- DESKTOP ---------------- */}
          {isDesktop && (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: 14,
                marginTop: 8,
              }}
            >
              <thead>
                <tr
                  style={{
                    borderBottom: "1px solid rgba(54,101,107,0.3)",
                  }}
                >
                  <th style={{ padding: "10px 0", textAlign: "left" }}>
                    Year
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "right" }}>
                    Starting
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "right" }}>
                    Contribution
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "right" }}>
                    Interest
                  </th>
                  <th style={{ padding: "10px 0", textAlign: "right" }}>
                    Ending
                  </th>
                </tr>
              </thead>

              <tbody>
                {results.map((r, i) => {
                  const prev = results[i - 1];

                  const contribution = prev
                    ? r.contributions - prev.contributions
                    : r.contributions;

                  const interest = prev
                    ? r.interestEarned - prev.interestEarned
                    : r.interestEarned;

                  return (
                    <tr
                      key={r.year}
                      style={{
                        borderBottom:
                          "1px solid rgba(54,101,107,0.1)",
                        background:
                          i % 2 === 0 ? "#ffffff" : "#FAFCFD",
                      }}
                    >
                      <td style={{ padding: "8px 0" }}>{r.year}</td>

                      <td
                        style={{
                          padding: "8px 0",
                          textAlign: "right",
                        }}
                      >
                        ${Math.round(r.startingValue).toLocaleString()}
                      </td>

                      <td
                        style={{
                          padding: "8px 0",
                          textAlign: "right",
                        }}
                      >
                        ${Math.round(contribution).toLocaleString()}
                      </td>

                      <td
                        style={{
                          padding: "8px 0",
                          textAlign: "right",
                        }}
                      >
                        ${Math.round(interest).toLocaleString()}
                      </td>

                      <td
                        style={{
                          padding: "8px 0",
                          textAlign: "right",
                          fontWeight: 600,
                        }}
                      >
                        ${Math.round(r.endingValue).toLocaleString()}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      )}
    </div>
  );
}

/* ---------- Shared row for mobile ---------- */

function Row({
  label,
  value,
  strong,
}: {
  label: string;
  value: number;
  strong?: boolean;
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        fontSize: 13,
        marginBottom: 4,
        fontWeight: strong ? 500 : 400,
      }}
    >
      <span style={{ opacity: 0.75 }}>{label}</span>
      <span>${Math.round(value).toLocaleString()}</span>
    </div>
  );
}
