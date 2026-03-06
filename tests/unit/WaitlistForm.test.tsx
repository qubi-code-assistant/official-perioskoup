/**
 * WaitlistForm -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * NOTE: WaitlistForm is currently an internal function inside Home.tsx.
 * These tests use the full Waitlist page component instead, which exposes
 * the same form logic and is independently testable.
 *
 * Tests cover the Waitlist page form because it is a standalone page component
 * that exercises all the form validation and submission behaviour described in
 * the audit. A WaitlistForm extraction task is tracked separately.
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Waitlist from "../../client/src/pages/Waitlist";
import type { ReactElement } from "react";

const renderWithRouter = (ui: ReactElement) =>
  render(
    <HelmetProvider>
      <Router>{ui}</Router>
    </HelmetProvider>
  );

afterEach(() => {
  cleanup();
});

describe("Waitlist form -- initial render", () => {
  it("renders the first name input", () => {
    renderWithRouter(<Waitlist />);
    expect(screen.getByPlaceholderText("First name")).toBeInTheDocument();
  });

  it("renders the last name input", () => {
    renderWithRouter(<Waitlist />);
    expect(screen.getByPlaceholderText("Last name")).toBeInTheDocument();
  });

  it("renders the email address input", () => {
    renderWithRouter(<Waitlist />);
    expect(screen.getByPlaceholderText("Email address")).toBeInTheDocument();
  });

  it("renders the submit button", () => {
    renderWithRouter(<Waitlist />);
    expect(
      screen.getByRole("button", { name: /Join the Waitlist/i })
    ).toBeInTheDocument();
  });

  it("defaults to Dentist role showing clinic name field", () => {
    renderWithRouter(<Waitlist />);
    expect(screen.getByPlaceholderText("Clinic / Practice name")).toBeInTheDocument();
  });

  it("does not show success state on initial render", () => {
    renderWithRouter(<Waitlist />);
    expect(
      screen.queryByText(/You're on the list/i)
    ).not.toBeInTheDocument();
  });
});

describe("Waitlist form -- role switcher", () => {
  it("clicking Patient role hides the clinic name field", () => {
    renderWithRouter(<Waitlist />);
    const patientButton = screen.getByRole("button", { name: /Patient/i });
    fireEvent.click(patientButton);
    expect(
      screen.queryByPlaceholderText("Clinic / Practice name")
    ).not.toBeInTheDocument();
  });

  it("switching back to Dentist shows the clinic name field again", () => {
    renderWithRouter(<Waitlist />);
    // Switch to patient
    fireEvent.click(screen.getByRole("button", { name: /Patient/i }));
    expect(screen.queryByPlaceholderText("Clinic / Practice name")).not.toBeInTheDocument();

    // Switch back to dentist
    fireEvent.click(screen.getByRole("button", { name: /Dentist/i }));
    expect(screen.getByPlaceholderText("Clinic / Practice name")).toBeInTheDocument();
  });
});

describe("Waitlist form -- successful submission", () => {
  it("shows success state after filling required fields and submitting (dentist)", () => {
    renderWithRouter(<Waitlist />);

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Anca" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Constantin" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "anca@clinic.ro" },
    });
    fireEvent.change(screen.getByPlaceholderText("Clinic / Practice name"), {
      target: { value: "Periodontal Clinic" },
    });

    // Fire the form submit event directly (bypasses browser HTML5 validation in jsdom)
    const form = screen.getByRole("button", { name: /Join the Waitlist/i }).closest("form");
    expect(form).not.toBeNull();
    fireEvent.submit(form!);

    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
  });

  it("shows success state after patient role submission", () => {
    renderWithRouter(<Waitlist />);

    fireEvent.click(screen.getByRole("button", { name: /Patient/i }));

    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Jane" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "Smith" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "jane@example.com" },
    });

    const form = screen.getByRole("button", { name: /Join the Waitlist/i }).closest("form");
    fireEvent.submit(form!);

    expect(screen.getByText(/You're on the list!/i)).toBeInTheDocument();
  });

  it("hides the form fields after successful submission", () => {
    renderWithRouter(<Waitlist />);

    fireEvent.click(screen.getByRole("button", { name: /Patient/i }));
    fireEvent.change(screen.getByPlaceholderText("First name"), {
      target: { value: "Test" },
    });
    fireEvent.change(screen.getByPlaceholderText("Last name"), {
      target: { value: "User" },
    });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "test@example.com" },
    });

    const form = screen.getByRole("button", { name: /Join the Waitlist/i }).closest("form");
    fireEvent.submit(form!);

    // Form inputs should no longer be in the DOM
    expect(screen.queryByPlaceholderText("Email address")).not.toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /Join the Waitlist/i })
    ).not.toBeInTheDocument();
  });

  it("success state shows 'Back to Home' link", () => {
    renderWithRouter(<Waitlist />);

    fireEvent.click(screen.getByRole("button", { name: /Patient/i }));
    fireEvent.change(screen.getByPlaceholderText("First name"), { target: { value: "A" } });
    fireEvent.change(screen.getByPlaceholderText("Last name"), { target: { value: "B" } });
    fireEvent.change(screen.getByPlaceholderText("Email address"), {
      target: { value: "a@b.com" },
    });

    const form = screen.getByRole("button", { name: /Join the Waitlist/i }).closest("form");
    fireEvent.submit(form!);

    const link = screen.getByRole("link", { name: /Back to Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute("href", "/");
  });
});

describe("Waitlist form -- email input attributes", () => {
  it("email input has type='email'", () => {
    renderWithRouter(<Waitlist />);
    const emailInput = screen.getByPlaceholderText("Email address");
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("email input has required attribute", () => {
    renderWithRouter(<Waitlist />);
    const emailInput = screen.getByPlaceholderText("Email address");
    expect(emailInput).toHaveAttribute("required");
  });

  it("first name input has required attribute", () => {
    renderWithRouter(<Waitlist />);
    const firstNameInput = screen.getByPlaceholderText("First name");
    expect(firstNameInput).toHaveAttribute("required");
  });

  it("last name input has required attribute", () => {
    renderWithRouter(<Waitlist />);
    const lastNameInput = screen.getByPlaceholderText("Last name");
    expect(lastNameInput).toHaveAttribute("required");
  });
});
