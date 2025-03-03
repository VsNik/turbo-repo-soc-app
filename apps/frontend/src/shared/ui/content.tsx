import { PropsWithChildren } from "react";
import { motion } from "framer-motion";
import { cn } from "@shared/libs/utils";

type Props = {
  className?: string;
} & PropsWithChildren;

export function Content({ className, children }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className={cn(
        "w-full min-h-[100vh_-_104px] sm:min-h-[100vh_-_56px]",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
