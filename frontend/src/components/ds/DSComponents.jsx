import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, Copy, Link2, Loader2, Pencil, Search, Trash2, X } from "lucide-react";

const State = ({ label, children }) => (
  <div className="flex flex-col items-start gap-2.5">
    {children}
    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-zinc-500">{label}</span>
  </div>
);

const STATES = ["Default", "Hover", "Focus", "Active", "Disabled", "Loading"];

const btnClasses = (variant, state, T, dark) => {
  const base = "inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all";
  const P = {
    Default: "bg-blue-600 text-white hover:bg-blue-500",
    Hover: "bg-blue-500 text-white",
    Focus: `bg-blue-600 text-white ring-2 ring-blue-500 ${T.offset} ring-offset-2`,
    Active: "bg-blue-700 text-white scale-95",
    Disabled: "bg-blue-600 text-white opacity-40",
    Loading: "bg-blue-600/70 text-white",
  };
  const S = {
    Default: T.btnSecondary,
    Hover: dark ? "bg-surface3 border border-white/15 text-zinc-100" : "bg-zinc-200 border border-zinc-300 text-zinc-900",
    Focus: `${T.btnSecondary} ring-2 ring-blue-500 ${T.offset} ring-offset-2`,
    Active: `${T.btnSecondary} scale-95`,
    Disabled: `${T.btnSecondary} opacity-40`,
    Loading: T.btnSecondary,
  };
  const G = {
    Default: T.btnGhost,
    Hover: dark ? "bg-white/5 text-zinc-100" : "bg-zinc-100 text-zinc-900",
    Focus: `${T.btnGhost} ring-2 ring-blue-500 ${T.offset} ring-offset-2`,
    Active: `${T.btnGhost} scale-95`,
    Disabled: `${T.btnGhost} opacity-40`,
    Loading: T.btnGhost,
  };
  const D = {
    Default: "bg-red-500 text-white hover:bg-red-400",
    Hover: "bg-red-400 text-white",
    Focus: `bg-red-500 text-white ring-2 ring-red-500 ${T.offset} ring-offset-2`,
    Active: "bg-red-600 text-white scale-95",
    Disabled: "bg-red-500 text-white opacity-40",
    Loading: "bg-red-500/70 text-white",
  };
  const map = { Primary: P, Secondary: S, Ghost: G, Danger: D };
  return `${base} ${map[variant][state]}`;
};

