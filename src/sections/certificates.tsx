import { certificates } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";

export function Certificates() {
  return (
    <section id="certificates" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// certificates"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Courses I&apos;ve completed
          </h2>
          <p className="leading-relaxed text-muted">
            Structured learning alongside my own projects.
          </p>
        </Reveal>

        <RevealStagger className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certificates.map((cert) => {
            const Icon = getIcon(cert.icon);
            return (
              <RevealStaggerItem key={cert.title} direction="scale">
                <GlassCard className="flex items-start gap-4 p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-primary/20 text-secondary">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h3 className="mb-1 text-sm font-semibold">
                      {cert.title}
                    </h3>
                    <p className="font-mono text-xs text-muted">{cert.org}</p>
                  </div>
                </GlassCard>
              </RevealStaggerItem>
            );
          })}
        </RevealStagger>
      </div>
    </section>
  );
}
