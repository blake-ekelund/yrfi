"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import type { ChartOptions } from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export function GrowthChart({ results }: { results: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  const data = {
    labels: results.map((r) => `Year ${r.year}`),
    datasets: [
      {
        label: "Without fees",
        data: results.map((r) => r.withoutFees),
        backgroundColor: "#75B06F",
      },
      {
        label: "With fees",
        data: results.map((r) => r.withFees),
        backgroundColor: "#C94C4C",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (ctx) =>
            `${ctx.dataset.label}: $${Number(
              ctx.raw
            ).toLocaleString()}`,
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
        width: "100%",
        height: isDesktop ? 320 : 240,
      }}
    >
      <Bar data={data} options={options} />
    </div>
  );
}
