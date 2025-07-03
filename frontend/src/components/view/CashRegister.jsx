import { useState, useEffect, useCallback } from "react";
import ProductList from "../features/CashRegister/ProductList";
import { sellProduct } from "../../services/Stock";
import Button from "../common/Button";
import Warning from "../common/Warning";
import { getProduct } from "../../services/Products";

function CashRegister() {
  const [shoppingCart, setShoppingCart] = useState([]);
  const [showWarning, setShowWarning] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);
  const [productComponents, setProductComponents] = useState([
    <div key={1}></div>,
  ]);

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
  }, []);

  // Get total price
  useEffect(() => {
    var totalProceTemp;

    shoppingCart.forEach((product) => {
      totalProceTemp += product.sellingPrice;
    });

    setTotalPrice(totalProceTemp);
  }, [shoppingCart, setTotalPrice]);

  function handleProductSelect(productId) {
    setShoppingCart(async (prev) => {
      const existingProduct = prev.find(
        (product) => product.productId === productId,
      );
      if (existingProduct) {
        return prev.map((item) =>
          item.productId === productId
            ? { ...item, amount: item.amount + 1 }
            : item,
        );
      } else {
        const newProduct = await getProduct(productId);
        return [...prev, { ...newProduct, amount: 1 }];
      }
    });
  }

  function handleAmountChange(product, amount) {
    if (amount > 1 && amount <= product.onTheShelf) {
      setShoppingCart((prev) => {
        return prev.map((item) =>
          item.productId === product.productId
            ? { ...item, amount: amount }
            : item,
        );
      });
    }
  }

  function handleProductRemove(product) {
    setShoppingCart((prev) =>
      prev.filter((item) => item.productId !== product.productId),
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

  const renderProducts = useCallback(async () => {
    if (shoppingCart.length > 0) {
      const processedProducts = await shoppingCart.map(
        async (product, index) => (
          <SellItem
            key={`sellProduct-${index}`}
            product={product}
            handleAmountChange={handleAmountChange}
            handleProductRemove={handleProductRemove}
          />
        ),
      );
      setProductComponents(processedProducts);
    }
  }, [shoppingCart, handleAmountChange, handleProductRemove]);

  useEffect(() => {
    renderProducts();
  }, [renderProducts]);

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
            <div className="mb-7 flex flex-1 flex-col justify-end gap-4">
              {productComponents}
            </div>
            <div className="flex w-full justify-between">
              <div className="items-center">{totalPrice}€</div>
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
