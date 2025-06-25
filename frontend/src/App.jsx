import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Administration from "./pages/Administration";
import CashRegister from "./pages/CashRegister";
import Login from "./pages/Login";
import Warehouse from "./pages/Warehouse";

function App() {
  return (
    <Router>
      <Routes>
        <Route />
        <Route path="/administration" element={<Administration />} />
        <Route path="/cashregister" element={<CashRegister />} />
        <Route path="/warehouse" element={<Warehouse />} />
        <Route path="*" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
