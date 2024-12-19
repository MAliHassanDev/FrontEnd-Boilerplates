import { createContext, type Dispatch, type SetStateAction } from "react";

export type Theme = "dark" | "light";

export type ThemeContextType = {
  theme: Theme;
  setTheme: Dispatch<SetStateAction<Theme>>;
  toggleTheme: () => void;
};

const ThemeContext = createContext<ThemeContextType | null>(null);

export default ThemeContext;
