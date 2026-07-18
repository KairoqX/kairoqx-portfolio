"use client";

import { useEffect, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Cycles through `words`, typing and deleting each one. Respects
 * prefers-reduced-motion by just showing the first word statically (the
 * reduced-motion check happens in a lazy state initializer, not inside
 * the effect body, so we never call setState synchronously during an
 * effect — which can trigger cascading re-renders).
 */
export function useTypingEffect(
  words: readonly string[],
  options?: { typingSpeed?: number; deletingSpeed?: number; pauseMs?: number }
) {
  const { typingSpeed = 70, deletingSpeed = 35, pauseMs = 1500 } = options ?? {};
  const reducedMotion = useState(prefersReducedMotion)[0];
  const [text, setText] = useState(() => (reducedMotion ? (words[0] ?? "") : ""));
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (reducedMotion) return;

    const current = words[wordIndex % words.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (!deleting && text.length < current.length) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length + 1)),
        typingSpeed
      );
    } else if (!deleting && text.length === current.length) {
      timeout = setTimeout(() => setDeleting(true), pauseMs);
    } else if (deleting && text.length > 0) {
      timeout = setTimeout(
        () => setText(current.slice(0, text.length - 1)),
        deletingSpeed
      );
    } else {
      // Fully deleted — move to the next word. Still scheduled via a
      // (zero-delay) timeout rather than called synchronously, so every
      // state transition in this effect goes through a callback instead
      // of running during the effect's own render pass.
      timeout = setTimeout(() => {
        setDeleting(false);
        setWordIndex((i) => (i + 1) % words.length);
      }, 0);
    }

    return () => clearTimeout(timeout);
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs, reducedMotion]);

  return text;
}
