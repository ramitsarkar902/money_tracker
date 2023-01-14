import axios from "axios";

export const getAllTransactions = async (setData) => {
  try {
    const res = await axios.get(
      "http://localhost:10000/api/user/all/transaction"
    );
    setData(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const getATransaction = async (id, setData) => {
  try {
    const res = await axios.get(
      `http://localhost:10000/api/user/transaction/${id}`
    );
    setData(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const deleteTransaction = async (id) => {
  try {
    await axios.delete(`http://localhost:10000/api/user/transaction/${id}`);
  } catch (error) {
    console.log(error.message);
  }
};

export const getAllUsers = async (setUserData) => {
  try {
    const res = await axios.get("http://localhost:10000/api/user");
    setUserData(res.data);
  } catch (error) {
    console.log(error.message);
  }
};

export const updateTransaction = async ({ id, userId, amount }) => {
  try {
    await axios.put(`http://localhost:10000/api/user/transaction/${id}`, {
      user: userId,
      amount: amount,
    });
  } catch (error) {
    console.log(error.message);
  }
};
