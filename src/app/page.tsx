import { Hero } from "@/sections/hero";
import { About } from "@/sections/about";
import { Skills } from "@/sections/skills";
import { Projects } from "@/sections/projects";
import { Timeline } from "@/sections/timeline";
import { TerminalWidget } from "@/sections/terminal";
import { Certificates } from "@/sections/certificates";
import { GithubSection } from "@/sections/github";
import { Contact } from "@/sections/contact";

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Skills />
      <Projects />
      <Timeline />
      <TerminalWidget />
      <Certificates />
      <GithubSection />
      <Contact />
    </>
  );
}
