"use client";

import { useEffect, useRef } from "react";

/**
 * Desktop-only cursor glow + dot follower.
 *
 * BUG FIX NOTE: in the original build, elements like this sat *inside*
 * transformed/blurred ancestors, which in CSS creates a new "containing
 * block" for any `position: fixed` descendant (per spec, `transform`,
 * `filter`, `backdrop-filter`, `perspective`, `contain` and `will-change`
 * on an ancestor all do this). That silently turns `position: fixed`
 * into "fixed relative to that ancestor" instead of the viewport — which
 * only becomes visible once you interact with a hover/transform-driven
 * ancestor, i.e. only on desktop with a real mouse. Mobile never
 * triggered the hover transforms, so it "worked" there by accident.
 *
 * Fix: this component is mounted once, directly in the root layout,
 * with no transformed/blurred parent above it — and `pointer-events-none`
 * everywhere so it can never intercept clicks meant for real UI.
 */
export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);
  const dotRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Skip entirely on touch/coarse-pointer devices — no mouse to follow.
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    if (isTouch) return;

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;
    let rafId: number;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%, -50%)`;
      }
    };

    const loop = () => {
      glowX += (mouseX - glowX) * 0.08;
      glowY += (mouseY - glowY) * 0.08;
      if (glowRef.current) {
        glowRef.current.style.transform = `translate(${glowX}px, ${glowY}px) translate(-50%, -50%)`;
      }
      rafId = requestAnimationFrame(loop);
    };

    window.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <>
      <div
        ref={glowRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[1] hidden h-[420px] w-[420px] rounded-full opacity-70 will-change-transform md:block"
        style={{
          background:
            "radial-gradient(circle, color-mix(in srgb, var(--color-secondary) 16%, transparent), transparent 70%)",
        }}
      />
      <div
        ref={dotRef}
        aria-hidden="true"
        className="pointer-events-none fixed left-0 top-0 z-[100] hidden h-2.5 w-2.5 rounded-full will-change-transform md:block"
        style={{
          background: "var(--color-primary)",
          boxShadow:
            "0 0 12px var(--color-primary), 0 0 24px color-mix(in srgb, var(--color-primary) 50%, transparent)",
          mixBlendMode: "screen",
        }}
      />
    </>
  );
}
