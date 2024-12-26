import type { ThemeConfig } from "@/global/providers/ThemeProvider";

export const theme = createThemeConfig({
  mode: "dark",
  colors: {
    primary: {
      dark: "#333",
      light: "white",
    },
  },
} as const);

function createThemeConfig<T extends string>(
  themeConfig: ThemeConfig<T>,
): ThemeConfig<T> {
  return themeConfig;
}
