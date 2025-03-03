import { createContext, use } from "react";

type Themes = "light" | "dark";

type Props = {
  theme: string;
  changeTheme: (theme: Themes) => void;
};

export const ThemeContext = createContext<Props>({} as Props);

export function useTheme() {
  const context = use(ThemeContext);
  if (!context) {
    throw new Error("Header must be used within a ThemeProvider");
  }
  return context;
}
