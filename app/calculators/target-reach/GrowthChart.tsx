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
  const data = {
    labels: results.map((r) => `Year ${r.year}`),
    datasets: [
      {
        label: "Contributions",
        data: results.map((r) => r.contributions),
        backgroundColor: "#75B06F",
      },
      {
        label: "Interest earned",
        data: results.map((r) => r.interestEarned),
        backgroundColor: "#36656B",
      },
    ],
  };

  const options: ChartOptions<"bar"> = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: { stacked: true },
      y: {
        stacked: true,
        ticks: {
          callback: (v: string | number) =>
            `$${Number(v).toLocaleString()}`,
        },
      },
    },
  };

  return (
    <div style={{ height: 320 }}>
      <Bar data={data} options={options} />
    </div>
  );
}
