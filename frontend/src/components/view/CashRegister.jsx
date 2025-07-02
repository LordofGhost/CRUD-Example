import { useState, useEffect } from "react";
import ProductList from "../features/CashRegister/ProductList";
import { sellProduct } from "../../services/Stock";
import Button from "../common/Button";
import Warning from "../common/Warning";
import SellList from "../features/CashRegister/SellList";

function CashRegister() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showWarning, setShowWarning] = useState(false);

  useEffect(() => {
    let scannedCode = "";

    function handleKeyDown(e) {
      if (e.key === "Tab") {
        e.preventDefault();
        if (scannedCode) {
          handleProductSelect(parseInt(scannedCode, 10));
          scannedCode = "";
        }
      } else if (!isNaN(e.key)) {
        scannedCode += e.key;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  function handleProductSelect(productId) {
    setShoppingCart((prev) => {
      const existingProduct = prev.find((item) => item.productId === productId);
      if (existingProduct) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      } else {
        return [...prev, { productId: productId, amount: 1 }];
      }
    });
  }

  function handleCountChange(productId, amount) {
    setShoppingCart((prev) => {
      return prev.map((item) =>
        item.productId === productId ? { ...item, amount: amount } : item,
      );
    });
  }

  function handleProductRemove(productId) {
    setShoppingCart((prev) =>
      prev.filter((item) => item.productId !== productId),
    );
  }

  async function handleSell() {
    const result = await sellProduct(shoppingCart);
    if (result) {
      setShoppingCart([]);
    } else {
      setShowWarning(true);
      setTimeout(() => setShowWarning(false), 6000);
    }
  }

  function handleCancel() {
    setShoppingCart([]);
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden">
      <div className="max-w-1/2 flex-1">
        <ProductList categoryFilter={"Alle"} onClick={handleProductSelect} />
      </div>
      <div className="w-1 bg-gray-300"></div>
      <div className="flex-1">
        <div className="flex h-full flex-col p-7">
          <div className="mb-3 text-center text-2xl">Warenkorb</div>
          {showWarning && (
            <Warning
              text={
                "Produkte konnten nicht verkauft werden! Überprüfe ob für die ausgewählten Produkte auch ausreichende Stückzahlen in den Regalen liegen oder ob Produkte ausgewählt sind."
              }
            />
          )}
          <div className="flex flex-1 flex-col">
            <SellList
              products={shoppingCart}
              handleCountChange={handleCountChange}
              handleProductRemove={handleProductRemove}
            />
            <div className="flex w-full justify-end gap-2">
              <Button
                style={"cancel"}
                onClick={handleCancel}
                text={"Zurücksetzen"}
              />
              <Button
                style={"accept"}
                onClick={handleSell}
                text={"Verkaufen"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CashRegister;
