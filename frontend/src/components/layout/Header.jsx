import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/Employees";
import { getMe } from "../../services/Employees";
import { useEffect, useState, useCallback } from "react";

function Header({ PageName }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const [employeeName, setEmployeeName] = useState("");

  const updateName = useCallback(async () => {
    const user = await getMe();

    if (user == null) {
      if (currentPath !== "/") {
        navigate("/");
      } else {
        setEmployeeName("");
      }
    } else {
      setEmployeeName(user.firstName + " " + user.lastName);
    }
  }, [currentPath, navigate]);

  useEffect(() => {
    updateName();
  }, [updateName]);

  function handleLogout() {
    setEmployeeName("");
    logout();
    navigate("/");
    setEmployeeName("");
  }

  return (
    <div className="flex flex-row shadow-lg justify-between">
      <div className="flex flex-row min-w-60 m-2">
        <img className="h-12" src="jupiter.png" />
        <h1 className="font-semibold text-xl bg-primary my-auto mx-3">
          Jupiter
        </h1>
      </div>
      <div className="bg-gray-200 inset-shadow-sm rounded-2xl m-auto px-3 py-1.5">
        {PageName}
      </div>
      <div className="flex flex-row min-w-60 m-2 my-auto justify-end">
        <div className="font-semibold text-base mx-2">{employeeName}</div>
        <img
          className="h-6 bg-red-300 hover:bg-red-400 p-1 rounded-md transition-all ease-in-out duration-300"
          src="logout.png"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Header;
