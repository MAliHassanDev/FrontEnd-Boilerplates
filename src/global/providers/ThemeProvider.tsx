import { useEffect, useState, type JSX } from "react";
import type { ThemeMode } from "@/global/context/themeContext";
import ThemeContext from "@/global/context/themeContext";

type UserColorPalette<T extends string> = Record<
  T,
  { dark: string; light: string }
>;

export type ThemeConfig<T extends string> = {
  mode: ThemeMode | "system";
  colors: UserColorPalette<T>;
};

type ThemeProviderProps<T extends string> = {
  themeConfig: ThemeConfig<T>;
  children: Array<JSX.Element> | JSX.Element;
};

function ThemeProvider<T extends string>({
  children,
  themeConfig,
}: ThemeProviderProps<T>) {
  const mode =
    themeConfig.mode == "system"
      ? getSystemThemeMode()
      : getModeFromLocalStorage(themeConfig.mode);

  const [themeMode, setThemeMode] = useState<ThemeMode>(mode);

  function toggleThemeMode() {
    const newMode = themeMode == "dark" ? "light" : "dark";
    setThemeMode(newMode);
  }

  useEffect(() => {
    setModeInLocalStorage(themeMode);
  }, [themeMode]);

  return (
    <ThemeContext.Provider
      value={{
        theme: {
          mode: themeMode,
          colors: extractThemeModeColors(themeConfig.colors, themeMode),
        },
        toggleThemeMode,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
}

function extractThemeModeColors<T extends string>(
  colorPalette: UserColorPalette<T>,
  mode: ThemeMode,
): Record<T, string> {
  const colors: Record<T, string> = {} as Record<T, string>;

  for (const clr of Object.keys(colorPalette) as Array<T>) {
    colors[clr] = colorPalette[clr][mode];
  }
  return colors;
}

function getSystemThemeMode() {
  const systemColorScheme: ThemeMode = window.matchMedia(
    "(prefers-color-scheme: dark)",
  ).matches
    ? "dark"
    : "light";
  return systemColorScheme;
}

function getModeFromLocalStorage(userThemeMode: ThemeMode) {
  const localThemeMode = localStorage.getItem(
    "MyThemeMode",
  ) as ThemeMode | null;
  if (!localThemeMode) {
    setModeInLocalStorage(userThemeMode);
    return userThemeMode;
  }
  return localThemeMode;
}

function setModeInLocalStorage(mode: ThemeMode) {
  localStorage.setItem("MyThemeMode", mode);
}

export default ThemeProvider;
