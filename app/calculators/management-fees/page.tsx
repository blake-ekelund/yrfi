"use client";

import { useMemo, useState, useEffect } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateManagementFeeDrag } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { GrowthChart } from "./GrowthChart";
import { ManagementFeesMatrix } from "./ManagementFeesMatrix";
import Breadcrumbs from "../components/Breadcrumbs";
import CalculatorLinks from "../components/CalculatorLinks";

export default function ManagementFeesPage() {
  const [startingPortfolio, setStartingPortfolio] = useState("100,000");
  const [feeRate, setFeeRate] = useState("1.00");
  const [returnRate, setReturnRate] = useState("8.00");
  const [years, setYears] = useState("30");

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const results = useMemo(() => {
    return calculateManagementFeeDrag({
      startingPortfolio: parseNumber(startingPortfolio),
      annualFeeRate: Number(feeRate.replace(/,/g, "")) / 100,
      annualReturnRate: Number(returnRate.replace(/,/g, "")) / 100,
      years: parseNumber(years),
    });
  }, [startingPortfolio, feeRate, returnRate, years]);

  return (
    <main style={{ minHeight: "100vh", padding: "60px 20px", color: "#36656B" }}>
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
            { label: "Management Fees" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>Management Fees</h1>
        <p style={{ maxWidth: 960, marginBottom: 32, lineHeight: 1.5 }}>
          Management fees don’t just reduce returns — they quietly compound
          against you. This calculator shows how even small annual fees can
          translate into substantial long-term opportunity cost.
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

          {isDesktop && (
            <div style={{ marginTop: 32 }}>
              <GrowthChart results={results} />
            </div>
          )}

          <ManagementFeesMatrix
            startingPortfolio={parseNumber(startingPortfolio)}
            returnRate={
              Number(returnRate.replace(/,/g, "")) / 100
            }
            baseFeeRate={
              Number(feeRate.replace(/,/g, "")) / 100
            }
            years={parseNumber(years)}
          />
        </div>

        <CalculatorLinks current="management-fees" />
      </motion.div>
    </main>
  );
}
