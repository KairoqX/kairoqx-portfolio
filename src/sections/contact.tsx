import { socialLinks } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/ui/reveal";
import { GlassCard } from "@/components/ui/glass-card";
import { ContactForm } from "@/components/contact-form";

export function Contact() {
  return (
    <section id="contact" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <Reveal className="mb-14 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// contact"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Let&apos;s build or learn something together
          </h2>
          <p className="leading-relaxed text-muted">
            Open to collaborations, study buddies, feedback, or just a chat
            about AI and code.
          </p>
        </Reveal>

        <div className="grid gap-6 md:grid-cols-5">
          <Reveal direction="left" className="relative md:col-span-3">
            <ContactForm />
          </Reveal>

          <RevealStagger className="grid grid-cols-1 gap-4 md:col-span-2">
            {socialLinks.map((s) => {
              const Icon = getIcon(s.icon);
              return (
                <RevealStaggerItem key={s.href} direction="right">
                  <a
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block"
                  >
                    <GlassCard className="flex items-center gap-4 p-5">
                      <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-secondary/25 to-primary/20 text-secondary">
                        <Icon size={20} />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{s.label}</p>
                        <p className="max-w-[220px] truncate font-mono text-xs text-muted">
                          {s.href.replace("mailto:", "")}
                        </p>
                      </div>
                    </GlassCard>
                  </a>
                </RevealStaggerItem>
              );
            })}
          </RevealStagger>
        </div>
      </div>
    </section>
  );
}
