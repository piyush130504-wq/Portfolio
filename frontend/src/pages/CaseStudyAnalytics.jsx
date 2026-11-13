import { Fragment, useMemo, useState } from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ArrowDown, ArrowUp, ChevronDown, Download, Search } from "lucide-react";
import { toast } from "sonner";
import CaseStudyShell from "@/components/CaseStudyShell";

const RANGES = ["7D", "30D", "90D", "12M"];
const SEGMENTS = { All: 1, Enterprise: 1.9, "Mid-market": 1.25, SMB: 0.65 };

const SERIES = {
  "7D": {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    sessions: [1240, 1382, 1130, 1594, 1702, 984, 862],
    conversions: [86, 95, 71, 110, 122, 61, 52],
  },
  "30D": {
    labels: ["D1", "D5", "D10", "D15", "D20", "D25", "D30"],
    sessions: [1180, 1290, 1445, 1390, 1620, 1780, 1910],
    conversions: [78, 84, 96, 92, 108, 118, 126],
  },
  "90D": {
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    sessions: [7200, 7800, 7400, 8100, 8600, 8300, 9100, 9700, 9400, 10200, 10900, 11400],
    conversions: [480, 520, 495, 545, 590, 560, 620, 660, 640, 700, 745, 790],
  },
  "12M": {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    sessions: [24800, 26100, 27400, 28900, 30500, 29800, 32600, 34100, 33200, 36800, 39400, 41200],
    conversions: [1610, 1700, 1780, 1890, 1990, 1940, 2130, 2230, 2170, 2410, 2580, 2700],
  },
};

const CHANNELS = [
  { id: 1, channel: "Organic Search", sessions: 48200, conversion: 3.8, revenue: 61200, status: "Growing", seed: 7, note: "Largest and most efficient channel — content investment keeps paying off across every range." },
  { id: 2, channel: "Direct", sessions: 31400, conversion: 4.6, revenue: 48800, status: "Growing", seed: 3, note: "Brand-driven traffic with the best conversion quality; grows steadily with product-led word of mouth." },
  { id: 3, channel: "Referral", sessions: 18700, conversion: 2.9, revenue: 22400, status: "Stable", seed: 11, note: "Partner links hold a consistent mid-tier volume — a candidate for a structured partner program." },
  { id: 4, channel: "Paid Social", sessions: 24300, conversion: 1.7, revenue: 15600, status: "Declining", seed: 5, note: "High volume, weakening efficiency — creative fatigue is visible in the last third of the range." },
  { id: 5, channel: "Email", sessions: 12900, conversion: 5.2, revenue: 28900, status: "Growing", seed: 13, note: "Small list, best conversion rate in the mix — retention campaigns outperform acquisition here." },
  { id: 6, channel: "Affiliate", sessions: 9800, conversion: 2.2, revenue: 11300, status: "Stable", seed: 17, note: "Steady contributor with predictable seasonality; low maintenance cost per conversion." },
  { id: 7, channel: "Display Ads", sessions: 15400, conversion: 0.9, revenue: 6100, status: "Declining", seed: 23, note: "Cheapest traffic, weakest intent — a budget reallocation candidate in the next planning cycle." },
  { id: 8, channel: "Community", sessions: 7600, conversion: 3.1, revenue: 9800, status: "Growing", seed: 29, note: "Smallest channel by volume but trending up — community-led growth is compounding." },
];

const STATUS_TONE = {
  Growing: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Stable: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  Declining: "text-red-400 bg-red-500/10 border-red-500/25",
};

