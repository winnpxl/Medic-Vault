/* @vitest-environment jsdom */
import "@testing-library/jest-dom/vitest";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import type { ReactNode } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

const mockFetchPatients = vi.fn();
const mockFetchStats = vi.fn();

vi.mock("./api/patients", () => ({
  fetchPatients: () => mockFetchPatients(),
  fetchStats: () => mockFetchStats(),
}));

const adminUser = {
  uid: "smoke-user-1",
  email: "admin@example.com",
  displayName: "Smoke Admin",
  role: "super_admin",
  createdAt: new Date().toISOString(),
  lastLogin: new Date().toISOString(),
};
let mockUser: typeof adminUser | null = adminUser;

vi.mock("./contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: ReactNode }) => children,
  useAuth: () => ({
    user: mockUser,
    loading: false,
    signOut: vi.fn(),
    signIn: vi.fn(),
    signUp: vi.fn(),
    resetPassword: vi.fn(),
    signInWithGoogle: vi.fn(),
  }),
}));

vi.mock("motion/react", async (importOriginal) => ({
  ...(await importOriginal<typeof import("motion/react")>()),
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import App from "./App";

describe("app smoke flow", () => {
  beforeEach(() => {
    mockUser = adminUser;
    window.history.replaceState(null, "", "/");
    mockFetchPatients.mockReset();
    mockFetchStats.mockReset();

    mockFetchPatients.mockResolvedValue([
      {
        id: "PT000001",
        name: "Sarah Tonelly",
        age: 24,
        status: "Discharged",
        files: 18,
        department: "Cardiology",
        lastUpdated: "Sat, Aug 16, 2025",
      },
    ]);
    mockFetchStats.mockResolvedValue({
      recentlyAccessed: 1,
      pendingReviews: 0,
      externalShares: 0,
      accessAlerts: 0,
    });
  });

  it("loads authenticated dashboard, shows patients, and opens patient profile", async () => {
    const { container } = render(<App />);

    expect(await screen.findByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
    const matches = await screen.findAllByText("Sarah Tonelly");
    expect(matches.length).toBeGreaterThan(0);

    const row = container.querySelector("tbody tr");
    expect(row).not.toBeNull();
    fireEvent.click(row as Element);

    await waitFor(() => {
      expect(screen.getByText("Patient ID")).toBeInTheDocument();
      expect(screen.getByText("PT000001")).toBeInTheDocument();
    });
    expect(window.location.pathname).toBe("/app/patients/PT000001");
  });

  it("opens a patient profile directly from its URL", async () => {
    window.history.replaceState(null, "", "/app/patients/PT000001");
    render(<App />);

    await waitFor(() => {
      expect(screen.getByText("Patient ID")).toBeInTheDocument();
      expect(screen.getByText("PT000001")).toBeInTheDocument();
    });
  });

  it("sends signed-out visitors from /app to the login screen", async () => {
    mockUser = null;
    window.history.replaceState(null, "", "/app/patients");
    const { container } = render(<App />);

    await waitFor(() => {
      expect(window.location.pathname).toBe("/login");
      expect(container.querySelector('input[type="email"]')).not.toBeNull();
    });
    expect(mockFetchPatients).not.toHaveBeenCalled();
  });
});
