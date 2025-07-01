import { useEffect, useState } from "react";
import { deleteShelf, setCompartments } from "../../../services/Shelves";
import Button from "../../common/Button";
import InputTitle from "../../common/InputTitle";
import Warning from "../../common/Warning";
import Dropdown from "../../common/Dropdown";

function ShelfItem({ Shelf, handleReload, ProductIds }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [savingError, setSavingError] = useState(false);
  const [compartmentItems, setCompartmentItems] = useState(
    Shelf.productIds.map((item) => (item === null ? "" : item)),
  );
  const [productSelectComponents, setProductSelectComponents] = useState([
    <div key={1}></div>,
  ]);

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  async function handleDelete() {
    await deleteShelf(Shelf.shelfId);
    handleReload();
  }

  async function handleSave() {
    const result = await setCompartments(Shelf.shelfId, compartmentItems);
    if (result) {
      setIsMenuOpen(false);
      handleReload();
    } else {
      setSavingError(true);
    }
  }

  function handleCancel() {
    setCompartmentItems(
      Shelf.productIds.map((item) => (item === null ? "" : item)),
    );
    setSavingError(false);
    setIsMenuOpen(false);
  }

  useEffect(() => {
    function createProductsSelectors() {
      let components = [];
      for (let i = 0; i < Shelf.compartments; i++) {
        components[i] = (
          <div key={i}>
            <InputTitle Title={`Fach ${i + 1}`} />
            <Dropdown
              options={["", ...ProductIds]}
              type={"number"}
              placeholder={"Artikelnummer wählen"}
              value={compartmentItems[i] || ""}
              onChange={(e) =>
                setCompartmentItems((prev) => {
                  const newItems = [...prev];
                  newItems[i] = parseInt(e.target.value) || "";
                  return newItems;
                })
              }
            />
          </div>
        );
      }

      setProductSelectComponents(components);
    }

    createProductsSelectors();
  }, [Shelf.compartments, compartmentItems, ProductIds]);

  return (
    <div className="w-full rounded-md shadow-lg transition-all duration-300">
      <div
        className={`flex w-full max-w-250 flex-row items-center justify-between rounded-md bg-white p-3 transition-transform duration-300 ${
          isMenuOpen ? "rounded-b-none border-b border-gray-200" : ""
        }`}
      >
        <div className="font-semibold">Regal {Shelf.shelfId}</div>
        <div className="flex flex-row gap-5">
          <div className="flex h-8 items-center rounded-md bg-amber-300 px-2">
            Fächer {Shelf.compartments}
          </div>
          <div className="flex h-8 items-center rounded-md bg-blue-300 px-2">
            Größe {Shelf.compartmentsSize}
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
        className={`transition-all duration-300 ease-in-out ${
          isMenuOpen ? "max-h-200 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col gap-6 rounded-b-md border-t-0 border-gray-200 bg-white p-6">
          {savingError && (
            <Warning
              text={
                "Regal konnte nicht gespeichert werden. Überprüfen sie die eingegebenen Werte. Ein Produkt kann nicht in mehreren Fächern sein!"
              }
            />
          )}
          <div className="grid grid-cols-3 gap-5">
            {productSelectComponents}
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
                text={"Regal löschen"}
                onClick={handleDelete}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShelfItem;
