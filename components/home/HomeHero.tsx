"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeHero() {
  return (
    <div
      style={{
        background: "#DAD887",
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "80px 20px",
          color: "#36656B",
          boxSizing: "border-box",
        }}
      >
        <h1 style={{ fontSize: 42, marginBottom: 16 }}>
          Your Financial Independence
        </h1>

        <p
          style={{
            fontSize: 18,
            maxWidth: 560,
            lineHeight: 1.6,
            marginBottom: 28,
          }}
        >
          Simple, visual tools that make personal finance understandable —
          without pressure or advice.
        </p>

        <Link
          href="/calculators"
          style={{
            display: "inline-block",
            background: "#F0F8A4",
            color: "#36656B",
            padding: "14px 26px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 16,
            fontWeight: 500,
          }}
        >
          Explore calculators
        </Link>
      </motion.section>
    </div>
  );
}
