import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { navigateToPage } from "./services/Navigation";
import Administration from "./pages/Administration";
import CashRegister from "./pages/CashRegister";
import Warehouse from "./pages/Warehouse";
import Login from "./pages/Login";

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const navigate = useNavigate();

  useEffect(() => {
    navigateToPage(navigate);
  }, [navigate]);

  return (
    <Routes>
      <Route path="/administration" element={<Administration />} />
      <Route path="/cashregister" element={<CashRegister />} />
      <Route path="/warehouse" element={<Warehouse />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
