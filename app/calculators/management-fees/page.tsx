"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateManagementFeeDrag } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { GrowthChart } from "./GrowthChart";
import CalculatorLinks from "../components/CalculatorLinks";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ManagementFeesPage() {
  const [startingPortfolio, setStartingPortfolio] = useState("100,000");
  const [feeRate, setFeeRate] = useState("1.00");
  const [returnRate, setReturnRate] = useState("8.00");
  const [years, setYears] = useState("30");

  const results = useMemo(() => {
    return calculateManagementFeeDrag({
      startingPortfolio: parseNumber(startingPortfolio),
      annualFeeRate: Number(feeRate.replace(/,/g, "")) / 100,
      annualReturnRate: Number(returnRate.replace(/,/g, "")) / 100,
      years: parseNumber(years),
    });
  }, [startingPortfolio, feeRate, returnRate, years]);

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
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Management Fees" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>Management Fees</h1>
        <p style={{ maxWidth: 520, marginBottom: 32 }}>
          Fees don’t just cost money. They cost compounding.
        </p>

        <div
          style={{
            background: "#F0F8A4",
            padding: 24,
            borderRadius: 16,
          }}
        >
          <InputsPanel
            startingPortfolio={startingPortfolio}
            setStartingPortfolio={setStartingPortfolio}
            feeRate={feeRate}
            setFeeRate={setFeeRate}
            returnRate={returnRate}
            setReturnRate={setReturnRate}
            years={years}
            setYears={setYears}
          />

          <ResultsSummary results={results} />

          <div style={{ marginTop: 32 }}>
            <GrowthChart results={results} />
          </div>
        </div>

        <CalculatorLinks current="management-fees" />
      </motion.div>
    </main>
  );
}
