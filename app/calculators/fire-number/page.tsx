"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateFireNumber } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import Breadcrumbs from "../components/Breadcrumbs";
import CalculatorLinks from "../components/CalculatorLinks";

export default function FireNumberPage() {
  const [annualSpending, setAnnualSpending] = useState("60,000");
  const [withdrawalRate, setWithdrawalRate] = useState("4.00");

  const fireNumber = useMemo(() => {
    return calculateFireNumber({
      annualSpending: parseNumber(annualSpending),
      withdrawalRate:
        Number(withdrawalRate.replace(/,/g, "")) / 100,
    });
  }, [annualSpending, withdrawalRate]);

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
            { label: "FIRE Number" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>FIRE Number</h1>
        <p
        style={{
            maxWidth: 520,
            marginBottom: 32,
            opacity: 0.8,
        }}
        >
        The invested wealth required to sustain your annual spending.
        </p>

        <div
          style={{
            background: "#F0F8A4",
            padding: 24,
            borderRadius: 16,
          }}
        >
          <InputsPanel
            annualSpending={annualSpending}
            setAnnualSpending={setAnnualSpending}
            withdrawalRate={withdrawalRate}
            setWithdrawalRate={setWithdrawalRate}
          />

          <ResultsSummary fireNumber={fireNumber} />
        </div>

        <CalculatorLinks current="fire-number" />
      </motion.div>
    </main>
  );
}
