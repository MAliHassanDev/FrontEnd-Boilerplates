import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import ThemeContext, {
  type ThemeContextType,
} from "@/global/context/themeContext";

describe("Button", () => {
  it("renders with text which includes opposite theme", () => {
    renderButtonWithContext({
      theme: { mode: "dark", colors: {} },
      toggleThemeMode: vi.fn(),
    });
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Switch to light mode/i);
  });

  it("calls toggleTheme when clicked", () => {
    const toggleThemeMode = vi.fn();
    renderButtonWithContext({
      theme: { mode: "dark", colors: {} },
      toggleThemeMode,
    });
    fireEvent.click(screen.getByTestId("button"));
    expect(toggleThemeMode).toHaveBeenCalledOnce();
  });
});

function renderButtonWithContext({
  theme,
  toggleThemeMode,
}: ThemeContextType<string>) {
  render(
    <ThemeContext.Provider
      value={{
        theme,
        toggleThemeMode,
      }}
    >
      <Button />
    </ThemeContext.Provider>,
  );
}
