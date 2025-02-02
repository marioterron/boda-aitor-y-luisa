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
    <nav className="w-full bg-white/95 backdrop-blur-sm z-50 border-b">
      <div className="mx-auto px-4">
        <div className="flex items-center justify-between h-20 relative">
          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden z-50"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6 transition-transform duration-200" />
            ) : (
              <Menu className="h-6 w-6 transition-transform duration-200" />
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
          className={`transform transition-all duration-300 ease-in-out lg:hidden ${
            isMenuOpen ? "opacity-100 max-h-96" : "opacity-0 max-h-0"
          } overflow-hidden`}
          ref={menuRef}
        >
          <div className="py-4 space-y-4">
            <div className="flex flex-col space-y-4">
              <NavLinks onClick={() => setIsMenuOpen(false)} />
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
