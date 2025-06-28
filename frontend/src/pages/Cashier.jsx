import Header from "../components/layout/Header";
import CashRegister from "../components/view/CashRegister";

function Cashier() {
  return (
    <>
      <Header
        Views={["Kasse"]}
        StartView={"Kasse"}
        onActiveViewChange={() => {}}
      />
      <CashRegister />
    </>
  );
}

export default Cashier;
