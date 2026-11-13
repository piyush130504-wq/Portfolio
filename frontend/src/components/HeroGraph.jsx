import { useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

const NODES = [
  { id: "product", label: "Product", x: 300, y: 300, hub: true },
  { id: "ui", label: "UI Layer", x: 300, y: 118 },
  { id: "react", label: "React", x: 118, y: 232 },
  { id: "ds", label: "Design System", x: 482, y: 232 },
  { id: "api", label: "REST API", x: 118, y: 388 },
  { id: "ai", label: "AI Model", x: 482, y: 388 },
  { id: "data", label: "Data", x: 300, y: 505 },
];

const BY_ID = Object.fromEntries(NODES.map((n) => [n.id, n]));

const EDGES = [
  ["product", "ui"],
  ["product", "react"],
  ["product", "ds"],
  ["product", "api"],
  ["product", "ai"],
  ["product", "data"],
  ["ui", "ds"],
  ["react", "api"],
  ["ds", "ai"],
  ["react", "ui"],
];

const edgePath = ([a, b]) => `M ${BY_ID[a].x} ${BY_ID[a].y} L ${BY_ID[b].x} ${BY_ID[b].y}`;

export const HeroGraph = () => {
  const [active, setActive] = useState(null);
  const reduce = useReducedMotion();

  const edgeLit = (e) => active && (e[0] === active || e[1] === active);

  return (
    <div className="relative w-full max-w-[540px] mx-auto" data-testid="hero-graph">
      <div className="absolute inset-0 m-auto h-2/3 w-2/3 rounded-full bg-blue-600/10 blur-[90px] pointer-events-none" />
      <svg viewBox="0 0 600 600" className="relative w-full h-auto" role="img" aria-label="System diagram of a product connecting UI, React, design system, API, AI model and data">
        {!reduce &&
          EDGES.slice(0, 6).map((e, i) => (
            <circle key={`pulse-${i}`} r="3" fill={i % 2 ? "#8B5CF6" : "#3B82F6"} opacity="0.9">
              <animateMotion dur={`${4.5 + i}s`} repeatCount="indefinite" path={edgePath(e)} />
            </circle>
          ))}

        {EDGES.map((e, i) => (
          <motion.path
            key={e.join("-")}
            d={edgePath(e)}
            fill="none"
            initial={reduce ? { opacity: 1 } : { pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.1, delay: 0.5 + i * 0.07, ease: "easeOut" }}
            stroke={edgeLit(e) ? "#3B82F6" : "rgba(255,255,255,0.13)"}
            strokeWidth={edgeLit(e) ? 2 : 1.2}
            style={{ transition: "stroke 0.25s, stroke-width 0.25s" }}
          />
        ))}

        {NODES.map((n, i) => {
          const w = n.hub ? 132 : 124;
          const h = n.hub ? 46 : 40;
          const isHub = n.hub;
          const lit = active === n.id;
          return (
            <g key={n.id} transform={`translate(${n.x}, ${n.y})`}>
              <motion.g
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: lit ? 1.04 : 1 }}
                transition={{
                  opacity: { duration: 0.5, delay: reduce ? 0 : 0.7 + i * 0.07 },
                  scale: { duration: 0.2 },
                }}
                onMouseEnter={() => setActive(n.id)}
                onMouseLeave={() => setActive(null)}
                style={{ cursor: "pointer", transformBox: "fill-box", transformOrigin: "center" }}
                data-testid={`hero-node-${n.id}`}
              >
              <rect
                x={-w / 2}
                y={-h / 2}
                width={w}
                height={h}
                rx="12"
                fill={lit ? "#18181B" : "#111114"}
                stroke={lit ? "rgba(59,130,246,0.7)" : isHub ? "rgba(255,255,255,0.22)" : "rgba(255,255,255,0.12)"}
                strokeWidth="1.4"
              />
              {isHub && <rect x={-w / 2} y={-h / 2} width={w} height={h} rx="12" fill="url(#logo-g)" opacity="0.08" />}
              <text
                textAnchor="middle"
                dominantBaseline="central"
                fontFamily="JetBrains Mono, monospace"
                fontSize={isHub ? 13 : 11}
                fill={lit ? "#FAFAFA" : isHub ? "#FAFAFA" : "#A1A1AA"}
                style={{ textTransform: "uppercase", letterSpacing: "0.08em" }}
              >
                {n.label}
              </text>
              </motion.g>
            </g>
          );
        })}
      </svg>
      <p className="mt-2 text-center font-mono text-[10px] uppercase tracking-[0.25em] text-zinc-600">
        Interactive — hover the system
      </p>
    </div>
  );
};

export default HeroGraph;
