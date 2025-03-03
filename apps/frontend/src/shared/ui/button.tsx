import { cn } from "@shared/libs/utils";
import { Loader2 } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

type Variant = "primary" | "success" | "danger" | "outline";
type Size = "xs" | "sm" | "md";

export type Props = {
  variant?: Variant;
  size?: Size;
  full?: boolean;
  isLoading?: boolean;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  className,
  variant,
  size,
  full,
  isLoading,
  children,
  ...props
}: Props) {
  return (
    <button
      className={cn(
        "rounded cursor-pointer flex gap-2 items-center justify-center transition-all ease-in-out duration-300",
        {
          "text-white bg-blue-500 hover:bg-blue-600 disabled:opacity-50 shadow shadow-blue-500/30 ":
            variant === "primary",
          "text-white bg-green-500 hover:bg-green-600 disabled:opacity-50 shadow shadow-green-500/30 ":
            variant === "success",
          "text-white bg-rose-500 hover:bg-rose-600 disabled:opacity-50 shadow shadow-rose-500/30 ":
            variant === "danger",
          "border border-slate-300 hover:border-slate-500 disabled:opacity-50":
            variant === "outline",
          "px-2 h-7 text-sm": size === "xs",
          "px-3 h-8": size === "sm",
          "px-4 h-10": size === "md",
          "w-full": full,
        },

        className
      )}
      {...props}
    >
      {isLoading ? <Loader2 className="size-5 animate-spin" /> : children}
    </button>
  );
}
