export const login = async (email, password) => {
  const response = await fetch("/api/Employees/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      passwordHash: password,
    }),
  });

  return response.ok;
};

export const logout = async () => {
  await fetch("/api/Employees/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getMe = async () => {
  const response = await fetch("/api/Employees/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!response.ok) return null;

  return await response.json();
};

export const navigateToPage = async (navigate) => {
  getMe().then((me) => {
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
  });
};
