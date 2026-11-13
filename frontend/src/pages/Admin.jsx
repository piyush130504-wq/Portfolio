import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Activity, ArrowLeft, Inbox, KeyRound, Loader2, Mail, RefreshCw } from "lucide-react";
import Logo from "@/components/Logo";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || "";
const API = `${BACKEND_URL}/api`;
const KEY_STORE = "admin-key";

const PATH_LABELS = {
  "/": "Home",
  "/work/crm": "Case Study 01 · CRM Dashboard",
  "/work/design-system": "Case Study 02 · Design System",
  "/work/analytics": "Case Study 03 · Analytics",
};

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
};

const dayLabel = (d) => d.slice(5);

export const Admin = () => {
  const [authed, setAuthed] = useState(false);
  const [key, setKey] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tab, setTab] = useState("messages");
  const [messages, setMessages] = useState([]);
  const [analytics, setAnalytics] = useState(null);

  const get = async (url, k) => {
    const res = await fetch(url, { headers: { "x-admin-key": k } });
    if (!res.ok) throw new Error(String(res.status));
    return res.json();
  };

  const load = async (k) => {
    setLoading(true);
    setError("");
    try {
      const [m, a] = await Promise.all([get(`${API}/contact`, k), get(`${API}/analytics`, k)]);
      sessionStorage.setItem(KEY_STORE, k);
      setMessages(m);
      setAnalytics(a);
      setAuthed(true);
    } catch {
      setError("That key didn't work — check it and try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const saved = sessionStorage.getItem(KEY_STORE);
    if (saved) load(saved);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSubmit = (e) => {
    e.preventDefault();
    if (key.trim()) load(key.trim());
  };

  const maxPath = analytics ? Math.max(...analytics.by_path.map((p) => p.count), 1) : 1;
  const recentDays = analytics ? analytics.by_day.slice(-14) : [];
  const maxDay = recentDays.length ? Math.max(...recentDays.map((d) => d.count), 1) : 1;

  return (
    <div className="min-h-screen bg-ink text-zinc-100 flex flex-col" data-testid="admin-page">
      <header className="border-b border-white/5 h-16 flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" data-testid="admin-back" className="inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-zinc-400 hover:text-blue-400 transition-colors">
          <ArrowLeft size={14} /> Back to portfolio
        </Link>
        <Logo className="h-7 w-7" />
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-14">
        {!authed ? (
          <div className="max-w-sm mx-auto mt-16 rounded-2xl border border-white/10 bg-surface shadow-card p-8" data-testid="admin-gate">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-blue-500/30 bg-blue-500/10 text-blue-400">
              <KeyRound size={20} />
            </span>
            <h1 className="mt-5 text-xl font-semibold tracking-tight">Message inbox & stats</h1>
            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">
              Private area — enter the admin key to read contact submissions and see visitor analytics.
            </p>
            <form onSubmit={onSubmit} className="mt-6 space-y-4">
              <input
                data-testid="admin-key-input"
                type="password"
                value={key}
                onChange={(e) => setKey(e.target.value)}
                placeholder="Admin key"
                autoFocus
                className="w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 outline-none focus:border-blue-500/70 transition-colors"
              />
              {error && <p className="text-xs text-red-400" data-testid="admin-error">{error}</p>}
              <button
                type="submit"
                disabled={loading}
                data-testid="admin-unlock"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-blue-600 px-5 py-3 text-sm font-medium text-white hover:bg-blue-500 transition-colors disabled:opacity-60"
              >
                {loading ? <Loader2 size={15} className="animate-spin" /> : <Inbox size={15} />}
                {loading ? "Checking…" : "Unlock"}
              </button>
            </form>
          </div>
        ) : (
          <div>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-blue-400">
                  <Inbox size={18} />
                </span>
                <div>
                  <h1 className="text-xl font-semibold tracking-tight">Admin</h1>
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">Private dashboard</p>
                </div>
              </div>
              <button
                onClick={() => {
                  const k = sessionStorage.getItem(KEY_STORE);
                  if (k) load(k);
                }}
                data-testid="admin-refresh"
                className="inline-flex items-center gap-2 rounded-full border border-white/10 px-3.5 py-1.5 text-xs text-zinc-300 hover:border-white/25 transition-colors"
              >
                <RefreshCw size={12} /> Refresh
              </button>
            </div>

            <div className="mt-8 inline-flex rounded-lg border border-white/10 p-1" data-testid="admin-tabs">
              {[
                { id: "messages", label: "Messages", icon: Inbox },
                { id: "analytics", label: "Analytics", icon: Activity },
              ].map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  data-testid={`admin-tab-${id}`}
                  onClick={() => setTab(id)}
                  className={`inline-flex items-center gap-1.5 rounded-md px-4 py-1.5 text-sm transition-colors ${
                    tab === id ? "bg-surface3 text-zinc-100" : "text-zinc-400 hover:text-zinc-200"
                  }`}
                >
                  <Icon size={13} /> {label}
                </button>
              ))}
            </div>

            {tab === "messages" ? (
              <div className="mt-8 space-y-4" data-testid="admin-messages">
                <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">
                  {messages.length} message{messages.length === 1 ? "" : "s"} · newest first
                </p>
                {messages.map((m, i) => (
                  <div key={m.id || i} className="rounded-2xl border border-white/8 bg-surface p-5" data-testid={`admin-message-${i}`}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="flex items-center gap-3 min-w-0">
                        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-blue-600/40 to-violet-600/40 border border-white/10 text-xs font-semibold text-zinc-100">
                          {(m.name || "?").slice(0, 1).toUpperCase()}
                        </span>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-zinc-100 truncate">{m.name}</p>
                          <a href={`mailto:${m.email}`} className="inline-flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition-colors truncate" data-testid={`admin-email-${i}`}>
                            <Mail size={11} /> {m.email}
                          </a>
                        </div>
                      </div>
                      <span className="font-mono text-[10px] text-zinc-600">{fmtDate(m.created_at)}</span>
                    </div>
                    <p className="mt-4 text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  </div>
                ))}
                {messages.length === 0 && (
                  <div className="rounded-2xl border border-dashed border-white/10 p-10 text-center text-sm text-zinc-500" data-testid="admin-empty">
                    No messages yet — the inbox is empty.
                  </div>
                )}
              </div>
            ) : (
              <div className="mt-8 space-y-8" data-testid="admin-analytics">
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  <div className="rounded-xl border border-white/8 bg-surface2/40 p-4" data-testid="analytics-total">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Total views</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-50">{analytics ? analytics.total : "—"}</p>
                  </div>
                  <div className="rounded-xl border border-white/8 bg-surface2/40 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Pages tracked</p>
                    <p className="mt-2 text-3xl font-bold tracking-tight text-zinc-50">{analytics ? analytics.by_path.length : "—"}</p>
                  </div>
                  <div className="col-span-2 sm:col-span-1 rounded-xl border border-white/8 bg-surface2/40 p-4">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500">Privacy</p>
                    <p className="mt-2 text-sm text-zinc-300 leading-snug">No cookies · No PII · Honors Do Not Track</p>
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-surface2/40 p-5" data-testid="analytics-by-path">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Views by page</p>
                  <div className="space-y-3">
                    {analytics && analytics.by_path.map((p) => (
                      <div key={p._id}>
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="text-xs text-zinc-300">{PATH_LABELS[p._id] || p._id}</span>
                          <span className="font-mono text-[11px] text-zinc-500">{p.count}</span>
                        </div>
                        <div className="h-2 rounded-full bg-white/5 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-blue-500 to-violet-500"
                            style={{ width: `${Math.round((p.count / maxPath) * 100)}%` }}
                          />
                        </div>
                      </div>
                    ))}
                    {analytics && analytics.by_path.length === 0 && (
                      <p className="text-sm text-zinc-500">No views recorded yet.</p>
                    )}
                  </div>
                </div>

                <div className="rounded-xl border border-white/8 bg-surface2/40 p-5" data-testid="analytics-by-day">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Last 14 days</p>
                  {recentDays.length > 0 ? (
                    <div className="flex items-end gap-1.5 h-24">
                      {recentDays.map((d) => (
                        <div key={d._id} className="flex-1 max-w-9 h-full flex flex-col items-center justify-end gap-1.5" title={`${d._id}: ${d.count} views`}>
                          <div
                            className="w-full rounded-t bg-gradient-to-t from-blue-600/70 to-violet-500/70"
                            style={{ height: `${Math.max((d.count / maxDay) * 100, 8)}%` }}
                          />
                          <span className="font-mono text-[8px] text-zinc-600">{dayLabel(d._id)}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">No views recorded yet.</p>
                  )}
                </div>

                <div className="rounded-xl border border-white/8 bg-surface2/40 p-5" data-testid="analytics-referrers">
                  <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mb-4">Top referrers</p>
                  {analytics && analytics.by_referrer.length > 0 ? (
                    <div className="space-y-2">
                      {analytics.by_referrer.map((r) => (
                        <div key={r._id} className="flex items-center justify-between text-sm">
                          <span className="text-zinc-300">{r._id}</span>
                          <span className="font-mono text-[11px] text-zinc-500">{r.count}</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-sm text-zinc-500">All traffic so far is direct — no referring sites recorded.</p>
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default Admin;
