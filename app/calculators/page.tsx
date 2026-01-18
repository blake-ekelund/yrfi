"use client";

import { motion } from "framer-motion";
import { TrendingUp, Layers } from "lucide-react";

export default function CalculatorsPage() {
  return (
    <>

      <main
        style={{
          minHeight: "100vh",
          padding: "60px 20px",
          color: "#36656B",
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          style={{ maxWidth: 1100, margin: "0 auto" }}
        >
          {/* HEADER */}
          <header style={{ marginBottom: 40 }}>
            <h1 style={{ marginBottom: 10 }}>Calculators</h1>
            <p style={{ maxWidth: 520 }}>
              Short, visual tools to understand how money actually behaves.
            </p>
          </header>

          {/* GRID */}
          <section
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
              gap: 22,
            }}
          >
            <CalculatorCard
              icon={<TrendingUp />}
              title="Compound Interest"
              description="Why time matters more than effort."
              href="/calculators/compound-interest"
            />

            <CalculatorCard
              icon={<Layers />}
              title="Debt Snowball"
              description="How momentum beats optimization."
              href="/calculators/debt-snowball"
              comingSoon
            />
          </section>
        </motion.div>
      </main>
    </>
  );
}

function CalculatorCard({
  icon,
  title,
  description,
  href,
  comingSoon,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  href: string;
  comingSoon?: boolean;
}) {
  return (
    <motion.a
      href={comingSoon ? undefined : href}
      whileHover={{ scale: comingSoon ? 1 : 1.03 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      style={{
        textDecoration: "none",
        color: "#36656B",
        background: "#F0F8A4",
        borderRadius: 16,
        padding: 24,
        boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
        cursor: comingSoon ? "default" : "pointer",
        opacity: comingSoon ? 0.6 : 1,
        position: "relative",
      }}
    >
      <div style={{ color: "#75B06F", marginBottom: 12 }}>{icon}</div>

      <h3 style={{ margin: "6px 0" }}>{title}</h3>

      <p style={{ margin: 0, opacity: 0.85 }}>{description}</p>

      {comingSoon && (
        <div
          style={{
            position: "absolute",
            top: 14,
            right: 14,
            fontSize: 12,
            background: "#36656B",
            color: "#F0F8A4",
            padding: "4px 8px",
            borderRadius: 999,
          }}
        >
          Coming soon
        </div>
      )}
    </motion.a>
  );
}
