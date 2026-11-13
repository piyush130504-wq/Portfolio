import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { CASE_STUDIES } from "@/data/content";

const CrmThumb = () => (
  <div className="flex h-full gap-2.5">
    <div className="w-10 rounded-lg border border-white/8 bg-ink/70 p-2 space-y-2">
      {[0, 1, 2, 3].map((i) => (
        <div key={i} className={`h-2 rounded ${i === 0 ? "bg-blue-500" : "bg-white/10"}`} />
      ))}
    </div>
    <div className="flex-1 space-y-2.5">
      <div className="grid grid-cols-3 gap-2">
        {[0, 1, 2].map((i) => (
          <div key={i} className="rounded-md border border-white/8 bg-ink/70 p-2">
            <div className="h-1.5 w-6 rounded bg-white/15 mb-1.5" />
            <div className={`h-2 w-10 rounded ${i === 0 ? "bg-blue-400/80" : "bg-white/25"}`} />
          </div>
        ))}
      </div>
      <div className="rounded-md border border-white/8 bg-ink/70 p-2 h-16">
        <svg viewBox="0 0 200 40" className="w-full h-full" preserveAspectRatio="none">
          <path d="M0 32 C 30 28, 45 20, 70 22 S 120 10, 150 14 S 190 6, 200 8" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
        </svg>
      </div>
      <div className="space-y-1.5">
        {[0, 1].map((i) => (
          <div key={i} className="h-1.5 rounded bg-white/8" style={{ width: `${88 - i * 26}%` }} />
        ))}
      </div>
    </div>
  </div>
);

const DsThumb = () => (
  <div className="flex h-full flex-col gap-2.5">
    <div className="flex gap-1.5">
      {["#09090B", "#18181B", "#3B82F6", "#8B5CF6", "#10B981"].map((c) => (
        <div key={c} className="flex-1 h-8 rounded-md border border-white/10" style={{ backgroundColor: c }} />
      ))}
    </div>
    <div className="space-y-1.5">
      <div className="h-2.5 w-3/4 rounded bg-white/30" />
      <div className="h-1.5 w-1/2 rounded bg-white/15" />
      <div className="h-1.5 w-2/3 rounded bg-white/10" />
    </div>
    <div className="mt-auto flex gap-1.5">
      <div className="h-6 w-16 rounded-full bg-blue-600" />
      <div className="h-6 w-16 rounded-full border border-white/15" />
      <div className="h-6 w-6 rounded-full bg-violet-500/40" />
    </div>
  </div>
);

const AnalyticsThumb = () => (
  <div className="flex h-full flex-col gap-2.5">
    <div className="flex gap-1.5">
      {["7D", "30D", "90D"].map((r, i) => (
        <div key={r} className={`px-2 py-0.5 rounded text-[8px] font-mono ${i === 1 ? "bg-blue-600/80 text-white" : "border border-white/10 text-zinc-500"}`}>
          {r}
        </div>
      ))}
    </div>
    <div className="rounded-md border border-white/8 bg-ink/70 p-2 flex-1">
      <svg viewBox="0 0 200 44" className="w-full h-full" preserveAspectRatio="none">
        <polyline points="0,36 25,30 50,33 75,22 100,26 125,14 150,18 175,8 200,10" fill="none" stroke="#3B82F6" strokeWidth="1.6" />
        <polyline points="0,38 25,35 50,29 75,30 100,22 125,20 150,13 175,14 200,7" fill="none" stroke="#8B5CF6" strokeWidth="1.4" strokeDasharray="3 3" />
      </svg>
    </div>
    <div className="space-y-1.5">
      {[0, 1, 2].map((i) => (
        <div key={i} className="flex items-center gap-2">
          <div className="h-1.5 flex-1 rounded bg-white/8" />
          <div className={`h-2 w-8 rounded ${i === 1 ? "bg-emerald-500/50" : i === 2 ? "bg-red-500/40" : "bg-blue-500/40"}`} />
        </div>
      ))}
    </div>
  </div>
);

const THUMBS = { "01": <CrmThumb />, "02": <DsThumb />, "03": <AnalyticsThumb /> };

export const CaseStudies = () => (
  <section id="case-studies" className="relative py-24 md:py-32 scroll-mt-16 border-t border-white/5">
    <div className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[420px] w-[680px] rounded-full bg-violet-600/8 blur-[160px] pointer-events-none" />
    <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="case-studies"
        eyebrow="UI/UX Design Portfolio"
        title="Original interface designs, built interactive."
        description="Three case studies designed and implemented from scratch — each one a working product you can open, filter, and take apart."
      />
      <div className="mt-14 md:mt-20 grid lg:grid-cols-3 gap-6">
        {CASE_STUDIES.map((cs, i) => (
          <Reveal key={cs.num} delay={i * 0.08}>
            <Link
              to={cs.route}
              data-testid={`case-study-card-${cs.num}`}
              className="group flex flex-col h-full rounded-2xl border border-white/10 bg-surface overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:border-blue-500/40 hover:shadow-glow"
            >
              <div className="aspect-[16/10] border-b border-white/5 bg-ink/50 p-4">
                {THUMBS[cs.num]}
              </div>
              <div className="flex flex-col flex-1 p-6">
                <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400">Case Study {cs.num}</p>
                <h3 className="mt-2.5 text-xl font-semibold tracking-tight text-zinc-50">{cs.title}</h3>
                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{cs.summary}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {cs.tags.map((t) => (
                    <span key={t} className="rounded-full border border-white/8 bg-white/[0.03] px-2.5 py-0.5 font-mono text-[10px] text-zinc-400">
                      {t}
                    </span>
                  ))}
                </div>
                <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-blue-400 mt-auto pt-5">
                  Open interactive case study
                  <ArrowUpRight size={15} className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default CaseStudies;
