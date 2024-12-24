import { createContext } from "react";

export type ThemeMode = "dark" | "light";

export type Colors<T extends string> = Record<T,string>

export type Theme<T extends string > = {
  mode: ThemeMode;
  colors: Colors<T>;
};

export type ThemeContextType<T extends string> = {
  theme: Theme<T>;
  toggleThemeMode: () => void;
};

const ThemeContext = createContext<ThemeContextType<string> | null>(null);

export default ThemeContext;
