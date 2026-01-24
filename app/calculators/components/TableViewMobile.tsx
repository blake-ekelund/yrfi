"use client";

import { motion } from "framer-motion";
import type { Calculator } from "../components/types";

export function TableViewMobile({
  calculators,
}: {
  calculators: Calculator[];
}) {
  return (
    <div
      style={{
        marginTop: 24,
        display: "flex",
        flexDirection: "column",
        gap: 12,
      }}
    >
      {calculators.map((c) => (
        <motion.div
          key={c.title}
          onClick={() => {
            if (!c.comingSoon)
              window.location.href = c.href;
          }}
          whileTap={{ scale: c.comingSoon ? 1 : 0.98 }}
          style={{
            background: "#ffffff",
            borderRadius: 14,
            border: "1px solid rgba(54,101,107,0.15)",
            padding: 16,
            opacity: c.comingSoon ? 0.6 : 1,
            cursor: c.comingSoon
              ? "default"
              : "pointer",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontWeight: 600,
            }}
          >
            <span style={{ color: "#75B06F" }}>
              {c.icon}
            </span>
            {c.title}
          </div>

          <div
            style={{
              marginTop: 6,
              fontSize: 14,
              opacity: 0.8,
            }}
          >
            {c.description}
          </div>

          <div
            style={{
              marginTop: 8,
              fontSize: 12,
              opacity: 0.7,
            }}
          >
            {c.tags.join(" · ")}
          </div>

          {c.comingSoon && (
            <div
              style={{
                marginTop: 10,
                display: "inline-block",
                fontSize: 11,
                padding: "4px 8px",
                borderRadius: 999,
                background: "#36656B",
                color: "#F0F8A4",
              }}
            >
              Coming soon
            </div>
          )}
        </motion.div>
      ))}
    </div>
  );
}
