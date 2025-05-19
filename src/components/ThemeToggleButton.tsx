import { useTheme } from "../theme/themeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-primary-500 text-rose-900 dark:text-secondary-400 dark:bg-rose-900 size-10">
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggleButton;
