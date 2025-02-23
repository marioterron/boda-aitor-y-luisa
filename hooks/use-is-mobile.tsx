"use client";

import { useState, useEffect } from "react";
import { useWindowSize } from "./use-window-size";

export function useIsMobile(breakpoint: number = 768) {
  const [isMobile, setIsMobile] = useState<boolean | undefined>(undefined);
  const { width } = useWindowSize();

  useEffect(() => {
    setIsMobile(width <= breakpoint);
  }, [width, breakpoint]);

  return !!isMobile;
}
