"use client";

import { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";
import { formatCurrency } from "@/lib/formatters";

ChartJS.register(
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend
);

export function BalanceChart({ schedule }: { schedule: any[] }) {
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // 🚫 Do not render on mobile
  if (!isDesktop || !schedule.length) return null;

  // Aggregate monthly schedule into yearly ending balances
  const yearly = schedule.reduce((acc: any[], row) => {
    const yearIndex = Math.floor((row.month - 1) / 12);

    if (!acc[yearIndex]) {
      acc[yearIndex] = {
        year: yearIndex + 1,
        balance: row.balance,
      };
    }

    // Keep END-of-year balance
    acc[yearIndex].balance = row.balance;

    return acc;
  }, []);

  return (
    <div style={{ marginTop: 32, height: 320 }}>
      <Chart
        type="bar"
        data={{
          labels: yearly.map((y) => `Year ${y.year}`),
          datasets: [
            {
              label: "Remaining Loan Balance",
              data: yearly.map((y) => y.balance),
              backgroundColor: "#36656B",
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              callbacks: {
                label: (ctx) =>
                  formatCurrency(Number(ctx.raw)),
              },
            },
          },
          scales: {
            y: {
              ticks: {
                callback: (v) =>
                  formatCurrency(Number(v)),
              },
              title: {
                display: true,
                text: "Remaining Balance",
              },
            },
            x: {
              display: true,
            },
          },
        }}
      />
    </div>
  );
}
