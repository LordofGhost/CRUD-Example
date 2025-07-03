import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../../../services/Products";
import ProductItem from "./ProductItem";

function ProductList({ handleReload, categoryFilter }) {
  const [productComponents, setProductComponents] = useState([
    <div key={1}></div>,
  ]);

  const renderProducts = useCallback(async () => {
    const products = await getProducts(categoryFilter);

    if (products) {
      const processedProducts = products.map((product, index) => (
        <ProductItem
          Product={product}
          key={`product-${index}`}
          editable={true}
          showStock={true}
          handleReload={handleReload}
        />
      ));
      setProductComponents(processedProducts);
    }
  }, [setProductComponents, handleReload, categoryFilter]);

  useEffect(() => {
    renderProducts();
  }, [renderProducts]);

  return (
    <div className="mb-7 grid gap-10 md:grid-cols-2 lg:grid-cols-3">
      {productComponents}
    </div>
  );
}

export default ProductList;
