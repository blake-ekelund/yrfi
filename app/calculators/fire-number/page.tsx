"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { parseNumber } from "@/lib/formatters";
import { calculateFireNumber } from "./math";
import { InputsPanel } from "./InputsPanel";
import { ResultsSummary } from "./ResultsSummary";
import { FireMatrix } from "./FireMatrix";
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
        style={{ maxWidth: 960, margin: "0 auto" }}
      >
        <Breadcrumbs
          items={[
            { label: "Home", href: "/" },
            { label: "Calculators", href: "/calculators" },
            { label: "FIRE Number" },
          ]}
        />

        <h1 style={{ marginBottom: 12 }}>FIRE Number</h1>

        {/* Intro */}
        <p style={{ maxWidth: 960, lineHeight: 1.5, marginBottom: 12 }}>
          Your FIRE number is an estimate of invested wealth required to sustain
          your annual spending indefinitely, assuming a constant withdrawal
          rate.
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

          {/* Education: how to reduce FIRE */}
          <div
            style={{
              marginTop: 32,
              fontSize: 14,
              lineHeight: 1.5,
              maxWidth: 760,
              opacity: 0.9,
            }}
          >
            <strong>How to reduce your FIRE number:</strong>
            <ul style={{ marginTop: 8, paddingLeft: 18 }}>
              <li>
                <strong>Reduce annual spending.</strong> Every dollar of
                spending compounds into a much larger required portfolio.
              </li>
              <li>
                <strong>Increase withdrawal rate.</strong> A higher withdrawal
                rate lowers the required portfolio, but increases risk.
              </li>
            </ul>

            <p style={{ marginTop: 8 }}>
              Withdrawal rates above <strong>4%</strong> carry increasing
              long-term failure risk based on historical simulations such as the
              Trinity Study. Higher rates may work, but they leave less margin
              for market downturns, inflation, and sequence-of-returns risk.
            </p>
          </div>

          {/* Matrix */}
          <FireMatrix
            annualSpending={parseNumber(annualSpending)}
            withdrawalRate={
              Number(withdrawalRate.replace(/,/g, "")) / 100
            }
          />
        </div>

        <CalculatorLinks current="fire-number" />
      </motion.div>
    </main>
  );
}
