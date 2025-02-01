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
    <nav className="bg-white z-50 border-b border-gray-100">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Mobile menu button */}
          <button
            ref={buttonRef}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>

          {/* Desktop navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <NavLinks />
          </div>

          {/* Center logo */}
          <h1 className="font-serif text-xl md:text-2xl absolute left-1/2 -translate-x-1/2">
            AITOR & LUISA
          </h1>

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

        {/* Mobile menu */}
        {isMenuOpen && (
          <div ref={menuRef} className="lg:hidden py-4 space-y-4">
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
        )}
      </div>
    </nav>
  );
}
