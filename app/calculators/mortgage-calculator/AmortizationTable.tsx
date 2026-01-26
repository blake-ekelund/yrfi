"use client";

import { useState, useEffect } from "react";
import { formatCurrency } from "@/lib/formatters";

export function AmortizationTable({
  schedule,
}: {
  schedule: {
    month: number;
    principal: number;
    interest: number;
    balance: number;
  }[];
}) {
  const [open, setOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  if (!schedule.length) return null;

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
          Amortization Schedule
        </div>

        <div
          style={{
            fontSize: isDesktop ? 14 : 13,
            lineHeight: 1.5,
            opacity: 0.85,
            maxWidth: 680,
          }}
        >
          Monthly breakdown showing how each payment is split between principal
          and interest, and how your remaining balance declines over time.
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
              {schedule.map((r) => (
                <div
                  key={r.month}
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
                    Month {r.month}
                  </div>

                  <Row label="Principal" value={r.principal} />
                  <Row label="Interest" value={r.interest} />
                  <Row
                    label="Remaining balance"
                    value={r.balance}
                    strong
                  />
                </div>
              ))}
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
                    borderBottom:
                      "1px solid rgba(54,101,107,0.3)",
                  }}
                >
                  <th
                    style={{
                      padding: "10px 0",
                      textAlign: "left",
                    }}
                  >
                    Month
                  </th>
                  <th
                    style={{
                      padding: "10px 0",
                      textAlign: "right",
                    }}
                  >
                    Principal
                  </th>
                  <th
                    style={{
                      padding: "10px 0",
                      textAlign: "right",
                    }}
                  >
                    Interest
                  </th>
                  <th
                    style={{
                      padding: "10px 0",
                      textAlign: "right",
                    }}
                  >
                    Balance
                  </th>
                </tr>
              </thead>

              <tbody>
                {schedule.map((r, i) => (
                  <tr
                    key={r.month}
                    style={{
                      borderBottom:
                        "1px solid rgba(54,101,107,0.1)",
                      background:
                        i % 2 === 0 ? "#ffffff" : "#FAFCFD",
                    }}
                  >
                    <td style={{ padding: "8px 0" }}>
                      {r.month}
                    </td>

                    <td
                      style={{
                        padding: "8px 0",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(r.principal)}
                    </td>

                    <td
                      style={{
                        padding: "8px 0",
                        textAlign: "right",
                      }}
                    >
                      {formatCurrency(r.interest)}
                    </td>

                    <td
                      style={{
                        padding: "8px 0",
                        textAlign: "right",
                        fontWeight: 600,
                      }}
                    >
                      {formatCurrency(r.balance)}
                    </td>
                  </tr>
                ))}
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
      <span>{formatCurrency(value)}</span>
    </div>
  );
}
