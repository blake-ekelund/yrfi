"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend
);

export function GrowthChartMobile({ results }: { results: any[] }) {
  const labels = results.map((r) => `Year ${r.year}`);

  return (
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
          legend: { display: true },
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
            title: {
              display: true,
              text: "Total Portfolio Value",
            },
            ticks: {
              callback: (v) => `$${Number(v).toLocaleString()}`,
            },
          },
        },
      }}
    />
  );
}
