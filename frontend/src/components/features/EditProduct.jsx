import { saveProduct } from "../../services/Products";

function EditProduct({ product }) {
  return (
    <div className="rounded-2xl bg-white shadow-xl">
      <div>
        <input type="text">{product.produtId}</input>
      </div>
      <div>
        <button onClick={saveProduct}>Bestätigen</button>
      </div>
    </div>
  );
}

export default EditProduct;
