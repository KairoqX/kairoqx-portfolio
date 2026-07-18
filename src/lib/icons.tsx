import {
  Mail,
  ExternalLink,
  Brain,
  Code2,
  Terminal,
  Layers,
  GitBranch,
  PenTool,
  Cpu,
  Award,
  Star,
  Users,
  BookMarked,
  GitFork,
  ArrowRight,
  ArrowUp,
  Menu,
  X,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Calendar,
  HardDrive,
  Tag,
  type LucideIcon,
} from "lucide-react";
import { GithubIcon, InstagramIcon, XIcon } from "@/components/ui/brand-icons";

/** Minimal shape shared by lucide icons and our hand-rolled brand icons. */
type IconComponent = LucideIcon | typeof GithubIcon;

/**
 * Central icon registry. Data files (site-config.ts) reference icons by
 * string key so content stays framework-agnostic; components resolve the
 * key to a real component here. Add new icons in one place.
 */
export const ICONS: Record<string, IconComponent> = {
  github: GithubIcon,
  mail: Mail,
  instagram: InstagramIcon,
  x: XIcon,
  external: ExternalLink,
  brain: Brain,
  code: Code2,
  terminal: Terminal,
  layers: Layers,
  gitBranch: GitBranch,
  penTool: PenTool,
  cpu: Cpu,
  award: Award,
  git: GitBranch,
  star: Star,
  users: Users,
  repo: BookMarked,
  fork: GitFork,
  arrowRight: ArrowRight,
  arrowUp: ArrowUp,
  menu: Menu,
  close: X,
  send: Send,
  spinner: Loader2,
  success: CheckCircle2,
  error: AlertCircle,
  calendar: Calendar,
  size: HardDrive,
  tag: Tag,
};

export function getIcon(name: string): IconComponent {
  return ICONS[name] ?? Code2;
}
