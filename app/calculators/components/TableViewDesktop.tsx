"use client";

import type { Calculator } from "../components/types";

export function TableViewDesktop({
  calculators,
}: {
  calculators: Calculator[];
}) {
  return (
    <div
      style={{
        marginTop: 28,
        background: "#ffffff",
        borderRadius: 16,
        border: "1px solid rgba(54,101,107,0.15)",
        overflow: "hidden",
      }}
    >
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
              borderBottom: "1px solid rgba(54,101,107,0.2)",
            }}
          >
            <th style={thLeft}>Calculator</th>
            <th style={thLeft}>What it shows</th>
            <th style={thLeft}>Category</th>
            <th style={{ ...thLeft, textAlign: "right" }}>
              Status
            </th>
          </tr>
        </thead>

        <tbody>
          {calculators.map((c, i) => {
            const disabled = c.comingSoon;

            return (
              <tr
                key={c.title}
                onClick={() => {
                  if (!disabled)
                    window.location.href = c.href;
                }}
                style={{
                  background:
                    i % 2 === 0 ? "#ffffff" : "#FAFCFD",
                  cursor: disabled
                    ? "default"
                    : "pointer",
                  opacity: disabled ? 0.55 : 1,
                }}
              >
                <td style={tdLeft}>
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 10,
                      fontWeight: 500,
                    }}
                  >
                    <span style={{ color: "#75B06F" }}>
                      {c.icon}
                    </span>
                    {c.title}
                  </div>
                </td>

                <td style={tdLeft}>{c.description}</td>

                <td style={tdLeft}>
                  {c.tags.map((tag) => (
                    <span
                      key={tag}
                      style={{
                        display: "inline-block",
                        marginRight: 6,
                        marginBottom: 4,
                        padding: "4px 8px",
                        fontSize: 11,
                        borderRadius: 999,
                        background:
                          "rgba(54,101,107,0.1)",
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </td>

                <td
                  style={{
                    ...tdLeft,
                    textAlign: "right",
                  }}
                >
                  {disabled ? (
                    <span
                      style={{
                        fontSize: 12,
                        padding: "4px 10px",
                        borderRadius: 999,
                        background: "#36656B",
                        color: "#F0F8A4",
                      }}
                    >
                      Coming soon
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        opacity: 0.6,
                      }}
                    >
                      Open →
                    </span>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

/* ---------- styles ---------- */

const thLeft = {
  textAlign: "left" as const,
  padding: "12px 16px",
  fontSize: 12,
  opacity: 0.7,
};

const tdLeft = {
  padding: "12px 16px",
};
