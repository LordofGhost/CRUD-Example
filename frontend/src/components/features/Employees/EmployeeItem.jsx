import { useState } from "react";
import { deleteEmployee, editEmployee } from "../../../services/Employees";
import { roles } from "../../view/Employees";
import TextInput from "../../common/TextInput";
import InputTitle from "../../common/InputTitle";
import Dropdown from "../../common/Dropdown";
import Button from "../../common/Button";

function EmployeeItem({ Employee, handleReload }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [editData, setEditData] = useState({
    firstName: Employee.firstName,
    lastName: Employee.lastName,
    role: Employee.role,
  });

  function handleInputChange(field, value) {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  function getRoleBackgroundColor(role) {
    switch (role?.toLowerCase()) {
      case "manager":
        return "bg-red-200";
      case "cashier":
        return "bg-green-200";
      case "shelffiller":
        return "bg-purple-200";
      default:
        return "bg-gray-200";
    }
  }

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  async function handleDelete() {
    await deleteEmployee(Employee.email);
    handleReload();
  }

  async function handleSave() {
    Employee = await editEmployee(
      Employee.email,
      editData.firstName,
      editData.lastName,
      editData.role,
    );
    setIsMenuOpen(false);
    handleReload();
  }

  function handleCancel() {
    setEditData({
      firstName: Employee.firstName,
      lastName: Employee.lastName,
      role: Employee.role,
    });
    setIsMenuOpen(false);
  }

  return (
  <div className="w-full rounded-md shadow-lg transition-all duration-300">
    <div
      className={`flex w-full max-w-250 flex-row items-center justify-between rounded-md bg-white p-3 transition-transform duration-300 ${
        isMenuOpen ? "rounded-b-none border-b border-gray-200" : ""
      }`}
    >
      <div className="font-semibold">
        {Employee.firstName + " " + Employee.lastName}
      </div>
      <div className="flex flex-row gap-5">
        <div
          className={`${getRoleBackgroundColor(
            Employee.role,
          )} flex h-8 items-center rounded-md px-2`}
        >
          {Employee.role}
        </div>
        <img
          className={`h-8 cursor-pointer rounded-md p-1 transition-transform duration-300 hover:bg-gray-300 ${
            isMenuOpen ? "rotate-0" : "rotate-90"
          }`}
          src="arrow.png"
          onClick={toggleMenu}
        />
      </div>
    </div>

    {/** Dropdown */}
    <div
      className={`overflow-hidden transition-all duration-300 ease-in-out ${
        isMenuOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
      }`}
    >
      <div className="flex flex-col gap-6 rounded-b-md border-t-0 border-gray-200 bg-white p-6">
        <div>
          <InputTitle Title={"Vorname"} />
          <TextInput
            value={editData.firstName}
            onChange={(e) => handleInputChange("firstName", e.target.value)}
            placeHolder={"Vorname eingeben"}
          />
        </div>

        <div>
          <InputTitle Title={"Nachname"} />
          <TextInput
            value={editData.lastName}
            onChange={(e) => handleInputChange("lastName", e.target.value)}
            placeHolder={"Nachname eingeben"}
          />
        </div>

        <div>
          <InputTitle Title={"Rolle"} />
          <Dropdown
            value={editData.role}
            onChange={(e) => handleInputChange("role", e.target.value)}
            options={roles}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex w-full justify-between">
            <div className="flex gap-2">
              <Button
                style={"primary"}
                text={"Speichern"}
                onClick={handleSave}
              />
              <Button
                style={"secondary"}
                text={"Abbrechen"}
                onClick={handleCancel}
              />
            </div>
            <Button
              style={"cancel"}
              text={"Mitarbeiter entlasten"}
              onClick={handleDelete}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
  );
}

export default EmployeeItem;
