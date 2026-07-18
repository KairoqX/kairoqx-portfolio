"use client";

import { useEffect, useState } from "react";

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Cycles through `words`, typing and deleting each one letter by letter.
 *
 * Under prefers-reduced-motion, it still cycles through the words (content
 * changing isn't the accessibility concern — per-character motion is), it
 * just swaps each word in as a whole instead of animating character by
 * character. An earlier version returned early and froze on the first
 * word forever whenever reduced-motion was on, which looked like the
 * whole animation had silently broken.
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

  // Reduced-motion path: swap the whole word on a fixed interval, no
  // per-character animation.
  useEffect(() => {
    if (!reducedMotion || words.length === 0) return;
    const id = setInterval(() => {
      setWordIndex((i) => (i + 1) % words.length);
    }, pauseMs + 800);
    return () => clearInterval(id);
  }, [reducedMotion, words, pauseMs]);

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

  if (reducedMotion) {
    return words[wordIndex % words.length] ?? "";
  }
  return text;
}
