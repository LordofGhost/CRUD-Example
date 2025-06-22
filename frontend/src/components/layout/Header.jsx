import { logout } from "../../services/Employees";

function Header({ PageName, EmployeeName }) {
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
        <div className="font-semibold text-base mx-2">{EmployeeName}</div>
        <img
          className="h-6 bg-red-300 hover:bg-red-400 p-1 rounded-md transition-all ease-in-out duration-300"
          src="logout.png"
          onClick={logout}
        />
      </div>
    </div>
  );
}

export default Header;
