import { useState } from "react";
import { createShelf } from "../../../services/Shelves";
import Button from "../../common/Button";
import Warning from "../../common/Warning";
import FullScreenDialog from "../../common/FullScreenDialog";
import InputTitle from "../../common/InputTitle";
import TextInput from "../../common/TextInput";

function CreateShelf({ onClose, handleReload }) {
  const [creationError, setCreationError] = useState(false);
  const createDataDefault = {
    compartments: "",
    compartmentsSize: "",
  };
  const [createData, setCreateData] = useState(createDataDefault);

  function handleInputChange(field, value) {
    if (value < 1 || value > 20) return;
    setCreateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleCreate() {
    const result = await createShelf(createData);
    if (result) {
      setCreationError(false);
      onClose();
      handleReload();
    } else {
      setCreationError(true);
    }
  }

  return (
    <FullScreenDialog onClose={onClose} title={"Regal erstellen"}>
      {creationError && (
        <Warning
          text={
            "Regal konnte nicht erstellt werden. Überprüfen sie die eingegebenen Werte."
          }
        />
      )}
      <div className="flex flex-col gap-4">
        <div>
          <InputTitle Title={"Anzahl Fächer"} />
          <TextInput
            value={createData.compartments}
            onChange={(e) => handleInputChange("compartments", e.target.value)}
            type={"Number"}
          />
        </div>
        <div>
          <InputTitle Title={"Größe eines Fach"} />
          <TextInput
            value={createData.compartmentsSize}
            onChange={(e) =>
              handleInputChange("compartmentsSize", e.target.value)
            }
            type={"Number"}
          />
        </div>
        <div className="flex flex-row gap-2">
          <Button
            text={"Erstellen"}
            style={"primary"}
            onClick={() => handleCreate()}
          />
          <Button text={"Abbrechen"} style={"secondary"} onClick={onClose} />
        </div>
      </div>
    </FullScreenDialog>
  );
}

export default CreateShelf;
