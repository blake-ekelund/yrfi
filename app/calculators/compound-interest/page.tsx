"use client";

import { useState, useMemo, useEffect } from "react";
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

  // ✅ Screen sizing handled locally
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const payload = {
    template: "compound-interest",
    startingPortfolio: parseNumber(startingPortfolio),
    monthlyContribution: parseNumber(monthlyContribution),
    years: parseNumber(years),
    annualReturnRate:
      Number(returnRate.replace(/,/g, "")) / 100,
  };

  const results = useMemo(() => {
    return calculateCompoundGrowth({
      startingPortfolio: payload.startingPortfolio,
      monthlyContribution: payload.monthlyContribution,
      years: payload.years,
      annualReturnRate: payload.annualReturnRate,
    });
  }, [
    payload.startingPortfolio,
    payload.monthlyContribution,
    payload.years,
    payload.annualReturnRate,
  ]);

  const downloadButton = (
    <DownloadExcelButton
      endpoint="/api/download-excel"
      filename="Compound-Interest-Calculator-v1.0.0.xlsx"
      label="Download Excel Version"
      payload={payload}
    />
  );

  return (
    <main
      style={{
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

        {/* Header row */}
        <div style={{ marginBottom: 12 }}>
          <div
            style={{
              display: "flex",
              alignItems: isDesktop ? "center" : "flex-start",
              justifyContent: "space-between",
              gap: 16,
              flexWrap: "wrap",
            }}
          >
            <h1 style={{ margin: 0 }}>
              Compound Interest
            </h1>

            {isDesktop && downloadButton}
          </div>

          <p
            style={{
              maxWidth: 980,
              lineHeight: 1.5,
              marginTop: 12,
              marginBottom: 0,
            }}
          >
            This calculator shows how compound growth works over time when you
            combine an initial portfolio, consistent monthly contributions, and
            an assumed annual rate of return.
          </p>
        </div>

        {/* Mobile-only placement */}
        {!isDesktop && (
          <div style={{ marginBottom: 20 }}>
            {downloadButton}
          </div>
        )}

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
