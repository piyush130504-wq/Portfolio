import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { Github, Linkedin, Menu, X } from "lucide-react";
import Logo from "./Logo";
import { PROFILE } from "@/data/content";

const LINKS = [
  { label: "Work", href: "/#work" },
  { label: "Case Studies", href: "/#case-studies" },
  { label: "Playground", href: "/#playground" },
  { label: "Experience", href: "/#experience" },
  { label: "Contact", href: "/#contact" },
];

const slug = (s) => s.toLowerCase().replace(/\s+/g, "-");

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 h-16 transition-all duration-300 border-b ${
          scrolled ? "bg-ink/85 backdrop-blur-xl border-white/10" : "bg-ink/40 backdrop-blur-md border-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <Link to="/" data-testid="nav-logo" className="flex items-center gap-2.5 group">
            <Logo className="h-8 w-8 transition-transform duration-300 group-hover:rotate-6" />
            <span className="font-semibold tracking-tight text-[15px] text-zinc-100">
              Piyush<span className="text-blue-500">.</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                data-testid={`nav-link-${slug(l.label)}`}
                className="px-3.5 py-2 text-sm text-zinc-400 hover:text-zinc-100 rounded-full hover:bg-white/5 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-1.5">
            <a
              href={PROFILE.github}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-github"
              aria-label="GitHub"
              className="p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
            >
              <Github size={17} />
            </a>
            <a
              href={PROFILE.linkedin}
              target="_blank"
              rel="noreferrer"
              data-testid="nav-linkedin"
              aria-label="LinkedIn"
              className="hidden sm:block p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
            >
              <Linkedin size={17} />
            </a>
            <a
              href="/#contact"
              data-testid="nav-cta"
              className="hidden sm:inline-flex ml-2 items-center rounded-full bg-zinc-100 text-zinc-900 text-sm font-medium px-4 py-2 hover:bg-white transition-colors"
            >
              Get in touch
            </a>
            <button
              data-testid="nav-mobile-toggle"
              onClick={() => setOpen((o) => !o)}
              className="md:hidden p-2.5 text-zinc-300 hover:text-zinc-100"
              aria-label="Toggle menu"
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-40 bg-ink/95 backdrop-blur-xl md:hidden"
          >
            <div className="pt-24 px-6">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  data-testid={`mobile-link-${slug(l.label)}`}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.06 * i, duration: 0.4 }}
                  className="block py-4 text-2xl font-semibold text-zinc-200 border-b border-white/5"
                >
                  {l.label}
                </motion.a>
              ))}
              <div className="flex items-center gap-4 pt-8">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="mobile-github"
                  className="p-3 rounded-full border border-white/10 text-zinc-300"
                  aria-label="GitHub"
                >
                  <Github size={18} />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="mobile-linkedin"
                  className="p-3 rounded-full border border-white/10 text-zinc-300"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={18} />
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Nav;
