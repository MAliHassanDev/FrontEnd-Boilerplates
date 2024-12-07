import ThemeContext from "@/hooks/context/themeContext";
import {useEffect, useState,  } from "react";




type ThemeProviderProps = {
  children: React.JSX.Element[] | React.JSX.Element
}
const ThemeProvider = ({children}:ThemeProviderProps) => {
  const [theme, setTheme] = useState<string>(getTheme());
  

  useEffect(() => {
    localStorage.setItem("sketchTheme", theme);
  },[theme]);

  function toggleTheme() {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
  }

  return (
    <ThemeContext.Provider value={
      {
        theme,
        setTheme,
        toggleTheme
      }
    }
    >
      {children}
    </ThemeContext.Provider>
  );
};




function getTheme() {
  const theme = localStorage.getItem("sketchTheme");
  if (!theme) {
    const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark": "light";
    localStorage.setItem("sketchTheme", defaultTheme);
    return defaultTheme;
  } else {
    return theme;
  }
}


export  {ThemeProvider,ThemeContext};