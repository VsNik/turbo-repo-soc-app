/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useRef } from "react";

type Fn = (...args: any) => void;

export function useClickOutside(callback: Fn) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        callback();
      }
    };

    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [callback]);

  return ref;
}
