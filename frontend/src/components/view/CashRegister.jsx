import { useState, useEffect, useCallback } from "react";
import ProductList from "../features/CashRegister/ProductList";
import { sellProduct } from "../../services/Stock";
import Button from "../common/Button";
import Warning from "../common/Warning";
import { getProduct } from "../../services/Products";
import SellItem from "../features/CashRegister/SellItem";

function CashRegister() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleProductSelect = useCallback(async (productId) => {
    const newProduct = await getProduct(productId);
    if (!newProduct) return;

    setShoppingCart((prev) => {
      if (newProduct.onTheShelf <= 0) {
        setShowWarning(true);
        setTimeout(() => setShowWarning(false), 6000);
        return prev;
      }

      const existingProduct = prev.find(
        (product) => product.productId === Number(productId),
      );

      if (existingProduct) {
        return prev.map((item) =>
          item.productId === Number(productId)
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      } else {
        return [...prev, { ...newProduct, amount: 1 }];
      }
    });
  }, []);

  // Scanner
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
  }, [handleProductSelect]);

  // Get total price
  useEffect(() => {
    var totalProceTemp = 0;

    shoppingCart.forEach((product) => {
      totalProceTemp += product.sellingPrice * product.amount;
    });

    setTotalPrice(totalProceTemp);
  }, [shoppingCart, setTotalPrice]);

  const handleAmountChange = useCallback((product, amount) => {
    if (amount >= 1 && amount <= product.onTheShelf) {
      setShoppingCart((prev) => {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, amount: amount }
            : item,
        );
      });
    }
  }, []);

  const handleProductRemove = useCallback((product) => {
    setShoppingCart((prev) =>
      prev.filter((item) => item.productId !== product.productId),
    );
  }, []);

  async function handleSell() {
    const result = await sellProduct(shoppingCart);
    if (result) {
      setShoppingCart([]);
      setRefreshKey((oldKey) => oldKey + 1);
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
        <ProductList
          categoryFilter={"Alle"}
          onClick={handleProductSelect}
          key={refreshKey}
        />
      </div>
      <div className="w-1 bg-gray-300"></div>
      <div className="flex-1">
        <div className="flex h-full flex-col">
          <div className="pt-7 text-center text-2xl">Warenkorb</div>
          {showWarning && (
            <div className="p-7">
              <Warning
                text={
                  "Produkte nicht dem Warenkorb hinzugefügt werden! Überprüfe ob für die ausgewählten Produkte auch ausreichende Stückzahlen in den Regalen liegen."
                }
              />
            </div>
          )}
          <div className="flex flex-1 flex-col overflow-hidden">
            <div className="mb-7 flex flex-1 flex-col gap-4 overflow-y-auto px-7 py-3">
              {shoppingCart.map((product, index) => (
                <SellItem
                  key={`sellProduct-${index}`}
                  product={product}
                  handleAmountChange={handleAmountChange}
                  handleProductRemove={handleProductRemove}
                />
              ))}
            </div>
            <div className="flex w-full justify-between px-7 pb-7">
              <Button style={"cancel"} onClick={null} text={`${totalPrice}€`} />
              <div className="flex gap-2">
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
    </div>
  );
}

export default CashRegister;
