import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { NavLinks } from "./nav-links";

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent | TouchEvent) {
      if (!isMenuOpen) return;

      const target = event.target as Node;
      const isMenuClick = menuRef.current?.contains(target);
      const isButtonClick = buttonRef.current?.contains(target);

      if (!isMenuClick && !isButtonClick) {
        setIsMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside, true);
    document.addEventListener("touchstart", handleClickOutside, true);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside, true);
      document.removeEventListener("touchstart", handleClickOutside, true);
    };
  }, [isMenuOpen]);

  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp-section");
    rsvpSection?.scrollIntoView({ behavior: "smooth" });
    setIsMenuOpen(false);
  };

  return (
    <nav
      className={`w-full bg-white/95 backdrop-blur-sm z-50  transition-all duration-300 ${
        isMenuOpen ? "fixed top-0 left-0 right-0 bottom-0" : "h-20"
      }`}
    >
      <div className="mx-auto px-4 ">
        <div className="flex items-center justify-between h-20 relative">
          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-all duration-300" />
            ) : (
              <Menu className="h-6 w-6 transition-all duration-300" />
            )}
          </button>

          {/* Center logo - adjust for mobile */}
          <h1 className="font-serif text-xl md:text-2xl absolute left-1/2 -translate-x-1/2 whitespace-nowrap">
            AITOR & LUISA
          </h1>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Right menu items */}
          <div className="hidden lg:flex items-center space-x-8">
            <Button
              onClick={scrollToRSVP}
              variant="outline"
              size="sm"
              className="nav-link uppercase"
            >
              RSVP
            </Button>
          </div>
        </div>

        {/* Mobile menu with animation */}
        <div
          className={`fixed inset-x-0 top-20 bottom-0 bg-white/95 transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
          }`}
          ref={menuRef}
        >
          <div
            className={`h-full flex flex-col transition-opacity duration-300 ${
              isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible"
            } `}
          >
            <div className="flex-1 flex items-center justify-center min-h-0">
              <NavLinks
                onClick={() => setIsMenuOpen(false)}
                className="flex flex-col items-center space-y-12 text-2xl"
              />
            </div>
            <div className="mt-auto w-full p-8">
              <Button
                onClick={scrollToRSVP}
                variant="outline"
                size="sm"
                className="nav-link uppercase w-full"
              >
                RSVP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
