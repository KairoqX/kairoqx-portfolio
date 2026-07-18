"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/utils/cn";
import { ProjectCard, type ProjectCardData } from "@/components/project-card";

const KNOWN_WEB_TOPICS = ["nextjs", "react", "web", "portfolio", "html", "css"];

function categorize(project: ProjectCardData): "ai" | "web" {
  const haystack = [
    project.language ?? "",
    ...project.topics,
    project.name,
  ]
    .join(" ")
    .toLowerCase();
  const isWeb = KNOWN_WEB_TOPICS.some((t) => haystack.includes(t));
  return isWeb ? "web" : "ai";
}

export function ProjectsGrid({ projects }: { projects: ProjectCardData[] }) {
  const [filter, setFilter] = useState<"all" | "ai" | "web">("all");

  const categorized = useMemo(
    () => projects.map((p) => ({ project: p, cat: categorize(p) })),
    [projects]
  );

  const filtered = categorized.filter(
    ({ cat }) => filter === "all" || cat === filter
  );

  return (
    <div>
      <div
        role="tablist"
        aria-label="Filter projects"
        className="mb-10 flex flex-wrap gap-3"
      >
        {(["all", "ai", "web"] as const).map((key) => (
          <button
            key={key}
            role="tab"
            aria-selected={filter === key}
            onClick={() => setFilter(key)}
            className={cn(
              "rounded-full border border-white/10 px-4 py-2 font-mono text-xs text-muted transition-all",
              filter === key &&
                "border-transparent bg-gradient-to-r from-secondary to-primary text-white"
            )}
          >
            {key === "all" ? "All" : key === "ai" ? "AI / ML" : "Web Dev"}
          </button>
        ))}
      </div>

      <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout">
          {filtered.map(({ project }, i) => (
            <motion.div
              key={project.name}
              layout
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <ProjectCard project={project} index={i} />
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {filtered.length === 0 && (
        <p className="py-16 text-center font-mono text-sm text-muted">
          No projects in this category yet.
        </p>
      )}
    </div>
  );
}
