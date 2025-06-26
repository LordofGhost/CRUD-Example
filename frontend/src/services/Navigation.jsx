import { getMe } from "./Employees";

export const navigateToPage = async (navigate) => {
  const me = await getMe();

  if (!me) {
    navigate("/");
    return;
  }

  switch (me.role) {
    case "Manager":
      navigate("/administration");
      break;
    case "Cashier":
      navigate("/CashRegister");
      break;
    case "ShelfFiller":
      navigate("/Warehouse");
      break;
    default:
      navigate("/");
      break;
  }
};
