"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateCompoundGrowth } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { GrowthChart } from "./GrowthChart";
import CalculatorLinks from "../components/CalculatorLinks";

export default function CompoundInterestPage() {
  const [startingPortfolio, setStartingPortfolio] = useState("25,000");
  const [monthlyContribution, setMonthlyContribution] = useState("250");
  const [years, setYears] = useState("40");
  const [returnRate, setReturnRate] = useState("8.00");

  const results = useMemo(() => {
    return calculateCompoundGrowth({
      startingPortfolio: parseNumber(startingPortfolio),
      monthlyContribution: parseNumber(monthlyContribution),
      years: parseNumber(years),
      annualReturnRate:
        Number(returnRate.replace(/,/g, "")) / 100,
    });
  }, [startingPortfolio, monthlyContribution, years, returnRate]);

  return (
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
        style={{ maxWidth: 900, margin: "0 auto" }}
      >
        <h1 style={{ marginBottom: 12 }}>Compound Interest</h1>
        <p style={{ maxWidth: 520, marginBottom: 32 }}>
          Compounding feels slow — until it isn’t.
        </p>

        <div
          style={{
            background: "#F0F8A4",
            padding: 24,
            borderRadius: 16,
            boxSizing: "border-box",
          }}
        >
          <InputsPanel
            startingPortfolio={startingPortfolio}
            setStartingPortfolio={setStartingPortfolio}
            monthlyContribution={monthlyContribution}
            setMonthlyContribution={setMonthlyContribution}
            years={years}
            setYears={setYears}
            returnRate={returnRate}
            setReturnRate={setReturnRate}
          />

          <ResultsSummary results={results} />

          <div style={{ marginTop: 32 }}>
            <GrowthChart results={results} />
          </div>
        </div>
        <CalculatorLinks current="compound-interest" />

      </motion.div>
    </main>
  );
}
