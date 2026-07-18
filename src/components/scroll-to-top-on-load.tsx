"use client";

import { useEffect } from "react";

/**
 * Browsers automatically try to restore the previous scroll position on
 * refresh/re-entry ("scroll restoration") — which is what was causing
 * the site to open partway down the page instead of at the top. This
 * disables that browser behavior and forces every fresh load to start
 * at (0, 0), which is what you'd expect from a portfolio's hero section.
 */
export function ScrollToTopOnLoad() {
  useEffect(() => {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }
    window.scrollTo(0, 0);
  }, []);

  return null;
}
