"use client";

import { useState, type FormEvent } from "react";
import { Container, Eyebrow, WhatsAppLink } from "./ui";
import {
  CONTACT_DISPLAY_EMAIL,
  WHATSAPP_DISPLAY,
} from "@/lib/site-config";

const PROJECT_TYPES = [
  "Marketing & Advertising",
  "AI Solutions",
  "Web App Development",
  "Mobile App Development",
  "Branding & Social Media",
  "Something else",
];

const BUDGETS = [
  "Under $5,000",
  "$5,000 – $15,000",
  "$15,000 – $40,000",
  "$40,000+",
  "Not sure yet",
];

type Status = "idle" | "submitting" | "success" | "error";

const inputClasses =
  "w-full rounded-xl border border-line-hi bg-ink px-4 py-3 text-[15px] text-paper placeholder:text-muted/70 transition-colors focus:border-gold";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("submitting");
    setErrorMessage(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();

      if (!res.ok) {
        throw new Error(json.error || "Something went wrong.");
      }

      setStatus("success");
      form.reset();
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "Something went wrong. Please try again."
      );
    }
  }

  return (
    <section id="contact" className="relative py-24 sm:py-32">
      <Container className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
        <div>
          <Eyebrow>start a project</Eyebrow>
          <h2 className="mt-5 font-display text-[clamp(1.9rem,4vw,3rem)] font-semibold leading-[1.08] tracking-tight text-paper">
            Tell us what you&apos;re building.
          </h2>
          <p className="mt-4 max-w-[46ch] text-[16px] leading-relaxed text-muted">
            Share a few details about the project and we&apos;ll reply within
            one business day with next steps — or message us directly on
            WhatsApp for a faster response.
          </p>

          <div className="mt-9 space-y-5">
            <div>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
                Email
              </p>
              <a
                href={`mailto:${CONTACT_DISPLAY_EMAIL}`}
                className="mt-1 inline-block text-[16px] text-paper transition-colors hover:text-gold"
              >
                {CONTACT_DISPLAY_EMAIL}
              </a>
            </div>
            <div>
              <p className="font-mono text-[11.5px] uppercase tracking-[0.14em] text-gold/80">
                WhatsApp
              </p>
              <WhatsAppLink
                className="mt-1 inline-block text-[16px] text-paper transition-colors hover:text-gold"
                message="Hi HATCH.AI! I'd like to talk about a project."
              >
                {WHATSAPP_DISPLAY}
              </WhatsAppLink>
            </div>
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="relative rounded-3xl border border-line-hi bg-panel/70 p-6 sm:p-9"
          noValidate
        >
          {/* Honeypot — hidden from real users, visible to bots */}
          <div className="hidden" aria-hidden="true">
            <label htmlFor="website">Leave this field empty</label>
            <input type="text" id="website" name="website" tabIndex={-1} autoComplete="off" />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <Field label="Name" name="name" required autoComplete="name" />
            <Field label="Company" name="company" autoComplete="organization" />
            <Field label="Email" name="email" type="email" required autoComplete="email" />
            <Field label="Phone" name="phone" type="tel" autoComplete="tel" />

            <div>
              <label htmlFor="projectType" className="mb-1.5 block text-[13.5px] font-medium text-paper">
                Project type <span className="text-gold">*</span>
              </label>
              <select id="projectType" name="projectType" required defaultValue="" className={inputClasses}>
                <option value="" disabled>
                  Select a service
                </option>
                {PROJECT_TYPES.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="budget" className="mb-1.5 block text-[13.5px] font-medium text-paper">
                Budget <span className="text-gold">*</span>
              </label>
              <select id="budget" name="budget" required defaultValue="" className={inputClasses}>
                <option value="" disabled>
                  Select a range
                </option>
                {BUDGETS.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>

            <div className="sm:col-span-2">
              <label htmlFor="message" className="mb-1.5 block text-[13.5px] font-medium text-paper">
                Message <span className="text-gold">*</span>
              </label>
              <textarea
                id="message"
                name="message"
                required
                rows={5}
                placeholder="What are you building, and what does success look like?"
                className={`${inputClasses} resize-none`}
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={status === "submitting"}
            className="mt-7 inline-flex w-full items-center justify-center gap-2 rounded-full bg-gold px-6 py-3.5 font-display text-[15px] font-semibold text-ink transition-transform duration-300 hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
          >
            {status === "submitting" ? "Sending…" : "Send project inquiry"}
          </button>

          <div role="status" aria-live="polite" className="mt-4">
            {status === "success" && (
              <p className="text-[14px] text-cyan">
                Thanks — your message is in. We&apos;ll be in touch shortly.
              </p>
            )}
            {status === "error" && (
              <p className="text-[14px] text-gold">
                {errorMessage} Or reach us on{" "}
                <WhatsAppLink className="underline underline-offset-2">
                  WhatsApp
                </WhatsAppLink>
                .
              </p>
            )}
          </div>
        </form>
      </Container>
    </section>
  );
}

function Field({
  label,
  name,
  type = "text",
  required = false,
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  autoComplete?: string;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-[13.5px] font-medium text-paper">
        {label} {required && <span className="text-gold">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        autoComplete={autoComplete}
        className={inputClasses}
      />
    </div>
  );
}
