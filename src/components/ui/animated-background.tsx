/**
 * Rendered once, directly in the root layout, sitting behind everything
 * at z-0. Kept intentionally outside of any section that applies
 * `transform`/`filter` so it never becomes an accidental containing
 * block for other fixed-position UI (see cursor-glow.tsx for the full
 * explanation of that bug class).
 */
export function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
      <div className="animated-gradient-bg absolute inset-0" />
      <div className="noise-layer absolute inset-0" />
    </div>
  );
}
