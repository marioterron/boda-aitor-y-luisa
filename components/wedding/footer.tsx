import { Heart, ArrowUp } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

export default function Footer({
  hideBorder = false,
}: {
  hideBorder?: boolean;
}) {
  const t = useTranslations("footer");
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <footer className="bg-black text-white/60">
      <div className="container mx-auto px-4 py-16">
        <div
          className={`flex flex-col md:flex-row items-center justify-between ${
            hideBorder ? "" : "pt-8 border-t border-white/10"
          }`}
        >
          <p className="flex items-center text-sm">
            © {currentYear} • {t("madeWith")}
            <Heart className="mx-2 h-4 w-4 animate-pulse text-white/60" /> for
            {t("couple")}
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="group hidden text-white/60 hover:bg-transparent hover:text-white md:flex"
          >
            {t("backToTop")}
            <ArrowUp className="ml-2 h-4 w-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
