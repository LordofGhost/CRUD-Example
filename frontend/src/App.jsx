import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { navigateToPage } from "./services/Navigation";
import Manager from "./pages/Manager";
import Cashier from "./pages/Cashier";
import ShelfFiller from "./pages/ShelfFiller";
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
      <Route path="/manager" element={<Manager />} />
      <Route path="/cashier" element={<Cashier />} />
      <Route path="/shelffiller" element={<ShelfFiller />} />
      <Route path="*" element={<Login />} />
    </Routes>
  );
}

export default App;
