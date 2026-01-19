"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import FireExample from "./FireExample";

export default function HomeWhatWeDo() {
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
      style={{ marginBottom: 80 }}
    >
      <h2 style={{ marginBottom: 16 }}>What we do</h2>

      <p
        style={{
          maxWidth: 560,
          marginBottom: 32,
          lineHeight: 1.6,
        }}
      >
        We turn abstract financial ideas into something you can see and test.
        Try the FIRE Calculator below:
      </p>

      {/* LAYOUT */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 40,
          alignItems: "flex-start",
        }}
      >
        {/* LEFT: CALCULATOR */}
        <div
          style={{
            flex: "1 1 320px",
            maxWidth: 520,
          }}
        >
          <FireExample />
        </div>

        {/* RIGHT: CONTEXT (DESKTOP ONLY) */}
        {isDesktop && (
          <div
            style={{
              flex: "1 1 280px",
              maxWidth: 420,
              color: "#36656B",
            }}
          >
            <p style={{ lineHeight: 1.6, marginBottom: 16 }}>
              For many retired couples in the U.S., annual spending often falls
              somewhere between <strong>$55,000 and $75,000</strong>, depending
              on housing, healthcare, and lifestyle.
            </p>

            <p style={{ lineHeight: 1.6, marginBottom: 16 }}>
              A <strong>withdrawal rate</strong> is an estimate of how much of
              an investment portfolio can be spent each year while still aiming
              to last decades. A commonly cited reference point is around{" "}
              <strong>4%</strong>.
            </p>

            <p style={{ lineHeight: 1.6 }}>
              None of these numbers are rules. They’re lenses — ways to make the
              idea of financial independence tangible enough to reason about.
            </p>
          </div>
        )}
      </div>
    </motion.section>
  );
}
