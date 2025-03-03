import { InputHTMLAttributes } from "react";
import { cn } from "../libs/utils";

type Props = {
  className?: string;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
};

export function Input({ className, inputProps }: Props) {
  return (
    <input
      {...inputProps}
      className={cn(
        "bg-input border border-border focus:border-blue-500 rounded-b-md outline-none px-3 py-1",
        className
      )}
    />
  );
}
