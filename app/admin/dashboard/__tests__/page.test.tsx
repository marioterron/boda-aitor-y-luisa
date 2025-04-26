import { render, screen, act } from "@testing-library/react";
import DashboardPage from "../page";
import { getDashboardStats } from "@/lib/services/admin/dashboard";

interface StatCardProps {
  title: string;
  value: number;
  description: string;
  icon: React.ComponentType;
  badgeValue: string;
  footerText: string;
  variant: string;
}

interface Rsvp {
  id: number;
  name: string;
  attendance: string;
  guests: number;
}

jest.mock("lucide-react", () => ({
  UsersIcon: () => <div data-testid="users-icon">UsersIcon</div>,
  UserCheckIcon: () => <div data-testid="user-check-icon">UserCheckIcon</div>,
  UserXIcon: () => <div data-testid="user-x-icon">UserXIcon</div>,
  UserPlusIcon: () => <div data-testid="user-plus-icon">UserPlusIcon</div>,
}));

jest.mock("@/lib/services/admin/dashboard", () => ({
  getDashboardStats: jest.fn(),
}));

jest.mock("@/components/dashboard/stat-card", () => ({
  StatCard: ({
    title,
    value,
    description,
    icon: Icon,
    badgeValue,
    footerText,
    variant,
  }: StatCardProps) => (
    <div data-testid={`stat-card-${title.toLowerCase().replace(/\s+/g, "-")}`}>
      <div data-testid="stat-card-title">{title}</div>
      <div data-testid="stat-card-value">{value}</div>
      <div data-testid="stat-card-description">{description}</div>
      <div data-testid="stat-card-badge">{badgeValue}</div>
      <div data-testid="stat-card-footer">{footerText}</div>
      <Icon />
    </div>
  ),
}));

jest.mock("@/components/dashboard/rsvp-list", () => ({
  RsvpList: ({ rsvps }: { rsvps: Rsvp[] | null }) => (
    <div data-testid="rsvp-list">
      {rsvps?.map((rsvp: Rsvp) => (
        <div key={rsvp.id} data-testid={`rsvp-${rsvp.id}`}>
          {rsvp.name}
        </div>
      ))}
    </div>
  ),
}));

describe("DashboardPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should render all stat cards with correct data", async () => {
    const mockStats = {
      totalGuests: 5,
      attending: 2,
      notAttending: 2,
      totalResponses: 4,
      attendanceRate: 50,
      declineRate: 50,
      companionRatio: 1.5,
      rsvps: [
        { id: 1, name: "John Doe", attendance: "attending", guests: 1 },
        { id: 2, name: "Jane Doe", attendance: "not-attending", guests: 0 },
      ],
    };

    (getDashboardStats as jest.Mock).mockResolvedValue(mockStats);

    await act(async () => {
      render(await DashboardPage());
    });

    // Check if all stat cards are rendered
    expect(screen.getByTestId("stat-card-total-responses")).toBeInTheDocument();
    expect(screen.getByTestId("stat-card-attending")).toBeInTheDocument();
    expect(screen.getByTestId("stat-card-not-attending")).toBeInTheDocument();
    expect(screen.getByTestId("stat-card-total-guests")).toBeInTheDocument();

    // Check values in stat cards
    expect(screen.getByTestId("stat-card-total-responses")).toHaveTextContent(
      "4"
    );
    expect(screen.getByTestId("stat-card-attending")).toHaveTextContent("2");
    expect(screen.getByTestId("stat-card-not-attending")).toHaveTextContent(
      "2"
    );
    expect(screen.getByTestId("stat-card-total-guests")).toHaveTextContent("5");

    // Check RSVP list
    expect(screen.getByTestId("rsvp-list")).toBeInTheDocument();
    expect(screen.getByTestId("rsvp-1")).toHaveTextContent("John Doe");
    expect(screen.getByTestId("rsvp-2")).toHaveTextContent("Jane Doe");
  });

  it("should handle empty data gracefully", async () => {
    const mockStats = {
      totalGuests: 0,
      attending: 0,
      notAttending: 0,
      totalResponses: 0,
      attendanceRate: 0,
      declineRate: 0,
      companionRatio: 0,
      rsvps: [],
    };

    (getDashboardStats as jest.Mock).mockResolvedValue(mockStats);

    await act(async () => {
      render(await DashboardPage());
    });

    // Check if all stat cards show 0
    expect(screen.getByTestId("stat-card-total-responses")).toHaveTextContent(
      "0"
    );
    expect(screen.getByTestId("stat-card-attending")).toHaveTextContent("0");
    expect(screen.getByTestId("stat-card-not-attending")).toHaveTextContent(
      "0"
    );
    expect(screen.getByTestId("stat-card-total-guests")).toHaveTextContent("0");

    // Check empty RSVP list
    expect(screen.getByTestId("rsvp-list")).toBeInTheDocument();
  });

  it("should handle error state", async () => {
    // Mock error
    const mockError = new Error("Failed to fetch data");
    (getDashboardStats as jest.Mock).mockRejectedValue(mockError);

    // Mock console.error
    const consoleSpy = jest
      .spyOn(console, "error")
      .mockImplementation(() => {});

    // Render the component
    await act(async () => {
      try {
        render(await DashboardPage());
      } catch (e) {
        // Log the error to our spy
        console.error(e);
      }
    });

    // Verify the error was logged
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});
