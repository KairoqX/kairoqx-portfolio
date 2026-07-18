"use client";

import { useState, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    setFieldErrors({});

    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "").trim();
    const email = String(data.get("email") ?? "").trim();
    const message = String(data.get("message") ?? "").trim();
    const company = String(data.get("company") ?? ""); // honeypot

    // Lightweight client-side validation before hitting the network.
    const errors: Record<string, string> = {};
    if (name.length < 2) errors.name = "Name is too short.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      errors.email = "Enter a valid email address.";
    if (message.length < 10) errors.message = "Message is too short.";

    if (Object.keys(errors).length > 0) {
      setFieldErrors(errors);
      setStatus("error");
      setErrorMsg("Please fix the highlighted fields.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, company }),
      });
      const json = await res.json();

      if (!res.ok) {
        setStatus("error");
        setErrorMsg(json.error ?? "Something went wrong. Please try again.");
        return;
      }

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Network error — please check your connection and try again.");
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="glass gradient-border space-y-5 rounded-2xl p-8"
    >
      <div>
        <label htmlFor="name" className="mb-2 block font-mono text-xs text-muted">
          Name
        </label>
        <input
          required
          id="name"
          name="name"
          type="text"
          placeholder="Your name"
          className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/30 transition-[border-color,box-shadow,background] focus:border-secondary focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:outline-none"
        />
        {fieldErrors.name && (
          <p className="mt-1.5 text-xs text-primary">{fieldErrors.name}</p>
        )}
      </div>

      <div>
        <label htmlFor="email" className="mb-2 block font-mono text-xs text-muted">
          Email
        </label>
        <input
          required
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          className="w-full rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/30 transition-[border-color,box-shadow,background] focus:border-secondary focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:outline-none"
        />
        {fieldErrors.email && (
          <p className="mt-1.5 text-xs text-primary">{fieldErrors.email}</p>
        )}
      </div>

      <div>
        <label htmlFor="message" className="mb-2 block font-mono text-xs text-muted">
          Message
        </label>
        <textarea
          required
          id="message"
          name="message"
          rows={4}
          placeholder="What's on your mind?"
          className="w-full resize-none rounded-xl border border-white/10 bg-white/[.04] px-4 py-3 text-white placeholder:text-white/30 transition-[border-color,box-shadow,background] focus:border-secondary focus:bg-white/[.06] focus:shadow-[0_0_0_3px_rgba(59,130,246,0.12)] focus:outline-none"
        />
        {fieldErrors.message && (
          <p className="mt-1.5 text-xs text-primary">{fieldErrors.message}</p>
        )}
      </div>

      {/* Honeypot — visually hidden from real users, bots that autofill every
          input will fill this in and get silently rejected server-side. */}
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company">Company</label>
        <input
          id="company"
          name="company"
          type="text"
          tabIndex={-1}
          autoComplete="off"
        />
      </div>

      <Magnetic strength={0.15} className="block w-full sm:inline-block sm:w-auto">
        <Button
          type="submit"
          disabled={status === "loading"}
          className="w-full sm:w-auto"
        >
          {status === "loading" ? (
            <>
              <Loader2 size={16} className="animate-spin" /> Sending...
            </>
          ) : (
            <>
              Send Message <Send size={16} strokeWidth={2.2} />
            </>
          )}
        </Button>
      </Magnetic>

      <AnimatePresence mode="wait">
        {status === "success" && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="status"
            className="flex items-center gap-2 font-mono text-sm text-success"
          >
            <CheckCircle2 size={16} /> Message sent — I&apos;ll get back to
            you soon!
          </motion.p>
        )}
        {status === "error" && errorMsg && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            role="alert"
            className="flex items-center gap-2 font-mono text-sm text-primary"
          >
            <AlertCircle size={16} /> {errorMsg}
          </motion.p>
        )}
      </AnimatePresence>
    </form>
  );
}
