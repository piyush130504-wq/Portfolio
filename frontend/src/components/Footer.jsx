import { Github, Linkedin, Mail } from "lucide-react";
import Logo from "./Logo";
import { PROFILE } from "@/data/content";

export const Footer = () => (
  <footer className="border-t border-white/5 py-12">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-8">
        <div className="flex items-center gap-3">
          <Logo className="h-8 w-8" />
          <div>
            <p className="text-sm font-medium text-zinc-200">
              Piyush Priyadarshi<span className="text-blue-500">.</span>
            </p>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-500 mt-0.5">
              Design-minded engineering
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <a
            href={`mailto:${PROFILE.email}`}
            data-testid="footer-email"
            aria-label="Email"
            className="p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
          >
            <Mail size={17} />
          </a>
          <a
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-github"
            aria-label="GitHub"
            className="p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
          >
            <Github size={17} />
          </a>
          <a
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer"
            data-testid="footer-linkedin"
            aria-label="LinkedIn"
            className="p-2.5 text-zinc-400 hover:text-zinc-100 hover:bg-white/5 rounded-full transition-colors"
          >
            <Linkedin size={17} />
          </a>
        </div>
      </div>

      <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row justify-between gap-3">
        <p className="text-xs text-zinc-500">© {new Date().getFullYear()} Piyush Priyadarshi. All rights reserved.</p>
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-zinc-600">
          Built with React · Tailwind · Framer Motion
        </p>
      </div>
    </div>
  </footer>
);

export default Footer;
