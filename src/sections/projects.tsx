import { getGithubProfileData, pickFeaturedRepos } from "@/lib/github";
import { Reveal } from "@/components/ui/reveal";
import { ProjectsGrid } from "@/components/projects-grid";

/**
 * Server Component: fetches live repo data from the GitHub REST API at
 * request/build time (see src/lib/github.ts). No project is hardcoded —
 * add/remove/rename a repo on GitHub and it shows up here automatically
 * on the next revalidation (hourly, or immediately in dev).
 */
export async function Projects() {
  const { repos, isLive } = await getGithubProfileData();
  const featured = pickFeaturedRepos(repos, 6);

  return (
    <section id="projects" className="relative py-28 md:py-36">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="mb-10 max-w-2xl">
          <span className="font-mono text-sm tracking-wide text-secondary">
            {"// featured projects"}
          </span>
          <h2 className="mb-4 mt-3 font-display text-3xl font-bold md:text-4xl">
            Things I&apos;ve built while learning
          </h2>
          <p className="leading-relaxed text-muted">
            Pulled live from my GitHub — a mix of AI/ML experiments and web
            projects. Some are polished, some are still rough — all of them
            taught me something.
          </p>
          {!isLive && (
            <p className="mt-3 font-mono text-xs text-primary/80">
              Showing cached project data — live GitHub fetch is temporarily
              unavailable.
            </p>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          <ProjectsGrid projects={featured} />
        </Reveal>
      </div>
    </section>
  );
}
