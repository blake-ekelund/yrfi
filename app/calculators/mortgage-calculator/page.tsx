// app/calculators/mortgage/page.tsx
"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateMortgage } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { BalanceChart } from "./BalanceChart";
import { AmortizationTable } from "./AmortizationTable";
import CalculatorLinks from "../components/CalculatorLinks";
import Breadcrumbs from "../components/Breadcrumbs";
import { DownloadExcelButton } from "@/components/DownloadExcelButton";

export default function MortgagePage() {
  const [homePrice, setHomePrice] = useState("400,000");
  const [downPayment, setDownPayment] = useState("80,000");
  const [interestRate, setInterestRate] = useState("6.75");
  const [termYears, setTermYears] = useState("30");

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const payload = {
    template: "mortgage",
    homePrice: parseNumber(homePrice),
    downPayment: parseNumber(downPayment),
    interestRate: parseNumber(interestRate) / 100,
    termYears: parseNumber(termYears),
  };

  const results = useMemo(() => {
    return calculateMortgage({
      homePrice: payload.homePrice,
      downPayment: payload.downPayment,
      interestRate: payload.interestRate,
      termYears: payload.termYears,
    });
  }, [
    payload.homePrice,
    payload.downPayment,
    payload.interestRate,
    payload.termYears,
  ]);

  const downloadButton = (
    <DownloadExcelButton
      endpoint="/api/download-excel"
      filename="Mortgage-Calculator-v1.0.0.xlsx"
      label="Download Excel Version"
      payload={payload}
    />
  );

  return (
    <main style={{ padding: "60px 20px", color: "#36656B" }}>
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
            { label: "Mortgage Calculator" },
          ]}
        />

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
              Mortgage Calculator
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
            Estimate your monthly mortgage payment and see how your loan balance
            declines over time.
          </p>
        </div>

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
          }}
        >
          <InputsPanel
            homePrice={homePrice}
            setHomePrice={setHomePrice}
            downPayment={downPayment}
            setDownPayment={setDownPayment}
            interestRate={interestRate}
            setInterestRate={setInterestRate}
            termYears={termYears}
            setTermYears={setTermYears}
          />

          <ResultsSummary results={results} />

          <div style={{ marginTop: 32 }}>
            <BalanceChart schedule={results.schedule} />
          </div>

          <AmortizationTable schedule={results.schedule} />
        </div>

        <CalculatorLinks current="mortgage-calculator" />
      </motion.div>
    </main>
  );
}
