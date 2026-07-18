"use client";

import { motion } from "framer-motion";
import { useScrollProgress } from "@/hooks/use-scroll-progress";

export function ScrollProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <motion.div
      className="fixed left-0 top-0 z-[100] h-[3px] bg-gradient-to-r from-secondary to-primary"
      style={{ width: `${progress}%` }}
      transition={{ duration: 0.1 }}
      aria-hidden="true"
    />
  );
}
