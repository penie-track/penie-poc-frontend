import axios from "axios";
import type { Transaction } from "../types/transaction";
import { S } from "node_modules/framer-motion/dist/types.d-BJcRxCew";

const baseUrl = "https://penie-poc-backend.onrender.com/api/transactions";

const getAll = () => {
  return axios.get<{ data: Transaction[] }>(baseUrl);
};

const create = (newTransaction: Transaction) => {
  return axios.post(baseUrl, newTransaction);
};

const update = (id: string, newTransaction: Transaction) => {
  return axios.patch(`${baseUrl}/${id}`, newTransaction);
};

const remove = (id: string) => {
  return axios.delete(`${baseUrl}/${id}`);
};

export default { getAll, create, update, remove };
