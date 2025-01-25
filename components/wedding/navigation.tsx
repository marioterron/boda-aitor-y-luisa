import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function Navigation() {
  const scrollToRSVP = () => {
    const rsvpSection = document.getElementById("rsvp-section");
    rsvpSection?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
      <div className="max-w-full mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center space-x-8">
            <a href="#" className="nav-link">
              OUR STORY
            </a>
            <a href="#" className="nav-link">
              DRESS CODE
            </a>
            <a href="#" className="nav-link">
              FAQS
            </a>
          </div>

          {/* Center logo */}
          <h1 className="font-serif text-2xl absolute left-1/2 -translate-x-1/2">
            AITOR & LUISA
          </h1>

          {/* Right menu items */}
          <div className="flex items-center space-x-8">
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
      </div>
    </nav>
  );
}
