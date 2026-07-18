"use client";

import { useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent } from "react";

/**
 * Magnetic-hover physics for buttons/links, powered by Framer Motion
 * springs. Using a spring (rather than a CSS transition retriggered on
 * every mousemove) means the follow motion AND the release-back-to-0
 * motion share the exact same damping curve — no more "snaps back
 * abruptly" feeling when the mouse leaves quickly.
 *
 * Usage:
 *   const { x, y, onMouseMove, onMouseLeave } = useMagnetic();
 *   <motion.button style={{ x, y }} onMouseMove={onMouseMove} onMouseLeave={onMouseLeave}>
 */
export function useMagnetic(strength = 0.3) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const springX = useSpring(x, { stiffness: 250, damping: 18, mass: 0.4 });
  const springY = useSpring(y, { stiffness: 250, damping: 18, mass: 0.4 });

  function onMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const offsetX = e.clientX - rect.left - rect.width / 2;
    const offsetY = e.clientY - rect.top - rect.height / 2;
    x.set(offsetX * strength);
    y.set(offsetY * strength);
  }

  function onMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return { x: springX, y: springY, onMouseMove, onMouseLeave };
}
