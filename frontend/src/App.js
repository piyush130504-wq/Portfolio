import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import Lenis from "lenis";
import { Toaster } from "@/components/ui/sonner";
import Home from "@/pages/Home";
import CaseStudyCRM from "@/pages/CaseStudyCRM";
import CaseStudyDesignSystem from "@/pages/CaseStudyDesignSystem";
import CaseStudyAnalytics from "@/pages/CaseStudyAnalytics";
import Admin from "@/pages/Admin";
import "@/App.css";

const GRAIN_BG =
  "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='140' height='140'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='140' height='140' filter='url(%23n)'/%3E%3C/svg%3E\")";

const Grain = () => (
  <div
    aria-hidden="true"
    className="pointer-events-none fixed inset-0 z-[90] opacity-[0.035]"
    style={{ backgroundImage: GRAIN_BG }}
  />
);

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch(err) {
    console.error(err);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-ink text-zinc-300 flex items-center justify-center p-8">
          <div className="text-center">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-3">Something broke</p>
            <p className="text-zinc-400">Refresh the page to continue.</p>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return undefined;
    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    window.__lenis = lenis;
    let raf = requestAnimationFrame(function loop(t) {
      lenis.raf(t);
      raf = requestAnimationFrame(loop);
    });
    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.__lenis = null;
    };
  }, []);
  return null;
}

function RouteEffects() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash && /^#[A-Za-z0-9_-]+$/.test(hash)) {
      const timer = setTimeout(() => {
        let el = null;
        try {
          el = document.querySelector(hash);
        } catch {
          el = null;
        }
        if (!el) return;
        if (window.__lenis) window.__lenis.scrollTo(el, { offset: -84 });
        else el.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 420);
      return () => clearTimeout(timer);
    }
    if (window.__lenis) window.__lenis.scrollTo(0, { immediate: true });
    else window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

// Privacy-friendly page-view tracking: no cookies, no storage, no PII —
// just the route path and the referring hostname. Honors Do Not Track.
function Tracker() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith("/admin")) return;
    if (typeof navigator !== "undefined" && navigator.doNotTrack === "1") return;
    let ref = "";
    try {
      ref = document.referrer ? new URL(document.referrer).hostname : "";
    } catch {
      ref = "";
    }
    try {
      const backendUrl = process.env.REACT_APP_BACKEND_URL || "";
      fetch(`${backendUrl}/api/track`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ path: pathname, referrer: ref }),
        keepalive: true,
      }).catch(() => {});
    } catch {}
  }, [pathname]);
  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <SmoothScroll />
        <RouteEffects />
        <Tracker />
        <Grain />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/work/crm" element={<CaseStudyCRM />} />
          <Route path="/work/design-system" element={<CaseStudyDesignSystem />} />
          <Route path="/work/analytics" element={<CaseStudyAnalytics />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/admin/messages" element={<Admin />} />
          <Route path="*" element={<Home />} />
        </Routes>
        <Toaster position="bottom-right" />
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;
