import { useState, useEffect } from "react";

function CenterContainer({ children }) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div
        className={`flex w-full max-w-250 transform flex-col gap-7 px-10 transition-all duration-1000 ease-in-out ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        {children}
      </div>
    </div>
  );
}

export default CenterContainer;
