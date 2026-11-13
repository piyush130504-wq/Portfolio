export const getTheme = (dark) =>
  dark
    ? {
        page: "bg-ink text-zinc-100",
        card: "bg-surface border-white/10",
        inset: "bg-white/[0.02] border-white/8",
        sub: "text-zinc-400",
        faint: "text-zinc-500",
        heading: "text-zinc-50",
        input: "bg-white/[0.03] border-white/10 text-zinc-100 placeholder-zinc-600",
        btnSecondary: "bg-surface2 border border-white/10 text-zinc-200 hover:bg-surface3",
        btnGhost: "text-zinc-300 hover:bg-white/5",
        offset: "ring-offset-ink",
        divider: "bg-white/8",
      }
    : {
        page: "bg-[#FAFAFA] text-zinc-900",
        card: "bg-white border-zinc-200 shadow-sm",
        inset: "bg-zinc-100 border-zinc-200",
        sub: "text-zinc-600",
        faint: "text-zinc-400",
        heading: "text-zinc-900",
        input: "bg-white border-zinc-300 text-zinc-900 placeholder-zinc-400",
        btnSecondary: "bg-zinc-100 border border-zinc-200 text-zinc-800 hover:bg-zinc-200",
        btnGhost: "text-zinc-600 hover:bg-zinc-100",
        offset: "ring-offset-[#FAFAFA]",
        divider: "bg-zinc-200",
      };

export const COLORS = [
  { name: "Background", hex: "#09090B", cls: "bg-[#09090B]" },
  { name: "Surface", hex: "#111114", cls: "bg-[#111114]" },
  { name: "Surface 2", hex: "#18181B", cls: "bg-[#18181B]" },
  { name: "Surface 3", hex: "#27272A", cls: "bg-[#27272A]" },
  { name: "Text Primary", hex: "#FAFAFA", cls: "bg-[#FAFAFA]" },
  { name: "Text Secondary", hex: "#A1A1AA", cls: "bg-[#A1A1AA]" },
  { name: "Blue / Primary", hex: "#3B82F6", cls: "bg-[#3B82F6]" },
  { name: "Violet / Secondary", hex: "#8B5CF6", cls: "bg-[#8B5CF6]" },
  { name: "Success", hex: "#10B981", cls: "bg-[#10B981]" },
  { name: "Warning", hex: "#F59E0B", cls: "bg-[#F59E0B]" },
  { name: "Error", hex: "#EF4444", cls: "bg-[#EF4444]" },
];

export const TYPE_SCALE = [
  { name: "Display", sample: "Build with clarity", cls: "text-4xl md:text-5xl font-extrabold tracking-tight", spec: "48 / 800 · lh 1.08" },
  { name: "Heading", sample: "Sections that breathe", cls: "text-3xl font-bold tracking-tight", spec: "30 / 700 · lh 1.2" },
  { name: "Subheading", sample: "A card title that scales", cls: "text-xl font-semibold", spec: "20 / 600 · lh 1.35" },
  { name: "Body", sample: "Body copy carries the reading experience — it gets the most attention to line height and contrast.", cls: "text-sm leading-relaxed", spec: "14 / 400 · lh 1.7" },
  { name: "Caption", sample: "Captions and helper text live one step quieter than body copy.", cls: "text-xs", spec: "12 / 400 · lh 1.5" },
  { name: "Mono Label", sample: "MONO LABEL / UPPERCASE", cls: "font-mono text-[10px] uppercase tracking-[0.25em] text-blue-400", spec: "10 / 500 · tracking 0.25em" },
];

export const SPACING = [4, 8, 12, 16, 24, 32, 48, 64];
export const RADII = [
  { label: "sm · 6px", cls: "rounded-md" },
  { label: "md · 10px", cls: "rounded-lg" },
  { label: "lg · 14px", cls: "rounded-xl" },
  { label: "xl · 20px", cls: "rounded-2xl" },
  { label: "full", cls: "rounded-full" },
];
export const BREAKPOINTS = [
  { name: "sm", px: 640, w: "25%" },
  { name: "md", px: 768, w: "50%" },
  { name: "lg", px: 1024, w: "75%" },
  { name: "xl", px: 1280, w: "100%" },
];
