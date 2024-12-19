import ThemeContext, {
  type ThemeContextType,
} from "@/hooks/context/themeContext";
import styles from "./App.module.css";
import { useContext } from "react";
import Button from "@/components/button/Button";

const App = () => {
  const { theme } = useContext(ThemeContext) as ThemeContextType;
  return (
    <div className={`${styles.app} ${theme}`}>
      <Button />
    </div>
  );
};

export default App;
