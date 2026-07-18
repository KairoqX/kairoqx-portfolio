import { siteConfig, socialLinks } from "@/lib/site-config";
import { getIcon } from "@/lib/icons";
import { Magnetic } from "@/components/ui/magnetic";

export function Footer() {
  return (
    <footer className="relative border-t border-white/5 py-12">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-5 md:flex-row md:px-8">
        <div className="flex items-center gap-2">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-secondary to-primary text-sm font-bold text-white">
            K
          </span>
          <div>
            <p className="font-display font-semibold">{siteConfig.name}</p>
            <p className="font-mono text-xs text-muted">
              student developer · curious builder
            </p>
          </div>
        </div>

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

        <p className="text-center font-mono text-xs text-muted">
          © {new Date().getFullYear()} {siteConfig.name}. Built with Next.js,
          Tailwind &amp; Framer Motion.
        </p>
      </div>
    </footer>
  );
}
