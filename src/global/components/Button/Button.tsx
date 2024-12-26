import useTheme from "@/global/hooks/useTheme";
import styles from "./Button.module.css";
import DarkMode from "@/global/icons/DarkMode";
import LightMode from "@/global/icons/LightMode";

const Button = () => {
  const { theme, toggleThemeMode } = useTheme();
  return (
    <button
      className={styles.button}
      data-testid="button"
      onClick={toggleThemeMode}
    >
      <span>Switch to {theme.mode == "dark" ? "light" : "dark"} mode</span>
      {theme.mode === "dark" ? (
        <LightMode color={theme.colors.primary} />
      ) : (
        <DarkMode />
      )}
    </button>
  );
};

export default Button;
