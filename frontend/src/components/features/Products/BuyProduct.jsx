import { useState } from "react";
import Button from "../../common/Button";
import FullScreenDialog from "../../common/FullScreenDialog";
import InputTitle from "../../common/InputTitle";
import TextInput from "../../common/TextInput";
import { restockProduct } from "../../../services/Stock";

function BuyProduct({ Product, handleReload, onClose }) {
  const [buyAmount, setBuyAmount] = useState(1);

  async function handleBuy() {
    await restockProduct(Product.productId, buyAmount);
    handleReload();
  }

  function handleCancel() {
    setBuyAmount(1);
    onClose();
  }

  return (
    <FullScreenDialog title={Product.name + " kaufen"} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <div>
          <InputTitle Title={"Anzahl"} />
          <TextInput
            type={"Number"}
            value={buyAmount}
            onChange={(e) => {
              if (e.target.value > 0) setBuyAmount(e.target.value);
            }}
          />
        </div>
        <div className="space-y-2 py-2">
          <div className="text-lg font-semibold">
            Einkaufspreis: {Product.purchasePrice}€
          </div>
          <div className="flex gap-1 text-xl font-bold">
            <div>Kosten:</div>
            <div className="rounded-md bg-red-300 px-1">
              {Product.purchasePrice * buyAmount}€
            </div>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <div className="flex w-full justify-start">
            <div className="flex gap-2">
              <Button style={"primary"} text={"Kaufen"} onClick={handleBuy} />
              <Button
                style={"secondary"}
                text={"Abbrechen"}
                onClick={handleCancel}
              />
            </div>
          </div>
        </div>
      </div>
    </FullScreenDialog>
  );
}

export default BuyProduct;
