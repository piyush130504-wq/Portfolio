import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ExternalLink, Github, Sparkles } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";
import { PROJECTS } from "@/data/content";

const PreviewFrame = ({ label, children, testid }) => (
  <div
    data-testid={testid}
    className="group relative rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden transition-transform duration-500 hover:scale-[1.015]"
  >
    <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/5 bg-surface2/60">
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="h-2.5 w-2.5 rounded-full bg-white/15" />
      <span className="ml-3 font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
    </div>
    <div className="p-5 md:p-6">{children}</div>
  </div>
);

const Bar = ({ label, width, color }) => (
  <div>
    <div className="flex justify-between mb-1.5">
      <span className="text-[11px] text-zinc-400">{label}</span>
    </div>
    <div className="h-1.5 rounded-full bg-white/5 overflow-hidden">
      <motion.div
        className={`h-full rounded-full ${color}`}
        initial={{ width: 0 }}
        whileInView={{ width }}
        viewport={{ once: true, amount: 0.6 }}
        transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  </div>
);

const RodicAIPreview = () => (
  <PreviewFrame label="Rodic · Startup Screening" testid="preview-rodic-ai">
    <div className="flex items-center gap-2 mb-5">
      {["Intake", "AI Screening", "Report"].map((s, i) => (
        <div key={s} className="flex items-center gap-2 flex-1">
          <span
            className={`flex-1 text-center rounded-lg border px-2 py-2 text-[11px] font-medium ${
              i === 1 ? "border-blue-500/50 bg-blue-500/10 text-blue-300" : "border-white/8 bg-white/[0.02] text-zinc-400"
            }`}
          >
            {s}
          </span>
          {i < 2 && <span className="h-px w-3 bg-white/15" />}
        </div>
      ))}
    </div>
    <div className="rounded-xl border border-white/8 bg-ink/60 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Evaluation report</span>
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-violet-400">
          <Sparkles size={11} /> Gemini API
        </span>
      </div>
      <Bar label="Market viability" width="78%" color="bg-gradient-to-r from-blue-600 to-blue-400" />
      <Bar label="Risk" width="30%" color="bg-gradient-to-r from-violet-600 to-violet-400" />
      <Bar label="Scalability" width="64%" color="bg-gradient-to-r from-blue-500 to-violet-400" />
    </div>
  </PreviewFrame>
);

