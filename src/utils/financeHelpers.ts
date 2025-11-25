import { Transaction } from "../types/transaction";

export const getTotalIncome = (data: Transaction[]) =>
  data.filter((d) => d.type === "income").reduce((sum, d) => sum + d.amount, 0);

export const getTotalExpense = (data: Transaction[]) =>
  data
    .filter((d) => d.type === "expense")
    .reduce((sum, d) => sum + d.amount, 0);

export const getBalance = (data: Transaction[]) =>
  getTotalIncome(data) - getTotalExpense(data);

export const getMonthlyTrend = (data: Transaction[]) => {
  // Group by month
  const grouped: Record<
    string,
    { month: string; income: number; expense: number }
  > = {};

  data.forEach((d) => {
    const month = new Date(d.date).toLocaleString("default", {
      month: "short",
      year: "numeric",
    });

    if (!grouped[month]) {
      grouped[month] = { month, income: 0, expense: 0 };
    }

    // Add amount to the correct type
    grouped[month][d.type as "income" | "expense"] += d.amount;
  });

  return Object.values(grouped);
};

// Exepense by category
export function getExpenseByCategory(transactions: Transaction[]) {
  const categoryTotals: { [key: string]: number } = {};

  transactions.forEach((t) => {
    if (t.type === "expense") {
      categoryTotals[t.category] = (categoryTotals[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(categoryTotals).map(([label, value]) => ({
    label,
    value,
  }));
}

// Expense by Income
export function getIncomeByCategory(transactions: Transaction[]) {
  const categories: { [key: string]: number } = {};

  transactions.forEach((t) => {
    if (t.type === "income") {
      categories[t.category] = (categories[t.category] || 0) + t.amount;
    }
  });

  return Object.entries(categories).map(([label, value]) => ({
    label,
    value,
  }));
}
