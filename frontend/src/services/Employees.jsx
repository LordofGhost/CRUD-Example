export const login = async (email, password) => {
  try {
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
