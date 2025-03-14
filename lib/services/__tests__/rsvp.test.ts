import { checkEmailExists, createRsvp, updateRsvp } from "@/lib/services/rsvp";
import { supabase } from "@/lib/services/supabase/client";

// Mock Supabase client
jest.mock("@/lib/services/supabase/client", () => ({
  supabase: {
    from: jest.fn(() => ({
      select: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
      insert: jest.fn(() => ({
        single: jest.fn(),
      })),
      update: jest.fn(() => ({
        eq: jest.fn(() => ({
          single: jest.fn(),
        })),
      })),
    })),
  },
}));

describe("RSVP Service", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe("checkEmailExists", () => {
    it("should return true if email exists", async () => {
      const mockCount = 1;
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        select: jest.fn().mockReturnValue({
          count: "exact",
          head: true,
          eq: jest.fn().mockResolvedValue({ count: mockCount, error: null }),
        }),
      }));

      const result = await checkEmailExists("test@example.com");
      expect(result).toBe(true);
    });

    it("should return false if email does not exist", async () => {
      const mockCount = 0;
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        select: jest.fn().mockReturnValue({
          count: "exact",
          head: true,
          eq: jest.fn().mockResolvedValue({ count: mockCount, error: null }),
        }),
      }));

      const result = await checkEmailExists("test@example.com");
      expect(result).toBe(false);
    });

    it("should throw error if Supabase query fails", async () => {
      const mockError = new Error("Database error");
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        select: jest.fn().mockReturnValue({
          count: "exact",
          head: true,
          eq: jest.fn().mockResolvedValue({ error: mockError }),
        }),
      }));

      await expect(checkEmailExists("test@example.com")).rejects.toThrow();
    });
  });

  describe("createRsvp", () => {
    const mockRsvpData = {
      full_name: "Test User",
      email: "test@example.com",
      attendance: "attending" as const,
      guests: 2,
      dietary_requirements: "None",
      message: "",
      created_at: new Date().toISOString(),
    };

    it("should create RSVP successfully", async () => {
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        insert: jest.fn().mockResolvedValue({ error: null }),
      }));

      await expect(createRsvp(mockRsvpData)).resolves.not.toThrow();
    });

    it("should throw error if creation fails", async () => {
      const mockError = new Error("Insert failed");
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        insert: jest.fn().mockResolvedValue({ error: mockError }),
      }));

      await expect(createRsvp(mockRsvpData)).rejects.toThrow();
    });
  });

  describe("updateRsvp", () => {
    const mockRsvpData = {
      full_name: "Test User",
      email: "test@example.com",
      attendance: "not-attending" as const,
      guests: 0,
      dietary_requirements: "None",
      message: "",
      created_at: new Date().toISOString(),
    };

    it("should update RSVP successfully", async () => {
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ error: null }),
          }),
        }),
      }));

      await expect(
        updateRsvp("test@example.com", mockRsvpData)
      ).resolves.not.toThrow();
    });

    it("should throw error if update fails", async () => {
      const mockError = new Error("Update failed");
      (supabase.from as jest.Mock).mockImplementationOnce(() => ({
        update: jest.fn().mockReturnValue({
          eq: jest.fn().mockReturnValue({
            single: jest.fn().mockResolvedValue({ error: mockError }),
          }),
        }),
      }));

      await expect(
        updateRsvp("test@example.com", mockRsvpData)
      ).rejects.toThrow();
    });
  });
});
