import { useIsMobile } from "@/hooks/use-mobile";

export function Date() {
  const isMobile = useIsMobile();

  return (
    <h2
      className={`font-serif ${
        isMobile
          ? "text-[2.5rem] absolute w-full text-center z-20 -top-8"
          : "text-4xl md:text-8xl absolute w-full text-center z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
      }`}
    >
      14 <span className="mx-2 md:mx-4">•</span> 07
      <span className="mx-2 md:mx-4">•</span> 2025
    </h2>
  );
}
