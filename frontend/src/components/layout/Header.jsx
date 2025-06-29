import { useLocation, useNavigate } from "react-router-dom";
import { logout } from "../../services/Employees";
import { getMe } from "../../services/Employees";
import { useEffect, useState, useCallback, useRef } from "react";

function Header({ Views, StartView, onActiveViewChange }) {
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;

  const [employeeName, setEmployeeName] = useState("");
  const [viewComponents, setViewComponents] = useState(<div></div>);
  const [activeView, setActiveView] = useState(StartView || "");
  const [hoverPosition, setHoverPosition] = useState({ left: 0, width: 0 });
  const viewRefs = useRef({});

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

  const handleMouseEnter = useCallback((element) => {
    const rect = element.getBoundingClientRect();
    const parentRect = element.parentElement.getBoundingClientRect();
    setHoverPosition({
      left: rect.left - parentRect.left,
      width: rect.width,
    });
  }, []);

  const handleMouseLeave = useCallback(() => {
    if (activeView && viewRefs.current[activeView]) {
      const element = viewRefs.current[activeView];
      setHoverPosition({
        left: element.offsetLeft,
        width: element.offsetWidth,
      });
    }
  }, [activeView]);

  const renderViews = useCallback(
    (views) => {
      const processedViews = views.map((view) => (
        <div
          key={view}
          ref={(el) => (viewRefs.current[view] = el)}
          className={`relative z-10 cursor-pointer rounded-xl px-4 py-1 transition-colors duration-200 select-none ${
            view === activeView
              ? "text-gray-700"
              : "text-gray-600 hover:text-gray-800"
          }`}
          onClick={() => {
            setActiveView(view);
            onActiveViewChange(view);
          }}
          onMouseEnter={(e) => handleMouseEnter(e.target)}
          onMouseLeave={handleMouseLeave}
        >
          {view}
        </div>
      ));

      setViewComponents(processedViews);
    },
    [onActiveViewChange, activeView, handleMouseEnter, handleMouseLeave],
  );

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  useEffect(() => {
    updateName();
  }, [updateName]);

  useEffect(() => {
    // Set hover effect on page load
    if (activeView && viewRefs.current[activeView])
      handleMouseEnter(viewRefs.current[activeView]);

    renderViews(Views);
  }, [renderViews, Views, handleMouseEnter, activeView]);

  return (
    <div className="sticky top-0 z-50 flex w-full flex-row justify-between bg-white shadow-lg">
      <div className="m-2 flex min-w-60 flex-row">
        <img className="h-12" src="jupiter.png" />
        <h1 className="bg-primary mx-3 my-auto text-xl font-semibold">
          Jupiter
        </h1>
      </div>
      <div className="relative m-auto flex flex-row rounded-2xl bg-gray-200 px-1.5 py-1.5 inset-shadow-sm">
        <div
          className="absolute rounded-xl bg-gray-300 transition-all duration-300 ease-in-out"
          style={{
            left: `${hoverPosition.left}px`,
            width: `${hoverPosition.width}px`,
            height: "calc(100% - 12px)",
            top: "6px",
            opacity: 1,
          }}
        />
        {viewComponents}
      </div>
      <div className="m-2 my-auto flex min-w-60 flex-row justify-end">
        <div className="mx-2 text-base font-semibold">{employeeName}</div>
        <img
          className="h-6 rounded-md bg-red-300 p-1 transition-all duration-300 ease-in-out hover:bg-red-400"
          src="logout.png"
          onClick={handleLogout}
        />
      </div>
    </div>
  );
}

export default Header;
