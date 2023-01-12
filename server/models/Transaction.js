import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema(
  {
    createdBy: mongoose.Types.ObjectId,
    users: [{ user: Object, amount: Number }],
    amountPaid: {
      type: Number,
      default: 0,
    },
    totalAmount: Number,
    amountLeft: Number,
  },
  { timestamps: true }
);

const User = mongoose.model("Transaction", transactionSchema);
export default User;
