"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { motion } from "framer-motion";
import { siteConfig, skillCategories } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";

type Line = { type: "input" | "output"; text: string };

const COMMANDS = ["help", "whoami", "skills", "projects", "github", "contact", "clear"];

function runCommand(cmd: string): string[] {
  const c = cmd.trim().toLowerCase();
  switch (c) {
    case "help":
      return [
        "Available commands:",
        ...COMMANDS.map((name) => `  ${name.padEnd(10)} — ${describeCommand(name)}`),
      ];
    case "whoami":
      return [
        `${siteConfig.name} — ${siteConfig.role}`,
        "Currently learning: AI, Machine Learning, LLMs, full-stack dev, Linux.",
        "Not a professional. Not an expert. Just building and learning in public.",
      ];
    case "skills":
      return skillCategories.flatMap((cat) => [
        `${cat.title}:`,
        ...cat.skills.map((s) => `  ${s.name.padEnd(16)} ${"█".repeat(Math.round(s.level / 10))}${"░".repeat(10 - Math.round(s.level / 10))} ${s.level}%`),
      ]);
    case "projects":
      return [
        "Scroll to #projects, or run:",
        `  open https://github.com/${siteConfig.githubUsername}`,
        "(live repo list is pulled from the GitHub API — see the Projects section)",
      ];
    case "github":
      return [`https://github.com/${siteConfig.githubUsername}`];
    case "contact":
      return [`Email: ${siteConfig.email}`, "Or scroll down to #contact for the form."];
    case "clear":
      return ["__CLEAR__"];
    case "":
      return [];
    default:
      return [`command not found: ${c}`, `type "help" to see available commands`];
  }
}

function describeCommand(name: string): string {
  switch (name) {
    case "help":
      return "list available commands";
    case "whoami":
      return "who is KairoqX?";
    case "skills":
      return "print skill levels";
    case "projects":
      return "where to find my projects";
    case "github":
      return "print GitHub profile URL";
    case "contact":
      return "how to reach me";
    case "clear":
      return "clear the terminal";
    default:
      return "";
  }
}

export function TerminalWidget() {
  const [lines, setLines] = useState<Line[]>([
    { type: "output", text: `Welcome to ${siteConfig.name}'s terminal. Type "help" to get started.` },
  ]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState<number | null>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [lines]);

  function handleSubmit() {
    const cmd = input;
    const output = runCommand(cmd);

    if (output[0] === "__CLEAR__") {
      setLines([]);
    } else {
      setLines((prev) => [
        ...prev,
        { type: "input", text: cmd },
        ...output.map((text) => ({ type: "output" as const, text })),
      ]);
    }

    if (cmd.trim()) setHistory((prev) => [...prev, cmd]);
    setHistoryIndex(null);
    setInput("");
  }

  function handleKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Enter") {
      handleSubmit();
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const nextIndex =
        historyIndex === null ? history.length - 1 : Math.max(0, historyIndex - 1);
      setHistoryIndex(nextIndex);
      setInput(history[nextIndex]);
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === null) return;
      const nextIndex = historyIndex + 1;
      if (nextIndex >= history.length) {
        setHistoryIndex(null);
        setInput("");
      } else {
        setHistoryIndex(nextIndex);
        setInput(history[nextIndex]);
      }
    }
  }

  return (
    <section id="terminal" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// interactive terminal"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Poke around, it&apos;s real
          </h2>
          <p className="leading-relaxed text-muted">
            A tiny shell — try <span className="text-white">help</span>,{" "}
            <span className="text-white">whoami</span>, or{" "}
            <span className="text-white">skills</span>.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <motion.div
            onClick={() => inputRef.current?.focus()}
            className="glass gradient-border overflow-hidden rounded-2xl"
          >
            <div className="flex items-center gap-2 border-b border-white/10 bg-white/[.03] px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-3 font-mono text-xs text-muted">
                kairoqx@portfolio: ~
              </span>
            </div>

            <div className="h-80 overflow-y-auto px-5 py-4 font-mono text-sm">
              {lines.map((line, i) => (
                <div key={i} className="mb-1.5 leading-relaxed">
                  {line.type === "input" ? (
                    <span>
                      <span className="text-success">➜ </span>
                      <span className="text-secondary">~</span>{" "}
                      <span className="text-white">{line.text}</span>
                    </span>
                  ) : (
                    <span className="whitespace-pre-wrap text-muted">
                      {line.text}
                    </span>
                  )}
                </div>
              ))}

              <div className="flex items-center gap-2">
                <span className="text-success">➜</span>
                <span className="text-secondary">~</span>
                <input
                  ref={inputRef}
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  autoComplete="off"
                  spellCheck={false}
                  aria-label="Terminal command input"
                  className="flex-1 bg-transparent text-white outline-none"
                />
              </div>
              <div ref={bottomRef} />
            </div>
          </motion.div>
        </Reveal>
      </div>
    </section>
  );
}
