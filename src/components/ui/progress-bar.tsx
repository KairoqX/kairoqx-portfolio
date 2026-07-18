"use client";

import { motion } from "framer-motion";
import { cn } from "@/utils/cn";

export function ProgressBar({
  label,
  value,
  color = "brand",
  colorHex,
}: {
  label: string;
  value: number;
  color?: "brand" | "custom";
  colorHex?: string;
}) {
  return (
    <div>
      <div className="mb-2 flex justify-between font-mono text-xs text-muted">
        <span className="text-white/80">{label}</span>
        <span>{value}%</span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-white/[.06]">
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${value}%` }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className={cn(
            "h-full rounded-full",
            color === "brand" && "bg-gradient-to-r from-secondary to-primary"
          )}
          style={color === "custom" ? { background: colorHex } : undefined}
        />
      </div>
    </div>
  );
}
