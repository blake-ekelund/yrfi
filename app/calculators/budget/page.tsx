"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Breadcrumbs from "../components/Breadcrumbs";
import CalculatorLinks from "../components/CalculatorLinks";

import { IncomeSection } from "./sections/IncomeSection";
import { ExpensesSection } from "./sections/ExpensesSection";

import type { IncomeItem, ExpenseItem } from "./types";

/* -----------------------------
   Types
------------------------------ */

type BudgetStep = "income" | "expenses" | "savings" | "results";

type BudgetState = {
  income: IncomeItem[];
  expenses: ExpenseItem[];
  savings: IncomeItem[]; // placeholder until SavingsItem exists
};

/* -----------------------------
   Page
------------------------------ */

export default function BudgetPage() {
  const [step, setStep] = useState<BudgetStep>("income");

  const [budget, setBudget] = useState<BudgetState>({
    income: [],
    expenses: [],
    savings: [],
  });

  const canGoNext =
    step === "income"
      ? budget.income.length > 0
      : step === "expenses"
      ? budget.expenses.length > 0
      : true;

  return (
    <main style={{ padding: "60px 20px", color: "#36656B" }}>
      <div style={{ maxWidth: 960, margin: "0 auto" }}>
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Budget" },
          ]}
        />

        <h1 style={{ marginBottom: 8 }}>Budget</h1>
        <p style={{ marginBottom: 32, maxWidth: 600 }}>
          Build a clear annual budget by stepping through income,
          expenses, savings, and results.
        </p>

        {/* -----------------------------
           Section content
        ------------------------------ */}

        <AnimatePresence mode="wait">
          {step === "income" && (
            <motion.div key="income" {...anim}>
              <IncomeSection
                items={budget.income}
                setItems={(items) =>
                  setBudget({ ...budget, income: items })
                }
              />
            </motion.div>
          )}

          {step === "expenses" && (
            <motion.div key="expenses" {...anim}>
              <ExpensesSection
                items={budget.expenses}
                setItems={(items) =>
                  setBudget({ ...budget, expenses: items })
                }
              />
            </motion.div>
          )}
        </AnimatePresence>

        {/* -----------------------------
           Navigation
        ------------------------------ */}

        <div
          style={{
            marginTop: 24,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          {/* Back */}
          {step !== "income" ? (
            <button
              onClick={() =>
                setStep(step === "expenses" ? "income" : "income")
              }
              style={navButton}
            >
              ← Back
            </button>
          ) : (
            <div />
          )}

          {/* Next */}
          {step === "income" && (
            <button
              onClick={() => setStep("expenses")}
              disabled={!canGoNext}
              style={{
                ...navButton,
                background: canGoNext ? "#36656B" : "#E3E3E3",
                color: canGoNext ? "#F0F8A4" : "#999",
                cursor: canGoNext ? "pointer" : "not-allowed",
              }}
            >
              Continue to expenses →
            </button>
          )}

          {step === "expenses" && (
            <button
              onClick={() => setStep("savings")}
              disabled={!canGoNext}
              style={{
                ...navButton,
                background: canGoNext ? "#36656B" : "#E3E3E3",
                color: canGoNext ? "#F0F8A4" : "#999",
                cursor: canGoNext ? "pointer" : "not-allowed",
              }}
            >
              Continue to savings →
            </button>
          )}
        </div>

        <CalculatorLinks current="budget" />
      </div>
    </main>
  );
}

/* -----------------------------
   Animation + styles
------------------------------ */

const anim = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.25 },
};

const navButton: React.CSSProperties = {
  padding: "10px 16px",
  borderRadius: 8,
  border: "1px solid rgba(54,101,107,0.2)",
  background: "#fff",
  fontSize: 14,
};
