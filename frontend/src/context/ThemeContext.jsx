import {
  createContext,
  useEffect,
  useState,
} from "react";

export const ThemeContext =
  createContext();

function ThemeProvider({ children }) {

  const [darkMode, setDarkMode] =
    useState(() => {

      const savedTheme =
        localStorage.getItem("theme");

      return savedTheme
        ? JSON.parse(savedTheme)
        : true;
    });

  useEffect(() => {

    localStorage.setItem(
      "theme",
      JSON.stringify(darkMode)
    );

  }, [darkMode]);

  // Toggle Theme
  const toggleTheme = () => {

    setDarkMode(!darkMode);
  };

  return (
    <ThemeContext.Provider
      value={{
        darkMode,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

export default ThemeProvider;