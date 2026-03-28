import { useEffect, RefObject } from "react";

export function useAutoScroll<T>(ref: RefObject<HTMLDivElement | null>, deps: T): void {
  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [deps]);
}