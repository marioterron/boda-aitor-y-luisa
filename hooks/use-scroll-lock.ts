import { useEffect } from "react";

export function useScrollLock(lock: boolean) {
  useEffect(() => {
    const handleScroll = (e: Event) => {
      if (lock) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    if (lock) {
      document.body.style.overflow = "hidden";
      document.body.style.paddingRight = "var(--scrollbar-width)";
      // Prevent scroll on touch devices
      document.addEventListener("touchmove", handleScroll, { passive: false });
      // Prevent scroll on desktop
      document.addEventListener("wheel", handleScroll, { passive: false });
    } else {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
    }

    return () => {
      document.body.style.overflow = "";
      document.body.style.paddingRight = "";
      document.removeEventListener("touchmove", handleScroll);
      document.removeEventListener("wheel", handleScroll);
    };
  }, [lock]);
}
