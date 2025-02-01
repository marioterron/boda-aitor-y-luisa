import { useIsMobile } from "@/hooks/use-mobile";
import { formatShortDate } from "@/utils/date";
import { WEDDING_DATE } from "@/constants/wedding";

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
      {formatShortDate(WEDDING_DATE)}
    </h2>
  );
}