const ReepPreview = () => (
  <PreviewFrame label="REEP · Digital Twin" testid="preview-reep">
    <div className="relative h-52 md:h-60 rounded-xl border border-white/8 bg-ink overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-blue-950/40 via-transparent to-violet-950/30" />
      <svg viewBox="0 0 400 220" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {[70, 120, 170, 220].map((y, i) => (
          <path
            key={y}
            d={`M 0 ${y + 30} Q 100 ${y - 20} 200 ${y + 10} T 400 ${y}`}
            fill="none"
            stroke={i % 2 ? "rgba(139,92,246,0.35)" : "rgba(59,130,246,0.35)"}
            strokeWidth="1"
          />
        ))}
        {[60, 130, 200, 280, 340].map((x, i) => (
          <g key={x}>
            <rect x={x} y={150 - (i % 3) * 26} width="22" height={40 + (i % 3) * 26} fill="rgba(255,255,255,0.05)" stroke="rgba(255,255,255,0.15)" strokeWidth="0.8" />
            <rect x={x + 4} y={150 - (i % 3) * 26 + 6} width="4" height="4" fill="rgba(59,130,246,0.7)" />
            <rect x={x + 12} y={150 - (i % 3) * 26 + 6} width="4" height="4" fill="rgba(139,92,246,0.7)" />
          </g>
        ))}
      </svg>
      <motion.div
        className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-blue-400/80 to-transparent"
        animate={{ top: ["12%", "85%", "12%"] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/10">
        <div className="h-full w-1/3 bg-gradient-to-r from-blue-500 to-violet-500" />
      </div>
      <div className="absolute top-3 left-3 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-400">
        Scroll-driven canvas
      </div>
    </div>
  </PreviewFrame>
);

const CropPreview = () => (
  <PreviewFrame label="Crop Yield · Prediction" testid="preview-crop">
    <div className="grid md:grid-cols-2 gap-4">
      <div className="rounded-xl border border-white/8 bg-ink/60 p-4">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mb-3">Yield forecast</p>
        <svg viewBox="0 0 200 90" className="w-full h-auto">
          <polyline
            points="0,70 25,62 50,66 75,48 100,52 125,34 150,38 175,22 200,18"
            fill="none"
            stroke="#3B82F6"
            strokeWidth="2"
          />
          <polyline
            points="0,72 25,66 50,60 75,54 100,48 125,40 150,36 175,28 200,24"
            fill="none"
            stroke="#8B5CF6"
            strokeWidth="2"
            strokeDasharray="4 4"
          />
        </svg>
        <div className="flex gap-4 mt-2">
          <span className="font-mono text-[9px] text-blue-400">— Actual</span>
          <span className="font-mono text-[9px] text-violet-400">-- Predicted</span>
        </div>
      </div>
      <div className="rounded-xl border border-white/8 bg-ink/60 p-4 space-y-3">
        <p className="font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-500 mb-1">SHAP attribution</p>
        <Bar label="Rainfall" width="72%" color="bg-gradient-to-r from-blue-600 to-blue-400" />
        <Bar label="Temperature" width="54%" color="bg-gradient-to-r from-violet-600 to-violet-400" />
        <Bar label="Soil" width="38%" color="bg-gradient-to-r from-blue-500 to-blue-400" />
        <Bar label="Seed variety" width="22%" color="bg-gradient-to-r from-violet-500 to-violet-400" />
      </div>
    </div>
    <p className="mt-4 font-mono text-[9px] uppercase tracking-[0.25em] text-zinc-600">
      XGBoost + LSTM · TensorFlow Lite · SHAP
    </p>
  </PreviewFrame>
);

const PREVIEWS = {
  "rodic-ai": <RodicAIPreview />,
  reep: <ReepPreview />,
  "crop-yield": <CropPreview />,
};

const ProjectRow = ({ project, flip }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <Reveal className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>{PREVIEWS[project.id]}</Reveal>
      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <Reveal>
          <p className="font-mono text-xs tracking-[0.25em] text-blue-400">
            {project.index} <span className="text-zinc-600">·</span> {project.org}
          </p>
          <h3 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-50">{project.title}</h3>
          <p className="mt-4 text-sm text-zinc-400 leading-relaxed">{project.description}</p>
          <div className="mt-5 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border border-white/8 bg-white/[0.03] px-3 py-1 font-mono text-[11px] text-zinc-300"
              >
                {t}
              </span>
            ))}
          </div>
          {project.links && (
            <div className="mt-5 flex flex-wrap gap-2.5" data-testid={`project-links-${project.id}`}>
              {project.links.live && (
                <a
                  href={project.links.live}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`project-live-${project.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-blue-500/30 bg-blue-500/10 px-4 py-1.5 text-sm font-medium text-blue-300 hover:bg-blue-500/20 transition-colors"
                >
                  <ExternalLink size={13} /> Live project
                </a>
              )}
              {project.links.github && (
                <a
                  href={project.links.github}
                  target="_blank"
                  rel="noreferrer"
                  data-testid={`project-github-${project.id}`}
                  className="inline-flex items-center gap-1.5 rounded-full border border-white/10 px-4 py-1.5 text-sm font-medium text-zinc-300 hover:border-white/25 hover:text-zinc-100 transition-colors"
                >
                  <Github size={13} /> GitHub
                </a>
              )}
            </div>
          )}
          <button
            data-testid={`project-expand-${project.id}`}
            onClick={() => setOpen((o) => !o)}
            className="mt-6 inline-flex items-center gap-2 text-sm font-medium text-blue-400 hover:text-blue-300 transition-colors"
          >
            {open ? "Hide case detail" : "Read case detail"}
            <ChevronDown size={15} className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
          </button>
        </Reveal>

        <AnimatePresence initial={false}>
          {open && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
              className="overflow-hidden"
              data-testid={`project-detail-${project.id}`}
            >
              <div className="mt-6 space-y-6 border-l border-white/10 pl-5">
                {[
                  ["Problem", <p key="p" className="text-sm text-zinc-400 leading-relaxed">{project.problem}</p>],
                  ["Approach", <p key="a" className="text-sm text-zinc-400 leading-relaxed">{project.approach}</p>],
                  [
                    "Key decisions",
                    <ul key="d" className="space-y-2">
                      {project.decisions.map((d) => (
                        <li key={d} className="flex gap-2.5 text-sm text-zinc-400 leading-relaxed">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-blue-500" />
                          {d}
                        </li>
                      ))}
                    </ul>,
                  ],
                  ["Challenges & solutions", <p key="c" className="text-sm text-zinc-400 leading-relaxed">{project.challenges}</p>],
                ].map(([label, node]) => (
                  <div key={label}>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500 mb-2">{label}</p>
                    {node}
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export const Projects = () => (
  <section id="work" className="py-24 md:py-32 scroll-mt-16 border-t border-white/5">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SectionHeading
        id="work"
        eyebrow="Selected Work"
        title="Projects built for production."
        description="Real applications shipped with real constraints — AI evaluation platforms, immersive web experiences, and interpretable machine learning."
      />
      <div className="mt-16 md:mt-24 space-y-24 md:space-y-32">
        {PROJECTS.map((p, i) => (
          <ProjectRow key={p.id} project={p} flip={i % 2 === 1} />
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
