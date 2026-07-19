"use client";

import { useEffect, useState } from "react";

/**
 * Cycles through `words`, typing and deleting each one letter by letter.
 *
 * Always animates — deliberately does NOT check prefers-reduced-motion.
 * A typewriter text effect isn't the kind of motion that tends to cause
 * real accessibility issues (no parallax, no large-scale movement, no
 * flashing), so there's no need to special-case it. This also sidesteps
 * an entire class of server/client hydration-mismatch bugs that comes
 * from branching behavior on a browser-only value like matchMedia —
 * this hook now behaves identically regardless of environment.
 */
export function useTypingEffect(
  words: readonly string[],
  options?: { typingSpeed?: number; deletingSpeed?: number; pauseMs?: number }
) {
  const { typingSpeed = 70, deletingSpeed = 35, pauseMs = 1500 } = options ?? {};

  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    if (words.length === 0) return;

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
  }, [text, deleting, wordIndex, words, typingSpeed, deletingSpeed, pauseMs]);

  return text;
}
