import { useState } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Transaction from "./pages/Transaction";
function App() {
  const [userData, setUserData] = useState(null);
  console.log(userData);
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home setUserData={setUserData} />} />
        <Route
          path="transaction/:id"
          element={<Transaction userData={userData} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
