"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateCompoundGrowth } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { GrowthChart } from "./GrowthChart";
import { GrowthTable } from "./GrowthTable";
import CalculatorLinks from "../components/CalculatorLinks";
import Breadcrumbs from "../components/Breadcrumbs";
import { DownloadExcelButton } from "@/components/DownloadExcelButton";

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
      annualReturnRate: Number(returnRate.replace(/,/g, "")) / 100,
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
        style={{ maxWidth: 960, margin: "0 auto" }}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "Compound Interest" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>
          Compound Interest
        </h1>

        <p
          style={{
            maxWidth: 980,
            lineHeight: 1.5,
            marginBottom: 12,
          }}
        >
          This calculator shows how compound growth works over time when you
          combine an initial portfolio, consistent monthly contributions, and an
          assumed annual rate of return.
        </p>

        {/* ⬇️ Excel download */}
        <div style={{ marginBottom: 20 }}>
          <DownloadExcelButton
            endpoint="/api/download-excel"
            filename="Compound-Interest-Calculator-v1.0.0.xlsx"
            label="Download Excel Version"
            payload={{
              template: "compound-interest",
              startingPortfolio: parseNumber(startingPortfolio),
              monthlyContribution: parseNumber(monthlyContribution),
              years: parseNumber(years),
              annualReturnRate:
                Number(returnRate.replace(/,/g, "")) / 100,
            }}
          />     
        </div>

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

          <GrowthTable results={results} />
        </div>

        <CalculatorLinks current="compound-interest" />
      </motion.div>
    </main>
  );
}
