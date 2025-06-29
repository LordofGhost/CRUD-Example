import { useState } from "react";
import EditProduct from "./EditProduct";

// eslint-disable-next-line react-refresh/only-export-components
export const categorys = [
  "Laptops",
  "PCs",
  "Tablets",
  "Monitore",
  "Drucker",
  "Scanner",
  "Speichermedien",
  "Tastaturen",
  "Mäuse",
  "Zubehör",
];

function ProductItem({ Product, handleReload, onClick, editable }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  function openEditMenu() {
    setIsMenuOpen(true);
  }

  function limitDescription(description, maxLength = 30) {
    if (!description) return "";
    return description.length > maxLength
      ? description.substring(0, maxLength) + "..."
      : description;
  }

  return (
    <div
      className="flex max-w-100 min-w-64 flex-1 flex-col rounded-md shadow-lg"
      onClick={onClick}
    >
      <div className="border-b border-gray-200">
        <img src="product.png" className="m-auto h-40 rounded-md px-15 py-4" />
      </div>
      <div className="flex flex-row justify-between p-4">
        <div className="flex flex-col">
          <div className="font-semibold">{Product.name}</div>
          <div>{limitDescription(Product.description)}</div>
          <div>Regal: {Product.shelfId ?? "Nicht zugewiesen"}</div>
          <div>Kategorie: {categorys[Product.category]}</div>
          <div>Preis: {Product.sellingPrice}€</div>
        </div>
        {editable && (
          <>
            <img
              src="edit.png"
              className="h-8 rounded-md p-1 hover:bg-gray-300"
              onClick={openEditMenu}
            />
            {isMenuOpen && (
              <EditProduct
                Product={Product}
                handleReload={handleReload}
                onClose={() => setIsMenuOpen(false)}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default ProductItem;
