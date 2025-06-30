import { useState } from "react";
import EditProduct from "./EditProduct";
import BuyProduct from "./BuyProduct";

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

function ProductItem({ Product, handleReload, onClick, editable, showStock }) {
  const [isEditMenuOpen, setIsEditMenuOpen] = useState(false);
  const [isBuyMenuOpen, setIsBuyMenuOpen] = useState(false);

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
          <div className="text-2xl font-medium">{Product.name}</div>
          <div>{limitDescription(Product.description)}</div>
          <div>
            {Product.shelfId ? `Regal ${Product.shelfId}` : "Kein Regal"}
          </div>
          <div>{Product.sellingPrice}€</div>
          <div className="flex gap-2">
            <div className="flex gap-1 rounded-md bg-indigo-400 px-1">
              <div>Lager</div>
              <div>{Product.inStock}</div>
            </div>
            <div className="flex gap-1 rounded-md bg-yellow-400 px-1">
              <div>Regal</div>
              <div>{Product.onTheShelf}</div>
            </div>
          </div>
        </div>
        <div className="flex flex-col justify-between">
          {editable && (
            <>
              <img
                src="edit.png"
                className="h-8 rounded-md p-1 hover:bg-gray-300"
                onClick={() => setIsEditMenuOpen(true)}
              />
              {isEditMenuOpen && (
                <EditProduct
                  Product={Product}
                  handleReload={handleReload}
                  onClose={() => setIsEditMenuOpen(false)}
                />
              )}
            </>
          )}
          {showStock && (
            <>
              <img
                src="buy.png"
                className="h-8 rounded-md p-1 hover:bg-gray-300"
                onClick={() => setIsBuyMenuOpen(true)}
              />
              {isBuyMenuOpen && (
                <BuyProduct
                  Product={Product}
                  handleReload={handleReload}
                  onClose={() => setIsBuyMenuOpen(false)}
                />
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductItem;
