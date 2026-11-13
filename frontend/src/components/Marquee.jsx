import { Asterisk } from "lucide-react";

const ITEMS = [
  "Frontend Engineering",
  "Design Systems",
  "AI-Powered Apps",
  "Product Architecture",
  "UI/UX Case Studies",
  "React & Next.js",
  "Tailwind & Framer Motion",
];

const Row = ({ hidden }) => (
  <div aria-hidden={hidden || undefined} className="flex shrink-0 items-center">
    {ITEMS.map((t) => (
      <span
        key={t}
        className="flex items-center gap-8 pr-8 font-mono text-xs uppercase tracking-[0.25em] text-zinc-500 whitespace-nowrap"
      >
        {t}
        <Asterisk size={13} className="text-blue-500" />
      </span>
    ))}
  </div>
);

export const Marquee = () => (
  <div className="border-y border-white/5 bg-surface/50 py-4 overflow-hidden" data-testid="marquee">
    <div className="flex w-max animate-marquee">
      <Row />
      <Row hidden />
    </div>
  </div>
);

export default Marquee;
