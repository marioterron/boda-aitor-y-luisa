import { act } from "react";
import * as React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import { Toast, ToastProvider, ToastViewport, ToastClose } from "../toast";
import { useToast } from "@/hooks/use-toast";

// Mock useToast hook
jest.mock("@/hooks/use-toast", () => ({
  useToast: jest.fn(),
}));

// Mock pointer events
beforeAll(() => {
  // @ts-ignore
  window.HTMLElement.prototype.hasPointerCapture = jest.fn();
  // @ts-ignore
  window.HTMLElement.prototype.releasePointerCapture = jest.fn();
});

// Test component that uses the toast hook
function TestComponent({ showToast = false }) {
  const { toast } = useToast();

  React.useEffect(() => {
    if (showToast) {
      toast({
        title: "Test Toast",
        description: "This is a test toast message",
        variant: "default",
      });
    }
  }, [showToast, toast]);

  return null;
}

describe("Toast Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders toast with title and description", async () => {
    const mockToast = {
      id: "test-toast",
      title: "Test Toast",
      description: "This is a test toast message",
      open: true,
    };

    (useToast as jest.Mock).mockImplementation(() => ({
      toasts: [mockToast],
      toast: jest.fn(),
      dismiss: jest.fn(),
    }));

    render(
      <ToastProvider>
        <Toast {...mockToast}>
          <div className="grid gap-1">
            {mockToast.title && <div>{mockToast.title}</div>}
            {mockToast.description && <div>{mockToast.description}</div>}
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.getByText("Test Toast")).toBeInTheDocument();
    expect(
      screen.getByText("This is a test toast message")
    ).toBeInTheDocument();
  });

  it("renders destructive variant with correct styling", () => {
    const mockToast = {
      id: "test-toast",
      title: "Error Toast",
      description: "This is an error message",
      variant: "destructive" as const,
      open: true,
    };

    render(
      <ToastProvider>
        <Toast {...mockToast}>
          <div className="grid gap-1">
            {mockToast.title && <div>{mockToast.title}</div>}
            {mockToast.description && <div>{mockToast.description}</div>}
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const toastElement = screen
      .getByText("Error Toast")
      .closest('[role="status"]');
    expect(toastElement).toHaveClass("bg-red-500");
  });

  it("auto-dismisses toast after delay", async () => {
    jest.useFakeTimers();
    const mockDismiss = jest.fn();
    const mockToast = {
      id: "test-toast",
      title: "Auto Dismiss Toast",
      description: "This toast should auto-dismiss",
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) mockDismiss();
      },
    };

    (useToast as jest.Mock).mockImplementation(() => ({
      toasts: [mockToast],
      toast: jest.fn(),
      dismiss: mockDismiss,
    }));

    render(
      <ToastProvider>
        <Toast {...mockToast}>
          <div className="grid gap-1">
            {mockToast.title && <div>{mockToast.title}</div>}
            {mockToast.description && <div>{mockToast.description}</div>}
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    act(() => {
      jest.advanceTimersByTime(5000);
    });

    expect(mockDismiss).toHaveBeenCalled();
    jest.useRealTimers();
  });

  it("allows manual dismissal via close button", async () => {
    const mockDismiss = jest.fn();
    const mockToast = {
      id: "test-toast",
      title: "Dismissible Toast",
      description: "Click X to dismiss",
      open: true,
      onOpenChange: (open: boolean) => {
        if (!open) mockDismiss();
      },
    };

    (useToast as jest.Mock).mockImplementation(() => ({
      toasts: [mockToast],
      toast: jest.fn(),
      dismiss: mockDismiss,
    }));

    render(
      <ToastProvider>
        <Toast {...mockToast}>
          <div className="grid gap-1">
            {mockToast.title && <div>{mockToast.title}</div>}
            {mockToast.description && <div>{mockToast.description}</div>}
          </div>
          <ToastClose />
        </Toast>
        <ToastViewport />
      </ToastProvider>
    );

    const closeButton = screen.getByRole("button");
    await userEvent.click(closeButton);
    expect(mockDismiss).toHaveBeenCalled();
  });

  it("handles multiple toasts in queue", async () => {
    const mockToasts = [
      {
        id: "toast-1",
        title: "First Toast",
        description: "First toast message",
        open: true,
      },
      {
        id: "toast-2",
        title: "Second Toast",
        description: "Second toast message",
        open: true,
      },
    ];

    render(
      <ToastProvider>
        {mockToasts.map((toast) => (
          <Toast key={toast.id} {...toast}>
            <div className="grid gap-1">
              {toast.title && <div>{toast.title}</div>}
              {toast.description && <div>{toast.description}</div>}
            </div>
            <ToastClose />
          </Toast>
        ))}
        <ToastViewport />
      </ToastProvider>
    );

    expect(screen.getByText("First Toast")).toBeInTheDocument();
    expect(screen.getByText("Second Toast")).toBeInTheDocument();
  });
});
