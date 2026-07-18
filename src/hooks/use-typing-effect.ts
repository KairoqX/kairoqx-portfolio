"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

function subscribeToReducedMotion(callback: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY);
  mq.addEventListener("change", callback);
  return () => mq.removeEventListener("change", callback);
}

function getReducedMotionSnapshot() {
  return window.matchMedia(REDUCED_MOTION_QUERY).matches;
}

// The server has no browser to check, so it always renders as if reduced
// motion is off. Returning `false` here guarantees the very first client
// render matches that assumption exactly — no hydration mismatch — and
// `useSyncExternalStore` then safely swaps in the real value right after
// hydration if needed, without React ever seeing a mismatched tree.
function getReducedMotionServerSnapshot() {
  return false;
}

/**
 * Cycles through `words`, typing and deleting each one letter by letter.
 *
 * IMPORTANT: reduced-motion detection uses `useSyncExternalStore` rather
 * than reading `window.matchMedia` directly during render/lazy-init.
 * Reading it directly caused a real hydration-mismatch bug: the server
 * always assumes reduced motion is off (it has no browser to check), so
 * whenever a visitor's actual OS/browser had reduced motion ON, the
 * client's very first render produced different text than the server's
 * HTML — React detected the mismatch, discarded the whole tree, and
 * rebuilt it client-side, which is what made the animation look
 * permanently frozen. `useSyncExternalStore` is the pattern React
 * provides specifically to avoid this class of bug.
 *
 * Under reduced motion, it still cycles through the words (content
 * changing isn't the accessibility concern — per-character motion is);
 * it just swaps each word in as a whole instead of animating character
 * by character.
 */
export function useTypingEffect(
  words: readonly string[],
  options?: { typingSpeed?: number; deletingSpeed?: number; pauseMs?: number }
) {
  const { typingSpeed = 70, deletingSpeed = 35, pauseMs = 1500 } = options ?? {};

  const reducedMotion = useSyncExternalStore(
    subscribeToReducedMotion,
    getReducedMotionSnapshot,
    getReducedMotionServerSnapshot
  );

  const [text, setText] = useState("");
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
