"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip
);

export function GrowthChartMobile({ results }: { results: any[] }) {
  const labels = results.map((r) => `Year ${r.year}`);

  return (
    <div>
      {/* 🟢 External legend (separate block) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: 16,
          marginBottom: 12,
          fontSize: 11,
        }}
      >
        <LegendItem color="#75B06F" label="Total Contributions" />
        <LegendItem color="#36656B" label="Total Interest Earned" />
      </div>

      {/* Chart */}
      <div style={{ height: 260 }}>
        <Chart
          type="bar"
          data={{
            labels,
            datasets: [
              {
                label: "Total Contributions",
                data: results.map((r) => r.contributions),
                backgroundColor: "#75B06F",
                stack: "total",
              },
              {
                label: "Total Interest Earned",
                data: results.map((r) => r.interestEarned),
                backgroundColor: "#36656B",
                stack: "total",
              },
            ],
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,

            plugins: {
              legend: {
                display: false, // 🔑 disable internal legend
              },
              tooltip: {
                callbacks: {
                  label: (ctx) =>
                    `${ctx.dataset.label}: $${Number(ctx.raw).toLocaleString()}`,
                },
              },
            },

            scales: {
              x: { stacked: true },
              y: {
                stacked: true,
                ticks: {
                  callback: (v) =>
                    `$${Number(v).toLocaleString()}`,
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
}

/* -----------------------------
   Custom legend item
------------------------------ */

function LegendItem({
  color,
  label,
}: {
  color: string;
  label: string;
}) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 6,
        opacity: 0.9,
      }}
    >
      <span
        style={{
          width: 10,
          height: 10,
          borderRadius: 2,
          background: color,
          display: "inline-block",
        }}
      />
      <span>{label}</span>
    </div>
  );
}
