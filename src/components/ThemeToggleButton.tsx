import { useTheme } from "../theme/themeContext";
import { Moon, Sun } from "lucide-react";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="bg-primary-500 dark:text-secondary-400 hover:bg-hover z-10 size-10 cursor-pointer rounded-full p-2 text-rose-900 transition delay-150 duration-300 ease-in-out hover:text-rose-900 dark:bg-rose-900"
    >
      {theme === "light" ? <Moon /> : <Sun />}
    </button>
  );
};

export default ThemeToggleButton;
