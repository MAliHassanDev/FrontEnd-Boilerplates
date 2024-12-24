import { useContext } from "react";
import ThemeContext, {
  type ThemeContextType,
} from "@/global/context/themeContext";
import type { themeColor } from "@/theme/theme";

const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error("Theme context is undefined");
  return context as ThemeContextType<themeColor>;
};

export default useTheme;
