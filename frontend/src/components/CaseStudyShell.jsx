import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Nav from "./Nav";
import Footer from "./Footer";
import { Reveal } from "./Reveal";

export const CaseStudyShell = ({ num, title, summary, scope, decisions, children }) => (
  <div className="min-h-screen bg-ink text-zinc-100 overflow-x-clip">
    <Nav />
    <main className="pt-24 md:pt-28 pb-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Link
          to="/"
          data-testid="case-study-back"
          className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-blue-400 transition-colors"
        >
          <ArrowLeft size={14} /> Back to portfolio
        </Link>

        <div className="mt-10 max-w-3xl">
          <Reveal y={16}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Case Study {num}</p>
          </Reveal>
          <Reveal delay={0.08} y={16}>
            <h1 className="mt-4 text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-zinc-50 leading-[1.1]">
              {title}
            </h1>
          </Reveal>
          <Reveal delay={0.16} y={16}>
            <p className="mt-5 text-base text-zinc-400 leading-relaxed">{summary}</p>
          </Reveal>
          <Reveal delay={0.22} y={16}>
            <div className="mt-6 flex flex-wrap gap-2">
              {scope.map((s) => (
                <span key={s} className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="mt-12 md:mt-16">
          {children}
        </Reveal>

        {decisions && (
          <div className="mt-20 md:mt-28">
            <Reveal>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Design decisions</p>
              <h2 className="mt-3 text-2xl sm:text-3xl font-bold tracking-tight text-zinc-50">
                Why it looks the way it does.
              </h2>
            </Reveal>
            <div className="mt-10 grid md:grid-cols-3 gap-5">
              {decisions.map((d, i) => (
                <Reveal key={d.title} delay={i * 0.07}>
                  <div className="h-full rounded-2xl border border-white/8 bg-surface p-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">0{i + 1}</p>
                    <h3 className="mt-3 text-lg font-semibold tracking-tight text-zinc-50">{d.title}</h3>
                    <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{d.text}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        )}
      </div>
    </main>
    <Footer />
  </div>
);

export default CaseStudyShell;
