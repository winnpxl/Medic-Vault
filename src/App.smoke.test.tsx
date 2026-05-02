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

vi.mock("./contexts/AuthContext", () => ({
  AuthProvider: ({ children }: { children: ReactNode }) => children,
  useAuth: () => ({
    user: {
      uid: "smoke-user-1",
      email: "admin@example.com",
      displayName: "Smoke Admin",
      role: "super_admin",
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
    },
    loading: false,
    signOut: vi.fn(),
  }),
}));

vi.mock("motion/react", () => ({
  AnimatePresence: ({ children }: { children: ReactNode }) => children,
}));

import App from "./App";

describe("app smoke flow", () => {
  beforeEach(() => {
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
  });
});
