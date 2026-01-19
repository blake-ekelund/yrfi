"use client";

import { useState, useMemo } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

import {
  formatCurrencyInput,
  formatPercentInput,
  parseNumber,
} from "@/lib/formatters";

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function ManagementFeeCalculator() {
  const [balanceInput, setBalanceInput] = useState("500,000");
  const [returnInput, setReturnInput] = useState("8");
  const [feeInput, setFeeInput] = useState("1");
  const [yearsInput, setYearsInput] = useState("30");

  const balance = parseNumber(balanceInput);
  const annualReturn = Number(returnInput.replace(/,/g, "")) / 100;
  const feeRate = Number(feeInput.replace(/,/g, "")) / 100;
  const years = parseNumber(yearsInput);

  const results = useMemo(() => {
    let valueBeforeFees = balance;
    let valueAfterFees = balance;
    let totalFees = 0;

    const labels: string[] = [];
    const before: number[] = [];
    const after: number[] = [];
    const fees: number[] = [];

    for (let year = 1; year <= years; year++) {
      valueBeforeFees *= 1 + annualReturn;

      const feeForYear = valueAfterFees * feeRate;
      totalFees += feeForYear;

      valueAfterFees = valueAfterFees * (1 + annualReturn) - feeForYear;

      labels.push(`Year ${year}`);
      before.push(Math.round(valueBeforeFees));
      after.push(Math.round(valueAfterFees));
      fees.push(Math.round(totalFees));
    }

    return { labels, before, after, fees, totalFees };
  }, [balance, annualReturn, feeRate, years]);

  const data = {
    labels: results.labels,
    datasets: [
      {
        label: "Portfolio value (no fees)",
        data: results.before,
        borderColor: "#36656B",
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Portfolio value (after fees)",
        data: results.after,
        borderColor: "#75B06F",
        tension: 0.3,
        pointRadius: 0,
      },
      {
        label: "Cumulative fees paid",
        data: results.fees,
        borderColor: "#B45309",
        tension: 0.3,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (v: string | number) =>
            `$${Number(v).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div
      style={{
        background: "#F0F8A4",
        padding: 24,
        borderRadius: 16,
        maxWidth: 720,
        width: "100%",
        boxSizing: "border-box",
      }}
    >
      {/* INPUTS */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 20,
          marginBottom: 32,
        }}
      >
        <Input
          label="Portfolio balance today"
          value={balanceInput}
          onChange={(v) => setBalanceInput(formatCurrencyInput(v))}
          placeholder="500,000"
        />

        <Input
          label="Estimated annual return (%)"
          value={returnInput}
          onChange={(v) => setReturnInput(formatPercentInput(v))}
          placeholder="8"
        />

        <Input
          label="Management fee (%)"
          value={feeInput}
          onChange={(v) => setFeeInput(formatPercentInput(v))}
          placeholder="1"
        />

        <Input
          label="Time horizon (years)"
          value={yearsInput}
          onChange={(v) => setYearsInput(formatCurrencyInput(v))}
          placeholder="30"
        />
      </div>

      {/* OUTPUT */}
      <div
        style={{
          marginBottom: 24,
          paddingTop: 16,
          borderTop: "1px solid rgba(54,101,107,0.25)",
        }}
      >
        <div style={{ fontSize: 14, opacity: 0.8 }}>
          Total management fees paid
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>
          {results.totalFees
            ? `$${results.totalFees.toLocaleString()}`
            : "—"}
        </div>
      </div>

      {/* CHART */}
      <Line data={data} options={options} />
    </div>
  );
}

/* ---------------------------------------------
   INPUT
--------------------------------------------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder: string;
}) {
  return (
    <div>
      <label style={{ fontSize: 14 }}>{label}</label>
      <div style={{ maxWidth: 200 }}>
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          style={{
            padding: "10px 12px",
            borderRadius: 10,
            border: "none",
            fontSize: 16,
            color: "#36656B",
            background: "#fff",
            width: "100%",
            boxSizing: "border-box",
          }}
        />
      </div>
    </div>
  );
}
