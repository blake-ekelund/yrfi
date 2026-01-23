"use client";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

export function GrowthChartDesktop({ results }: { results: any[] }) {
  const labels = results.map((r) => `Year ${r.year}`);

  const annualContributions = results.map((r, i) => {
    const prev = results[i - 1];
    return prev ? r.contributions - prev.contributions : r.contributions;
  });

  const annualInterest = results.map((r, i) => {
    const prev = results[i - 1];
    return prev ? r.interestEarned - prev.interestEarned : r.interestEarned;
  });

  const portfolioValue = results.map((r) => r.endingValue);

  return (
    <Chart
      type="bar"
      data={{
        labels,
        datasets: [
          {
            type: "bar",
            label: "Contributions (Year)",
            data: annualContributions,
            backgroundColor: "#75B06F",
            stack: "flows",
          },
          {
            type: "bar",
            label: "Interest Earned (Year)",
            data: annualInterest,
            backgroundColor: "#36656B",
            stack: "flows",
          },
          {
            type: "line",
            label: "Total Portfolio Value",
            data: portfolioValue,
            borderColor: "#234C6A",
            borderWidth: 2,
            pointRadius: 0,
            tension: 0.25,
            yAxisID: "balance",
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
            title: { display: true, text: "Annual Flow" },
            ticks: {
              callback: (v) => `$${Number(v).toLocaleString()}`,
            },
          },
          balance: {
            position: "right",
            grid: { drawOnChartArea: false },
            title: { display: true, text: "Portfolio Value" },
            ticks: {
              callback: (v) => `$${Number(v).toLocaleString()}`,
            },
          },
        },
      }}
    />
  );
}
