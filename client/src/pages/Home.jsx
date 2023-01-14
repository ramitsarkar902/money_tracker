import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllTransactions, getAllUsers } from "../apiCalls.js";
function Home() {
  const navigate = useNavigate();
  const [data, setData] = useState(null);
  useEffect(() => {
    getAllTransactions(setData);
  }, []);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "totalAmount",
      headerName: "Total Amount",
      flex: 0.5,
    },
    {
      field: "amountLeft",
      headerName: "Amount Left",
      flex: 0.5,
    },
    {
      field: "amountPaid",
      headerName: "Amount Paid",
      flex: 0.5,
    },
    {
      field: "createdAt",
      headerName: "createdAt",
      flex: 0.5,
    },
  ];
  return (
    <div className="App">
      <Box mt="40px" height="75vh">
        <DataGrid
          onRowClick={(e) => {
            navigate(`/transaction/${e.id}`);
          }}
          loading={!data}
          getRowId={(row) => row._id}
          rows={data || []}
          columns={columns}
        />
      </Box>
    </div>
  );
}

export default Home;
