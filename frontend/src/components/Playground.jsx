import { useState } from "react";
import { Check, Loader2, Moon, Sun } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const ACCENTS = {
  Blue: { hex: "#3B82F6", dim: "rgba(59,130,246,0.14)" },
  Violet: { hex: "#8B5CF6", dim: "rgba(139,92,246,0.14)" },
  Emerald: { hex: "#10B981", dim: "rgba(16,185,129,0.14)" },
  Rose: { hex: "#F43F5E", dim: "rgba(244,63,94,0.14)" },
};

const Badge = ({ tone, children, dark }) => {
  const tones = {
    success: dark ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/25" : "bg-emerald-50 text-emerald-700 border-emerald-200",
    warning: dark ? "bg-amber-500/10 text-amber-400 border-amber-500/25" : "bg-amber-50 text-amber-700 border-amber-200",
    error: dark ? "bg-red-500/10 text-red-400 border-red-500/25" : "bg-red-50 text-red-700 border-red-200",
    neutral: dark ? "bg-white/5 text-zinc-400 border-white/10" : "bg-zinc-100 text-zinc-600 border-zinc-200",
    accent: dark ? "border-white/15" : "border-zinc-300",
  };
  const style =
    tone === "accent" ? { backgroundColor: "var(--pg-dim)", color: "var(--pg-hex)", borderColor: "var(--pg-hex)" } : {};
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`} style={style}>
      {children}
    </span>
  );
};

export const Playground = () => {
  const [accent, setAccent] = useState("Blue");
  const [dark, setDark] = useState(true);
  const [tab, setTab] = useState("Preview");
  const [checked, setChecked] = useState(false);
  const a = ACCENTS[accent];

  const frame = dark
    ? "bg-ink text-zinc-100 border-white/10"
    : "bg-[#FAFAFA] text-zinc-900 border-zinc-200";

  const label = dark ? "text-zinc-500" : "text-zinc-500";
  const softText = dark ? "text-zinc-400" : "text-zinc-600";

  return (
    <section id="playground" className="py-24 md:py-32 scroll-mt-16 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          id="playground"
          eyebrow="Design Playground"
          title="A design system you can poke."
          description="The same tokens that theme this portfolio, wired to live components. Switch the accent, flip the theme, break the states — this is what design systems look like when they meet real frontend code."
        />

        <Reveal delay={0.1}>
          <div className="mt-12 md:mt-16 rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden" data-testid="playground">
            <div className="flex flex-wrap items-center justify-between gap-4 px-5 py-4 border-b border-white/8 bg-surface2/50">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  {Object.entries(ACCENTS).map(([name, v]) => (
                    <button
                      key={name}
                      data-testid={`playground-accent-${name.toLowerCase()}`}
                      onClick={() => setAccent(name)}
                      aria-label={`${name} accent`}
                      className={`h-6 w-6 rounded-full border-2 transition-transform duration-200 hover:scale-110 ${
                        accent === name ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: v.hex }}
                    />
                  ))}
                </div>
                <button
                  data-testid="playground-theme-toggle"
                  onClick={() => setDark((d) => !d)}
                  className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300 hover:border-white/20 transition-colors"
                >
                  {dark ? <Sun size={13} /> : <Moon size={13} />}
                  {dark ? "Light mode" : "Dark mode"}
                </button>
              </div>
              <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">
                Accent: {accent} · {dark ? "Dark" : "Light"}
              </p>
            </div>

            <div
              className={`p-6 md:p-10 border transition-colors duration-300 ${frame}`}
              style={{ "--pg-hex": a.hex, "--pg-dim": a.dim }}
            >
              <div className="grid md:grid-cols-2 gap-10 md:gap-14">
                <div>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mb-5`}>Typography</p>
                  <div className="space-y-4">
                    <p className="text-3xl sm:text-4xl font-extrabold tracking-tight leading-[1.08]">
                      Display 48<span className="font-mono text-xs font-normal opacity-40 ml-2">/ 800</span>
                    </p>
                    <p className="text-xl font-semibold">
                      Heading 20<span className="font-mono text-xs font-normal opacity-40 ml-2">/ 600</span>
                    </p>
                    <p className={`text-sm leading-relaxed ${softText}`}>
                      Body 14 — tokens are contracts between design and engineering. Every sample here reads from the
                      same source of truth you just switched.
                      <span className="font-mono text-xs opacity-40 ml-2">/ 400</span>
                    </p>
                    <p className="font-mono text-[10px] uppercase tracking-[0.25em]" style={{ color: a.hex }}>
                      Mono Label 10 / 500
                    </p>
                  </div>

                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mt-9 mb-5`}>Badges</p>
                  <div className="flex flex-wrap gap-2">
                    <Badge tone="accent" dark={dark}>Beta</Badge>
                    <Badge tone="success" dark={dark}>Published</Badge>
                    <Badge tone="warning" dark={dark}>Pending</Badge>
                    <Badge tone="error" dark={dark}>Failed</Badge>
                    <Badge tone="neutral" dark={dark}>Draft</Badge>
                  </div>

                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mt-9 mb-5`}>Interactive inputs</p>
                  <div className="space-y-3 max-w-sm">
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${softText}`}>Email</label>
                      <input
                        data-testid="playground-input"
                        placeholder="you@company.com"
                        className="w-full rounded-lg border bg-transparent px-3.5 py-2.5 text-sm outline-none transition-colors focus:border-[var(--pg-hex)]"
                        style={{ borderColor: dark ? "rgba(255,255,255,0.14)" : "rgba(0,0,0,0.15)" }}
                      />
                    </div>
                    <div>
                      <label className={`block text-xs font-medium mb-1.5 ${softText}`}>Workspace name</label>
                      <input
                        data-testid="playground-input-error"
                        placeholder="acme-inc"
                        className="w-full rounded-lg border border-red-500/60 bg-transparent px-3.5 py-2.5 text-sm outline-none"
                      />
                      <p className="mt-1.5 text-xs text-red-400">This workspace name is already taken.</p>
                    </div>
                    <label className="flex items-center gap-2.5 cursor-pointer select-none">
                      <button
                        data-testid="playground-checkbox"
                        onClick={() => setChecked((c) => !c)}
                        className={`h-5 w-5 rounded-md border flex items-center justify-center transition-colors ${
                          checked ? "text-white" : ""
                        }`}
                        style={checked ? { backgroundColor: a.hex, borderColor: a.hex } : { borderColor: dark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.25)" }}
                        aria-pressed={checked}
                      >
                        {checked && <Check size={12} strokeWidth={3} />}
                      </button>
                      <span className={`text-sm ${softText}`}>Send me product updates</span>
                    </label>
                  </div>
                </div>

                <div>
                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mb-5`}>Buttons — every state</p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      data-testid="playground-btn-primary"
                      className="rounded-full px-5 py-2.5 text-sm font-medium text-white transition-transform active:scale-95"
                      style={{ backgroundColor: a.hex }}
                    >
                      Primary
                    </button>
                    <button
                      data-testid="playground-btn-soft"
                      className="rounded-full px-5 py-2.5 text-sm font-medium"
                      style={{ backgroundColor: a.dim, color: dark ? a.hex : a.hex }}
                    >
                      Soft
                    </button>
                    <button
                      data-testid="playground-btn-outline"
                      className="rounded-full px-5 py-2.5 text-sm font-medium border"
                      style={{ borderColor: a.hex, color: a.hex }}
                    >
                      Outline
                    </button>
                    <button
                      data-testid="playground-btn-loading"
                      className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium text-white opacity-80"
                      style={{ backgroundColor: a.hex }}
                      disabled
                    >
                      <Loader2 size={14} className="animate-spin" /> Loading
                    </button>
                    <button
                      data-testid="playground-btn-disabled"
                      className={`rounded-full px-5 py-2.5 text-sm font-medium ${dark ? "bg-white/5 text-zinc-600" : "bg-zinc-200 text-zinc-400"}`}
                      disabled
                    >
                      Disabled
                    </button>
                  </div>

                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mt-9 mb-5`}>Tabs — functional</p>
                  <div
                    className={`inline-flex rounded-full border p-1 ${dark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-zinc-100"}`}
                  >
                    {["Preview", "Code"].map((t) => (
                      <button
                        key={t}
                        data-testid={`playground-tab-${t.toLowerCase()}`}
                        onClick={() => setTab(t)}
                        className={`rounded-full px-4 py-1.5 text-sm transition-colors ${tab === t ? "text-white" : dark ? "text-zinc-400" : "text-zinc-500"}`}
                        style={tab === t ? { backgroundColor: a.hex } : {}}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                  <div className={`mt-4 rounded-xl border p-4 text-sm leading-relaxed ${dark ? "border-white/10 bg-white/[0.02] text-zinc-400" : "border-zinc-200 bg-white text-zinc-600"}`} data-testid="playground-tab-panel">
                    {tab === "Preview" ? (
                      <span>
                        <span className="font-medium" style={{ color: a.hex }}>Accent — {accent}.</span> The button,
                        badge and tab above all consume one accent token. Switch it above and watch every instance
                        update — that's the whole point of a design system.
                      </span>
                    ) : (
                      <pre className="font-mono text-xs overflow-x-auto">{`--accent: ${a.hex};
--accent-dim: ${a.dim};
--theme: ${dark ? "dark" : "light"};`}</pre>
                    )}
                  </div>

                  <p className={`font-mono text-[10px] uppercase tracking-[0.25em] ${label} mt-9 mb-5`}>Card</p>
                  <div className={`rounded-xl border p-5 ${dark ? "border-white/10 bg-white/[0.02]" : "border-zinc-200 bg-white shadow-sm"}`}>
                    <div className="flex items-center justify-between mb-3">
                      <p className="text-sm font-semibold">Workspace</p>
                      <Badge tone="accent" dark={dark}>Pro</Badge>
                    </div>
                    <p className={`text-sm leading-relaxed ${softText}`}>
                      A card composed purely from tokens — surface, border, radius, and type scale.
                    </p>
                    <button
                      data-testid="playground-card-cta"
                      className="mt-4 w-full rounded-lg py-2.5 text-sm font-medium text-white transition-transform active:scale-[0.98]"
                      style={{ backgroundColor: a.hex }}
                    >
                      Upgrade workspace
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Playground;
