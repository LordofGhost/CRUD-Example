export const getAllEmployees = async () => {
  try {
    const response = await fetch(`api/Employees`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Could not get Employee: " + error);
    return null;
  }
};

export const getEmployee = async (email) => {
  try {
    const response = await fetch(`api/Employees/${email}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    return await response.json();
  } catch (error) {
    console.error("Could not get Employee: " + error);
    return null;
  }
};

export const editEmployee = async (email, firstName, lastName, role) => {
  try {
    const response = await fetch(`api/Employees/${email}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        email: " ",
        role: role,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("User could not be edited: " + error);
    return false;
  }
};

export const deleteEmployee = async (email) => {
  try {
    const response = await fetch(`api/Employees/${email}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.ok;
  } catch (error) {
    console.error("User could not be deletet: " + error);
    return false;
  }
};

export const getMe = async () => {
  try {
    const response = await fetch("/api/Employees/me", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    });

    if (!response.ok) return null;

    return await response.json();
  } catch (error) {
    console.error("Failed to get user data:", error);
    return null;
  }
};

export const registerEmployee = async (firstName, lastName, role, password) => {
  try {
    const response = await fetch("api/Employees/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: firstName,
        lastName: lastName,
        password: password,
        role: role,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("User could not be created: " + error);
    return false;
  }
};

export const login = async (email, password) => {
  try {
    const response = await fetch("/api/Employees/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });
    return response.ok;
  } catch (error) {
    console.error("User could not be logged in: " + error);
    return false;
  }
};

export const logout = async () => {
  try {
    await fetch("/api/Employees/logout", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    console.error("Failed to logout user: " + error);
  }
};
