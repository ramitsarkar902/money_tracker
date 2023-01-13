import express from "express";
import {
  createTransaction,
  createUser,
  deleteTransaction,
  getAllTransactions,
  getAllUsers,
  getTransaction,
  updateTransaction,
} from "../cotrollers/user.js";
const router = express.Router();

router.post("/", createUser);

router.get("/", getAllUsers);

router.post("/transaction", createTransaction);

router.delete("/transaction/:id", deleteTransaction);

router.get("/transaction/:id", getTransaction);

router.get("/all/transaction", getAllTransactions);

router.put("/transaction/:id", updateTransaction);

export default router;
