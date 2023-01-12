import express from "express";
import {
  createTransaction,
  createUser,
  deleteTransaction,
  getTransaction,
  updateTransaction,
} from "../cotrollers/user.js";
const router = express.Router();

router.post("/", createUser);

router.post("/transaction", createTransaction);

router.delete("/transaction/:id", deleteTransaction);

router.get("/transaction/:id", getTransaction);

router.put("/transaction/:id", updateTransaction);

export default router;
