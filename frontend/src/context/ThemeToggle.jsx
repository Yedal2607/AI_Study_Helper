import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { ThemeContext } from "./ThemeContext";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const nextTheme = theme === "dark" ? "light" : "dark";

  return (
    <button type="button" onClick={toggleTheme} className="ui-toggle" aria-label={`Cambiar a modo ${nextTheme}`} title={`Cambiar a modo ${nextTheme}`}>
      <FontAwesomeIcon icon={theme === "dark" ? faSun : faMoon} aria-hidden="true" />
    </button>
  );
}