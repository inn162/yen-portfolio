"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
            x={i * 32 + 8} y={140 - h * 120} width={20} height={h * 120}
            fill={i % 2 === 0 ? "#e8578a" : "#c4b5e8"} fillOpacity={0.65}
            initial={{ scaleY: 0 }} animate={{ scaleY: 1 }}
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
        <motion.circle cx={230} cy={50} r={4} fill="#e8578a"
          initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.5 }} />
      </svg>
    );
  }

  if (id === "asia-business-builder") {
    const widths = [180, 140, 200, 110, 160, 90, 130, 170, 100];
    return (
      <svg viewBox="0 0 240 160" width="100%" height="140">
        {widths.map((w, i) => (
          <motion.rect
            key={i} x={8} y={i * 15 + 8} width={w} height={8} rx={2}
            fill={i === 0 ? "#111" : i === 1 ? "#888" : "#e8e8e8"}
            initial={{ scaleX: 0 }} animate={{ scaleX: 1 }}
            style={{ transformOrigin: "left" }}
            transition={{ delay: i * 0.05, duration: 0.35, ease }}
          />
        ))}
      </svg>
    );
  }

  const nodes = [
    { x: 40, y: 70 }, { x: 100, y: 30 }, { x: 100, y: 110 },
    { x: 160, y: 50 }, { x: 160, y: 90 }, { x: 210, y: 70 },
  ];
  const edges = [[0,1],[0,2],[1,3],[2,4],[3,5],[4,5],[1,4],[2,3]];
  return (
    <svg viewBox="0 0 240 140" width="100%" height="140">
      {edges.map(([a, b], i) => (
        <motion.line key={i}
          x1={nodes[a].x} y1={nodes[a].y} x2={nodes[b].x} y2={nodes[b].y}
          stroke="#c4b5e8" strokeWidth="1.5" strokeOpacity={0.5}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: i * 0.07 }}
        />
      ))}
      {nodes.map((n, i) => (
        <motion.circle key={i} cx={n.x} cy={n.y} r={i === 0 ? 9 : 5}
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

  return (
    <section id="experience" className="bg-white border-t border-[#e8e8e8]">

      {/* Label + horizontal tab selector */}
      <div className="px-[5.5vw] pt-20">
        <p
          className="mb-8"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}
        >
          EXPERIENCE
        </p>

        {/* Tabs — overflow-x-auto for mobile scroll */}
        <div className="flex overflow-x-auto border-b border-[#e8e8e8] no-scrollbar">
          {experiences.map((exp) => (
            <button
              key={exp.id}
              onClick={() => setActive(exp.id)}
              className="shrink-0 flex flex-col items-start px-5 py-3 -mb-px border-b-2 transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-inset focus-visible:ring-[#e8578a]"
              style={{ borderBottomColor: active === exp.id ? "#e8578a" : "transparent" }}
            >
              <span
                style={{
                  fontFamily: "'Amulya', var(--font-display)",
                  fontSize: "0.875rem",
                  fontWeight: 600,
                  color: active === exp.id ? "#111" : "#c0c0c0",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                }}
              >
                {exp.company}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-mono)",
                  fontSize: "9px",
                  letterSpacing: "0.1em",
                  color: active === exp.id ? "#e8578a" : "#ddd",
                  transition: "color 0.2s",
                  whiteSpace: "nowrap",
                  marginTop: "2px",
                }}
              >
                {exp.period.replace("Summer ", "").toUpperCase()}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="px-[5.5vw] pt-12 pb-16">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.28, ease }}
          >
            {/* Two-column grid: text left, visual right */}
            <div className="grid lg:grid-cols-[1fr_380px] gap-10 lg:gap-16 items-start">

              {/* Text */}
              <div>
                <h3
                  className="font-bold text-[#111] leading-tight mb-3"
                  style={{
                    fontFamily: "'Amulya', var(--font-display)",
                    fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  }}
                >
                  {current.company}
                </h3>

                <div className="flex flex-wrap items-center gap-x-2 gap-y-1 mb-7">
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.14em" }}>
                    {current.role.toUpperCase()}
                  </span>
                  <span style={{ color: "#ddd", fontSize: "10px" }}>·</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#bbb", letterSpacing: "0.1em" }}>
                    {current.location.toUpperCase()}
                  </span>
                  <span style={{ color: "#ddd", fontSize: "10px" }}>·</span>
                  <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#bbb", letterSpacing: "0.1em" }}>
                    {current.period.toUpperCase()}
                  </span>
                </div>

                <p
                  className="text-[14px] text-[#555] font-light leading-relaxed mb-7"
                  style={{ maxWidth: "52ch" }}
                >
                  {current.description}
                </p>

                {current.id === "twenty-in-twenty" && (
                  <Link
                    href="/work/luma-live"
                    className="inline-block hover:opacity-70 transition-opacity"
                    style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#e8578a", letterSpacing: "0.14em" }}
                  >
                    CASE STUDY: LUMA LIVE →
                  </Link>
                )}
              </div>

              {/* Visual */}
              <div>
                {current.image && current.imageWidth && current.imageHeight ? (
                  current.extraImages.length > 0 ? (
                    <div className="flex gap-2 items-stretch">
                      <div className="flex-1 relative overflow-hidden rounded-sm" style={{ height: 220 }}>
                        <Image
                          src={current.image}
                          alt={current.company}
                          fill
                          className="object-cover object-center"
                          sizes="(min-width: 1024px) 190px, 50vw"
                        />
                      </div>
                      {current.extraImages.map((img, i) => (
                        <div key={i} className="flex-1 relative overflow-hidden rounded-sm" style={{ height: 220 }}>
                          <Image
                            src={img.src}
                            alt={`${current.company} ${i + 2}`}
                            fill
                            className="object-cover object-center"
                            sizes="(min-width: 1024px) 190px, 50vw"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <Image
                      src={current.image}
                      alt={current.company}
                      width={current.imageWidth}
                      height={current.imageHeight}
                      className="w-full h-auto rounded-sm"
                      sizes="(min-width: 1024px) 380px, 100vw"
                    />
                  )
                ) : (
                  <div className="rounded-sm p-6" style={{ background: "#fafafa", border: "1px solid #f0f0f0" }}>
                    <CompanyVisual id={current.id} />
                  </div>
                )}
              </div>

            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-12 pt-6 border-t border-[#f0f0f0]">
          <a
            href="https://drive.google.com/file/d/1h_6iL8S71ZqmhM1nyv-Sza-TPDiDxpE5/view?usp=sharing"
            target="_blank"
            rel="noreferrer"
            className="text-[11px] text-[#e8578a] hover:opacity-70 transition-opacity"
            style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.12em" }}
          >
            VIEW FULL CV ↗
          </a>
        </div>
      </div>

    </section>
  );
}
