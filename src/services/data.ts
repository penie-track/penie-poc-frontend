import axios from "axios";
import type { Transaction } from "../types/transaction";

const baseUrl = "https://penie-poc-backend.onrender.com/api/transactions";

const getAll = () => {
  return axios.get<{ data: Transaction[] }>(baseUrl);
};

const create = (newTransaction: Transaction) => {
  return axios.post(baseUrl, newTransaction);
};

export default { getAll, create };
