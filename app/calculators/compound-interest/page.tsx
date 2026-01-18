"use client";

import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import type { ChartOptions } from "chart.js";

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

ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export default function CompoundInterestPage() {
  const [monthly, setMonthly] = useState(200);
  const [years, setYears] = useState(20);
  const rate = 0.07; // 7% default

  const data = useMemo(() => {
    let balance = 0;
    const points: number[] = [];
    const labels: string[] = [];

    for (let year = 1; year <= years; year++) {
      for (let m = 0; m < 12; m++) {
        balance = (balance + monthly) * (1 + rate / 12);
      }
      points.push(Math.round(balance));
      labels.push(`Year ${year}`);
    }

    return { points, labels };
  }, [monthly, years]);

  const chartData = {
    labels: data.labels,
    datasets: [
      {
        label: "Total Value",
        data: data.points,
        borderColor: "#75B06F",
        backgroundColor: "#75B06F",
        tension: 0.35,
        pointRadius: 0,
      },
    ],
  };

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `$${Number(ctx.raw).toLocaleString("en-US")}`,
        },
      },
    },
    scales: {
      y: {
        ticks: {
          callback: (tickValue: string | number) =>
            `$${Number(tickValue).toLocaleString("en-US")}`,
        },
      },
    },
  };

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
        {/* HEADER */}
        <div style={{ marginBottom: 32 }}>
          <TrendingUp color="#75B06F" />
          <h1 style={{ marginBottom: 8 }}>Compound Interest</h1>
          <p style={{ maxWidth: 520 }}>
            Compounding feels slow — until it isn’t.
          </p>
        </div>

        {/* CONTROLS */}
        <div
          style={{
            display: "flex",
            gap: 20,
            flexWrap: "wrap",
            marginBottom: 32,
          }}
        >
          <Input
            label="Monthly Contribution"
            value={monthly}
            onChange={setMonthly}
            prefix="$"
          />

          <Input
            label="Years"
            value={years}
            onChange={setYears}
          />
        </div>

        {/* CHART */}
        <div
          style={{
            background: "#F0F8A4",
            padding: 20,
            borderRadius: 16,
            boxShadow: "0 12px 30px rgba(0,0,0,0.1)",
          }}
        >
          <Line data={chartData} options={options} />
        </div>

        {/* EXPLANATION */}
        <p
          style={{
            marginTop: 24,
            maxWidth: 620,
            opacity: 0.9,
          }}
        >
          Most of the growth happens at the end.
          The early years feel pointless.
          That’s the trap.
        </p>
      </motion.div>
    </main>
  );
}

/* ---------------------------------------------
   INPUT
--------------------------------------------- */

function Input({
  label,
  value,
  onChange,
  prefix,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  prefix?: string;
}) {
  return (
    <div>
      <div style={{ marginBottom: 6 }}>{label}</div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          background: "#F0F8A4",
          borderRadius: 10,
          padding: "8px 12px",
        }}
      >
        {prefix && <span style={{ marginRight: 6 }}>{prefix}</span>}
        <input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          style={{
            border: "none",
            background: "transparent",
            outline: "none",
            width: 100,
            fontSize: 16,
            color: "#36656B",
          }}
        />
      </div>
    </div>
  );
}
