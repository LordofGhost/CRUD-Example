import { useState } from "react";
import Button from "../common/Button";
import CenterContainer from "../common/CenterContainer";
import CreateShelf from "../features/Shelves/CreateShelf";
import ShelfList from "../features/Shelves/ShelfList";

function Shelves() {
  const [reloadKey, setReloadKey] = useState(0);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <CenterContainer>
      <div className="mt-7 flex flex-row justify-end">
        <Button
          style={"accept"}
          text={"Regal erstellen"}
          onClick={() => setIsCreateMenuOpen(true)}
        />
        {isCreateMenuOpen && (
          <CreateShelf
            onClose={() => setIsCreateMenuOpen(false)}
            handleReload={handleReload}
          />
        )}
      </div>
      <ShelfList key={reloadKey} handleReload={handleReload} />
    </CenterContainer>
  );
}

export default Shelves;
