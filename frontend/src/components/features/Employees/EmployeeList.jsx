import { useCallback, useEffect, useState } from "react";
import { getAllEmployees } from "../../../services/Employees";
import EmployeeItem from "./EmployeeItem";

function EmployeeList({ handleReload }) {
  const [employeeComponents, setEmployeeComponents] = useState([
    <div key={1}></div>,
  ]);

  const renderEmployees = useCallback(async () => {
    const employees = await getAllEmployees();

    if (employees) {
      const processedEmployees = employees.map((employee, index) => (
        <EmployeeItem
          Employee={employee}
          key={`employee-${index}`}
          handleReload={handleReload}
        />
      ));
      setEmployeeComponents(processedEmployees);
    }
  }, [setEmployeeComponents, handleReload]);

  useEffect(() => {
    renderEmployees();
  }, [renderEmployees]);

  return (
    <div className="mb-7 flex flex-col items-center gap-5">
      {employeeComponents}
    </div>
  );
}

export default EmployeeList;
