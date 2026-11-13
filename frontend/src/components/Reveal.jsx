import { motion, useReducedMotion } from "framer-motion";

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export const SectionHeading = ({ eyebrow, title, description, id }) => (
  <div className="max-w-2xl">
    <Reveal>
      <p className="font-mono text-xs uppercase tracking-[0.25em] text-blue-400 mb-4" data-testid={`${id}-eyebrow`}>
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold tracking-tight text-zinc-50">{title}</h2>
    </Reveal>
    {description ? (
      <Reveal delay={0.16}>
        <p className="mt-4 text-base text-zinc-400 leading-relaxed">{description}</p>
      </Reveal>
    ) : null}
  </div>
);

export default Reveal;
