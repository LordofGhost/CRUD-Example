import Header from "../components/layout/Header";
import Warehouse from "../components/view/Warehouse";

function ShelfFiller() {
  return (
    <>
      <Header
        Views={["Lager"]}
        StartView={"Lager"}
        onActiveViewChange={() => {}}
      />
      <Warehouse />
    </>
  );
}

export default ShelfFiller;
