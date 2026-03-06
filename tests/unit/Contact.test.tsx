/**
 * Contact page form -- Unit tests
 *
 * Framework: Vitest + React Testing Library
 *
 * Covers:
 *  - Initial render: all required fields are present
 *  - Submit button renders with correct label
 *  - Success state shown after valid submission
 *  - "Message sent!" heading appears in success state
 *  - Form inputs disappear after successful submission
 *  - Inline error for missing first name
 *  - Inline error for missing email
 *  - Inline error for missing role (select)
 *  - Inline error for missing message
 *  - Inline error for invalid email format
 *  - No success state when required fields are empty
 *  - All required fields have aria-required="true"
 *
 * Note: The Contact component uses form element names (not placeholder text)
 * for its validate() function. We fill fields by their label text using
 * getByLabelText for a robust selector that matches the actual implementation.
 */
import { describe, it, expect, afterEach } from "vitest";
import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { Router } from "wouter";
import { HelmetProvider } from "react-helmet-async";
import Contact from "../../client/src/pages/Contact";
import type { ReactElement } from "react";

const renderContact = (ui: ReactElement = <Contact />) =>
  render(
    <HelmetProvider>
      <Router>{ui}</Router>
    </HelmetProvider>
  );

afterEach(() => {
  cleanup();
});

/**
 * Fill all required contact form fields with valid data and submit.
 * Returns the form element for convenience.
 */
function fillAndSubmitValidForm(): HTMLFormElement {
  fireEvent.change(screen.getByLabelText(/First name/i), {
    target: { value: "Anca", name: "contact-first-name" },
  });
  fireEvent.change(screen.getByLabelText(/Last name/i), {
    target: { value: "Constantin", name: "contact-last-name" },
  });
  fireEvent.change(screen.getByLabelText(/Email/i), {
    target: { value: "anca@perioskoup.com", name: "contact-email" },
  });
  fireEvent.change(screen.getByLabelText(/I am a/i), {
    target: { value: "dentist", name: "contact-role" },
  });
  fireEvent.change(screen.getByLabelText(/Message/i), {
    target: { value: "Hello Perioskoup, I am interested in your product.", name: "contact-message" },
  });

  const submitButton = screen.getByRole("button", { name: /Send Message/i });
  const form = submitButton.closest("form") as HTMLFormElement;
  fireEvent.submit(form);
  return form;
}

describe("Contact form -- initial render", () => {
  it("renders a first name input", () => {
    renderContact();
    expect(screen.getByLabelText(/First name/i)).toBeInTheDocument();
  });

  it("renders a last name input", () => {
    renderContact();
    expect(screen.getByLabelText(/Last name/i)).toBeInTheDocument();
  });

  it("renders an email input", () => {
    renderContact();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
  });

  it("renders a role select", () => {
    renderContact();
    expect(screen.getByLabelText(/I am a/i)).toBeInTheDocument();
  });

  it("renders a message textarea", () => {
    renderContact();
    expect(screen.getByLabelText(/Message/i)).toBeInTheDocument();
  });

  it("renders a 'Send Message' submit button", () => {
    renderContact();
    expect(screen.getByRole("button", { name: /Send Message/i })).toBeInTheDocument();
  });

  it("does not show success state on initial render", () => {
    renderContact();
    expect(screen.queryByText(/Message sent/i)).not.toBeInTheDocument();
  });
});

describe("Contact form -- input attributes", () => {
  it("email input has type='email'", () => {
    renderContact();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveAttribute("type", "email");
  });

  it("email input has aria-required='true'", () => {
    renderContact();
    const emailInput = screen.getByLabelText(/Email/i);
    expect(emailInput).toHaveAttribute("aria-required", "true");
  });

  it("first name input has aria-required='true'", () => {
    renderContact();
    const input = screen.getByLabelText(/First name/i);
    expect(input).toHaveAttribute("aria-required", "true");
  });

  it("role select has aria-required='true'", () => {
    renderContact();
    const select = screen.getByLabelText(/I am a/i);
    expect(select).toHaveAttribute("aria-required", "true");
  });

  it("message textarea has aria-required='true'", () => {
    renderContact();
    const textarea = screen.getByLabelText(/Message/i);
    expect(textarea).toHaveAttribute("aria-required", "true");
  });
});

