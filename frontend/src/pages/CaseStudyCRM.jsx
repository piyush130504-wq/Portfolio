import { useMemo, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import {
  ArrowDown,
  ArrowUp,
  Bell,
  Briefcase,
  ChevronDown,
  ChevronUp,
  LayoutDashboard,
  PanelLeftClose,
  PanelLeftOpen,
  Receipt,
  Search,
  Users,
} from "lucide-react";
import CaseStudyShell from "@/components/CaseStudyShell";

const REVENUE = [
  { m: "Jan", v: 28 }, { m: "Feb", v: 31 }, { m: "Mar", v: 29 }, { m: "Apr", v: 34 },
  { m: "May", v: 38 }, { m: "Jun", v: 36 }, { m: "Jul", v: 42 }, { m: "Aug", v: 41 },
  { m: "Sep", v: 47 }, { m: "Oct", v: 45 }, { m: "Nov", v: 52 }, { m: "Dec", v: 56 },
];

const STAGES = ["Lead", "Qualified", "Proposal", "Won"];
const STAGE_DOTS = ["bg-zinc-500", "bg-blue-500", "bg-violet-500", "bg-emerald-500"];

const DEALS_INIT = [
  { id: 1, company: "Helios Robotics", value: 18500, stage: "Lead" },
  { id: 2, company: "Atlas Freight", value: 12000, stage: "Lead" },
  { id: 3, company: "Nimbus Health", value: 24000, stage: "Lead" },
  { id: 4, company: "Vertex Analytics", value: 32000, stage: "Qualified" },
  { id: 5, company: "Cobalt Systems", value: 9500, stage: "Qualified" },
  { id: 6, company: "Juniper Retail", value: 15500, stage: "Qualified" },
  { id: 7, company: "Meridian Bank", value: 47500, stage: "Proposal" },
  { id: 8, company: "Solace Media", value: 21000, stage: "Proposal" },
  { id: 9, company: "Ironwood Legal", value: 28000, stage: "Won" },
  { id: 10, company: "Beacon Education", value: 16500, stage: "Won" },
];

const CUSTOMERS = [
  { id: 1, company: "Northwind Labs", contact: "A. Whitfield", plan: "Enterprise", value: 48000, status: "Active", activity: "2h ago" },
  { id: 2, company: "Acme Freight", contact: "R. Okafor", plan: "SMB", value: 4200, status: "Trial", activity: "5h ago" },
  { id: 3, company: "Helios Robotics", contact: "M. Ferreira", plan: "Enterprise", value: 36500, status: "Active", activity: "1d ago" },
  { id: 4, company: "Juniper Retail", contact: "S. Nakamura", plan: "Mid-market", value: 12800, status: "Active", activity: "3d ago" },
  { id: 5, company: "Cobalt Systems", contact: "J. Petrenko", plan: "SMB", value: 3100, status: "Churn risk", activity: "6d ago" },
  { id: 6, company: "Meridian Bank", contact: "L. Castellanos", plan: "Enterprise", value: 52400, status: "Active", activity: "2d ago" },
  { id: 7, company: "Solace Media", contact: "D. Haile", plan: "Mid-market", value: 9700, status: "Trial", activity: "4h ago" },
  { id: 8, company: "Vertex Analytics", contact: "P. Lindqvist", plan: "Enterprise", value: 41000, status: "Active", activity: "8h ago" },
  { id: 9, company: "Ironwood Legal", contact: "K. Osei", plan: "Mid-market", value: 15400, status: "Churn risk", activity: "1w ago" },
  { id: 10, company: "Beacon Education", contact: "T. Marchetti", plan: "SMB", value: 2800, status: "Trial", activity: "2d ago" },
  { id: 11, company: "Nimbus Health", contact: "E. Brandt", plan: "Enterprise", value: 39900, status: "Active", activity: "5d ago" },
  { id: 12, company: "Atlas Freight", contact: "H. Duvall", plan: "Mid-market", value: 11250, status: "Active", activity: "12h ago" },
];

const TRANSACTIONS = [
  { company: "Meridian Bank", desc: "Annual plan renewal", amount: "$52,400", status: "Paid" },
  { company: "Vertex Analytics", desc: "Seat expansion", amount: "$4,100", status: "Paid" },
  { company: "Solace Media", desc: "Monthly subscription", amount: "$1,620", status: "Pending" },
  { company: "Cobalt Systems", desc: "Failed payment retry", amount: "$310", status: "Failed" },
  { company: "Nimbus Health", desc: "Onboarding invoice", amount: "$12,000", status: "Paid" },
  { company: "Northwind Labs", desc: "Quarterly true-up", amount: "$18,900", status: "Paid" },
];

const ACTIVITY = [
  { text: "Deal moved to Proposal — Meridian Bank", time: "2h" },
  { text: "New trial started — Solace Media", time: "4h" },
  { text: "Invoice #1042 paid — Vertex Analytics", time: "8h" },
  { text: "Churn risk flagged — Ironwood Legal", time: "1d" },
  { text: "Payment received — Northwind Labs", time: "1d" },
];

const NOTIFICATIONS = [
  { title: "Payment received", body: "Meridian Bank renewed the annual plan.", time: "2h ago" },
  { title: "Deal advanced", body: "Vertex Analytics moved to Qualified.", time: "5h ago" },
  { title: "Payment failed", body: "Cobalt Systems — card declined, retry scheduled.", time: "1d ago" },
];

const STATUS_TONES = {
  Active: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Trial: "text-blue-400 bg-blue-500/10 border-blue-500/25",
  "Churn risk": "text-amber-400 bg-amber-500/10 border-amber-500/25",
  Paid: "text-emerald-400 bg-emerald-500/10 border-emerald-500/25",
  Pending: "text-amber-400 bg-amber-500/10 border-amber-500/25",
  Failed: "text-red-400 bg-red-500/10 border-red-500/25",
};

const Badge = ({ s }) => (
  <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_TONES[s] || "text-zinc-400 bg-white/5 border-white/10"}`}>
    {s}
  </span>
);

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

const NAV = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "deals", label: "Deals", icon: Briefcase },
  { id: "customers", label: "Customers", icon: Users },
  { id: "transactions", label: "Transactions", icon: Receipt },
];

const DealsBoard = ({ deals, onAdvance, search }) => {
  const filtered = deals.filter((d) => d.company.toLowerCase().includes(search.toLowerCase()));
  return (
    <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-4" data-testid="crm-deals-board">
      {STAGES.map((stage, si) => {
        const col = filtered.filter((d) => d.stage === stage);
        return (
          <div key={stage} className="rounded-xl border border-white/8 bg-surface2/30 p-3">
            <div className="flex items-center gap-2 px-1 pb-3">
              <span className={`h-2 w-2 rounded-full ${STAGE_DOTS[si]}`} />
              <span className="text-xs font-medium text-zinc-300">{stage}</span>
              <span className="ml-auto font-mono text-[10px] text-zinc-500">{col.length}</span>
            </div>
            <div className="space-y-2.5">
              {col.map((d) => (
                <div key={d.id} className="rounded-lg border border-white/8 bg-surface p-3" data-testid={`deal-card-${d.id}`}>
                  <p className="text-sm font-medium text-zinc-200">{d.company}</p>
                  <p className="mt-1 font-mono text-xs text-zinc-400">${d.value.toLocaleString()}</p>
                  {stage !== "Won" && (
                    <button
                      data-testid={`deal-advance-${d.id}`}
                      onClick={() => onAdvance(d.id)}
                      className="mt-2.5 w-full rounded-md border border-white/10 bg-white/[0.03] py-1.5 text-[11px] text-zinc-300 hover:border-blue-500/40 hover:text-blue-300 transition-colors"
                    >
                      Advance to {STAGES[si + 1]} →
                    </button>
                  )}
                </div>
              ))}
              {col.length === 0 && <p className="px-1 pb-1 text-[11px] text-zinc-600">No deals in this stage</p>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

const CustomersTable = ({ search }) => {
  const [sort, setSort] = useState({ key: "value", dir: "desc" });
  const [statusFilter, setStatusFilter] = useState("All");

  const onSort = (key) =>
    setSort((s) => ({ key, dir: s.key === key && s.dir === "desc" ? "asc" : "desc" }));

  const rows = useMemo(() => {
    const q = search.toLowerCase();
    const r = CUSTOMERS.filter(
      (c) =>
        (statusFilter === "All" || c.status === statusFilter) &&
        (c.company.toLowerCase().includes(q) || c.contact.toLowerCase().includes(q))
    );
    r.sort((a, b) => {
      const va = a[sort.key];
      const vb = b[sort.key];
      const cmp = typeof va === "number" ? va - vb : String(va).localeCompare(String(vb));
      return sort.dir === "asc" ? cmp : -cmp;
    });
    return r;
  }, [search, statusFilter, sort]);

  const Th = ({ k, label }) => (
    <th className="px-4 py-3 text-left whitespace-nowrap">
      <button
        data-testid={`customers-sort-${k}`}
        onClick={() => onSort(k)}
        className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-wider text-zinc-400 hover:text-zinc-200 transition-colors"
      >
        {label}
        {sort.key === k ? (
          sort.dir === "desc" ? <ChevronDown size={11} className="text-blue-400" /> : <ChevronUp size={11} className="text-blue-400" />
        ) : (
          <ChevronDown size={11} className="text-zinc-600" />
        )}
      </button>
    </th>
  );

  return (
    <div data-testid="crm-customers">
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div>
          <h3 className="text-base font-semibold text-zinc-100">Customers</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">
            Showing {rows.length} of {CUSTOMERS.length}
          </p>
        </div>
        <select
          data-testid="customers-status-filter"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="rounded-lg border border-white/10 bg-surface2 px-3 py-2 text-xs text-zinc-300 outline-none"
        >
          {["All", "Active", "Trial", "Churn risk"].map((s) => (
            <option key={s} value={s} className="bg-surface2">
              {s === "All" ? "All statuses" : s}
            </option>
          ))}
        </select>
      </div>

      <div className="rounded-xl border border-white/8 overflow-x-auto">
        <table className="w-full min-w-[640px] text-sm">
          <thead className="bg-surface2/60 border-b border-white/8">
            <tr>
              <Th k="company" label="Company" />
              <Th k="plan" label="Plan" />
              <Th k="value" label="Annual value" />
              <Th k="status" label="Status" />
              <Th k="activity" label="Last activity" />
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.id} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors" data-testid={`customer-row-${c.id}`}>
                <td className="px-4 py-3">
                  <p className="font-medium text-zinc-200">{c.company}</p>
                  <p className="text-[11px] text-zinc-500">{c.contact}</p>
                </td>
                <td className="px-4 py-3 text-zinc-400">{c.plan}</td>
                <td className="px-4 py-3 font-mono text-xs text-zinc-300">${c.value.toLocaleString()}</td>
                <td className="px-4 py-3"><Badge s={c.status} /></td>
                <td className="px-4 py-3 text-xs text-zinc-500">{c.activity}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-4 py-10 text-center text-sm text-zinc-500">
                  No customers match “{search}” — clear the search to see everyone.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const Overview = ({ search, activeDeals }) => {
  const [range, setRange] = useState("12M");
  const data = range === "6M" ? REVENUE.slice(-6) : REVENUE;

  return (
    <div className="space-y-5" data-testid="crm-overview">
      <div className="grid grid-cols-2 xl:grid-cols-4 gap-3 md:gap-4">
        <Kpi label="Monthly revenue" value="$56.0k" delta="8.2%" up testid="crm-kpi-revenue" />
        <Kpi label="Active deals" value={activeDeals} delta="2" up testid="crm-kpi-deals" />
        <Kpi label="Win rate" value="20%" delta="4.1%" up testid="crm-kpi-winrate" />
        <Kpi label="Active customers" value={CUSTOMERS.filter((c) => c.status === "Active").length} delta="1.2%" up={false} testid="crm-kpi-customers" />
      </div>

      <div className="grid lg:grid-cols-5 gap-5">
        <div className="lg:col-span-3 rounded-xl border border-white/8 bg-surface2/40 p-4 md:p-5" data-testid="crm-revenue-chart">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-sm font-semibold text-zinc-100">Revenue</h3>
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Monthly · $k</p>
            </div>
            <div className="inline-flex rounded-lg border border-white/10 p-0.5">
              {["6M", "12M"].map((r) => (
                <button
                  key={r}
                  data-testid={`crm-range-${r}`}
                  onClick={() => setRange(r)}
                  className={`px-3 py-1 text-[11px] rounded-md transition-colors ${range === r ? "bg-blue-600 text-white" : "text-zinc-400 hover:text-zinc-200"}`}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={data} margin={{ top: 4, right: 4, bottom: 0, left: -14 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#3B82F6" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#3B82F6" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid stroke="rgba(255,255,255,0.06)" vertical={false} />
              <XAxis dataKey="m" tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#71717A", fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={(v) => `$${v}k`} />
              <Tooltip contentStyle={tooltipStyle} formatter={(v) => [`$${v}k`, "Revenue"]} cursor={{ stroke: "rgba(59,130,246,0.3)" }} />
              <Area type="monotone" dataKey="v" stroke="#3B82F6" strokeWidth={2} fill="url(#revGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        <div className="lg:col-span-2 rounded-xl border border-white/8 bg-surface2/40 p-4 md:p-5" data-testid="crm-activity">
          <h3 className="text-sm font-semibold text-zinc-100 mb-1">Customer activity</h3>
          <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Live feed</p>
          <div className="space-y-3.5">
            {ACTIVITY.map((a, i) => (
              <div key={i} className="flex gap-3">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                <div className="flex-1 min-w-0">
                  <p className="text-xs text-zinc-300 leading-relaxed">{a.text}</p>
                  <p className="font-mono text-[10px] text-zinc-600 mt-0.5">{a.time} ago</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export const CaseStudyCRM = () => {
  const [view, setView] = useState("overview");
  const [collapsed, setCollapsed] = useState(false);
  const [search, setSearch] = useState("");
  const [notifOpen, setNotifOpen] = useState(false);
  const [deals, setDeals] = useState(DEALS_INIT);

  const advance = (id) =>
    setDeals((ds) =>
      ds.map((d) => {
        if (d.id !== id) return d;
        const si = STAGES.indexOf(d.stage);
        return { ...d, stage: STAGES[Math.min(si + 1, STAGES.length - 1)] };
      })
    );

  return (
    <CaseStudyShell
      num="01"
      title="SaaS CRM Dashboard"
      summary="A full CRM product concept for a fictional B2B SaaS company — collapsible sidebar navigation, revenue analytics, a deals pipeline, customer activity, recent transactions and a sortable, searchable data table. Every control below actually works."
      scope={["Product Design", "Information Architecture", "Dark UI", "Charts & Tables", "Interaction Design"]}
      decisions={[
        {
          title: "Hierarchy before decoration",
          text: "One primary job per view: KPIs answer “how are we doing?”, the chart answers “where is it going?”, tables answer “show me the rows”. Colour is reserved for status and interaction — never for decoration.",
        },
        {
          title: "Navigation that scales",
          text: "A collapsible icon rail keeps navigation context on wide screens without eating canvas, and yields to a segmented switcher on small screens instead of a cramped drawer.",
        },
        {
          title: "Tables are the product",
          text: "Sortable columns, status filters and live search are the controls recruiters and end users poke first — so they're wired to real client-side state, not painted on.",
        },
      ]}
    >
      <div className="rounded-2xl border border-white/10 bg-surface shadow-card overflow-hidden" data-testid="crm-app">
        <div className="flex">
          <aside
            className={`hidden md:flex flex-col border-r border-white/8 bg-surface2/40 transition-all duration-300 ${collapsed ? "w-16" : "w-52"}`}
            data-testid="crm-sidebar"
          >
            <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/8">
              <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-blue-600/20 border border-blue-500/30 text-blue-400 shrink-0">
                <LayoutDashboard size={13} />
              </span>
              {!collapsed && <span className="text-sm font-semibold text-zinc-100 truncate">Pipeline</span>}
            </div>
            <nav className="flex-1 py-3 px-2 space-y-1">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  data-testid={`crm-nav-${id}`}
                  onClick={() => setView(id)}
                  title={label}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
                    view === id ? "bg-blue-500/10 text-blue-300 border border-blue-500/25" : "text-zinc-400 border border-transparent hover:text-zinc-200 hover:bg-white/5"
                  }`}
                >
                  <Icon size={16} className="shrink-0" />
                  {!collapsed && <span className="truncate">{label}</span>}
                </button>
              ))}
            </nav>
            <button
              data-testid="crm-sidebar-collapse"
              onClick={() => setCollapsed((c) => !c)}
              className="flex items-center gap-3 px-4 py-3.5 border-t border-white/8 text-zinc-500 hover:text-zinc-200 transition-colors"
            >
              {collapsed ? <PanelLeftOpen size={16} /> : <PanelLeftClose size={16} />}
              {!collapsed && <span className="text-xs">Collapse</span>}
            </button>
          </aside>

          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 h-14 px-4 md:px-6 border-b border-white/8">
              <div className="flex items-center gap-2 flex-1 max-w-sm rounded-lg border border-white/10 bg-ink/60 px-3 py-2" data-testid="crm-search">
                <Search size={14} className="text-zinc-500 shrink-0" />
                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search customers and deals…"
                  className="w-full bg-transparent text-sm text-zinc-200 placeholder-zinc-600 outline-none"
                  data-testid="crm-search-input"
                />
              </div>
              <span className="hidden lg:inline-flex font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 border border-white/10 rounded-full px-2.5 py-1">
                Sample data
              </span>
              <div className="ml-auto flex items-center gap-2.5">
                <div className="relative">
                  {notifOpen && <button className="fixed inset-0 z-10 cursor-default" onClick={() => setNotifOpen(false)} aria-label="Close notifications" />}
                  <button
                    data-testid="crm-notifications"
                    onClick={() => setNotifOpen((o) => !o)}
                    className="relative p-2 text-zinc-400 hover:text-zinc-100 rounded-lg border border-white/10 hover:border-white/20 transition-colors"
                    aria-label="Notifications"
                  >
                    <Bell size={15} />
                    <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-[9px] font-semibold text-white flex items-center justify-center">
                      3
                    </span>
                  </button>
                  {notifOpen && (
                    <div className="absolute right-0 top-11 z-20 w-72 rounded-xl border border-white/10 bg-surface2 shadow-card p-2" data-testid="crm-notifications-panel">
                      {NOTIFICATIONS.map((n) => (
                        <div key={n.title} className="rounded-lg p-2.5 hover:bg-white/5 transition-colors">
                          <div className="flex items-center justify-between gap-2">
                            <p className="text-xs font-medium text-zinc-200">{n.title}</p>
                            <span className="font-mono text-[9px] text-zinc-600">{n.time}</span>
                          </div>
                          <p className="text-[11px] text-zinc-500 mt-0.5 leading-relaxed">{n.body}</p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-blue-600 to-violet-600 text-[11px] font-semibold text-white">
                  PP
                </span>
              </div>
            </div>

            <div className="md:hidden flex gap-1.5 px-4 py-3 border-b border-white/8 overflow-x-auto">
              {NAV.map(({ id, label }) => (
                <button
                  key={id}
                  data-testid={`crm-mobile-nav-${id}`}
                  onClick={() => setView(id)}
                  className={`shrink-0 rounded-full px-3.5 py-1.5 text-xs transition-colors ${
                    view === id ? "bg-blue-600 text-white" : "border border-white/10 text-zinc-400"
                  }`}
                >
                  {label}
                </button>
              ))}
            </div>

            <div className="p-4 md:p-6">
              {view === "overview" && <Overview search={search} activeDeals={deals.filter((d) => d.stage !== "Won").length} />}
              {view === "deals" && <DealsBoard deals={deals} onAdvance={advance} search={search} />}
              {view === "customers" && <CustomersTable search={search} />}
              {view === "transactions" && (
                <div data-testid="crm-transactions">
                  <h3 className="text-base font-semibold text-zinc-100 mb-1">Recent transactions</h3>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Billing events across all accounts</p>
                  <div className="rounded-xl border border-white/8 overflow-x-auto">
                    <table className="w-full min-w-[560px] text-sm">
                      <thead className="bg-surface2/60 border-b border-white/8">
                        <tr>
                          {["Company", "Description", "Amount", "Status"].map((h) => (
                            <th key={h} className="px-4 py-3 text-left text-[11px] font-medium uppercase tracking-wider text-zinc-400">{h}</th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {TRANSACTIONS.map((t, i) => (
                          <tr key={i} className="border-b border-white/5 last:border-0 hover:bg-white/[0.03] transition-colors">
                            <td className="px-4 py-3 font-medium text-zinc-200">{t.company}</td>
                            <td className="px-4 py-3 text-zinc-400 text-xs">{t.desc}</td>
                            <td className="px-4 py-3 font-mono text-xs text-zinc-300">{t.amount}</td>
                            <td className="px-4 py-3"><Badge s={t.status} /></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </CaseStudyShell>
  );
};

export default CaseStudyCRM;
