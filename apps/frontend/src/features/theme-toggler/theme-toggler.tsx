import { useTheme } from "@shared/hooks";
import { cn } from "@shared/libs/utils";
import { Moon, Sun } from "lucide-react";
import { HTMLAttributes } from "react";

type Props = {
  size?: number;
} & HTMLAttributes<HTMLDivElement>;

export function ThemeToggler({ className, size = 24 }: Props) {
  const { theme, changeTheme } = useTheme();

  return (
    <div className={cn("flex items-center", className)}>
      {theme === "dark" && (
        <button onClick={() => changeTheme("light")}>
          <Sun size={size} />
        </button>
      )}
      {theme === "light" && (
        <button onClick={() => changeTheme("dark")}>
          <Moon size={size} />
        </button>
      )}
    </div>
  );
}
