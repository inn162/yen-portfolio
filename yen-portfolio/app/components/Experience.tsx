"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { experiences } from "../lib/data";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

function CompanyVisual({ id }: { id: string }) {
  if (id === "kpim-retail") {
    const bars = [0.55, 0.7, 0.45, 0.85, 0.65, 0.9, 0.75];
    return (
      <svg viewBox="0 0 240 140" width="100%" height="140">
        {bars.map((h, i) => (
          <motion.rect
            key={i}
            x={i * 32 + 8}
            y={140 - h * 120}
            width={20}
            height={h * 120}
            fill={i % 2 === 0 ? "#e8578a" : "#c4b5e8"}
            fillOpacity={0.65}
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            style={{ transformOrigin: "bottom" }}
            transition={{ duration: 0.5, delay: i * 0.07, ease }}
          />
        ))}
        <line x1="0" y1="139" x2="240" y2="139" stroke="#e8e8e8" strokeWidth="1" />
      </svg>
    );
  }

  if (id === "mb-securities") {
    const pts = [100, 88, 94, 76, 82, 70, 78, 62, 68, 54, 60, 48, 55, 44, 50];
    const svgPts = pts.map((y, i) => `${(i / (pts.length - 1)) * 220 + 10},${y}`).join(" ");
    return (
      <svg viewBox="0 0 240 120" width="100%" height="120">
        {[30, 60, 90].map(y => (
          <line key={y} x1="0" y1={y} x2="240" y2={y} stroke="#f5f5f5" strokeWidth="1" />
        ))}
        <polyline points={svgPts} fill="none" stroke="#e8578a" strokeWidth="2" strokeLinejoin="round" />
        <motion.circle cx={230} cy={50} r={4} fill="#e8578a" initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
      </svg>
    );
  }

  if (id === "asia-business-builder") {
    const widths = [180, 140, 200, 110, 160, 90, 130, 170, 100];
    return (
      <svg viewBox="0 0 240 160" width="100%" height="140">
        {widths.map((w, i) => (
          <motion.rect
            key={i}
            x={8}
            y={i * 15 + 8}
            width={w}
            height={8}
            rx={2}
            fill={i === 0 ? "#111" : i === 1 ? "#888" : "#e8e8e8"}
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ delay: i * 0.05, duration: 0.35, ease }}
          />
        ))}
      </svg>
    );
  }

  // twenty-in-twenty: AI / network
  const nodes = [
    { x: 40, y: 70 }, { x: 100, y: 30 }, { x: 100, y: 110 },
    { x: 160, y: 50 }, { x: 160, y: 90 }, { x: 210, y: 70 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,4],[2,3]];
  return (
    <svg viewBox="0 0 240 140" width="100%" height="140">
      {edges.map(([a, b], i) => (
        <motion.line
          key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#c4b5e8" strokeWidth="1.5" strokeOpacity={0.5}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }}
          transition={{ delay: i * 0.07 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle
          key={i} cx={n.x} cy={n.y} r={i === 0 ? 9 : 5}
          fill={i === 0 ? "#e8578a" : "#c4b5e8"} fillOpacity={0.8}
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          transition={{ delay: 0.35 + i * 0.06 }}
        />
      ))}
    </svg>
  );
}

export default function Experience() {
  const [active, setActive] = useState(experiences[0].id);
  const current = experiences.find(e => e.id === active)!;

  // Group by year, newest first
  const years: Record<string, typeof experiences> = {};
  experiences.forEach(e => {
    const y = e.period.match(/\d{4}/)?.[0] ?? e.period;
    if (!years[y]) years[y] = [];
    years[y].push(e);
  });
  const yearEntries = Object.entries(years).sort(([a], [b]) => Number(b) - Number(a));

  return (
    <section id="experience" className="bg-white border-t border-[#e8e8e8]">
      <div className="px-[5.5vw] pt-28 pb-6">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
          EXPERIENCE
        </p>
      </div>

      {/* Desktop two-panel */}
      <div className="hidden md:grid grid-cols-[280px_1fr] min-h-[500px]">
        {/* Left: company list */}
        <div className="px-[5.5vw] pb-16 border-r border-[#e8e8e8] flex flex-col">
          {yearEntries.map(([year, exps]) => (
            <div key={year} className="mb-8">
              <p className="mb-4" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.15em" }}>
                {year}
              </p>
              {exps.map(exp => (
                <button
                  key={exp.id}
                  onClick={() => setActive(exp.id)}
                  className="w-full text-left mb-5 flex items-stretch gap-3"
                >
                  <span
                    className="shrink-0 w-[2px] transition-colors duration-200"
                    style={{ background: active === exp.id ? "#e8578a" : "#e8e8e8" }}
                  />
                  <div>
                    <p
                      className="font-bold leading-tight transition-colors duration-200"
                      style={{
                        fontFamily: "var(--font-display)",
                        fontSize: "1rem",
                        color: active === exp.id ? "#111" : "#999",
                      }}
                    >
                      {exp.company}
                    </p>
                    <p className="text-[11px] text-[#bbb] mt-0.5">{exp.role}</p>
                  </div>
                </button>
              ))}
            </div>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="mt-auto text-[11px] text-[#e8578a] hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
          >
            VIEW FULL CV ↗
          </a>
        </div>

        {/* Right: visual panel */}
        <div className="overflow-hidden pl-12 pr-[5.5vw] py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.35, ease }}
              className="h-full flex flex-col"
            >
              <p
                className="font-bold leading-none select-none mb-4"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(5rem, 9vw, 9rem)", color: "#f0f0f0" }}
              >
                {current.period.replace("Summer ", "")}
              </p>
              <p
                className="font-bold text-[#111] mb-1"
                style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.3rem, 2.2vw, 2rem)" }}
              >
                {current.company}
              </p>
              <p className="text-[11px] text-[#e8578a] mb-5 tracking-wider" style={{ fontFamily: "var(--font-mono)" }}>
                {current.role.toUpperCase()} · {current.location.toUpperCase()}
              </p>
              <p className="text-[14px] text-[#666] font-light leading-relaxed mb-6 max-w-md">
                {current.description}
              </p>
              <div className="mt-auto" style={{ maxWidth: 260 }}>
                <CompanyVisual id={current.id} />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Mobile: vertical list */}
      <div className="md:hidden px-[5.5vw] pb-16">
        {yearEntries.map(([year, exps]) => (
          <div key={year} className="mb-10">
            <p className="mb-5" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.15em" }}>
              {year}
            </p>
            {exps.map(exp => (
              <div key={exp.id} className="mb-8 border-l-2 border-[#e8e8e8] pl-4">
                <p className="font-bold text-[#111] mb-1" style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}>
                  {exp.company}
                </p>
                <p className="text-[11px] text-[#aaa] mb-2">{exp.role}</p>
                <p className="text-[13px] text-[#666] font-light leading-relaxed">{exp.description}</p>
              </div>
            ))}
          </div>
        ))}
        <a href="/resume.pdf" target="_blank" rel="noreferrer"
          className="text-[11px] text-[#e8578a]" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}>
          VIEW FULL CV ↗
        </a>
      </div>
    </section>
  );
}
