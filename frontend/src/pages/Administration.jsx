import { useState } from "react";
import Header from "../components/layout/Header";
import Employees from "../components/view/Employees";
import Products from "../components/view/Products";
import Shelves from "../components/view/Shelves";

function Administration() {
  const [view, setView] = useState("Angestellte");

  function handleViewChange(newView) {
    setView(newView);
  }

  function renderContent() {
    switch (view) {
      case "Produkte":
        return <Products />;
      case "Regale":
        return <Shelves />;
      case "Angestellte":
        return <Employees />;
      default:
        return <Employees />;
    }
  }

  return (
    <>
      <Header
        Views={["Produkte", "Regale", "Angestellte"]}
        StartView={"Angestellte"}
        onActiveViewChange={handleViewChange}
      />
      <div>{renderContent()}</div>
    </>
  );
}

export default Administration;
