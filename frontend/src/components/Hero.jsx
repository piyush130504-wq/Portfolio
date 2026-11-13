import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDown, ArrowRight, FileDown, Github, Linkedin } from "lucide-react";
import HeroGraph from "./HeroGraph";
import { PROFILE } from "@/data/content";

const LINES = [
  [{ t: "Building digital" }],
  [{ t: "experiences where" }],
  [{ t: "engineering meets" }],
  [{ t: "design.", accent: true }],
];

export const Hero = () => {
  const reduce = useReducedMotion();
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [0, 90]);
  const opacity = useTransform(scrollYProgress, [0, 0.85], [1, 0.25]);

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: 0.13, delayChildren: 0.25 } },
  };
  const line = {
    hidden: { y: reduce ? 0 : "115%" },
    show: { y: "0%", transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <section ref={ref} className="relative min-h-screen flex items-center overflow-hidden" data-testid="hero">
      <div className="absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,black,transparent)]" />
      <div className="absolute -top-40 right-[-10%] h-[460px] w-[560px] rounded-full bg-blue-600/15 blur-[140px] pointer-events-none" />
      <div className="absolute bottom-[-10%] left-[-8%] h-[400px] w-[460px] rounded-full bg-violet-600/10 blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20 w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          <div className="lg:col-span-7">
            <motion.div
              variants={container}
              initial="hidden"
              animate="show"
              className="inline-flex items-center gap-2.5 rounded-full border border-white/10 bg-white/[0.03] px-3.5 py-1.5 mb-8"
              data-testid="hero-availability"
            >
              <span className="relative flex h-2 w-2">
                {!reduce && <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 animate-pulse-ring" />}
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              </span>
              <span className="text-xs text-zinc-300">Available for select opportunities</span>
            </motion.div>

            <motion.h1
              variants={container}
              initial="hidden"
              animate="show"
              className="text-[2.55rem] sm:text-6xl lg:text-[4.35rem] font-extrabold tracking-tight leading-[1.06] text-zinc-50"
              data-testid="hero-headline"
            >
              {LINES.map((words, i) => (
                <span key={i} className="block overflow-hidden pb-1">
                  <motion.span variants={line} className="block">
                    {words.map((w, j) => (
                      <span key={j} className={w.accent ? "text-gradient" : ""}>
                        {w.t}
                      </span>
                    ))}
                  </motion.span>
                </span>
              ))}
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-6 max-w-xl text-base sm:text-lg text-zinc-400 leading-relaxed"
              data-testid="hero-subline"
            >
              {PROFILE.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
              className="mt-9 flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                data-testid="hero-cta-projects"
                className="inline-flex items-center gap-2 rounded-full bg-blue-600 text-white text-sm font-medium px-6 py-3 hover:bg-blue-500 shadow-glow transition-colors"
              >
                View Projects <ArrowRight size={15} />
              </a>
              <a
                href={`${process.env.PUBLIC_URL}/resume.pdf`}
                download="Piyush_Priyadarshi_Resume.pdf"
                data-testid="hero-cta-resume"
                className="inline-flex items-center gap-2 rounded-full border border-white/15 text-zinc-300 text-sm font-medium px-6 py-3 hover:border-blue-500/50 hover:text-zinc-100 transition-colors"
              >
                <FileDown size={15} /> Download Resume
              </a>
              <span className="flex items-center gap-1 ml-1">
                <a
                  href={PROFILE.github}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="hero-github"
                  aria-label="GitHub"
                  className="p-2.5 text-zinc-400 hover:text-zinc-100 rounded-full border border-transparent hover:border-white/10 transition-colors"
                >
                  <Github size={17} />
                </a>
                <a
                  href={PROFILE.linkedin}
                  target="_blank"
                  rel="noreferrer"
                  data-testid="hero-linkedin"
                  aria-label="LinkedIn"
                  className="p-2.5 text-zinc-400 hover:text-zinc-100 rounded-full border border-transparent hover:border-white/10 transition-colors"
                >
                  <Linkedin size={17} />
                </a>
              </span>
            </motion.div>
          </div>

          <motion.div
            className="lg:col-span-5 hidden md:block"
            style={reduce ? undefined : { y, opacity }}
            initial={{ opacity: 0, scale: 0.94 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            data-testid="hero-visual"
          >
            <HeroGraph />
          </motion.div>
        </div>
      </div>

      <motion.div
        className="absolute bottom-7 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2 text-zinc-500"
        animate={reduce ? undefined : { y: [0, 6, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      >
        <span className="font-mono text-[10px] tracking-[0.3em]">SCROLL</span>
        <ArrowDown size={13} />
      </motion.div>
    </section>
  );
};

export default Hero;
