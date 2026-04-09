import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";
import "../../index.css";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Title,
  Tooltip,
  Legend,
);

interface LineChartComponentProps {
  data?: { month: string; value: number }[];
}

export default function LineChartComponent({ data: chartData }: LineChartComponentProps) {
  const defaultData = [
    { month: "Jan", value: 10 },
    { month: "Feb", value: 20 },
    { month: "Mar", value: 15 },
    { month: "Apr", value: 25 },
    { month: "May", value: 30 },
    { month: "Jun", value: 40 },
  ];

  const dataToUse = chartData?.length ? chartData : defaultData;

  const data = {
    labels: dataToUse.map(d => d.month),
    datasets: [
      {
        label: "Sessions Over Time",
        data: dataToUse.map(d => d.value),
        borderColor: "rgba(255, 77, 77, 1)",
        tension: 0.4,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
      },
    },
  };

  return <div className=" mt-3 mb-8 border rounded-md border-orange p-5 md:p-8 w-full overflow-hidden">
    <h2 className=" mb-5 text-3xl font-semibold">Sessions Over Time</h2>
    <Line data={data} options={options} />
  </div>;
}