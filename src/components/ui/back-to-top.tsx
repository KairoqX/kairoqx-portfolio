"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { Magnetic } from "@/components/ui/magnetic";

export function BackToTop() {
  const { scrolled: pastThreshold } = useScrollProgress(600);

  return (
    <AnimatePresence>
      {pastThreshold && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="fixed bottom-6 right-6 z-[60]"
        >
          <Magnetic strength={0.4}>
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              aria-label="Back to top"
              className="glass flex h-12 w-12 items-center justify-center rounded-full border border-white/10 text-white transition-colors hover:border-secondary/50"
            >
              <ArrowUp className="h-[18px] w-[18px]" strokeWidth={2.4} />
            </button>
          </Magnetic>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
