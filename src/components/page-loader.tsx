"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export function PageLoader() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setLoading(false), 500);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {loading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          className="fixed inset-0 z-[200] flex items-center justify-center bg-bg"
        >
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 0.9, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-4 h-14 w-14 rounded-full border-[3px] border-white/10"
              style={{
                borderTopColor: "var(--color-secondary)",
                borderRightColor: "var(--color-primary)",
              }}
            />
            <p className="font-mono text-xs tracking-widest text-muted">
              booting_portfolio.exe
            </p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
