import useTheme from "@/global/hooks/useTheme";
import styles from "./Button.module.css";

const Button = () => {
  const { theme,toggleThemeMode} = useTheme();
  return (
    <button className={styles.button} data-testid="button"
      onClick={toggleThemeMode}
    >
      Switch to {theme.mode == "dark" ? "light" : "dark"} mode
    </button>
  );
};

export default Button;