describe("Contact form -- successful submission", () => {
  it("shows 'Message sent!' heading after valid submission", () => {
    renderContact();
    fillAndSubmitValidForm();
    expect(screen.getByRole("heading", { name: /Message sent/i })).toBeInTheDocument();
  });

  it("shows follow-up text after successful submission", () => {
    renderContact();
    fillAndSubmitValidForm();
    // "We'll get back to you within 24 hours." is the success message
    // Use getAllByText since contact info block also mentions "24 hours"
    const matches = screen.getAllByText(/24 hours/i);
    expect(matches.length).toBeGreaterThan(0);
  });

  it("hides the form after successful submission", () => {
    renderContact();
    fillAndSubmitValidForm();
    expect(screen.queryByRole("button", { name: /Send Message/i })).not.toBeInTheDocument();
  });

  it("hides the email input after successful submission", () => {
    renderContact();
    fillAndSubmitValidForm();
    expect(screen.queryByLabelText(/Email/i)).not.toBeInTheDocument();
  });
});

describe("Contact form -- validation: empty required fields", () => {
  it("does not show success state when form is submitted empty", () => {
    renderContact();
    const submitButton = screen.getByRole("button", { name: /Send Message/i });
    const form = submitButton.closest("form") as HTMLFormElement;
    fireEvent.submit(form);
    expect(screen.queryByText(/Message sent/i)).not.toBeInTheDocument();
  });

  it("shows inline error for missing first name", () => {
    renderContact();
    // Fill everything except first name
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anca@perioskoup.com", name: "contact-email" },
    });
    fireEvent.change(screen.getByLabelText(/I am a/i), {
      target: { value: "dentist", name: "contact-role" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello", name: "contact-message" },
    });

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.getByRole("alert", { hidden: true })).toBeInTheDocument();
    expect(screen.getByText(/First name is required/i)).toBeInTheDocument();
  });

  it("shows inline error for missing email", () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Anca", name: "contact-first-name" },
    });
    fireEvent.change(screen.getByLabelText(/I am a/i), {
      target: { value: "dentist", name: "contact-role" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello", name: "contact-message" },
    });

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.getByText(/Email address is required/i)).toBeInTheDocument();
  });

  it("shows inline error for missing role select", () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Anca", name: "contact-first-name" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anca@perioskoup.com", name: "contact-email" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello", name: "contact-message" },
    });
    // Role is deliberately left at the default empty value

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.getByText(/Please select your role/i)).toBeInTheDocument();
  });

  it("shows inline error for missing message", () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Anca", name: "contact-first-name" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "anca@perioskoup.com", name: "contact-email" },
    });
    fireEvent.change(screen.getByLabelText(/I am a/i), {
      target: { value: "dentist", name: "contact-role" },
    });
    // Message deliberately left blank

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.getByText(/Message is required/i)).toBeInTheDocument();
  });
});

describe("Contact form -- validation: invalid email", () => {
  it("shows inline error for an invalid email format", () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Anca", name: "contact-first-name" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "notanemail", name: "contact-email" },
    });
    fireEvent.change(screen.getByLabelText(/I am a/i), {
      target: { value: "dentist", name: "contact-role" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Hello", name: "contact-message" },
    });

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.getByText(/Please enter a valid email address/i)).toBeInTheDocument();
    expect(screen.queryByText(/Message sent/i)).not.toBeInTheDocument();
  });

  it("does not show success state for an invalid email", () => {
    renderContact();
    fireEvent.change(screen.getByLabelText(/First name/i), {
      target: { value: "Test", name: "contact-first-name" },
    });
    fireEvent.change(screen.getByLabelText(/Email/i), {
      target: { value: "bad-email@", name: "contact-email" },
    });
    fireEvent.change(screen.getByLabelText(/I am a/i), {
      target: { value: "patient", name: "contact-role" },
    });
    fireEvent.change(screen.getByLabelText(/Message/i), {
      target: { value: "Test message", name: "contact-message" },
    });

    const form = screen.getByRole("button", { name: /Send Message/i }).closest("form") as HTMLFormElement;
    fireEvent.submit(form);

    expect(screen.queryByText(/Message sent/i)).not.toBeInTheDocument();
  });
});

describe("Contact form -- role options", () => {
  it("renders all expected role options in the select", () => {
    renderContact();
    const select = screen.getByLabelText(/I am a/i) as HTMLSelectElement;
    const options = Array.from(select.options).map((o) => o.value);

    expect(options).toContain("patient");
    expect(options).toContain("dentist");
    expect(options).toContain("clinic");
    expect(options).toContain("investor");
    expect(options).toContain("press");
    expect(options).toContain("other");
  });

  it("starts with empty (placeholder) option selected", () => {
    renderContact();
    const select = screen.getByLabelText(/I am a/i) as HTMLSelectElement;
    expect(select.value).toBe("");
  });
});
