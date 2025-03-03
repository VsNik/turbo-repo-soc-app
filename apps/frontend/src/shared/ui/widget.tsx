import { PropsWithChildren } from "react";
import { cn } from "../libs/utils";

type Props = {
  className?: string;
} & PropsWithChildren;

export function Widget({ className, children }: Props) {
  return (
    <div className={cn("bg-widget rounded-b-md shadow-sm", className)}>
      {children}
    </div>
  );
}
