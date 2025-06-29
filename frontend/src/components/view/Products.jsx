import { useState } from "react";
import Button from "../common/Button";
import CenterContainer from "../common/CenterContainer";
import Dropdown from "../common/Dropdown";
import InputTitle from "../common/InputTitle";
import ProductList from "../features/Products/ProductList";
import EditProduct from "../features/Products/EditProduct";

function Products() {
  const categorys = [
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
    "Alle",
  ];
  const [categoryFilter, setCategoryFilter] = useState("Alle");
  const [reloadKey, setReloadKey] = useState(0);
  const [isCreateMenuOpen, setIsCreateMenuOpen] = useState(false);

  const handleReload = () => {
    setReloadKey((prev) => prev + 1);
  };

  return (
    <CenterContainer>
      <div className="mt-7 flex flex-row items-start justify-between">
        <div className="flex flex-col">
          <InputTitle Title={"Kategorie"} />
          <Dropdown
            options={categorys}
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          />
        </div>
        <Button
          style={"accept"}
          text={"Produkt erstellen"}
          onClick={() => setIsCreateMenuOpen(true)}
        />
        {isCreateMenuOpen && (
          <EditProduct
            handleReload={handleReload}
            Product={null}
            onClose={() => setIsCreateMenuOpen(false)}
          />
        )}
      </div>
      <ProductList
        key={reloadKey}
        handleReload={handleReload}
        categoryFilter={categoryFilter}
      />
    </CenterContainer>
  );
}

export default Products;
