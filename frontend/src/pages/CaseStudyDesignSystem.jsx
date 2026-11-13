import { useState } from "react";
import { Moon, Sun } from "lucide-react";
import CaseStudyShell from "@/components/CaseStudyShell";
import { DSTokens } from "@/components/ds/DSTokens";
import { DSComponents } from "@/components/ds/DSComponents";
import { getTheme } from "@/components/ds/tokens";

export const CaseStudyDesignSystem = () => {
  const [dark, setDark] = useState(true);
  const T = getTheme(dark);

  return (
    <CaseStudyShell
      num="02"
      title="Design System Architecture"
      summary="A dedicated design-system showcase, built the way a product team would build one: colour, type, spacing and radius tokens defined first — then a component library that only consumes them, documented in every state from default to error."
      scope={["Design Tokens", "Component Library", "Dark & Light", "Documentation", "Accessibility"]}
      decisions={[
        {
          title: "Tokens before components",
          text: "Colour, spacing, radius and type scales are defined as a foundation; components never hard-code a value. That's what makes the light/dark toggle and the accent swap in the playground possible with zero per-component overrides.",
        },
        {
          title: "Every state is designed",
          text: "Default, hover, focus, active, disabled, loading and error are first-class citizens in this library — the states users actually spend their time in, not an afterthought appended at the end.",
        },
        {
          title: "Dark and light are equal citizens",
          text: "Every token has a light-theme pair. The toggle in the header re-themes the whole library live — proof the token layer, not the components, carries the theming.",
        },
      ]}
    >
      <div className="rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden">
        <div className="flex items-center justify-between gap-4 px-5 py-4 border-b border-white/8 bg-surface2/50">
          <p className="font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-500">Component library · interactive</p>
          <button
            data-testid="ds-theme-toggle"
            onClick={() => setDark((d) => !d)}
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 text-xs text-zinc-300 hover:border-white/25 transition-colors"
          >
            {dark ? <Sun size={13} /> : <Moon size={13} />}
            {dark ? "Light theme" : "Dark theme"}
          </button>
        </div>
        <div className={`p-6 md:p-10 transition-colors duration-300 ${T.page}`} data-testid="ds-frame">
          <DSTokens T={T} dark={dark} />
          <div className={`my-16 h-px ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          <DSComponents T={T} dark={dark} />
        </div>
      </div>
    </CaseStudyShell>
  );
};

export default CaseStudyDesignSystem;
