import { COLORS, SPACING, RADII, TYPE_SCALE, BREAKPOINTS } from "./tokens";

const Section = ({ title, id, dark, children }) => (
  <div data-testid={id}>
    <div className="flex items-center gap-4 mb-7">
      <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">{title}</h3>
      <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
    </div>
    {children}
  </div>
);

export const DSTokens = ({ T, dark }) => (
  <div className="space-y-16">
    <Section title="Colour" id="ds-colour" dark={dark}>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {COLORS.map((c) => (
          <div key={c.name} className={`rounded-xl border p-4 ${T.card}`} data-testid={`ds-colour-${c.name.split(" ")[0].toLowerCase()}`}>
            <div className={`h-14 rounded-lg border mb-3 ${c.cls} ${dark ? "border-white/10" : "border-zinc-200"}`} />
            <p className="text-sm font-medium">{c.name}</p>
            <p className="font-mono text-[11px] text-zinc-500 mt-0.5">{c.hex}</p>
          </div>
        ))}
        <div className={`rounded-xl border p-4 ${T.card}`}>
          <div className="h-14 rounded-lg border mb-3 bg-gradient-to-r from-blue-500/20 to-violet-500/20 border-white/10" />
          <p className="text-sm font-medium">Light theme pair</p>
          <p className="font-mono text-[11px] text-zinc-500 mt-0.5">#FAFAFA / #FFFFFF</p>
        </div>
      </div>
      <p className={`mt-4 text-xs ${T.faint}`}>
        Every colour ships as a dark/light pair — the theme toggle in the header re-themes this entire library live.
      </p>
    </Section>

    <Section title="Typography" id="ds-typography" dark={dark}>
      <div className={`rounded-xl border ${T.card} px-5 md:px-8 py-2 divide-y ${dark ? "divide-white/8" : "divide-zinc-200"}`}>
        {TYPE_SCALE.map((t) => (
          <div key={t.name} className="flex flex-col md:flex-row md:items-baseline justify-between gap-2 py-5" data-testid={`ds-type-${t.name.toLowerCase().replace(" ", "-")}`}>
            <p className={`min-w-0 md:max-w-lg ${t.cls} ${t.name === "Body" || t.name === "Caption" ? T.sub : ""}`}>{t.sample}</p>
            <div className="shrink-0 text-left md:text-right">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-blue-400">{t.name}</p>
              <p className="font-mono text-[10px] text-zinc-500 mt-0.5">{t.spec}</p>
            </div>
          </div>
        ))}
      </div>
      <p className={`mt-4 text-xs ${T.faint}`}>Inter for UI · JetBrains Mono for labels, code and data.</p>
    </Section>

    <Section title="Spacing" id="ds-spacing" dark={dark}>
      <div className={`rounded-xl border ${T.card} p-5 space-y-3`}>
        {SPACING.map((s) => (
          <div key={s} className="flex items-center gap-4">
            <span className="w-12 font-mono text-[11px] text-zinc-500">{s}px</span>
            <div className="h-2.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" style={{ width: `${s * 2}px` }} />
          </div>
        ))}
      </div>
      <p className={`mt-4 text-xs ${T.faint}`}>4-point base scale — margins, gaps and paddings all derive from it.</p>
    </Section>

    <div className="grid md:grid-cols-2 gap-16">
      <Section title="Radius" id="ds-radius" dark={dark}>
        <div className={`rounded-xl border ${T.card} p-5 flex flex-wrap items-end gap-4`}>
          {RADII.map((r) => (
            <div key={r.label} className="text-center">
              <div className={`h-16 w-16 border-2 border-blue-500/50 bg-blue-500/10 ${r.cls}`} />
              <p className="font-mono text-[10px] text-zinc-500 mt-2">{r.label}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section title="Grid & breakpoints" id="ds-grid" dark={dark}>
        <div className={`rounded-xl border ${T.card} p-5 space-y-3`}>
          <div className="grid grid-cols-12 gap-1">
            {Array.from({ length: 12 }).map((_, i) => (
              <div key={i} className="h-8 rounded bg-blue-500/15 border border-blue-500/25" />
            ))}
          </div>
          <div className="space-y-2 pt-2">
            {BREAKPOINTS.map((b) => (
              <div key={b.name} className="flex items-center gap-3">
                <span className="w-14 font-mono text-[10px] text-zinc-500">
                  {b.name} · {b.px}
                </span>
                <div className={`h-2 rounded-full ${dark ? "bg-white/10" : "bg-zinc-200"}`} style={{ width: b.w }} />
              </div>
            ))}
          </div>
        </div>
      </Section>
    </div>
  </div>
);

export default DSTokens;
