import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { motion } from "framer-motion";

ChartJS.register(ArcElement, Tooltip, Legend, Title);

interface PieDataItem {
  label: string;
  value: number;
}

interface CustomPieChartProps {
  title: string;
  data: PieDataItem[];
}

export const CustomPieChart = ({ title, data }: CustomPieChartProps) => {
  const validData = Array.isArray(data) ? data : [];

  const chartData = {
    labels: validData.map((item) => item.label),
    datasets: [
      {
        data: validData.map((item) => item.value),
        backgroundColor: [
          "#4F46E5",
          "#F59E0B",
          "#10B981",
          "#EF4444",
          "#3B82F6",
          "#8B5CF6",
        ],
        borderColor: "#fff",
        borderWidth: 2,
      },
    ],
  };

  const options: ChartOptions<"pie"> = {
    responsive: true,
    plugins: {
      legend: { position: "bottom" },
      title: {
        display: true,
        text: title,
        font: { size: 18 },
      },
    },
  };

  return (
    <motion.div
      className="max-w-sm mx-auto bg-white shadow-md rounded-2xl p-4"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, type: "spring" }}
    >
      {validData.length > 0 ? (
        <Pie data={chartData} options={options} />
      ) : (
        <p className="text-center text-gray-500">No data available</p>
      )}
    </motion.div>
  );
};
