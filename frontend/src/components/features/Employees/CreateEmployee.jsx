import { useState } from "react";
import FullScreenDialog from "../../common/FullScreenDialog";
import { registerEmployee } from "../../../services/Employees";
import { roles } from "../../view/Employees";
import Button from "../../common/Button";
import TextInput from "../../common/TextInput";
import InputTitle from "../../common/InputTitle";
import Dropdown from "../../common/Dropdown";
import Warning from "../../common/Warning";
import PasswordInput from "../../common/PasswordInput";

function CreateEmployee({ onClose, handleReload }) {
  const [creationError, setCreationError] = useState(false);
  const createDataDefault = {
    firstName: "",
    lastName: "",
    role: "Manager",
    password: "",
  };
  const [createData, setCreateData] = useState(createDataDefault);

  function handleInputChange(field, value) {
    setCreateData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleCreate() {
    const result = await registerEmployee(
      createData.firstName,
      createData.lastName,
      createData.role,
      createData.password,
    );
    if (result) {
      setCreationError(false);
      onClose();
      handleReload();
    } else {
      setCreationError(true);
    }
  }

  return (
    <FullScreenDialog onClose={onClose} title={"Mitarbeiter einstellen"}>
      {creationError && (
        <Warning
          text={
            "Mitarbeiter konnte nicht erstellt werden. Überprüfen sie die eingegebenen Werte."
          }
        />
      )}
      <div className="flex flex-col gap-4">
        <div>
          <InputTitle Title={"Vorname"} />
          <TextInput
            value={createData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeHolder={"Vornamen eingeben"}
          />
        </div>
        <div>
          <InputTitle Title={"Nachname"} />
          <TextInput
            value={createData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeHolder={"Nachname eingeben"}
          />
        </div>
        <div>
          <InputTitle Title={"Passwort"} />
          <PasswordInput
            value={createData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
          />
        </div>
        <div>
          <InputTitle Title={"Role"} />
          <Dropdown
            value={createData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            options={roles}
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

export default CreateEmployee;
