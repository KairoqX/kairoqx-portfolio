import { Star, Users, GitBranch, BookMarked } from "lucide-react";
import { GithubIcon } from "@/components/ui/brand-icons";
import { getGithubProfileData } from "@/lib/github";
import { siteConfig } from "@/lib/site-config";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { ProgressBar } from "@/components/ui/progress-bar";
import { Magnetic } from "@/components/ui/magnetic";
import { Button } from "@/components/ui/button";

const langColors = ["#3B82F6", "#E11D48", "#22C55E", "#A0AEC0", "#8B5CF6"];

export async function GithubSection() {
  const { user, repos, totalStars, languageBreakdown, isLive } =
    await getGithubProfileData();

  const stats = [
    { label: "Public Repos", value: user?.public_repos ?? repos.length, icon: BookMarked },
    { label: "Total Stars", value: totalStars, icon: Star },
    { label: "Followers", value: user?.followers ?? 0, icon: Users },
    { label: "Following", value: user?.following ?? 0, icon: GitBranch },
  ];

  return (
    <section id="github" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-8 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// github activity"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Building in public
          </h2>
          <p className="leading-relaxed text-muted">
            {isLive
              ? "Live stats, pulled directly from the GitHub API."
              : "Showing cached stats — live GitHub fetch is temporarily unavailable."}
          </p>
        </Reveal>

        <Reveal delay={0.05} className="mb-10">
          <Magnetic>
            <Button asChild variant="ghost" size="sm">
              <a
                href={`https://github.com/${siteConfig.githubUsername}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2"
              >
                <GithubIcon size={18} /> View GitHub Profile
              </a>
            </Button>
          </Magnetic>
        </Reveal>

        <RevealStagger className="mb-10 grid gap-5 md:grid-cols-4">
          {stats.map((stat) => (
            <RevealStaggerItem key={stat.label} direction="scale">
              <GlassCard className="p-6 text-center">
                <div className="mx-auto mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-primary/20 text-secondary">
                  <stat.icon size={20} />
                </div>
                <p className="font-display text-2xl font-bold">{stat.value}</p>
                <p className="mt-1 font-mono text-xs text-muted">{stat.label}</p>
              </GlassCard>
            </RevealStaggerItem>
          ))}
        </RevealStagger>

        <Reveal className="mb-8">
          <GlassCard className="overflow-x-auto p-6 md:p-8">
            <p className="mb-4 font-mono text-xs text-muted">
              contribution_graph.log
            </p>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://ghchart.rshah.org/3B82F6/${siteConfig.githubUsername}`}
              alt={`${siteConfig.name} GitHub contribution graph`}
              className="w-full rounded-xl"
              loading="lazy"
            />
          </GlassCard>
        </Reveal>

        {languageBreakdown.length > 0 && (
          <Reveal>
            <GlassCard className="p-6 md:p-8">
              <p className="mb-5 font-mono text-xs text-muted">
                top_languages.json
              </p>
              <div className="space-y-4">
                {languageBreakdown.map((lang, i) => (
                  <ProgressBar
                    key={lang.name}
                    label={lang.name}
                    value={lang.pct}
                    color="custom"
                    colorHex={langColors[i % langColors.length]}
                  />
                ))}
              </div>
            </GlassCard>
          </Reveal>
        )}
      </div>
    </section>
  );
}
