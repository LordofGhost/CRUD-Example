import { useState } from "react";
import CreateEmployee from "../features/Employees/CreateEmployee";
import EmployeeList from "../features/Employees/EmployeeList";
import Button from "../common/Button";
import CenterContainer from "../common/CenterContainer";

// eslint-disable-next-line react-refresh/only-export-components
export const roles = ["Manager", "Cashier", "ShelfFiller"];

function Employees() {
  const [showCreateWindow, setShowCreateWindow] = useState(false);
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <CenterContainer>
      <div className="mt-7 flex justify-end">
        <Button
          style={"accept"}
          text={"Arbeiter einstellen"}
          onClick={() => setShowCreateWindow(true)}
        />
        {showCreateWindow && (
          <CreateEmployee
            onClose={() => setShowCreateWindow(false)}
            handleReload={handleReload}
          />
        )}
      </div>
      <EmployeeList key={reloadKey} handleReload={handleReload} />
    </CenterContainer>
  );
}

export default Employees;
