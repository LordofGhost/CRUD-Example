import { useState } from "react";
import Header from "../components/layout/Header";
import Employees from "../components/view/Employees";
import Products from "../components/view/Products";
import Shelves from "../components/view/Shelves";
import Stock from "../components/view/Stock";

function Manager() {
  const [view, setView] = useState("Produkte");

  function handleViewChange(newView) {
    setView(newView);
  }

  function renderContent() {
    switch (view) {
      case "Produkte":
        return <Products />;
      case "Regale":
        return <Shelves />;
      case "Lagerbestand":
        return <Stock />;
      case "Angestellte":
        return <Employees />;
      default:
        return <Employees />;
    }
  }

  return (
    <>
      <Header
        Views={["Produkte", "Regale", "Lagerbestand", "Angestellte"]}
        StartView={"Produkte"}
        onActiveViewChange={handleViewChange}
      />
      {renderContent()}
    </>
  );
}

export default Manager;
