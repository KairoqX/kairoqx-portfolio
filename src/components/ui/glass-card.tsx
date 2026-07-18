"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent, type ReactNode } from "react";
import { cn } from "@/utils/cn";

interface GlassCardProps {
  children: ReactNode;
  className?: string;
  tilt?: boolean;
  gradientBorder?: boolean;
}

/**
 * Base glassmorphism card: blurred translucent background, hover lift,
 * optional gradient border and optional 3D tilt-on-mouse-move.
 */
export function GlassCard({
  children,
  className,
  tilt = false,
  gradientBorder = true,
}: GlassCardProps) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function handleMouseMove(e: MouseEvent<HTMLDivElement>) {
    if (!tilt) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    rotateY.set(px * 8);
    rotateX.set(-py * 8);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={tilt ? { rotateX, rotateY, transformPerspective: 800 } : undefined}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className={cn(
        "glass rounded-2xl transition-[border-color,box-shadow,background] duration-300",
        "hover:border-secondary/40 hover:shadow-[0_20px_60px_-20px_rgba(59,130,246,0.35)] hover:bg-white/[.07]",
        gradientBorder && "gradient-border",
        className
      )}
    >
      {children}
    </motion.div>
  );
}
