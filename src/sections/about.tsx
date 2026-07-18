"use client";

import { useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { aboutChips, aboutStats } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";

function CountUp({ target }: { target: number }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.6 });
  const [value, setValue] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const step = Math.max(1, Math.ceil(target / 60));
    let current = 0;
    const id = setInterval(() => {
      current = Math.min(target, current + step);
      setValue(current);
      if (current >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [inView, target]);

  return (
    <p ref={ref} className="font-display text-3xl font-bold text-gradient-brand">
      {value}
    </p>
  );
}

export function About() {
  return (
    <section id="about" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// about me"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Still learning, always building.
          </h2>
          <p className="leading-relaxed text-muted">
            I&apos;m a student developer, not an industry expert — and I like
            it that way. Every project on this site exists because I wanted
            to understand something new, not because I&apos;d already
            mastered it.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-5">
          <Reveal direction="left" className="md:col-span-3">
            <GlassCard className="h-full p-8 md:p-10" tilt={false}>
              <p className="mb-5 text-lg leading-relaxed text-white/90">
                I&apos;m currently exploring{" "}
                <span className="font-medium text-white">
                  Artificial Intelligence
                </span>
                ,{" "}
                <span className="font-medium text-white">
                  Machine Learning
                </span>{" "}
                and{" "}
                <span className="font-medium text-white">
                  Large Language Models
                </span>
                , alongside picking up{" "}
                <span className="font-medium text-white">
                  full-stack development
                </span>
                ,{" "}
                <span className="font-medium text-white">Linux</span> and{" "}
                <span className="font-medium text-white">open source</span>{" "}
                along the way.
              </p>
              <p className="mb-5 leading-relaxed text-muted">
                I build projects mainly to learn — an AI voice assistant to
                understand automation, a GPT model from scratch to understand
                transformers, small tools to get comfortable with Linux. I
                don&apos;t always get it right the first time, and
                that&apos;s kind of the point.
              </p>
              <p className="leading-relaxed text-muted">
                I also lean on AI tools regularly — to brainstorm ideas,
                debug tricky errors, and speed up how fast I learn new
                concepts. I see that as part of how developers learn today,
                not something to hide.
              </p>

              <div className="mt-9 grid grid-cols-3 gap-4 border-t border-white/10 pt-8">
                {aboutStats.map((stat) => (
                  <div key={stat.label} className="text-center">
                    <CountUp target={stat.value} />
                    <p className="mt-1 font-mono text-xs text-muted">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
            </GlassCard>
          </Reveal>

          <RevealStagger className="grid grid-cols-2 gap-4 md:col-span-2">
            {aboutChips.map((chip) => {
              const Icon = getIcon(chip.icon);
              return (
                <RevealStaggerItem key={chip.label} direction="scale">
                  <GlassCard className="flex flex-col items-start gap-3 p-5">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-primary/20 text-secondary">
                      <Icon size={20} />
                    </div>
                    <p className="text-sm font-medium">{chip.label}</p>
                  </GlassCard>
                </RevealStaggerItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
