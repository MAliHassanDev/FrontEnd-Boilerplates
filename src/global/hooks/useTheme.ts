import { useContext } from "react";
import { theme } from "@/styles/theme/theme";
import ThemeContext, {
  type ThemeContextType,
} from "@/global/context/themeContext";

type UserThemeColor = keyof typeof theme.colors;

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme context is undefined");
  return context as ThemeContextType<UserThemeColor>;
};

export default useTheme;
