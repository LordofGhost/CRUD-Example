import { useCallback, useEffect, useState } from "react";
import ShelfItem from "./ShelfItem";
import { getShelves } from "../../../services/Shelves";
import { getProducts } from "../../../services/Products";

function ShelfList({ handleReload }) {
  const [shelfComponents, setShelfComponents] = useState([<div key={1}></div>]);
  const [options, setOptions] = useState([""]);

  const renderShelves = useCallback(async () => {
    const shelves = await getShelves();

    if (shelves) {
      const processedShelves = shelves.map((shelf, index) => (
        <ShelfItem
          Shelf={shelf}
          key={`shelf-${index}`}
          handleReload={handleReload}
          ProductIds={options}
        />
      ));
      setShelfComponents(processedShelves);
    }
  }, [setShelfComponents, handleReload, options]);

  useEffect(() => {
    async function loadProductIds() {
      let products = await getProducts("Alle");

      if (products) {
        const options = products.map((product) => `${product.productId}`);
        setOptions(options);
      }
    }

    loadProductIds();
  }, []);

  useEffect(() => {
    renderShelves();
  }, [renderShelves]);

  return (
    <div className="mb-7 flex flex-col items-center gap-5">
      {shelfComponents}
    </div>
  );
}

export default ShelfList;
