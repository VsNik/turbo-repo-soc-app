import { ThemeContext } from "@shared/hooks/use-theme";
import { PropsWithChildren, useEffect, useState } from "react";

type Themes = "light" | "dark";

export function ThemeProvider({ children }: PropsWithChildren) {
  const [theme, setTheme] = useState("");

  useEffect(() => {
    const theme = localStorage.getItem("app-theme") ?? "dark";
    setTheme(theme);
  }, []);

  useEffect(() => {
    if (theme) {
      document.documentElement.dataset.theme = theme;
    }
  }, [theme]);

  const changeTheme = (theme: Themes) => {
    localStorage.setItem("app-theme", theme);
    setTheme(theme);
  };

  if (!theme) return;

  return <ThemeContext value={{ theme, changeTheme }}>{children}</ThemeContext>;
}
