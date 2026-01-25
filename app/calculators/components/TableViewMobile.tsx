"use client";

import type { Calculator } from "../components/types";

export function TableViewMobile({
  calculators,
}: {
  calculators: Calculator[];
}) {
  return (
    <div
      style={{
        marginTop: 20,
        background: "#ffffff",
        border: "1px solid rgba(54,101,107,0.15)",
        borderRadius: 12,
        overflowX: "auto",
      }}
    >
      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          fontSize: 13,
        }}
      >
        <thead>
          <tr
            style={{
              background: "#FAFCFD",
              borderBottom: "1px solid rgba(54,101,107,0.2)",
            }}
          >
            <th style={th}>Calculator</th>
            <th style={th}>Category</th>
            <th style={{ ...th, textAlign: "right" }}>
              Action
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
                {/* Calculator */}
                <td style={td}>
                  <div
                    style={{
                      fontWeight: 600,
                      marginBottom: 2,
                    }}
                  >
                    {c.title}
                  </div>
                  <div
                    style={{
                      fontSize: 12,
                      opacity: 0.8,
                    }}
                  >
                    {c.description}
                  </div>
                </td>

                {/* Category */}
                <td style={td}>
                  {c.tags.join(", ")}
                </td>

                {/* Status */}
                <td
                  style={{
                    ...td,
                    textAlign: "right",
                    whiteSpace: "nowrap",
                  }}
                >
                  {disabled ? (
                    <span
                      style={{
                        fontSize: 11,
                        padding: "4px 8px",
                        borderRadius: 999,
                        background: "#36656B",
                        color: "#F0F8A4",
                      }}
                    >
                      Soon
                    </span>
                  ) : (
                    <span
                      style={{
                        fontSize: 12,
                        opacity: 0.6,
                      }}
                    >
                      Open
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

const th = {
  textAlign: "left" as const,
  padding: "10px 12px",
  fontSize: 11,
  opacity: 0.7,
};

const td = {
  padding: "10px 12px",
  verticalAlign: "top" as const,
};
