import { skillCategories } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";

export function Skills() {
  return (
    <section id="skills" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// skills"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            What I&apos;m getting comfortable with
          </h2>
          <p className="leading-relaxed text-muted">
            These bars track familiarity, not mastery — I&apos;m actively
            improving in every one of these.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-3">
          {skillCategories.map((cat, i) => {
            const Icon = getIcon(cat.icon);
            return (
              <Reveal key={cat.title} delay={i * 0.1}>
                <GlassCard className="h-full p-7">
                  <div className="mb-6 flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-primary/20 text-secondary">
                      <Icon size={20} />
                    </div>
                    <h3 className="font-display text-lg font-semibold">
                      {cat.title}
                    </h3>
                  </div>
                  <div className="space-y-5">
                    {cat.skills.map((skill) => (
                      <ProgressBar
                        key={skill.name}
                        label={skill.name}
                        value={skill.level}
                      />
                    ))}
                  </div>
                </GlassCard>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
