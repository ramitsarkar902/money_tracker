import axios from "axios";

export const getAllTransactions = async (setData) => {
  const res = await axios.get(
    "http://localhost:10000/api/user/all/transaction"
  );
  setData(res.data);
};

export const getATransaction = async (id, setData) => {
  const res = await axios.get(
    `http://localhost:10000/api/user/transaction/${id}`
  );
  setData(res.data);
};

export const deleteTransaction = async (id) => {
  await axios.delete(`http://localhost:10000/api/user/transaction/${id}`);
};

export const getAllUsers = async (setUserData) => {
  const res = await axios.get("http://localhost:10000/api/user");
  setUserData(res.data);
};

export const updateTransaction = async ({ id, userId, amount }) => {
  await axios.put(`http://localhost:10000/api/user/transaction/${id}`, {
    user: userId,
    amount: amount,
  });
};
