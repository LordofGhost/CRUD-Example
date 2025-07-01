import { useState } from "react";
import CenterContainer from "../common/CenterContainer";
import TaskList from "../features/Warehouse/TaskList";

function Warehouse() {
  const [reloadKey, setReloadKey] = useState(0);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <CenterContainer>
      <div className="flex flex-col gap-2">
        <div className="mt-7 text-center text-xl font-semibold">Aufgaben</div>
        <div className="text-center">
          Die Aufgelisteten Produkte müssen in die jeweiligen Regale eingeräumt
          werden.
        </div>
      </div>
      <TaskList key={reloadKey} handleReload={handleReload} />
    </CenterContainer>
  );
}

export default Warehouse;
