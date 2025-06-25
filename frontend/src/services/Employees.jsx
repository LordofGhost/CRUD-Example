export const login = async (email, password) => {
  await fetch("/api/Employees/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      passwordHash: password,
    }),
  });
};

export const logout = async () => {
  const response = await fetch("/api/Employees/logout", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
  });
  console.log(response);
};

export const getMyName = async () => {
  const response = await fetch("/api/Employees/me", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (
    !response.ok ||
    !response.headers.get("content-type").includes("application/json")
  )
    return null;

  const data = await response.json();
  return data.firstName + " " + data.lastName;
};
