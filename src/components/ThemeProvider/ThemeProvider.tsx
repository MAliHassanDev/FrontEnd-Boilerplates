import ThemeContext, { type Theme } from "@/hooks/context/themeContext";
import { useEffect, useState, type JSX } from "react";

type ThemeProviderProps = {
  children: Array<JSX.Element> | JSX.Element;
};
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    localStorage.setItem("BoilerplateTheme", theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function getTheme() {
  const theme = localStorage.getItem("BoilerplateTheme") as Theme | null;
  if (!theme) {
    const defaultTheme: Theme = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches
      ? "dark"
      : "light";
    localStorage.setItem("BoilerplateTheme", defaultTheme);
    return defaultTheme;
  } else {
    return theme;
  }
}

export { ThemeProvider, ThemeContext };