const fmt = (v) => (v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`);
const money = (v) => `$${v.toLocaleString()}`;

const sparkPoints = (seed) =>
  Array.from({ length: 14 }, (_, i) => `${i * 10},${34 - ((seed * (i + 3) * 7) % 24) - i}`).join(" ");

const tooltipStyle = {
  backgroundColor: "#18181B",
  border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: 10,
  fontSize: 12,
  color: "#FAFAFA",
};

const Kpi = ({ label, value, delta, up, testid }) => (
  <div className="rounded-xl border border-white/8 bg-surface2/40 p-4" data-testid={testid}>
    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">{label}</p>
    <div className="mt-2 flex items-baseline gap-2">
      <p className="text-2xl font-bold tracking-tight text-zinc-50">{value}</p>
      <span className={`inline-flex items-center gap-0.5 text-[11px] font-medium ${up ? "text-emerald-400" : "text-red-400"}`}>
        {up ? <ArrowUp size={11} /> : <ArrowDown size={11} />}
        {delta}
      </span>
    </div>
  </div>
);

export const CaseStudyAnalytics = () => {
  const [range, setRange] = useState("90D");
  const [segment, setSegment] = useState("All");
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState({ key: "sessions", dir: "desc" });
  const [expanded, setExpanded] = useState(null);
  const [showSessions, setShowSessions] = useState(true);
  const [showConversions, setShowConversions] = useState(true);

  const factor = SEGMENTS[segment];
  const base = SERIES[range];
  const chartData = useMemo(
    () =>
      base.labels.map((label, i) => ({
        label,
        sessions: Math.round(base.sessions[i] * factor),
        conversions: Math.round(base.conversions[i] * factor),
      })),
    [base, factor]
  );

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const r = CHANNELS.filter((c) => c.channel.toLowerCase().includes(q)).map((c) => ({
      ...c,
      sessions: Math.round(c.sessions * factor),
      revenue: Math.round(c.revenue * factor),
    }));
    r.sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [search, sort, factor]);

  const totals = useMemo(
    () => ({
      sessions: chartData.reduce((a, b) => a + b.sessions, 0),
      conversions: chartData.reduce((a, b) => a + b.conversions, 0),
      revenue: rows.reduce((a, b) => a + b.revenue, 0),
    }),
    [chartData, rows]
  );
  const convRate = ((totals.conversions / totals.sessions) * 100).toFixed(1);

  const onSort = (key) => setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));

  const exportCsv = () => {
    const header = "Channel,Sessions,Conversion %,Revenue,Status";
    const lines = rows.map((r) => [r.channel, r.sessions, r.conversion, r.revenue, r.status].join(","));
    const blob = new Blob([[header, ...lines].join("\n")], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `analytics-${segment.toLowerCase().replace(" ", "-")}-${range}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported", { description: `${rows.length} rows · ${range} · ${segment}` });
  };

  const Th = ({ k, label }) => (
    <th className="px-4 py-3 text-left whitespace-nowrap">
      <button
        data-testid={`analytics-sort-${k}`}
        onClick={() => onSort(k)}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        {label}
        {sort.key === k ? (
          sort.dir === "desc" ? <ChevronDown size={11} className="text-blue-400" /> : <ArrowUp size={11} className="text-blue-400" />
        ) : (
          <ChevronDown size={11} className="text-zinc-600" />
        )}
      </button>
    </th>
  );

  return (
    <CaseStudyShell
      num="03"
      title="Complex Data Analytics Dashboard"
      summary="A high-density analytics interface designed to make dense information readable: time-series comparison, advanced filters, a sortable and expandable data table, and a working CSV export. Everything responds to the filters you set."
      scope={["Data Density", "Information Hierarchy", "Accessibility", "Data Visualisation", "Interaction Design"]}
      decisions={[
        {
          title: "Reduce cognitive load",
          text: "Density is grouped into cards with a single job each — KPIs summarise, the chart shows the trend, the table holds the detail. Comparison is opt-in through the legend instead of always shouting.",
        },
        {
          title: "Colour communicates meaning",
          text: "Blue and violet are reserved for data series; red, amber and green are reserved exclusively for status. A user never has to re-learn what a colour means as they move down the page.",
        },
        {
          title: "Progressive disclosure",
          text: "Rows expand inline for their breakdown instead of opening a new page — the working context stays put. Export keeps the analysed view: the CSV reflects the exact filters and search applied.",
        },
      ]}
    >
      <div className="rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden" data-testid="analytics-app">
        <div className="flex flex-wrap items-center gap-3 px-4 md:px-6 py-4 border-b border-white/8">
          <div className="flex items-center gap-2 rounded-lg border border-white/10 bg-ink/60 px-3 py-2 w-full sm:w-56" data-testid="analytics-search">
            <Search size={14} className="text-zinc-500 shrink-0" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Filter channels…"
              className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
              data-testid="analytics-search-input"
            />
          </div>

          <div className="inline-flex rounded-lg border border-white/10 p-0.5" data-testid="analytics-range">
            {RANGES.map((r) => (
              <button
                key={r}
                data-testid={`analytics-range-${r}`}
                onClick={() => setRange(r)}
                className={`px-3 py-1.5 text-[11px] rounded-md transition-colors ${range === r ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
              >
                {r}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-1.5" data-testid="analytics-segments">
            {Object.keys(SEGMENTS).map((s) => (
              <button
                key={s}
                data-testid={`analytics-segment-${s.toLowerCase().replace(" ", "-")}`}
                onClick={() => setSegment(s)}
                className={`rounded-full px-3 py-1.5 text-[11px] transition-colors ${
                  segment === s ? "bg-violet-500/20 border border-violet-500/40 text-violet-300" : "border border-white/10 text-zinc-400 hover:text-zinc-200"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <button
            data-testid="analytics-export"
            onClick={exportCsv}
            className="ml-auto inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/[0.03] px-3.5 py-2 text-xs font-medium text-zinc-300 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
          >
            <Download size={13} /> Export CSV
          </button>
        </div>

        <div className="p-4 md:p-6 space-y-5">
          <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
            <Kpi label="Sessions" value={fmt(totals.sessions)} delta="12.4%" up testid="analytics-kpi-sessions" />
            <Kpi label="Conversions" value={fmt(totals.conversions)} delta="9.1%" up testid="analytics-kpi-conversions" />
            <Kpi label="Conversion rate" value={`${convRate}%`} delta="0.4%" up testid="analytics-kpi-rate" />
            <Kpi label="Revenue" value={money(totals.revenue)} delta="6.8%" up testid="analytics-kpi-revenue" />
          </div>

          <div className="rounded-xl border border-white/8 bg-surface2/40 p-4 md:p-5" data-testid="analytics-chart">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
              <div>
                <h3 className="text-sm font-semibold text-zinc-100">Traffic & conversion</h3>
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">
                  {range} · {segment} · sample data
                </p>
              </div>
              <div className="flex items-center gap-2">
                {[
                  { label: "Sessions", state: showSessions, set: setShowSessions, dot: "bg-blue-500" },
                  { label: "Conversions", state: showConversions, set: setShowConversions, dot: "bg-violet-500" },
                ].map((m) => (
                  <button
                    key={m.label}
                    data-testid={`analytics-toggle-${m.label.toLowerCase()}`}
                    onClick={() => m.set(!m.state)}
                    className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-[11px] transition-colors ${
                      m.state ? "border-white/15 text-zinc-200" : "border-white/5 text-zinc-600"
                    }`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${m.state ? m.dot : "bg-zinc-700"}`} />
                    {m.label}
                  </button>
                ))}
              </div>
            </div>
            <ResponsiveContainer width="100%" height={280}>
              <LineChart data={chartData} margin={{ top: 4, right: 4, bottom: 0, left: -10 }}>
                <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
                <XAxis dataKey="label" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis yAxisId="l" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={fmt} />
                <YAxis yAxisId="r" orientation="right" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ stroke: "rgba(139,92,246,0.3)" }} />
                {showSessions && (
                  <Line yAxisId="l" type="monotone" dataKey="sessions" name="Sessions" stroke="#3B82F6" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                )}
                {showConversions && (
                  <Line yAxisId="r" type="monotone" dataKey="conversions" name="Conversions" stroke="#8B5CF6" strokeWidth={2} strokeDasharray="5 4" dot={false} activeDot={{ r: 4 }} />
                )}
              </LineChart>
            </ResponsiveContainer>
          </div>

          <div className="rounded-xl border border-white/8 overflow-x-auto" data-testid="analytics-table">
            <table className="w-full min-w-[720px] text-sm">
              <thead className="bg-surface2/60 border-b border-white/8">
                <tr>
                  <Th k="channel" label="Channel" />
                  <Th k="sessions" label="Sessions" />
                  <Th k="conversion" label="Conv. rate" />
                  <Th k="revenue" label="Revenue" />
                  <Th k="status" label="Status" />
                  <th className="px-4 py-3" />
                </tr>
              </thead>
              <tbody>
                {rows.map((c) => (
                  <Fragment key={c.id}>
                    <tr
                      key={c.id}
                      className="border-b border-white/5 hover:bg-white/[0.03] transition-colors cursor-pointer"
                      onClick={() => setExpanded(expanded === c.id ? null : c.id)}
                      data-testid={`analytics-row-${c.id}`}
                    >
                      <td className="px-4 py-3 font-medium text-zinc-200">{c.channel}</td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-300">{fmt(c.sessions)}</td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-300">{c.conversion}%</td>
                      <td className="px-4 py-3 font-mono text-xs text-zinc-300">{money(c.revenue)}</td>
                      <td className="px-4 py-3">
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_TONE[c.status]}`}>{c.status}</span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <ChevronDown size={14} className={`inline text-zinc-500 transition-transform duration-300 ${expanded === c.id ? "rotate-180" : ""}`} />
                      </td>
                    </tr>
                    {expanded === c.id && (
                      <tr data-testid={`analytics-detail-${c.id}`} className="border-b border-white/5 bg-ink/40">
                        <td colSpan={6} className="px-4 py-5">
                          <div className="flex flex-col sm:flex-row gap-6 items-start">
                            <svg viewBox="0 0 130 40" className="w-36 shrink-0">
                              <polyline points={sparkPoints(c.seed)} fill="none" stroke={c.status === "Declining" ? "#EF4444" : c.status === "Stable" ? "#3B82F6" : "#10B981"} strokeWidth="1.6" />
                            </svg>
                            <p className="text-sm text-zinc-400 leading-relaxed max-w-xl">{c.note}</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </Fragment>
                ))}
                {rows.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-4 py-10 text-center text-sm text-zinc-500">
                      No channels match “{search}”.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </CaseStudyShell>
  );
};

export default CaseStudyAnalytics;
