import { useState, useEffect } from "react";
import Home from "./pages/Home.jsx";

function App() {
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);
  useEffect(() => {
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  });

  return (
    <>
      <div
        className={`min-h-screen w-full pb-20 transition-colors duration-300 ${
          darkMode ? "bg-gray-900" : "bg-gray-100"
        }`}
      >
        <nav className="p-4 flex justify-end">
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2 rounded-full bg-white dark:bg-gray-700 shadow-lg hover:scale-110 transition-transform"
          >
            {darkMode ? "☀️" : "🌙"}
          </button>
        </nav>
        <Home isDark={darkMode}/>
      </div>
    </>
  );
}

export default App;
