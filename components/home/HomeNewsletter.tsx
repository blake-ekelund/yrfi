"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export default function HomeNewsletter() {
  const [email, setEmail] = useState("");

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: 96,
        padding: "60px 20px",
        background: "#DAD887",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          textAlign: "center",
          color: "#36656B",
        }}
      >
        <h2 style={{ marginBottom: 12 }}>
          Keep the mechanics visible
        </h2>

        <p
          style={{
            maxWidth: 520,
            margin: "0 auto 28px",
            lineHeight: 1.6,
            fontSize: 16,
          }}
        >
          One clear financial idea per week.  
          No spam. No hot takes. Just the quiet costs and tradeoffs most people
          never see.
        </p>

        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            style={{
              padding: "12px 14px",
              borderRadius: 12,
              border: "none",
              fontSize: 16,
              minWidth: 220,
              maxWidth: "100%",
              boxSizing: "border-box",
              color: "#36656B",
            }}
          />

          <button
            type="submit"
            style={{
              background: "#F0F8A4",
              color: "#36656B",
              border: "none",
              borderRadius: 999,
              padding: "12px 22px",
              fontSize: 15,
              cursor: "pointer",
              fontWeight: 500,
            }}
          >
            Get the weekly breakdown
          </button>
        </form>
      </div>
    </motion.section>
  );
}
