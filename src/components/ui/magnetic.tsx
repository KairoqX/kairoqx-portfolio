"use client";

import { motion } from "framer-motion";
import { type ReactNode } from "react";
import { useMagnetic } from "@/hooks/use-magnetic";
import { cn } from "@/utils/cn";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  as?: "div" | "span";
}

/**
 * Wraps any element with magnetic-hover physics. Fixes the classic bug
 * where hover-in feels smooth but hover-out "snaps" — both directions use
 * the same spring here, so motion is symmetric and continuous.
 */
export function Magnetic({
  children,
  className,
  strength = 0.3,
  as = "div",
}: MagneticProps) {
  const { x, y, onMouseMove, onMouseLeave } = useMagnetic(strength);
  const MotionTag = motion[as];

  return (
    <MotionTag
      style={{ x, y }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      className={cn("inline-block will-change-transform", className)}
    >
      {children}
    </MotionTag>
  );
}
