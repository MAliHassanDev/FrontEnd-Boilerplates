import ThemeContext, { type Theme } from "@/hooks/context/themeContext";
import { useEffect, useState, type JSX } from "react";

type ThemeProviderProps = {
  children: Array<JSX.Element> | JSX.Element;
};
const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>(getTheme());

  useEffect(() => {
    localStorage.setItem("sketchTheme", theme);
  }, [theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider
      value={{
        theme,
        setTheme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

function getTheme() {
  const theme = localStorage.getItem("sketchTheme") as Theme | null;
  if (!theme) {
    const defaultTheme: Theme = window.matchMedia(
      "(prefers-color-scheme: dark)"
    ).matches
      ? "dark"
      : "light";
    localStorage.setItem("sketchTheme", defaultTheme);
    return defaultTheme;
  } else {
    return theme;
  }
}

export { ThemeProvider, ThemeContext };
