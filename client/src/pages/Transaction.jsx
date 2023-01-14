import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  deleteTransaction,
  getATransaction,
  updateTransaction,
} from "../apiCalls";
const Transaction = ({ userData }) => {
  const [data, setData] = useState(null);
  const [userId, setUserId] = useState("");
  const [amount, setAmount] = useState(0);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getATransaction(id, setData);
  }, []);

  const handlePay = (e) => {
    e.preventDefault();
    updateTransaction({ id, userId, amount });
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "start",
        alignItems: "center",
        width: "100%",
        height: "100vh",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
        }}
      >
        {data && (
          <>
            <Box
              sx={{
                width: "50%",
                padding: "10px",
                display: "flex",
                flexDirection: "column",
                gap: "10px",
              }}
            >
              <p>Transaction ID:{data._id}</p>
              <span>CreatedBy:{data.createdBy.username}</span>
              <span>Total Amount:{data.totalAmount}</span>
              <span>Amount Left:{data.amountLeft}</span>
              <span>Amount Paid:{data.amountPaid}</span>
            </Box>
            <Box
              sx={{
                width: "50%",
              }}
            >
              <p>Users Who Paid:</p>
              {data.users.map((u) => (
                <div>
                  <p>
                    Id:{u.user._id}
                    {"    "}Name:{u.user.username}
                    {"    "}
                    Amount:{u.amount}
                  </p>
                </div>
              ))}
            </Box>
            <button
              onClick={(e) => {
                e.preventDefault();
                deleteTransaction(id);
                navigate("/");
              }}
            >
              Delete Transaction
            </button>
          </>
        )}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          marginTop: "20px",
          background: "gray",
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <p>List Of All Users:</p>
        {userData.map((u, idx) => (
          <div
            key={idx}
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <p>Name:{u.username}</p>
            <p>
              Id:
              <input value={u._id} />
            </p>
          </div>
        ))}
      </div>

      <div>
        <p>Pay</p>
        <form onSubmit={handlePay}>
          <input
            type="text"
            placeholder="ID of user"
            value={userId}
            onChange={(e) => {
              setUserId(e.target.value);
            }}
          />
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => {
              setAmount(e.target.value);
            }}
          />
          <button type="submit">Submit</button>
        </form>
      </div>
    </Box>
  );
};

export default Transaction;