const Badge = ({ tone, children }) => {
  const tones = {
    neutral: "bg-white/5 text-zinc-400 border-white/10",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/25",
    violet: "bg-violet-500/10 text-violet-400 border-violet-500/25",
    success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/25",
    warning: "bg-amber-500/10 text-amber-400 border-amber-500/25",
    error: "bg-red-500/10 text-red-400 border-red-500/25",
  };
  return (
    <span data-testid={`ds-badge-${tone}`} className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${tones[tone]}`}>
      {children}
    </span>
  );
};

const TableRows = [
  { id: 1, name: "invoice_1042.pdf", size: "24 KB", status: "Paid" },
  { id: 2, name: "q3_report.xlsx", size: "112 KB", status: "Pending" },
  { id: 3, name: "contract_v2.docx", size: "58 KB", status: "Failed" },
  { id: 4, name: "logo_pack.zip", size: "3.1 MB", status: "Paid" },
];

const StatusBadge = ({ s }) => (
  <Badge tone={s === "Paid" ? "success" : s === "Pending" ? "warning" : "error"}>{s}</Badge>
);

export const DSComponents = ({ T, dark }) => {
  const [ddOpen, setDdOpen] = useState(false);
  const [sel, setSel] = useState("Medium");
  const [tab, setTab] = useState("Overview");
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState(2);

  return (
    <div className="space-y-16">
      <div data-testid="ds-buttons">
        <div className="flex items-center gap-4 mb-7">
          <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Buttons — every state</h3>
          <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
        </div>
        <div className="space-y-8">
          {["Primary", "Secondary", "Ghost", "Danger"].map((v) => (
            <div key={v}>
              <p className={`text-sm font-medium mb-4 ${T.heading}`}>{v}</p>
              <div className="flex flex-wrap gap-x-8 gap-y-5 items-end">
                {STATES.map((state) => (
                  <State key={state} label={state}>
                    <button
                      data-testid={`ds-btn-${v.toLowerCase()}-${state.toLowerCase()}`}
                      disabled={state === "Disabled" || state === "Loading"}
                      className={btnClasses(v, state, T, dark)}
                    >
                      {state === "Loading" && <Loader2 size={13} className="animate-spin" />}
                      Button
                    </button>
                  </State>
                ))}
              </div>
            </div>
          ))}
          <div>
            <p className={`text-sm font-medium mb-4 ${T.heading}`}>Icon buttons</p>
            <div className="flex items-end gap-8">
              <State label="Default">
                <button data-testid="ds-icon-btn" aria-label="Copy" className={`p-2.5 rounded-lg ${T.btnSecondary}`}><Copy size={15} /></button>
              </State>
              <State label="Focus">
                <button aria-label="Link" className={`p-2.5 rounded-lg ${T.btnSecondary} ring-2 ring-blue-500 ${T.offset} ring-offset-2`}><Link2 size={15} /></button>
              </State>
              <State label="Disabled">
                <button aria-label="Delete" disabled className={`p-2.5 rounded-lg ${T.btnSecondary} opacity-40`}><Trash2 size={15} /></button>
              </State>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10" data-testid="ds-inputs">
        <div>
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Inputs</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <div className="space-y-5">
            {[
              { label: "Default", helper: null, cls: T.input },
              { label: "Focus", helper: null, cls: `${T.input} ring-2 ring-blue-500 ${T.offset} ring-offset-2` },
              { label: "Error", helper: "This email is already registered.", cls: `${T.input} !border-red-500/60` },
              { label: "Disabled", helper: null, cls: `${T.input} opacity-40`, disabled: true },
            ].map((s) => (
              <div key={s.label}>
                <label className={`block text-xs font-medium mb-1.5 ${T.sub}`}>{s.label === "Default" ? "Email" : s.label}</label>
                <input data-testid={`ds-input-${s.label.toLowerCase()}`} disabled={s.disabled} placeholder="you@company.com" className={`w-full rounded-lg border px-3.5 py-2.5 text-sm outline-none transition-colors ${s.cls}`} />
                {s.helper && <p className="mt-1.5 text-xs text-red-400">{s.helper}</p>}
              </div>
            ))}
            <div className="flex items-center gap-2.5 rounded-lg border px-3.5 py-2.5" style={{ borderColor: dark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.12)", backgroundColor: dark ? "rgba(255,255,255,0.03)" : "#fff" }}>
              <Search size={14} className="opacity-50 shrink-0" />
              <input data-testid="ds-search" placeholder="Search components…" className="w-full bg-transparent outline-none text-sm" />
              <kbd className={`font-mono text-[10px] border rounded px-1.5 py-0.5 opacity-60 ${dark ? "border-white/15" : "border-zinc-300"}`}>⌘K</kbd>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Dropdown & select</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <div className="flex flex-wrap gap-8 items-start">
            <div className="relative inline-block">
              <button
                data-testid="ds-dropdown-trigger"
                onClick={() => setDdOpen((o) => !o)}
                className={`inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-sm ${T.btnSecondary}`}
              >
                Options <ChevronDown size={14} className={`transition-transform ${ddOpen ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>
                {ddOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.15 }}
                    className={`absolute z-20 mt-2 w-48 rounded-xl border p-1.5 ${dark ? "bg-surface2 border-white/10" : "bg-white border-zinc-200 shadow-lg"}`}
                    data-testid="ds-dropdown-menu"
                  >
                    {ddOpen && <button className="fixed inset-0 z-10 cursor-default" onClick={() => setDdOpen(false)} aria-label="Close dropdown" />}
                    {[
                      { icon: Pencil, label: "Rename" },
                      { icon: Copy, label: "Duplicate" },
                      null,
                      { icon: Trash2, label: "Delete", danger: true },
                    ].map((item, i) =>
                      item === null ? (
                        <div key={i} className={`my-1.5 h-px ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
                      ) : (
                        <button
                          key={item.label}
                          onClick={() => setDdOpen(false)}
                          className={`relative z-20 w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-sm ${item.danger ? "text-red-400" : dark ? "text-zinc-300" : "text-zinc-700"} hover:bg-white/5`}
                        >
                          <item.icon size={14} /> {item.label}
                        </button>
                      )
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="relative">
              <label className={`block text-xs font-medium mb-1.5 ${T.sub}`}>Select menu</label>
              <div className="relative">
                <select
                  data-testid="ds-select"
                  value={sel}
                  onChange={(e) => setSel(e.target.value)}
                  className={`appearance-none rounded-lg border px-4 py-2.5 pr-9 text-sm outline-none cursor-pointer ${T.input}`}
                >
                  {["Small", "Medium", "Large"].map((s) => (
                    <option key={s} className={dark ? "bg-surface2" : "bg-white"}>{s}</option>
                  ))}
                </select>
                <ChevronDown size={14} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none opacity-50" />
              </div>
              <p className={`mt-1.5 text-xs ${T.faint}`}>Selected: {sel}</p>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-2" data-testid="ds-badges">
            <Badge tone="neutral">Draft</Badge>
            <Badge tone="blue">In review</Badge>
            <Badge tone="violet">Beta</Badge>
            <Badge tone="success">Published</Badge>
            <Badge tone="warning">Pending</Badge>
            <Badge tone="error">Failed</Badge>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-10">
        <div data-testid="ds-tabs">
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Tabs & navigation</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <div className={`inline-flex rounded-lg border p-1 ${dark ? "border-white/10 bg-white/[0.03]" : "border-zinc-200 bg-zinc-100"}`}>
            {["Overview", "Specs", "Usage"].map((t) => (
              <button
                key={t}
                data-testid={`ds-tab-${t.toLowerCase()}`}
                onClick={() => setTab(t)}
                className={`rounded-md px-4 py-1.5 text-sm transition-colors ${tab === t ? (dark ? "bg-surface3 text-zinc-100" : "bg-white text-zinc-900 shadow-sm") : T.faint}`}
              >
                {t}
              </button>
            ))}
          </div>
          <div className={`mt-3 rounded-lg border px-4 py-3 text-sm ${T.inset} ${T.sub}`}>
            {tab} panel — tab state is fully interactive.
          </div>
          <div className="mt-6 flex items-center gap-1.5 font-mono text-xs">
            {["Home", "Library", "Buttons"].map((c, i) => (
              <span key={c} className="flex items-center gap-1.5">
                {i > 0 && <span className="text-zinc-600">/</span>}
                <span className={i === 2 ? "text-blue-400" : T.faint}>{c}</span>
              </span>
            ))}
          </div>
        </div>

        <div data-testid="ds-table">
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Data table</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <div className={`rounded-xl border overflow-hidden text-sm ${dark ? "border-white/10" : "border-zinc-200"}`}>
            <table className="w-full">
              <thead className={dark ? "bg-surface2/60" : "bg-zinc-50"}>
                <tr>
                  {["File", "Size", "Status"].map((h) => (
                    <th key={h} className="px-4 py-2.5 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-400">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {TableRows.map((r) => (
                  <tr
                    key={r.id}
                    data-testid={`ds-table-row-${r.id}`}
                    onClick={() => setSelectedRow(r.id)}
                    className={`cursor-pointer border-t ${dark ? "border-white/5" : "border-zinc-100"} ${
                      selectedRow === r.id ? "bg-blue-500/10" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 font-medium">{r.name}</td>
                    <td className={`px-4 py-2.5 font-mono text-xs ${T.faint}`}>{r.size}</td>
                    <td className="px-4 py-2.5"><StatusBadge s={r.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className={`mt-2 text-xs ${T.faint}`}>Click a row — selection state is interactive.</p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-10">
        <div data-testid="ds-modal-demo">
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Modal</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <button
            data-testid="ds-modal-open"
            onClick={() => setModalOpen(true)}
            className={`rounded-lg px-4 py-2 text-sm font-medium ${T.btnSecondary}`}
          >
            Open modal
          </button>
        </div>

        <div className="group relative inline-block" data-testid="ds-tooltip-demo">
          <div className="flex items-center gap-4 mb-7">
            <h3 className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400">Tooltip</h3>
            <div className={`h-px flex-1 ${dark ? "bg-white/8" : "bg-zinc-200"}`} />
          </div>
          <button className={`rounded-lg px-4 py-2 text-sm font-medium ${T.btnSecondary}`}>Hover me</button>
          <span
            className={`absolute bottom-full left-1/2 -translate-x-1/2 mb-2 hidden group-hover:block whitespace-nowrap rounded-md border px-2.5 py-1.5 text-xs ${
              dark ? "bg-surface3 border-white/10 text-zinc-200" : "bg-zinc-800 border-zinc-700 text-zinc-100"
            }`}
          >
            Tooltips explain the control
          </span>
        </div>
      </div>

      <AnimatePresence>
        {modalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            data-testid="ds-modal"
          >
            <button className="absolute inset-0 bg-black/60 backdrop-blur-sm cursor-default" onClick={() => setModalOpen(false)} aria-label="Close modal" />
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 12 }}
              transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className={`relative w-full max-w-md rounded-2xl border p-6 ${dark ? "bg-surface border-white/10" : "bg-white border-zinc-200 shadow-xl"}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className={`text-lg font-semibold ${T.heading}`}>Delete workspace?</h4>
                  <p className={`mt-2 text-sm leading-relaxed ${T.sub}`}>
                    This action can't be undone. All projects in this workspace will be permanently removed.
                  </p>
                </div>
                <button data-testid="ds-modal-close" onClick={() => setModalOpen(false)} className={`p-1.5 rounded-lg ${T.faint} hover:opacity-100 ${dark ? "hover:text-zinc-100" : "hover:text-zinc-900"}`} aria-label="Close">
                  <X size={16} />
                </button>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button data-testid="ds-modal-cancel" onClick={() => setModalOpen(false)} className={`rounded-lg px-4 py-2 text-sm font-medium ${T.btnSecondary}`}>
                  Cancel
                </button>
                <button data-testid="ds-modal-confirm" onClick={() => setModalOpen(false)} className="rounded-lg px-4 py-2 text-sm font-medium bg-red-500 text-white hover:bg-red-400">
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DSComponents;
