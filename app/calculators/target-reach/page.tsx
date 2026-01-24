"use client";

import { useState, useMemo, useEffect } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateYearsToTarget } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { GrowthChart } from "./GrowthChart";
import { TargetReachMatrix } from "./TargetReachMatrix";
import Breadcrumbs from "../components/Breadcrumbs";
import CalculatorLinks from "../components/CalculatorLinks";

export default function TargetReachPage() {
  const [target, setTarget] = useState("1,500,000");
  const [current, setCurrent] = useState("250,000");
  const [contribution, setContribution] = useState("2,000");
  const [returnRate, setReturnRate] = useState("7.00");

  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const results = useMemo(() => {
    return calculateYearsToTarget({
      targetAmount: parseNumber(target),
      startingAmount: parseNumber(current),
      monthlyContribution: parseNumber(contribution),
      annualReturnRate:
        Number(returnRate.replace(/,/g, "")) / 100,
    });
  }, [target, current, contribution, returnRate]);

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
            { label: "Target Reach" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>Target Reach</h1>
        <p style={{ maxWidth: 960, marginBottom: 32, lineHeight: 1.5 }}>
          Estimate how long it may take to reach a savings or FIRE goal based on
          where you are today and how aggressively you contribute.
        </p>

        <div
          style={{
            background: "#F0F8A4",
            padding: 24,
            borderRadius: 16,
          }}
        >
          <InputsPanel
            target={target}
            setTarget={setTarget}
            current={current}
            setCurrent={setCurrent}
            contribution={contribution}
            setContribution={setContribution}
            returnRate={returnRate}
            setReturnRate={setReturnRate}
          />

          <ResultsSummary
            results={results}
            target={parseNumber(target)}
          />

          {isDesktop && (
            <div style={{ marginTop: 32 }}>
              <GrowthChart results={results} />
            </div>
          )}

          <TargetReachMatrix
            target={parseNumber(target)}
            current={parseNumber(current)}
            contribution={parseNumber(contribution)}
            returnRate={
              Number(returnRate.replace(/,/g, "")) / 100
            }
          />
        </div>

        <CalculatorLinks current="target-reach" />
      </motion.div>
    </main>
  );
}
