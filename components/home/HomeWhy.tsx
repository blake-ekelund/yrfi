"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function HomeWhy() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
      style={{
        maxWidth: 720,
        overflowX: "hidden",
      }}
    >
      <h2 style={{ marginBottom: 16 }}>Why we do it</h2>

      <p style={{ lineHeight: 1.6 }}>
        Money feels scary when it’s unclear. Most people aren’t bad with finances
        — they’re navigating systems they don’t fully see.
      </p>

      <p style={{ lineHeight: 1.6, marginTop: 12 }}>
        Small, invisible decisions add up. A one-percent management fee. A
        product you don’t quite understand. Advice that’s technically “fine,” but
        never explained.
      </p>

      <p style={{ lineHeight: 1.6, marginTop: 12 }}>
        None of this means financial advisors are bad. Many are excellent. But
        even good advice can be expensive if you don’t understand what you’re
        paying for — or why.
      </p>

      <p style={{ lineHeight: 1.6, marginTop: 12 }}>
        We built yrfi to make the mechanics visible, so you can ask better
        questions, spot unnecessary costs, and avoid learning the hard way —
        years later, when the math finally becomes obvious.
      </p>

      {/* CTA */}
      <div style={{ marginTop: 24 }}>
        <Link
          href="/blog/the-hidden-cost-of-1-percent"
          style={{
            display: "inline-block",
            background: "#F0F8A4",
            color: "#36656B",
            padding: "12px 22px",
            borderRadius: 999,
            textDecoration: "none",
            fontSize: 15,
            fontWeight: 500,
          }}
        >
          See how management fees add up
        </Link>
      </div>
    </motion.section>
  );
}
