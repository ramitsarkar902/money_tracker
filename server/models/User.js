import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    username: String,
    transactions: [
      {
        type: Object,
      },
    ],
  },
  { timestamps: true }
);

const User = mongoose.model("User", UserSchema);
export default User;
