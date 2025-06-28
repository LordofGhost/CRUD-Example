import { getMe } from "./Employees";

export const navigateToPage = async (navigate) => {
  const me = await getMe();

  if (!me) {
    navigate("/");
    return;
  }

  switch (me.role) {
    case "Manager":
      navigate("/manager");
      break;
    case "Cashier":
      navigate("/cashier");
      break;
    case "ShelfFiller":
      navigate("/shelffiller");
      break;
    default:
      navigate("/");
      break;
  }
};
