"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import LumaDashboard from "./LumaDashboard";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

const PIPELINE = ["RAW TRANSACTIONS", "CLASSIFICATION", "EVENT P&L", "DECISION"];

const SECONDARY = [
  {
    slug: "investment-research",
    num: "02",
    title: "Investment Research",
    tags: "PE · DUE DILIGENCE · VIETNAM",
    line: "Investment memoranda across mid-market businesses.",
  },
  {
    slug: "financial-modeling",
    num: "03",
    title: "Financial Modeling",
    tags: "PE · VALUATION · SCENARIO ANALYSIS",
    line: "Five-year operating models and return analyses for deal evaluation.",
  },
];

export default function WorkIndex() {
  const pipelineRef = useRef<HTMLDivElement>(null);
  const pipelineInView = useInView(pipelineRef, { once: true, margin: "-20% 0px" });

  return (
    <section id="work" className="bg-white">
      {/* Section label */}
      <div className="px-[5.5vw] pt-28 pb-10 border-t border-[#e8e8e8]">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
          SELECTED WORK
        </p>
      </div>

      {/* ── Flagship: LUMA LIVE ── */}
      <div className="px-[5.5vw] pb-6">
        <div className="flex items-baseline gap-4 mb-3">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>01</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.12em" }}>
            FINANCE × DATA × AUTOMATION
          </p>
        </div>
        <h2
          className="font-bold leading-tight mb-3 text-[#111]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.2rem, 5vw, 5.5rem)" }}
        >
          From transactions
          <br />
          to decisions.
        </h2>
        <p className="text-[15px] text-[#666] mb-8 max-w-lg font-light">
          An automated management reporting system for a multi-event entertainment business — turning raw transaction exports into weekly decision-ready P&amp;L.
        </p>
      </div>

      {/* Dashboard — dark section */}
      <div className="bg-[#0f0f0f] px-[5.5vw] py-12">
        <LumaDashboard />

        {/* Pipeline labels */}
        <div ref={pipelineRef} className="mt-8 flex flex-wrap gap-2 items-center">
          {PIPELINE.map((step, i) => (
            <motion.span
              key={step}
              className="flex items-center gap-2"
              initial={{ opacity: 0, x: -8 }}
              animate={pipelineInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.5, ease }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.14em" }}>
                {step}
              </span>
              {i < PIPELINE.length - 1 && (
                <span style={{ color: "#444", fontSize: "10px" }}>→</span>
              )}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Link to case study */}
      <div className="px-[5.5vw] py-6 border-b border-[#e8e8e8]">
        <Link
          href="/work/operating-intelligence"
          className="inline-flex items-center gap-2 text-[13px] text-[#111] group"
        >
          <span className="border-b border-[#111] group-hover:border-[#e8578a] group-hover:text-[#e8578a] transition-colors">
            Read case study
          </span>
          <span className="group-hover:text-[#e8578a] transition-colors">↗</span>
        </Link>
      </div>

      {/* ── Secondary projects ── */}
      <div className="px-[5.5vw] grid md:grid-cols-2 gap-0 border-b border-[#e8e8e8]">
        {SECONDARY.map((p, i) => (
          <Link
            key={p.slug}
            href={`/work/${p.slug}`}
            className={`group block py-10 ${i === 0 ? "md:border-r border-[#e8e8e8]" : "md:pl-10"}`}
          >
            <div className="flex items-baseline gap-3 mb-4">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>{p.num}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.1em" }}>
                {p.tags}
              </p>
            </div>
            <div
              className="w-full mb-5 overflow-hidden border border-dashed border-[#e8e8e8] flex items-center justify-center"
              style={{ height: "clamp(120px,18vh,200px)" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#ccc", letterSpacing: "0.1em" }}>
                [ ADD PROJECT VISUAL ]
              </p>
            </div>
            <h3
              className="font-bold text-[#111] mb-2 group-hover:text-[#e8578a] transition-colors"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)" }}
            >
              {p.title} ↗
            </h3>
            <p className="text-[14px] text-[#888] font-light">{p.line}</p>
          </Link>
        ))}
      </div>

      {/* ── Data Visualization ── */}
      <div className="px-[5.5vw] py-10 border-b border-[#e8e8e8]">
        <div className="flex items-baseline gap-3 mb-4">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>04</p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.1em" }}>
            DATA VIZ · STORYTELLING · MARKETS
          </p>
        </div>
        <h3
          className="font-bold text-[#111] mb-2"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.2rem, 2.2vw, 1.8rem)" }}
        >
          Portfolio Visual Stories
        </h3>
        <p className="text-[14px] text-[#888] font-light mb-6 max-w-lg">
          Interactive data narratives built with Plotly — charting markets, performance, and macro trends.
        </p>
        <div className="w-full overflow-hidden border border-[#e8e8e8]">
          <iframe
            src="/portfolio_visual_stories.html"
            width="100%"
            height="900px"
            style={{ border: "none", display: "block" }}
            title="Portfolio Visual Stories"
          />
        </div>
      </div>
    </section>
  );
}
