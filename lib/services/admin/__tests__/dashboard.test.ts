import { getDashboardStats } from "../dashboard";

// Mock the entire supabase module
jest.mock("@/lib/services/supabase/client", () => ({
  supabase: {
    from: jest.fn().mockReturnThis(),
    select: jest.fn().mockReturnThis(),
  },
}));

describe("getDashboardStats", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should calculate correct stats with valid data", async () => {
    // Mock data
    const mockRsvps = [
      { attendance: "attending", guests: 1 },
      { attendance: "attending", guests: 2 },
      { attendance: "not-attending", guests: 0 },
      { attendance: "not-attending", guests: 0 },
    ];

    // Mock supabase response
    const mockSelect = jest.fn().mockResolvedValue({
      data: mockRsvps,
      error: null,
    });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

    // Update the mock implementation
    const { supabase } = require("@/lib/services/supabase/client");
    supabase.from.mockImplementation(mockFrom);

    const stats = await getDashboardStats();

    expect(stats).toEqual({
      totalGuests: 5, // 2 attending + 3 companions
      attending: 2,
      notAttending: 2,
      totalResponses: 4,
      attendanceRate: 50, // (2/4) * 100
      declineRate: 50, // (2/4) * 100
      companionRatio: 1.5, // 3 companions / 2 attending
      rsvps: mockRsvps,
    });
  });

  it("should handle empty data", async () => {
    // Mock empty response
    const mockSelect = jest.fn().mockResolvedValue({
      data: [],
      error: null,
    });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

    // Update the mock implementation
    const { supabase } = require("@/lib/services/supabase/client");
    supabase.from.mockImplementation(mockFrom);

    const stats = await getDashboardStats();

    expect(stats).toEqual({
      totalGuests: 0,
      attending: 0,
      notAttending: 0,
      totalResponses: 0,
      attendanceRate: 0,
      declineRate: 0,
      companionRatio: 0,
      rsvps: [],
    });
  });

  it("should handle null data", async () => {
    // Mock null response
    const mockSelect = jest.fn().mockResolvedValue({
      data: null,
      error: null,
    });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

    // Update the mock implementation
    const { supabase } = require("@/lib/services/supabase/client");
    supabase.from.mockImplementation(mockFrom);

    const stats = await getDashboardStats();

    expect(stats).toEqual({
      totalGuests: 0,
      attending: 0,
      notAttending: 0,
      totalResponses: 0,
      attendanceRate: 0,
      declineRate: 0,
      companionRatio: 0,
      rsvps: null,
    });
  });

  it("should throw error when supabase query fails", async () => {
    // Mock error response
    const mockSelect = jest.fn().mockResolvedValue({
      data: null,
      error: new Error("Database error"),
    });
    const mockFrom = jest.fn().mockReturnValue({ select: mockSelect });

    // Update the mock implementation
    const { supabase } = require("@/lib/services/supabase/client");
    supabase.from.mockImplementation(mockFrom);

    await expect(getDashboardStats()).rejects.toThrow("Database error");
  });
});
