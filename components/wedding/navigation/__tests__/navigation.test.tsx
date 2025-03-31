import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Navigation from "@/components/wedding/navigation";
import { useIsMobile } from "@/hooks/use-is-mobile";

// Test selectors
const SELECTORS = {
  MOBILE_MENU: '[class*="fixed inset-x-0"]', // Mobile menu overlay container
  TOGGLE_MENU_BUTTON: { role: "button", name: /toggle menu/i },
  RSVP_BUTTON: { role: "button", name: /rsvp/i },
  NAV_ITEMS: {
    OUR_STORY: "Our Story",
    DRESS_CODE: "Dress Code",
    FAQS: "FAQs",
  },
} as const;

// Mock the hooks
jest.mock("@/hooks/use-is-mobile", () => ({
  useIsMobile: jest.fn(),
}));

jest.mock("@/hooks/use-scroll-lock", () => ({
  useScrollLock: jest.fn(),
}));

describe("Navigation", () => {
  const mockScrollToRSVP = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Reset window.innerWidth
    global.innerWidth = 1024;
    global.dispatchEvent(new Event("resize"));
  });

  describe("Desktop Layout", () => {
    beforeEach(() => {
      (useIsMobile as jest.Mock).mockReturnValue(false);
    });

    it("renders all navigation items", () => {
      render(<Navigation />);

      expect(
        screen.getByText(SELECTORS.NAV_ITEMS.OUR_STORY)
      ).toBeInTheDocument();
      expect(
        screen.getByText(SELECTORS.NAV_ITEMS.DRESS_CODE)
      ).toBeInTheDocument();
      expect(screen.getByText(SELECTORS.NAV_ITEMS.FAQS)).toBeInTheDocument();
      expect(
        screen.getByRole(SELECTORS.RSVP_BUTTON.role, {
          name: SELECTORS.RSVP_BUTTON.name,
        })
      ).toBeInTheDocument();
    });

    it("calls scrollToRSVP when RSVP button is clicked", async () => {
      render(<Navigation onScrollToRSVP={mockScrollToRSVP} />);

      const rsvpButton = screen.getByRole(SELECTORS.RSVP_BUTTON.role, {
        name: SELECTORS.RSVP_BUTTON.name,
      });
      await userEvent.click(rsvpButton);

      expect(mockScrollToRSVP).toHaveBeenCalled();
    });
  });

  describe("Mobile Layout", () => {
    beforeEach(() => {
      (useIsMobile as jest.Mock).mockReturnValue(true);
    });

    it("renders mobile menu button", () => {
      render(<Navigation />);

      expect(
        screen.getByRole(SELECTORS.TOGGLE_MENU_BUTTON.role, {
          name: SELECTORS.TOGGLE_MENU_BUTTON.name,
        })
      ).toBeInTheDocument();
    });

    it("toggles menu when menu button is clicked", async () => {
      render(<Navigation />);

      const menuButton = screen.getByRole(SELECTORS.TOGGLE_MENU_BUTTON.role, {
        name: SELECTORS.TOGGLE_MENU_BUTTON.name,
      });
      await userEvent.click(menuButton);

      const menuContainer = screen
        .getByRole("navigation")
        .querySelector(SELECTORS.MOBILE_MENU);
      expect(menuContainer).toHaveClass("visible opacity-100");

      await userEvent.click(menuButton);
      expect(menuContainer).toHaveClass("invisible opacity-0");
    });

    it("closes menu when a navigation item is clicked", async () => {
      render(<Navigation />);

      const menuButton = screen.getByRole(SELECTORS.TOGGLE_MENU_BUTTON.role, {
        name: SELECTORS.TOGGLE_MENU_BUTTON.name,
      });
      await userEvent.click(menuButton);

      const navItem = screen.getByText(SELECTORS.NAV_ITEMS.OUR_STORY);
      await userEvent.click(navItem);

      const menuContainer = screen
        .getByRole("navigation")
        .querySelector(SELECTORS.MOBILE_MENU);
      expect(menuContainer).toHaveClass("invisible opacity-0");
    });

    it("calls scrollToRSVP and closes menu when RSVP button is clicked", async () => {
      render(<Navigation onScrollToRSVP={mockScrollToRSVP} />);

      const menuButton = screen.getByRole(SELECTORS.TOGGLE_MENU_BUTTON.role, {
        name: SELECTORS.TOGGLE_MENU_BUTTON.name,
      });
      await userEvent.click(menuButton);

      const rsvpButton = screen.getByRole(SELECTORS.RSVP_BUTTON.role, {
        name: SELECTORS.RSVP_BUTTON.name,
      });
      await userEvent.click(rsvpButton);

      expect(mockScrollToRSVP).toHaveBeenCalled();

      const menuContainer = screen
        .getByRole("navigation")
        .querySelector(SELECTORS.MOBILE_MENU);
      expect(menuContainer).toHaveClass("invisible opacity-0");
    });
  });
});
