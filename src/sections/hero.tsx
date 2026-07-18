"use client";

import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { type MouseEvent } from "react";
import { siteConfig, roles, socialLinks } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { useTypingEffect } from "@/hooks/use-typing-effect";
import { Reveal } from "@/components/ui/reveal";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";
import { HeroNetworkCanvas } from "@/components/hero-network-canvas";

const orbitBadges = [
  { icon: "cpu", label: "PyTorch", position: "-top-3 -left-3", delay: -1 },
  { icon: "code", label: "Python", position: "top-1/3 -right-8", delay: -2.4 },
  { icon: "terminal", label: "Linux", position: "-bottom-4 left-6", delay: -3.6 },
];

export function Hero() {
  const typedText = useTypingEffect(roles);

  // Mouse-parallax for the profile orb: the orb subtly leans away from
  // the cursor, giving the hero a sense of 3D depth.
  const parallaxX = useMotionValue(0);
  const parallaxY = useMotionValue(0);
  const springX = useSpring(parallaxX, { stiffness: 80, damping: 20 });
  const springY = useSpring(parallaxY, { stiffness: 80, damping: 20 });
  const rotateY = useTransform(springX, [-60, 60], [-10, 10]);
  const rotateX = useTransform(springY, [-60, 60], [10, -10]);

  function handleSectionMouseMove(e: MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    parallaxX.set(px * 60);
    parallaxY.set(py * 60);
  }

  return (
    <section
      id="home"
      onMouseMove={handleSectionMouseMove}
      className="relative flex min-h-screen items-center overflow-hidden pb-16 pt-24"
    >
      {/* Decorative blobs — pointer-events-none so they never block clicks */}
      <div
        aria-hidden="true"
        className="animate-blob pointer-events-none absolute -left-40 top-0 h-[420px] w-[420px] rounded-full bg-secondary opacity-30 blur-[80px]"
        style={{ animation: "blob 16s ease-in-out infinite" }}
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 right-0 h-[380px] w-[380px] rounded-full bg-primary opacity-30 blur-[80px]"
        style={{ animation: "blob 16s ease-in-out infinite", animationDelay: "-6s" }}
      />

      <HeroNetworkCanvas />

      <div className="relative mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-14 px-5 md:grid-cols-[1.15fr_0.85fr] md:px-8">
        <div>
          <Reveal>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-success" />
              <span className="font-mono text-xs tracking-wide text-secondary">
                currently_learning: AI &amp; ML
              </span>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <h1 className="mb-5 font-display text-4xl font-bold leading-[1.08] tracking-tight sm:text-5xl lg:text-6xl">
              Hi, I&apos;m{" "}
              <span className="text-gradient-brand">{siteConfig.name}</span>.
              <br />
              <span className="text-white/90">{typedText}</span>
              <span className="typing-cursor h-[1em] align-middle" />
            </h1>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="mb-9 max-w-xl text-lg leading-relaxed text-muted">
              A student developer exploring Artificial Intelligence, Machine
              Learning and Large Language Models — one project at a time.
              I&apos;m not an expert yet; I&apos;m a curious builder who
              learns by shipping things, breaking them, and figuring out why.
            </p>
          </Reveal>

          <Reveal delay={0.15}>
            <div className="mb-12 flex flex-wrap items-center gap-4">
              <Magnetic>
                <Button asChild>
                  <a href="#projects" className="inline-flex items-center gap-2">
                    View Projects
                    <ArrowRight size={16} strokeWidth={2.2} />
                  </a>
                </Button>
              </Magnetic>
              <Magnetic>
                <Button asChild variant="ghost">
                  <a href="#contact">Get in Touch</a>
                </Button>
              </Magnetic>
            </div>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="flex items-center gap-5">
              <span className="font-mono text-xs uppercase tracking-widest text-muted">
                Find me
              </span>
              <div className="flex items-center gap-3">
                {socialLinks.map((s) => {
                  const Icon = getIcon(s.icon);
                  return (
                    <Magnetic key={s.href} strength={0.4}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={s.label}
                        className="glass flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-secondary"
                      >
                        <Icon size={18} />
                      </a>
                    </Magnetic>
                  );
                })}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Profile orb with mouse-parallax depth + holographic rings */}
        <Reveal direction="scale" className="relative mx-auto h-72 w-72 sm:h-80 sm:w-80">
          <motion.div
            style={{ rotateX, rotateY, transformPerspective: 1000 }}
            className="relative h-full w-full"
          >
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-pulse rounded-full bg-gradient-to-br from-secondary/40 to-primary/30 blur-3xl"
              style={{ animationDuration: "4s" }}
            />
            {/* Holographic rings */}
            <div
              aria-hidden="true"
              className="absolute inset-0 animate-float-slow rounded-full border border-secondary/25"
            />
            <div
              aria-hidden="true"
              className="absolute -inset-4 rounded-full border border-primary/15"
              style={{ animation: "float 9s ease-in-out infinite reverse" }}
            />
            <div className="gradient-border glass absolute inset-4 flex items-center justify-center overflow-hidden rounded-full">
              <Image
                src="https://avatars.githubusercontent.com/u/190733021?v=4"
                alt={`${siteConfig.name} profile photo`}
                fill
                sizes="320px"
                className="object-cover"
                priority
              />
            </div>

            {orbitBadges.map((badge) => {
              const Icon = getIcon(badge.icon);
              return (
                <div
                  key={badge.label}
                  className={`glass animate-float absolute ${badge.position} flex items-center gap-2 rounded-2xl px-3 py-2`}
                  style={{ animationDelay: `${badge.delay}s` }}
                >
                  <Icon size={16} className="text-secondary" />
                  <span className="font-mono text-xs">{badge.label}</span>
                </div>
              );
            })}
          </motion.div>
        </Reveal>
      </div>

      <a
        href="#about"
        aria-label="Scroll to About"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-muted transition-colors hover:text-white"
      >
        <svg
          className="animate-float-slow"
          width="22"
          height="34"
          viewBox="0 0 22 34"
          fill="none"
        >
          <rect
            x="1"
            y="1"
            width="20"
            height="32"
            rx="10"
            stroke="currentColor"
            strokeWidth="1.5"
          />
          <circle cx="11" cy="9" r="2" fill="currentColor" />
        </svg>
      </a>
    </section>
  );
}
