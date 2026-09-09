"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { type MouseEvent } from "react";
import { ExternalLink, Star, Calendar, HardDrive, Tag } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { Badge } from "@/components/ui/badge";
import { formatRelativeTime } from "@/lib/github";

export interface ProjectCardData {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  size: number;
}

function initials(name: string) {
  return name
    .split(/[\s._-]/)
    .filter(Boolean)
    .map((w) => w[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();
}

const gradients = [
  "from-secondary/60 to-primary/30",
  "from-primary/60 to-secondary/30",
  "from-secondary/50 to-primary/40",
  "from-primary/50 to-secondary/25",
];

export function ProjectCard({
  project,
  index,
}: {
  project: ProjectCardData;
  index: number;
}) {
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const grad = gradients[index % gradients.length];
  const href = project.homepage || project.html_url;

  function handleMouseMove(e: MouseEvent<HTMLAnchorElement>) {
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
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800 }}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="glass gradient-border group flex h-full flex-col overflow-hidden rounded-2xl transition-[border-color,box-shadow,background] duration-300 hover:border-secondary/40 hover:bg-white/[.07] hover:shadow-[0_20px_60px_-20px_rgba(255,255,255,0.25)]"
    >
      {/* Banner with hover-reveal metadata overlay */}
      <div
        className={`relative h-40 overflow-hidden bg-gradient-to-br ${grad} flex items-center justify-center`}
      >
        <span className="font-display text-4xl font-bold text-white/25 transition-transform duration-500 group-hover:scale-110">
          {initials(project.name)}
        </span>

        {/* Glass reflection sweep on hover */}
        <div className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/15 to-transparent transition-transform duration-700 group-hover:translate-x-full" />

        {/* Metadata overlay revealed on hover */}
        <div className="absolute inset-0 flex flex-col justify-end gap-1.5 bg-black/55 p-4 opacity-0 backdrop-blur-sm transition-opacity duration-300 group-hover:opacity-100">
          <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[0.7rem] text-white/85">
            <span className="inline-flex items-center gap-1">
              <Star size={12} /> {project.stargazers_count}
            </span>
            <span className="inline-flex items-center gap-1">
              <Calendar size={12} /> {formatRelativeTime(project.pushed_at)}
            </span>
            <span className="inline-flex items-center gap-1">
              <HardDrive size={12} /> {Math.round(project.size / 1024) || 1}
              MB
            </span>
          </div>
          {project.topics.length > 0 && (
            <div className="flex flex-wrap items-center gap-1.5 pt-1">
              <Tag size={12} className="text-white/60" />
              {project.topics.slice(0, 4).map((t) => (
                <span
                  key={t}
                  className="rounded-full bg-white/15 px-2 py-0.5 text-[0.65rem] text-white/85"
                >
                  {t}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 font-display text-lg font-semibold">
          {project.name}
        </h3>
        <p className="mb-4 flex-1 text-sm leading-relaxed text-muted">
          {project.description || "No description provided yet."}
        </p>

        <div className="mb-5 flex flex-wrap gap-2">
          {project.language && <Badge>{project.language}</Badge>}
          {project.topics.slice(0, 2).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>

        <div className="flex items-center gap-3 border-t border-white/10 pt-4">
          <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted transition-colors group-hover:text-white">
            <GithubIcon size={14} /> Code
          </span>
          {project.homepage && (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-secondary transition-colors group-hover:text-white">
              <ExternalLink size={14} /> Live Demo
            </span>
          )}
        </div>
      </div>
    </motion.a>
  );
}
