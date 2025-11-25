import React from "react";
import { motion } from "framer-motion";
import { ArrowUpCircle, ArrowDownCircle, Wallet } from "lucide-react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Transaction } from "../types/transaction";
import {
  getTotalIncome,
  getTotalExpense,
  getBalance,
  getMonthlyTrend,
  getExpenseByCategory,
  getIncomeByCategory,
} from "../utils/financeHelpers";
import { CustomPieChart } from "@/components/CustomPieChart";

type AnalyticsProps = {
  data: Transaction[];
};

// Motion variant for smooth fade + rise effect
const fadeUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0 },
};

const Analytics = ({ data }: AnalyticsProps) => {
  const totalIncome = getTotalIncome(data);
  const totalExpense = getTotalExpense(data);
  const balance = getBalance(data);
  const monthlyTrend = getMonthlyTrend(data);
  const expenseByCategory = getExpenseByCategory(data);
  const incomeByCategory = getIncomeByCategory(data);

  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      transition={{ staggerChildren: 0.2 }}
    >
      {/* ==== Summary Cards ==== */}
      <div className="flex justify-around py-8 gap-6 flex-wrap">
        {[
          {
            icon: <ArrowUpCircle className="text-green-600 w-10 h-10 mb-3" />,
            title: "Total Income",
            value: `$${totalIncome}`,
            color: "text-green-600",
          },
          {
            icon: <ArrowDownCircle className="text-red-600 w-10 h-10 mb-3" />,
            title: "Total Expense",
            value: `$${totalExpense}`,
            color: "text-red-600",
          },
          {
            icon: <Wallet className="text-blue-600 w-10 h-10 mb-3" />,
            title: "Balance",
            value: `$${balance}`,
            color: "text-blue-600",
          },
        ].map((card, idx) => (
          <motion.div
            key={idx}
            variants={fadeUp}
            transition={{ duration: 0.5 + idx * 0.2, type: "spring" }}
            className="shadow-xl p-8 rounded-2xl bg-white w-64 text-center"
          >
            {card.icon}
            <h3 className="text-lg font-semibold">{card.title}</h3>
            <p className={`${card.color} text-2xl font-bold mt-2`}>
              {card.value}
            </p>
          </motion.div>
        ))}
      </div>

      {/* ==== Monthly Trend ==== */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8, type: "spring" }}
        className="flex flex-col md:flex-row md:space-x-6 space-y-6 md:space-y-0"
      >
        <div className="flex-1 shadow-lg p-6 rounded-lg bg-white">
          <h3 className="font-semibold mb-4">Monthly Trend</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={monthlyTrend}>
              <XAxis dataKey="month" />
              <Tooltip />
              <Bar dataKey="income" fill="#10B981" />
              <Bar dataKey="expense" fill="#EF4444" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </motion.div>

      {/* ==== Pie Charts ==== */}
      <motion.div
        variants={fadeUp}
        transition={{ duration: 0.8, type: "spring" }}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6"
      >
        <CustomPieChart title="Expense by Category" data={expenseByCategory} />
        <CustomPieChart title="Income by Category" data={incomeByCategory} />
      </motion.div>
    </motion.div>
  );
};

export default Analytics;
