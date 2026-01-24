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
              borderBottom:
                "1px solid rgba(54,101,107,0.2)",
            }}
          >
            <th style={thLeft}>Calculator</th>
            <th style={thLeft}>Description</th>
            <th style={thLeft}>Category</th>
          </tr>
        </thead>

        <tbody>
          {calculators.map((c, i) => (
            <tr
              key={c.title}
              style={{
                background:
                  i % 2 === 0 ? "#ffffff" : "#FAFCFD",
                opacity: c.comingSoon ? 0.6 : 1,
                cursor: c.comingSoon
                  ? "default"
                  : "pointer",
              }}
              onClick={() => {
                if (!c.comingSoon)
                  window.location.href = c.href;
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
                {c.tags.join(", ")}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* styles */
const thLeft = {
  textAlign: "left" as const,
  padding: "12px 16px",
  fontSize: 12,
  opacity: 0.7,
};

const tdLeft = {
  padding: "12px 16px",
};
