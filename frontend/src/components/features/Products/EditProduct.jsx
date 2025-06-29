import { useState } from "react";
import {
  createProduct,
  deleteProduct,
  editProduct,
} from "../../../services/Products";
import FullScreenDialog from "../../common/FullScreenDialog";
import Button from "../../common/Button";
import InputTitle from "../../common/InputTitle";
import TextInput from "../../common/TextInput";
import Dropdown from "../../common/Dropdown";
import { categorys } from "./ProductItem";
import Warning from "../../common/Warning";

function EditProduct({ Product, handleReload, onClose }) {
  const [savingError, setSavingError] = useState(false);
  const editDataDefault = {
    productId: Product?.productId ?? "",
    name: Product?.name ?? "",
    description: Product?.description ?? "",
    category: Product?.category ?? 0,
    shelfId: Product?.shelfId ?? null,
    purchasePrice: Product?.purchasePrice ?? "",
    sellingPrice: Product?.sellingPrice ?? "",
  };
  const [editData, setEditData] = useState(editDataDefault);
  const newProduct = Product == null;

  function handleInputChange(field, value) {
    setEditData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }

  async function handleDelete() {
    await deleteProduct(Product.productId);
    handleReload();
  }

  async function handleSave() {
    let result;
    if (newProduct) {
      result = await createProduct(editData);
    } else {
      result = await editProduct(Product.productId, editData);
    }
    if (result) {
      onClose();
      handleReload();
    } else {
      setSavingError(true);
    }
  }

  function handleCancel() {
    setEditData(editDataDefault);
    onClose();
  }

  return (
    <FullScreenDialog
      title={newProduct ? "Erstelle ein Produkt" : "Bearbeite ein Produkt"}
      onClose={onClose}
    >
      {savingError && (
        <Warning
          text={
            "Produkt konnte nicht gespeichert werden. Überprüfen sie die eingegebenen Werte."
          }
        />
      )}
      <div className="flex flex-col gap-4">
        <div>
          <InputTitle Title={"Artikelnummer"} />
          <TextInput
            placeHolder={"Artielnummer eingeben"}
            value={editData.productId}
            onChange={(e) => handleInputChange("productId", e.target.value)}
            type={"Number"}
          />
        </div>
        <div>
          <InputTitle Title={"Artikelname"} />
          <TextInput
            placeHolder={"Artielname eingeben"}
            value={editData.name}
            onChange={(e) => handleInputChange("name", e.target.value)}
          />
        </div>
        <div>
          <InputTitle Title={"Artikelbeschreibung"} />
          <TextInput
            placeHolder={"Artielbeschreibung eingeben"}
            value={editData.description}
            onChange={(e) => handleInputChange("description", e.target.value)}
          />
        </div>
        <div>
          <InputTitle Title={"Kategorie"} />
          <Dropdown
            options={categorys}
            value={categorys.at(editData.category)}
            onChange={(e) =>
              handleInputChange("category", categorys.indexOf(e.target.value))
            }
          />
        </div>
        <div>
          <InputTitle Title={"Einkaufspreis in Euro"} />
          <TextInput
            placeHolder={"Einkaufspreis eingeben"}
            value={editData.purchasePrice}
            onChange={(e) => handleInputChange("purchasePrice", e.target.value)}
            type={"Number"}
          />
        </div>
        <div>
          <InputTitle Title={"Verkaufspreis in Euro"} />
          <TextInput
            placeHolder={"Verkaufspreis eingeben"}
            value={editData.sellingPrice}
            onChange={(e) => handleInputChange("sellingPrice", e.target.value)}
            type={"Number"}
          />
        </div>
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
            {!newProduct && (
              <Button
                style={"cancel"}
                text={"Produkt löschen"}
                onClick={handleDelete}
              />
            )}
          </div>
        </div>
      </div>
    </FullScreenDialog>
  );
}

export default EditProduct;
