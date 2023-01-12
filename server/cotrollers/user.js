import Transaction from "../models/Transaction.js";
import User from "../models/User.js";

export const createUser = async (req, res, next) => {
  try {
    const u = new User(req.body);
    await u.save();
    res.status(200).json(u);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const createTransaction = async (req, res, next) => {
  try {
    const t = new Transaction({
      ...req.body,
      amountLeft: req.body.totalAmount,
    });
    await t.save();

    const user = await User.findByIdAndUpdate(req.body.createdBy, {
      $addToSet: t._id,
    });

    res.status(200).json(t);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const updateTransaction = async (req, res, next) => {
  try {
    const user = await User.findById(req.body.user);
    const { transactions, createdAt, updatedAt, __v, ...others } = user._doc;

    const tr = await Transaction.findById(req.params.id);

    if (tr.amountLeft === 0)
      return res.status(404).json("Amount Has already been paid");
    if (tr.amountLeft - req.body.amount < 0)
      return res
        .status(404)
        .json(
          `Amount Left is ${
            tr.amountLeft 
          }! Pay only that much or less`
        );

    const t = await Transaction.findByIdAndUpdate(req.params.id, {
      $push: { users: { user: others, amount: req.body.amount } },
      $inc: {
        amountPaid: req.body.amount,
        amountLeft: -req.body.amount,
      },
    });
    await User.findByIdAndUpdate(req.body.user, {
      $push: {
        transactions: {
          id: req.params.id,
          amount: req.body.amount,
          status: "active",
        },
      },
    });
    res.status(200).json("Updated");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
export const deleteTransaction = async (req, res, next) => {
  try {
    const t = await Transaction.findById(req.params.id);
    const users = t.users;

    users.map(async (u) => {
      await User.update(
        { "transactions.id": req.params.id },
        {
          $set: {
            "transactions.$.status": "deleted",
          },
        }
      );
    });
    await t.delete();
    res.status(200).json("Deleted");
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export const getTransaction = async (req, res, next) => {
  try {
    const t = await Transaction.findById(req.params.id);
    res.status(200).json(t);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};
