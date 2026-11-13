import { Reveal, SectionHeading } from "./Reveal";

const BENTO = [
  {
    label: "Frontend",
    span: "md:col-span-5",
    items: ["React.js", "Next.js", "TypeScript", "JavaScript"],
  },
  {
    label: "Styling & Motion",
    span: "md:col-span-4",
    items: ["Tailwind CSS", "Framer Motion", "HTML", "CSS"],
  },
  {
    label: "Backend",
    span: "md:col-span-3",
    items: ["Node.js", "Express.js", "Python", "FastAPI"],
  },
  {
    label: "Databases",
    span: "md:col-span-4",
    items: ["MongoDB", "SQL"],
  },
  {
    label: "AI",
    span: "md:col-span-4",
    items: ["OpenAI API", "Gemini API", "Machine Learning"],
  },
  {
    label: "Tools",
    span: "md:col-span-4",
    items: ["Git", "GitHub", "Vercel", "Figma"],
  },
];

export const About = () => (
  <section id="about" className="py-24 md:py-32 scroll-mt-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="grid lg:grid-cols-12 gap-10 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-28">
            <SectionHeading
              id="about"
              eyebrow="About"
              title="Engineering with design judgment."
            />
          </div>
        </div>

        <div className="lg:col-span-7 space-y-6">
          <Reveal>
            <p className="text-lg sm:text-xl text-zinc-200 leading-relaxed">
              I'm a software engineer who enjoys the full arc of a product — the interface people touch, the systems
              underneath it, and the details in between.
            </p>
          </Reveal>
          <Reveal delay={0.08}>
            <p className="text-base text-zinc-400 leading-relaxed">
              I care about products that are functional, accessible, and visually compelling. To me, good engineering
              and good design aren't separate disciplines — clear hierarchy, honest states, and accessible contrast
              are engineering concerns as much as design ones.
            </p>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="text-base text-zinc-400 leading-relaxed">
              I've built AI-powered evaluation platforms and immersive, scroll-driven web experiences at Rodic
              Consultants, and worked across data infrastructure, analytics, and production debugging on real-world
              applications.
            </p>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="text-base text-zinc-400 leading-relaxed">
              Lately I'm most interested in design systems and scalable frontend architecture — the discipline of
              turning product aesthetics into tokens, components, and interfaces that hold up as a product grows.
            </p>
          </Reveal>
        </div>
      </div>

      <div className="mt-16 md:mt-20 grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-6" data-testid="about-bento">
        {BENTO.map((cell, i) => (
          <Reveal key={cell.label} delay={i * 0.05} className={cell.span}>
            <div
              className="h-full rounded-2xl border border-white/8 bg-surface p-6 hover:border-blue-500/30 transition-colors duration-300"
              data-testid={`stack-cell-${cell.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-4">{cell.label}</p>
              <div className="flex flex-wrap gap-2">
                {cell.items.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1.5 text-sm text-zinc-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default About;
