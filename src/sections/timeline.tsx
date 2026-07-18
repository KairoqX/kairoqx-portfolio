"use client";

import { motion, useScroll, useSpring } from "framer-motion";
import { useRef } from "react";
import { timeline } from "@/lib/site-config";
import { Reveal } from "@/components/ui/reveal";
import { Badge } from "@/components/ui/badge";

export function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 80%", "end 60%"],
  });
  const lineProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <section id="timeline" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal className="mb-16 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// learning journey"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            How I got here
          </h2>
          <p className="leading-relaxed text-muted">
            No fixed roadmap — just consistent, curious progress.
          </p>
        </Reveal>

        <div ref={containerRef} className="relative pl-10">
          {/* Static track */}
          <div className="absolute left-[7px] top-1 bottom-1 w-[2px] bg-white/10" />
          {/* Animated fill that draws in as you scroll */}
          <motion.div
            style={{ scaleY: lineProgress }}
            className="absolute left-[7px] top-1 bottom-1 w-[2px] origin-top bg-gradient-to-b from-secondary to-primary"
          />

          {timeline.map((item, i) => (
            <Reveal key={item.title} direction="left" delay={i * 0.05}>
              <div className="relative pb-12 last:pb-0">
                <span
                  className="absolute -left-10 top-1 h-4 w-4 rounded-full bg-gradient-to-br from-secondary to-primary"
                  style={{
                    boxShadow:
                      "0 0 0 4px var(--color-bg), 0 0 20px color-mix(in srgb, var(--color-primary) 70%, transparent)",
                  }}
                />
                <Badge className="mb-2 inline-block">{item.year}</Badge>
                <h3 className="mb-1.5 font-display text-lg font-semibold">
                  {item.title}
                </h3>
                <p className="max-w-xl text-sm leading-relaxed text-muted">
                  {item.desc}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
