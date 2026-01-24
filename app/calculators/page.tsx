"use client";

import { useState, useMemo, useEffect } from "react";
import { motion, AnimatePresence  } from "framer-motion";
import {
  TrendingUp,
  Layers,
  Target,
  Banknote,
  Flame,
  LayoutGrid,
  Table as TableIcon,
} from "lucide-react";
import { CalculatorsFilters } from "./components/CalculatorsFilters";
import type { CalculatorTag } from "./components/types";

type Calculator = {
  title: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  tags: CalculatorTag[];
  comingSoon?: boolean;
};

const CALCULATORS: Calculator[] = [
  {
    icon: <TrendingUp />,
    title: "Compound Interest",
    description: "Why time matters more than effort.",
    href: "/calculators/compound-interest",
    tags: ["Investing", "Savings"],
  },
  {
    icon: <Flame />,
    title: "FIRE Number",
    description:
      "How much do you need to achieve financial independence?",
    href: "/calculators/fire-number",
    tags: ["Retirement", "Investing"],
  },
  {
    icon: <Target />,
    title: "Target Reach",
    description:
      "How long it may take to reach a savings or FIRE goal.",
    href: "/calculators/target-reach",
    tags: ["Savings", "Retirement"],
  },
  {
    icon: <Banknote />,
    title: "Management Fees",
    description:
      "How quickly and exponentially management fees can stack up.",
    href: "/calculators/management-fees",
    tags: ["Investing"],
  },
  {
    icon: <Layers />,
    title: "Debt Snowball",
    description: "How momentum beats optimization.",
    href: "/calculators/debt-snowball",
    tags: ["Debt"],
    comingSoon: true,
  },
  {
    icon: <Layers />,
    title: "Sequence of Returns",
    description:
      "Visualize the impact of different return scenarios in retirement.",
    href: "/calculators/sequence-of-returns",
    tags: ["Retirement", "Investing"],
    comingSoon: true,
  },
];

type ViewMode = "grid" | "table";

export default function CalculatorsPage() {
  const [search, setSearch] = useState("");
  const [activeTag, setActiveTag] = useState<CalculatorTag | null>(null);
  const [isDesktop, setIsDesktop] = useState(false);
  const [view, setView] = useState<ViewMode>("grid");

  /* ---------- responsive detection ---------- */
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  /* ---------- persist desktop preference ---------- */
  useEffect(() => {
    if (isDesktop) {
      const saved = localStorage.getItem(
        "calculators:view"
      ) as ViewMode | null;
      if (saved) setView(saved);
    }
  }, [isDesktop]);

  useEffect(() => {
    if (isDesktop) {
      localStorage.setItem("calculators:view", view);
    }
  }, [view, isDesktop]);

  const filteredCalculators = useMemo(() => {
    return CALCULATORS.filter((c) => {
      const matchesSearch =
        c.title
          .toLowerCase()
          .includes(search.toLowerCase()) ||
        c.description
          .toLowerCase()
          .includes(search.toLowerCase());

      const matchesTag = activeTag
        ? c.tags.includes(activeTag)
        : true;

      return matchesSearch && matchesTag;
    });
  }, [search, activeTag]);

  return (
    <main style={{ padding: "60px 20px", color: "#36656B" }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        style={{ maxWidth: 1100, margin: "0 auto" }}
      >
        {/* HEADER */}
        <header style={{ marginBottom: 28 }}>
          <h1 style={{ marginBottom: 10 }}>Calculators</h1>
          <p style={{ maxWidth: 520, opacity: 0.85 }}>
            Short, visual tools to understand how money
            actually behaves.
          </p>
        </header>

        {/* FILTERS + VIEW TOGGLE */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 16,
            flexWrap: "wrap",
          }}
        >
          <CalculatorsFilters
            search={search}
            setSearch={setSearch}
            activeTag={activeTag}
            setActiveTag={setActiveTag}
            view={view}
            setView={setView}
          />

          {/* Desktop-only view toggle */}
          {isDesktop && (
            <div
              style={{
                display: "flex",
                gap: 6,
                background: "#fff",
                border: "1px solid rgba(54,101,107,0.2)",
                borderRadius: 12,
                padding: 4,
              }}
            >
              <ToggleButton
                active={view === "grid"}
                onClick={() => setView("grid")}
                icon={<LayoutGrid size={16} />}
              />
              <ToggleButton
                active={view === "table"}
                onClick={() => setView("table")}
                icon={<TableIcon size={16} />}
              />
            </div>
          )}
        </div>

        {/* CONTENT */}
        <AnimatePresence mode="wait">
          {view === "grid" && (
            <motion.div
              key="grid"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <GridView calculators={filteredCalculators} />
            </motion.div>
          )}

          {view === "table" && (
            <motion.div
              key="table"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <TableView calculators={filteredCalculators} />
            </motion.div>
          )}
        </AnimatePresence>

        {filteredCalculators.length === 0 && (
          <div style={{ opacity: 0.6, marginTop: 20 }}>
            No calculators match your search.
          </div>
        )}
      </motion.div>
    </main>
  );
}

/* ================= Views ================= */

function GridView({
  calculators,
}: {
  calculators: Calculator[];
}) {
  return (
    <section
      style={{
        marginTop: 28,
        display: "grid",
        gridTemplateColumns:
          "repeat(auto-fit, minmax(260px, 1fr))",
        gap: 22,
      }}
    >
      {calculators.map((c) => (
        <CalculatorCard key={c.title} {...c} />
      ))}
    </section>
  );
}

function TableView({
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

/* ================= Components ================= */

function ToggleButton({
  active,
  onClick,
  icon,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      style={{
        border: "none",
        background: active ? "#36656B" : "transparent",
        color: active ? "#F0F8A4" : "#36656B",
        padding: "6px 10px",
        borderRadius: 8,
        cursor: "pointer",
      }}
    >
      {icon}
    </button>
  );
}

function CalculatorCard({
  icon,
  title,
  description,
  href,
  comingSoon,
}: Calculator) {
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
      <div style={{ color: "#75B06F", marginBottom: 12 }}>
        {icon}
      </div>

      <h3 style={{ margin: "6px 0" }}>{title}</h3>

      <p style={{ margin: 0, opacity: 0.85 }}>
        {description}
      </p>

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

/* ================= Styles ================= */

const thLeft = {
  textAlign: "left" as const,
  padding: "12px 16px",
  fontSize: 12,
  opacity: 0.7,
};

const tdLeft = {
  padding: "12px 16px",
};
