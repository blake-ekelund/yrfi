"use client";

import { motion } from "framer-motion";
import FireExample from "./FireExample";

export default function HomeWhatWeDo() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      style={{ marginBottom: 80, overflowX: "hidden" }}
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
        For example:
      </p>

      <FireExample />
    </motion.section>
  );
}
