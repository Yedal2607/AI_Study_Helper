import { useContext } from "react";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button type="button" onClick={toggleTheme} className="ui-toggle" aria-label={`Cambiar a modo ${nextTheme}`}>
      {theme === "dark" ? "Modo claro" : "Modo oscuro"}
    </button>
  );
}