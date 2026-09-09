"use client";

import { useEffect, useRef } from "react";

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  pulse: number;
}

/**
 * Canvas-based "neural network" visual for the hero: nodes drift slowly,
 * connect with lines when close together (closer = brighter), and gently
 * react to the mouse — nodes within range get nudged and their nearby
 * connections glow brighter, giving a subtle "network reacting to you"
 * feel without being distracting.
 *
 * Runs entirely in a rAF loop and is paused (rAF cancelled) whenever the
 * canvas scrolls out of view, so it costs nothing once you've scrolled
 * past the hero — this matters for desktop performance across long pages.
 */
export function HeroNetworkCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    let width = 0;
    let height = 0;
    let nodes: Node[] = [];
    let rafId = 0;
    let running = false;
    const mouse = { x: -9999, y: -9999 };

    const nodeCount = window.innerWidth < 768 ? 26 : 46;

    function resize() {
      if (!canvas) return;
      width = canvas.width = canvas.offsetWidth * devicePixelRatio;
      height = canvas.height = canvas.offsetHeight * devicePixelRatio;
      canvas.style.width = canvas.offsetWidth + "px";
      canvas.style.height = canvas.offsetHeight + "px";
    }

    function init() {
      nodes = Array.from({ length: nodeCount }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.35 * devicePixelRatio,
        r: (Math.random() * 1.6 + 0.8) * devicePixelRatio,
        pulse: Math.random() * Math.PI * 2,
      }));
    }

    function step() {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);

      nodes.forEach((n) => {
        n.x += n.vx;
        n.y += n.vy;
        n.pulse += 0.02;

        // Gentle mouse attraction within radius
        const dx = mouse.x - n.x;
        const dy = mouse.y - n.y;
        const dist = Math.hypot(dx, dy);
        const reactRadius = 160 * devicePixelRatio;
        if (dist < reactRadius) {
          const force = (1 - dist / reactRadius) * 0.02;
          n.vx += dx * force * 0.02;
          n.vy += dy * force * 0.02;
        }

        // Clamp velocity so mouse attraction doesn't accumulate forever
        const speed = Math.hypot(n.vx, n.vy);
        const maxSpeed = 0.9 * devicePixelRatio;
        if (speed > maxSpeed) {
          n.vx = (n.vx / speed) * maxSpeed;
          n.vy = (n.vy / speed) * maxSpeed;
        }

        if (n.x < 0 || n.x > width) n.vx *= -1;
        if (n.y < 0 || n.y > height) n.vy *= -1;

        const glow = 0.55 + Math.sin(n.pulse) * 0.25;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${glow})`;
        ctx.fill();
      });

      // Connections
      const linkDist = 130 * devicePixelRatio;
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const a = nodes[i];
          const b = nodes[j];
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < linkDist) {
            const nearMouse =
              Math.hypot(mouse.x - a.x, mouse.y - a.y) < 200 * devicePixelRatio;
            const alpha = (1 - d / linkDist) * (nearMouse ? 0.5 : 0.18);
            ctx.strokeStyle = nearMouse
              ? `rgba(255,255,255,${alpha})`
              : `rgba(180,180,180,${alpha})`;
            ctx.lineWidth = devicePixelRatio;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      rafId = requestAnimationFrame(step);
    }

    function start() {
      if (running) return;
      running = true;
      rafId = requestAnimationFrame(step);
    }
    function stop() {
      running = false;
      cancelAnimationFrame(rafId);
    }

    function onMouseMove(e: MouseEvent) {
      const rect = canvas!.getBoundingClientRect();
      mouse.x = (e.clientX - rect.left) * devicePixelRatio;
      mouse.y = (e.clientY - rect.top) * devicePixelRatio;
    }
    function onMouseLeave() {
      mouse.x = -9999;
      mouse.y = -9999;
    }

    resize();
    init();

    if (!prefersReduced) {
      // Only animate while the hero is actually visible on screen —
      // avoids burning CPU/GPU once the user has scrolled past it.
      const observer = new IntersectionObserver(
        ([entry]) => (entry.isIntersecting ? start() : stop()),
        { threshold: 0 }
      );
      observer.observe(canvas);

      window.addEventListener("resize", () => {
        resize();
        init();
      });
      canvas.addEventListener("mousemove", onMouseMove);
      canvas.addEventListener("mouseleave", onMouseLeave);

      return () => {
        stop();
        observer.disconnect();
        canvas.removeEventListener("mousemove", onMouseMove);
        canvas.removeEventListener("mouseleave", onMouseLeave);
      };
    } else {
      // Reduced motion: draw one static frame, no rAF loop at all.
      step();
      stop();
    }
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 h-full w-full opacity-70"
      aria-hidden="true"
    />
  );
}
