import { BrainCircuit, Database, LayoutGrid, Server } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { SKILLS } from "@/data/content";

const ICONS = { layout: LayoutGrid, server: Server, brain: BrainCircuit, database: Database };

export const Skills = () => (
  <section id="skills" className="py-24 md:py-32 scroll-mt-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading id="skills" eyebrow="Skills" title="A stack chosen for shipping." />

      <div className="mt-14 md:mt-20 grid md:grid-cols-2 gap-5 md:gap-6" data-testid="skills-grid">
        {SKILLS.map((group, i) => {
          const Icon = ICONS[group.icon];
          return (
            <Reveal key={group.title} delay={i * 0.06}>
              <div className="h-full rounded-2xl border border-white/8 bg-surface p-6 md:p-8 hover:border-blue-500/30 transition-colors duration-300">
                <div className="flex items-center gap-4 mb-6">
                  <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-blue-400">
                    <Icon size={19} />
                  </span>
                  <h3 className="text-lg font-semibold tracking-tight text-zinc-50">{group.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {group.items.map((s) => (
                    <span
                      key={s}
                      className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300 hover:border-blue-500/40 hover:text-zinc-100 transition-colors"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          );
        })}
      </div>
    </div>
  </section>
);

export default Skills;
