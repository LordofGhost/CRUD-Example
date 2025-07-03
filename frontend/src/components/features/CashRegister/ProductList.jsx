import { useCallback, useEffect, useState } from "react";
import { getProducts } from "../../../services/Products";
import ProductItem from "../Products/ProductItem";

function ProductList({ categoryFilter, onClick }) {
  const [productComponents, setProductComponents] = useState([
    <div key={1}></div>,
  ]);

  const renderProducts = useCallback(async () => {
    const products = await getProducts(categoryFilter);

    if (products) {
      const processedEmployees = products.map((product, index) => (
        <ProductItem
          Product={product}
          key={`product-${index}`}
          editable={false}
          showStock={false}
          onClick={() => onClick(product.productId)}
        />
      ));
      setProductComponents(processedEmployees);
    }
  }, [setProductComponents, categoryFilter, onClick]);

  useEffect(() => {
    renderProducts();
  }, [renderProducts]);

  return (
    <div className="grid grid-cols-1 gap-10 overflow-hidden p-7 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
      {productComponents}
    </div>
  );
}

export default ProductList;
