import { Heart, ArrowUp } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function Footer({
  hideBorder = false,
}: {
  hideBorder?: boolean;
}) {
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
            © {currentYear} • Made with{" "}
            <Heart className="mx-2 w-4 h-4 text-white/60 animate-pulse" /> for
            Aitor & Luisa
          </p>
          <Button
            variant="ghost"
            size="sm"
            onClick={scrollToTop}
            className="hidden md:flex text-white/60 hover:text-white hover:bg-transparent group"
          >
            Back to Top
            <ArrowUp className="ml-2 w-4 h-4 group-hover:animate-bounce" />
          </Button>
        </div>
      </div>
    </footer>
  );
}
