"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function HomeNewsletter() {
  const [email, setEmail] = useState("");
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{
        marginTop: 96,
        padding: "0 20px",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "#FFFFFF",
          borderRadius: 16,
          padding: "40px 24px",
          boxSizing: "border-box",
          color: "#36656B",
          boxShadow: "0 8px 24px rgba(0,0,0,0.06)",
          textAlign: isDesktop ? "center" : "left",
        }}
      >
        {/* COPY */}
        <h2 style={{ marginBottom: 12 }}>
          Keep the mechanics visible
        </h2>

        <p
          style={{
            maxWidth: isDesktop ? 520 : "100%",
            margin: isDesktop ? "0 auto 28px" : "0 0 28px",
            lineHeight: 1.6,
            fontSize: 16,
          }}
        >
          One clear financial idea per week. No spam. No hot takes.
          Just the quiet costs and tradeoffs most people never see.
        </p>

        {/* FORM */}
        <form
          onSubmit={(e) => e.preventDefault()}
          style={{
            display: "flex",
            flexDirection: isDesktop ? "row" : "column",
            alignItems: isDesktop ? "center" : "stretch",
            justifyContent: isDesktop ? "center" : "flex-start",
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
              border: "1px solid #E5E5E5",
              fontSize: 16,
              color: "#36656B",
              boxSizing: "border-box",
              width: isDesktop ? 240 : "100%",
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
              width: isDesktop ? "auto" : "fit-content",
            }}
          >
            Get the weekly breakdown
          </button>
        </form>
      </div>
    </motion.section>
  );
}
