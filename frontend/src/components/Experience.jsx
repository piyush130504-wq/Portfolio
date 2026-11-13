import { Reveal, SectionHeading } from "./Reveal";
import { TIMELINE } from "@/data/content";

export const Experience = () => (
  <section id="experience" className="py-24 md:py-32 scroll-mt-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading id="experience" eyebrow="Experience" title="Where I've worked." />

      <div className="relative mt-14 md:mt-20 border-l border-white/10 pl-8 md:pl-14 space-y-14 max-w-3xl" data-testid="experience-timeline">
        {TIMELINE.map((t, i) => (
          <Reveal key={t.company} delay={i * 0.06} y={20}>
            <div className="relative">
              <span className="absolute -left-[37px] md:-left-[61px] top-1.5 flex h-3.5 w-3.5 items-center justify-center">
                <span className="absolute h-full w-full rounded-full bg-blue-500/30 animate-pulse-ring" />
                <span className="relative h-2 w-2 rounded-full bg-blue-500" />
              </span>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">0{i + 1}</p>
              <h3 className="mt-2 text-lg sm:text-xl font-semibold tracking-tight text-zinc-50">{t.role}</h3>
              <p className="mt-1 font-mono text-xs tracking-[0.15em] uppercase text-blue-400">{t.company}</p>
              <p className="mt-3 text-sm text-zinc-400 leading-relaxed max-w-xl">{t.details}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default Experience;
