"use client";

import { motion, type Variants } from "framer-motion";
import { type ReactNode } from "react";

type RevealDirection = "up" | "left" | "right" | "scale" | "none";

interface RevealProps {
  children: ReactNode;
  direction?: RevealDirection;
  delay?: number;
  className?: string;
  /** Set false to re-trigger every time it scrolls into view (default: once). */
  once?: boolean;
}

const variantsFor = (direction: RevealDirection): Variants => {
  const hiddenBase = { opacity: 0 };
  const hidden =
    direction === "up"
      ? { ...hiddenBase, y: 28 }
      : direction === "left"
        ? { ...hiddenBase, x: -40 }
        : direction === "right"
          ? { ...hiddenBase, x: 40 }
          : direction === "scale"
            ? { ...hiddenBase, y: 16, scale: 0.94 }
            : hiddenBase;

  return {
    hidden,
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      scale: 1,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };
};

/**
 * Declarative scroll-reveal used throughout every section. Built on
 * Framer Motion's `whileInView`, which — unlike a hand-rolled
 * IntersectionObserver + CSS class toggle — correctly re-computes when
 * elements are inside `transform`-ed or `overflow`-clipped ancestors,
 * which is what caused reveals to silently fail on desktop only.
 */
export function Reveal({
  children,
  direction = "up",
  delay = 0,
  className,
  once = true,
}: RevealProps) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: 0.15, margin: "0px 0px -80px 0px" }}
      variants={variantsFor(direction)}
      transition={{ delay }}
    >
      {children}
    </motion.div>
  );
}

/** Wraps a group of children and staggers their entrance animation. */
export function RevealStagger({
  children,
  className,
  staggerDelay = 0.09,
}: {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}) {
  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      transition={{ staggerChildren: staggerDelay }}
    >
      {children}
    </motion.div>
  );
}

export function RevealStaggerItem({
  children,
  direction = "up",
  className,
}: {
  children: ReactNode;
  direction?: RevealDirection;
  className?: string;
}) {
  return (
    <motion.div className={className} variants={variantsFor(direction)}>
      {children}
    </motion.div>
  );
}
