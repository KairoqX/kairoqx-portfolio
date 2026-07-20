/**
 * github.ts
 * -----------------------------------------------------------------------
 * Server-side GitHub REST API integration. No hardcoded projects — repos,
 * stats and languages are fetched live from api.github.com.
 *
 * - Uses Next.js `fetch` caching (`next.revalidate`) so we don't hammer
 *   GitHub's unauthenticated rate limit (60 req/hr per IP).
 * - Falls back to `fallbackProjects` / zeroed stats if the API is
 *   unreachable or rate-limited, so the site never renders broken.
 * - Optional `GITHUB_TOKEN` env var raises the rate limit to 5000/hr —
 *   add one in Vercel's project settings if you hit limits in production.
 * -----------------------------------------------------------------------
 */

import { fallbackProjects, siteConfig, type FallbackProject } from "./site-config";

const GITHUB_API = "https://api.github.com";
const REVALIDATE_SECONDS = 60 * 60; // 1 hour

function githubHeaders(): HeadersInit {
  const headers: HeadersInit = {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
  // Optional: set GITHUB_TOKEN in your Vercel project's environment
  // variables to raise the rate limit and avoid 403s in production.
  if (process.env.GITHUB_TOKEN) {
    headers.Authorization = `Bearer ${process.env.GITHUB_TOKEN}`;
  }
  return headers;
}

export interface GithubUser {
  login: string;
  name: string | null;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  followers: number;
  following: number;
  public_repos: number;
  location: string | null;
}

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  homepage: string | null;
  stargazers_count: number;
  language: string | null;
  topics: string[];
  pushed_at: string;
  size: number;
  fork: boolean;
  archived: boolean;
}

export interface GithubProfileData {
  user: GithubUser | null;
  repos: GithubRepo[] | FallbackProject[];
  totalStars: number;
  languageBreakdown: { name: string; pct: number }[];
  isLive: boolean; // false when we had to fall back to static data
}

async function safeFetchJSON<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      headers: githubHeaders(),
      next: { revalidate: REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    return null;
  }
}

/** Derives a rough top-languages breakdown from repo `language` fields. */
function computeLanguageBreakdown(
  repos: { language: string | null; size: number }[]
): { name: string; pct: number }[] {
  const totals = new Map<string, number>();
  let sum = 0;
  for (const repo of repos) {
    if (!repo.language) continue;
    const weight = Math.max(repo.size, 1);
    totals.set(repo.language, (totals.get(repo.language) ?? 0) + weight);
    sum += weight;
  }
  if (sum === 0) return [];
  return [...totals.entries()]
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, weight]) => ({ name, pct: Math.round((weight / sum) * 100) }));
}

/**
 * Fetches the GitHub profile + public repos in parallel. Always resolves
 * (never throws) — falls back to static data on any failure so the UI
 * stays stable.
 */
export async function getGithubProfileData(): Promise<GithubProfileData> {
  const username = siteConfig.githubUsername;

  const [user, repos] = await Promise.all([
    safeFetchJSON<GithubUser>(`${GITHUB_API}/users/${username}`),
    safeFetchJSON<GithubRepo[]>(
      `${GITHUB_API}/users/${username}/repos?sort=pushed&per_page=100`
    ),
  ]);

  const liveRepos = repos?.filter((r) => !r.fork && !r.archived) ?? null;

  const finalRepos: GithubRepo[] | FallbackProject[] =
    liveRepos && liveRepos.length > 0 ? liveRepos : fallbackProjects;

  const totalStars = finalRepos.reduce(
    (sum, r) => sum + (r.stargazers_count ?? 0),
    0
  );

  const languageBreakdown = computeLanguageBreakdown(finalRepos);

  return {
    user,
    repos: finalRepos,
    totalStars,
    languageBreakdown,
    isLive: Boolean(user && liveRepos),
  };
}

/** Sorts repos by a simple "featured" heuristic: stars, then recency. */
export function pickFeaturedRepos<T extends { stargazers_count: number; pushed_at: string }>(
  repos: T[],
  limit = 12
): T[] {
  return [...repos]
    .sort((a, b) => {
      if (b.stargazers_count !== a.stargazers_count) {
        return b.stargazers_count - a.stargazers_count;
      }
      return new Date(b.pushed_at).getTime() - new Date(a.pushed_at).getTime();
    })
    .slice(0, limit);
}

export function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const count = Math.floor(seconds / secs);
    if (count >= 1) return `${count} ${label}${count > 1 ? "s" : ""} ago`;
  }
  return "just now";
}
