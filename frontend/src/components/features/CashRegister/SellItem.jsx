import TextInput from "../../common/TextInput";
import Button from "../../common/Button";

function SellItem({ product, handleAmountChange, handleProductRemove }) {
  return (
    <div className="flex w-full flex-row items-center justify-between rounded-md p-3 shadow-lg">
      <div className="flex items-center gap-5">
        <div className="font-semibold">{product.name}</div>
        <div className="rounded-md bg-orange-300 px-1">{product.productId}</div>
        <div className="rounded-md bg-red-300 px-1">
          {product.sellingPrice}€
        </div>
      </div>
      <div className="flex w-60 items-center gap-5">
        <Button
          style={"accept"}
          text={"+"}
          onClick={() => handleAmountChange(product, product.amount + 1)}
        />
        <TextInput
          type={"Number"}
          value={product.amount}
          onChange={(e) => handleAmountChange(product, e.target.value)}
        />
        <Button
          style={"cancel"}
          text={"-"}
          onClick={() => handleAmountChange(product, product.amount - 1)}
        />
        <button
          className="flex h-10 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-md p-2 transition-all duration-300 hover:rotate-90 hover:bg-gray-100 focus:ring-2 focus:ring-gray-300 focus:outline-none"
          onClick={() => handleProductRemove(product)}
          aria-label="Dialog schließen"
        >
          <img className="h-6 w-6" src="close.png" alt="Schließen" />
        </button>
      </div>
    </div>
  );
}

export default SellItem;
