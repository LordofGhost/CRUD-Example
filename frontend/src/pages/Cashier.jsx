import Header from "../components/layout/Header";
import CashRegister from "../components/view/CashRegister";

function Cashier() {
  return (
    <div className="h-screen">
      <Header
        Views={["Kasse"]}
        StartView={"Kasse"}
        onActiveViewChange={() => {}}
      />
      <CashRegister />
    </div>
  );
}

export default Cashier;
