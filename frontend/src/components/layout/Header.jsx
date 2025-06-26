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
          className={`px-4 py-1 rounded-xl select-none cursor-pointer relative z-10 transition-colors duration-200 ${
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
    [onActiveViewChange, activeView, handleMouseEnter, handleMouseLeave]
  );

  async function handleLogout() {
    await logout();
    navigate("/");
  }

  useEffect(() => {
    // Set hove effect on page load
    if (activeView && viewRefs.current[activeView])
      handleMouseEnter(viewRefs.current[activeView]);

    updateName();
    renderViews(Views);
  }, [updateName, renderViews, Views, handleMouseEnter, activeView, StartView]);

  return (
    <div className="flex flex-row shadow-lg justify-between">
      <div className="flex flex-row min-w-60 m-2">
        <img className="h-12" src="jupiter.png" />
        <h1 className="font-semibold text-xl bg-primary my-auto mx-3">
          Jupiter
        </h1>
      </div>
      <div className="flex flex-row bg-gray-200 inset-shadow-sm rounded-2xl m-auto px-1.5 py-1.5 relative">
        <div
          className="absolute bg-gray-300 rounded-xl transition-all duration-300 ease-in-out"
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
