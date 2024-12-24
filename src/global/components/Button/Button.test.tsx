import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";
import ThemeContext, {
  type ThemeContextType,
} from "@/global/context/themeContext";

describe("Button", () => {
  it("renders with text which includes opposite theme", () => {
    renderButtonWithContext({
      theme: "dark",
      toggleTheme: vi.fn(),
    });
    const button = screen.getByTestId("button");
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent(/Switch to light mode/i);
  });

  it("calls toggleTheme when clicked", () => {
    const toggleTheme = vi.fn();
    renderButtonWithContext({ theme: "dark", toggleTheme });
    fireEvent.click(screen.getByTestId("button"));
    expect(toggleTheme).toHaveBeenCalledOnce();
  });
});

function renderButtonWithContext({ theme, toggleTheme }: ThemeContextType) {
  render(
    <ThemeContext.Provider
      value={{
        theme,
        toggleTheme,
      }}
    >
      <Button />
    </ThemeContext.Provider>,
  );
}
