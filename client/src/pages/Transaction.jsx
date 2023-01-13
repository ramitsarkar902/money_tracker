import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { deleteTransaction, getATransaction } from "../apiCalls";
const Transaction = ({ userData }) => {
  const [data, setData] = useState(null);
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    getATransaction(id, setData);
  }, []);

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
        {userData.map((u) => (
          <div
            style={{
              display: "flex",
              gap: "20px",
            }}
          >
            <p>Name:{u.username}</p>
            <p>Id:{u._id}</p>
          </div>
        ))}
      </div>

      <div>
        <p>Pay</p>
      </div>
    </Box>
  );
};

export default Transaction;
