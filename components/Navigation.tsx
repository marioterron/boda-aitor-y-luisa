import { useState } from "react";
import { Modal } from "@/components/ui/modal";
import RsvpForm from "./RsvpForm";

export default function Navigation() {
  const [isRSVPOpen, setIsRSVPOpen] = useState(false);

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 border-b border-gray-100">
        <div className="max-w-full mx-auto px-4">
          <div className="flex items-center justify-between h-20">
            {/* Left menu items */}
            <div className="flex items-center space-x-8">
              <a href="#" className="nav-link">
                OUR STORY
              </a>
              <a href="#" className="nav-link">
                TRAVEL & STAY
              </a>
              <a href="#" className="nav-link">
                REGISTRY
              </a>
            </div>

            {/* Center logo */}
            <h1 className="font-serif text-2xl absolute left-1/2 -translate-x-1/2">
              AITOR & LUISA
            </h1>

            {/* Right menu items */}
            <div className="flex items-center space-x-8">
              <a href="#" className="nav-link">
                FAQS
              </a>
              <button
                onClick={() => setIsRSVPOpen(true)}
                className="nav-link border border-black px-6 py-2 hover:bg-black hover:text-white transition-colors"
              >
                RSVP
              </button>
            </div>
          </div>
        </div>
      </nav>

      <Modal isOpen={isRSVPOpen} onClose={() => setIsRSVPOpen(false)}>
        <RsvpForm />
      </Modal>
    </>
  );
}
