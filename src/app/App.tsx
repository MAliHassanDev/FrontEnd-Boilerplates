import useTheme from "@/global/hooks/useTheme";
import styles from "./App.module.css";
import Button from "@/global/components/Button/Button";

const App = () => {
  const { theme } = useTheme();
  return (
    <div className={`${styles.app} ${theme.mode}`}>
      <Button />
    </div>
  );
};

export default App;
