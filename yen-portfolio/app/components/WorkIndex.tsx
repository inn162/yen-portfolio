"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ── Visual Stories chart data ─────────────────────────────────────────────────

const VS_LABELS = ["Glow Serum", "Eye Cream", "SPF 50", "Toner", "Night Oil"];
const VS_VALUES = [89, 62, 44, 38, 71]; // contribution margin %
const VS_HIGHLIGHT = 0; // index of the focal bar (Glow Serum — the "bestseller trap")

function VisualStoriesPreview({ storyOn }: { storyOn: boolean }) {
  const max = Math.max(...VS_VALUES);
  const barW = 36;
  const gap = 18;
  const chartW = VS_LABELS.length * (barW + gap) - gap;
  const chartH = 120;
  const svgW = chartW + 40;
  const svgH = chartH + 48;

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden>
      {VS_VALUES.map((v, i) => {
        const h = (v / max) * chartH;
        const x = 20 + i * (barW + gap);
        const y = chartH - h + 8;
        const isFocal = i === VS_HIGHLIGHT;
        const fill = storyOn
          ? isFocal ? "#e8578a" : "#B8B9C0"
          : "#9B9BA3";
        const opacity = storyOn ? 1 : 0.7;
        return (
          <g key={i}>
            <rect x={x} y={y} width={barW} height={h} fill={fill} opacity={opacity} rx={2} />
            {storyOn && isFocal && (
              <>
                <text x={x + barW / 2} y={y - 6} textAnchor="middle"
                  style={{ fontSize: 7.5, fill: "#e8578a", fontFamily: "monospace", fontWeight: 700 }}>
                  34% of revenue
                </text>
                <text x={x + barW / 2} y={y - 14} textAnchor="middle"
                  style={{ fontSize: 7, fill: "#e8578a", fontFamily: "monospace" }}>
                  3.4% margin ↓
                </text>
              </>
            )}
            <text x={x + barW / 2} y={svgH - 4} textAnchor="middle"
              style={{ fontSize: 7, fill: storyOn && isFocal ? "#e8578a" : "#bbb", fontFamily: "monospace", fontWeight: storyOn && isFocal ? 700 : 400 }}>
              {VS_LABELS[i].split(" ")[0]}
            </text>
          </g>
        );
      })}
    </svg>
  );
}

// ── LUMA Cash UI replica ───────────────────────────────────────────────────────

const MONTHS = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];

// Monthly running cash balance ($M) — Jan through Dec
const BALANCE = [2.1, 2.05, 2.1, 2.2, 2.5, 2.3, 2.1, 2.05, 2.1, 1.85, 0.55, 1.75];

// Monthly net cash flow ($M)
const NET_FLOW = [-0.1, 0.05, -0.05, 0.15, 0.55, -0.35, -0.35, -0.05, 0.05, -0.3, -1.5, 1.3];

const TODAY_IDX = 8; // September = current month

const VW = 760, VH = 198;
const PAD = { top: 24, bottom: 30, left: 48, right: 12 };
const CW = VW - PAD.left - PAD.right;
const CH = VH - PAD.top - PAD.bottom;
const ZERO_Y = PAD.top + CH * (3 / 6); // $0 line

function yPx(v: number) {
  return PAD.top + CH * (3 - v) / 6;
}
function xPx(i: number) {
  return PAD.left + (i + 0.5) * (CW / 12);
}

const GOLD = '#7c6200';
const NAVY = '#1e3a5f';

function LumaSystemPreview() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sp = { damping: 40, stiffness: 280 };
  const panX = useSpring(useTransform(mx, [0, 1], [-10, 10]), sp);
  const panY = useSpring(useTransform(my, [0, 1], [-5, 5]), sp);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); setHovered(false); };

  const troughX = xPx(10);
  const troughY = yPx(BALANCE[10]);

  return (
    <div
      ref={ref}
      className="relative h-full overflow-hidden select-none"
      style={{ cursor: "crosshair" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* Left gradient — blends LUMA preview into editorial side */}
      <div className="absolute inset-y-0 left-0 z-20 pointer-events-none"
        style={{ width: 80, background: "linear-gradient(to right, #fff 0%, transparent 100%)" }} />

      {/* Bottom gradient */}
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: 48, background: "linear-gradient(to top, #fff 0%, transparent 100%)" }} />

      {/* LUMA UI — pans on hover */}
      <motion.div style={{ x: panX, y: panY }} className="h-full">

        {/* ── Nav bar ── */}
        <div style={{
          display: "flex", alignItems: "center", gap: 20,
          padding: "9px 18px", borderBottom: "1px solid #e8e8e8",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 6, flexShrink: 0 }}>
            <div style={{ width: 3, height: 14, background: GOLD, borderRadius: 1 }} />
            <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.06em" }}>LUMA LIVE</span>
          </div>
          {["Overview", "Events", "Ticketing", "Revenue", "Cash"].map(tab => (
            <span key={tab} style={{
              fontSize: 12,
              color: tab === "Cash" ? "#111" : "#bbb",
              borderBottom: tab === "Cash" ? `1.5px solid ${GOLD}` : "none",
              paddingBottom: tab === "Cash" ? 2 : 0,
            }}>{tab}</span>
          ))}
          <div style={{
            marginLeft: "auto", border: `1px solid ${GOLD}`,
            padding: "3px 10px", fontSize: 10, color: GOLD, borderRadius: 2, flexShrink: 0,
          }}>Case Study</div>
        </div>

        {/* ── Content ── */}
        <div style={{
          padding: "14px 18px",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>

          {/* Page heading */}
          <div style={{ marginBottom: 12 }}>
            <h3 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1, marginBottom: 3, color: "#111" }}>
              Cash & Forecast
            </h3>
            <p style={{ fontSize: 10, color: "#aaa" }}>
              As of October 1, 2026 · Forecast through December
            </p>
          </div>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 8, marginBottom: 10 }}>
            {[
              { label: "CASH ON HAND",      value: "$2.1M", sub: "As of Oct 1, 2026",        green: false },
              { label: "YTD COLLECTED",     value: "$8.8M", sub: "Jan–Sep 2026",             green: false },
              { label: "UPCOMING OUTFLOWS", value: "$1.3M", sub: "Next 90 days",             green: false },
              { label: "FORECAST END CASH", value: "$1.7M", sub: "After Nova + Aurora NYE",  green: true  },
            ].map(c => (
              <div key={c.label} style={{
                border: "1px solid #e8e8e8", borderRadius: 5, padding: "9px 11px",
              }}>
                <p style={{ fontSize: 8, color: "#bbb", letterSpacing: "0.1em", marginBottom: 4 }}>
                  {c.label}
                </p>
                <p style={{ fontSize: 19, fontWeight: 700, lineHeight: 1, marginBottom: 4, color: "#111" }}>
                  {c.value}
                </p>
                <p style={{ fontSize: 9, color: c.green ? "#5a7a1e" : "#aaa" }}>{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Monthly Cash Flow Chart */}
          <div style={{ border: "1px solid #e8e8e8", borderRadius: 5, padding: "11px 13px 7px" }}>
            <p style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.1em", marginBottom: 2, color: "#111" }}>
              MONTHLY CASH FLOW
            </p>
            <p style={{ fontSize: 8, color: "#bbb", marginBottom: 6 }}>
              Net flow (bars) and running balance (line) · dashed = forecast
            </p>

            <svg
              viewBox={`0 0 ${VW} ${VH}`}
              style={{ width: "100%", height: "auto", display: "block" }}
            >
              {/* Y-axis gridlines */}
              {([-1.5, 0, 1.5, 3] as number[]).map(v => (
                <g key={v}>
                  <line
                    x1={PAD.left} y1={yPx(v)} x2={VW - PAD.right} y2={yPx(v)}
                    stroke={v === 0 ? "#ddd" : "#efefef"}
                    strokeWidth={v === 0 ? 0.8 : 0.4}
                  />
                  <text
                    x={PAD.left - 5} y={yPx(v) + 3.5}
                    textAnchor="end"
                    style={{ fontSize: 8, fill: "#ccc", fontFamily: "monospace" }}
                  >
                    {v >= 0 ? `$${v}M` : `-$${Math.abs(v)}M`}
                  </text>
                </g>
              ))}

              {/* Today vertical rule */}
              <line
                x1={xPx(TODAY_IDX)} y1={PAD.top}
                x2={xPx(TODAY_IDX)} y2={VH - PAD.bottom}
                stroke="#ddd" strokeWidth={0.7} strokeDasharray="3 3"
              />
              <text
                x={xPx(TODAY_IDX) + 4} y={PAD.top + 9}
                style={{ fontSize: 8, fill: "#bbb", fontFamily: "monospace" }}
              >Today →</text>

              {/* Net cash flow bars */}
              {NET_FLOW.map((v, i) => {
                const forecast = i > TODAY_IDX;
                const pos = v >= 0;
                const barH = Math.max(Math.abs(v) * CH / 6, 1.5);
                const bw = CW / 12 * 0.36;
                return (
                  <rect
                    key={i}
                    x={xPx(i) - bw / 2}
                    y={pos ? ZERO_Y - barH : ZERO_Y}
                    width={bw}
                    height={barH}
                    fill={pos ? "#22c55e" : "#ef4444"}
                    opacity={forecast ? 0.38 : 0.82}
                  />
                );
              })}

              {/* Running balance — actuals */}
              <polyline
                points={BALANCE.slice(0, TODAY_IDX + 1).map((v, i) => `${xPx(i)},${yPx(v)}`).join(" ")}
                fill="none" stroke={NAVY} strokeWidth={1.8}
                strokeLinecap="round" strokeLinejoin="round"
              />

              {/* Running balance — forecast (dashed) */}
              <polyline
                points={BALANCE.slice(TODAY_IDX).map((v, i) => `${xPx(TODAY_IDX + i)},${yPx(v)}`).join(" ")}
                fill="none" stroke={NAVY} strokeWidth={1.8}
                strokeLinecap="round" strokeLinejoin="round"
                strokeDasharray="5 4"
              />

              {/* Month labels */}
              {MONTHS.map((m, i) => (
                <text
                  key={m} x={xPx(i)} y={VH - 4}
                  textAnchor="middle"
                  style={{ fontSize: 8, fill: "#ccc", fontFamily: "monospace" }}
                >{m}</text>
              ))}

              {/* Trough dot */}
              <circle cx={troughX} cy={troughY} r={3}
                fill="white" stroke="#ef4444" strokeWidth={1.4} />

              {/* CASH TROUGH annotation — appears on hover */}
              <motion.g
                animate={{ opacity: hovered ? 1 : 0 }}
                transition={{ duration: 0.18 }}
              >
                <line
                  x1={troughX} y1={troughY - 6}
                  x2={troughX} y2={troughY - 20}
                  stroke="#ef4444" strokeWidth={0.8}
                />
                <text
                  x={troughX} y={troughY - 24}
                  textAnchor="middle"
                  style={{ fontSize: 8, fill: "#ef4444", fontFamily: "monospace", letterSpacing: "0.08em" }}
                >CASH TROUGH</text>
                <text
                  x={troughX} y={troughY - 14}
                  textAnchor="middle"
                  style={{ fontSize: 7, fill: "#aaa", fontFamily: "monospace" }}
                >Nov — $0.55M</text>
              </motion.g>
            </svg>

            {/* Legend */}
            <div style={{ display: "flex", gap: 16, marginTop: 4 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, color: "#bbb", fontFamily: "monospace" }}>
                <span style={{ display: "inline-block", width: 10, height: 10, background: "#111", borderRadius: 1 }} />
                Net Cash Flow
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 8, color: "#bbb", fontFamily: "monospace" }}>
                <svg width="16" height="8"><line x1="0" y1="4" x2="16" y2="4" stroke={NAVY} strokeWidth="1.5" strokeDasharray="3 2" /></svg>
                Running Balance
              </span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// ── WorkIndex ─────────────────────────────────────────────────────────────────

export default function WorkIndex() {
  const [storyOn, setStoryOn] = useState(false);

  return (
    <section id="work" className="bg-white overflow-hidden">

      {/* Section label */}
      <div className="px-[5.5vw] pt-28 pb-0 border-t border-[#e8e8e8]">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
          SELECTED WORK
        </p>
      </div>

      {/* ── 01 / LUMA LIVE — asymmetric layout ── */}
      <div className="relative flex items-start" style={{ paddingTop: 40, paddingBottom: 64, minHeight: 460 }}>

        {/* Left: editorial */}
        <div className="pl-[5.5vw] flex-none" style={{ width: "min(500px, 46vw)", paddingRight: "clamp(16px, 2vw, 32px)" }}>

          <div className="flex items-baseline gap-4 mb-5">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>01</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.12em" }}>
              FINANCE × ANALYTICS × AUTOMATION
            </span>
          </div>

          <h2
            className="font-bold leading-none text-[#111] mb-2"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.6rem, 5.5vw, 6rem)" }}
          >
            LUMA LIVE
          </h2>

          <p className="mb-8" style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.18em" }}>
            MANAGEMENT INFORMATION SYSTEM
          </p>

          <div className="mb-6" style={{ borderLeft: "2px solid #e8578a", paddingLeft: "1.25rem" }}>
            <p
              className="font-bold text-[#111] leading-tight"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.5rem, 3vw, 2.8rem)" }}
            >
              WILL WE NEED
              <br />MORE CASH?
            </p>
          </div>

          <p className="text-[15px] text-[#666] font-light leading-relaxed mb-8" style={{ maxWidth: "44ch" }}>
            A management system connecting accounting actuals, event economics and forward cash commitments into one source of truth.
          </p>

          <Link
            href="/work/luma-live"
            className="inline-flex items-center gap-2 text-[13px] text-[#111] group"
          >
            <span className="border-b border-[#111] group-hover:border-[#e8578a] group-hover:text-[#e8578a] transition-colors">
              Explore case study
            </span>
            <span className="group-hover:text-[#e8578a] transition-colors">↗</span>
          </Link>
        </div>

        {/* Right: LUMA system preview — fills to viewport edge */}
        <div className="flex-1 self-stretch relative" style={{ minHeight: 400 }}>
          <LumaSystemPreview />
        </div>

      </div>

      <div className="mx-[5.5vw] border-t border-[#e8e8e8]" />

      {/* ── 02 / VISUAL STORIES ── */}
      <div className="px-[5.5vw] py-16 border-b border-[#e8e8e8]">
        <div className="flex flex-col md:flex-row md:items-start gap-12">

          {/* Left: editorial */}
          <div className="flex-none md:w-[min(420px,40vw)]">
            <div className="flex items-baseline gap-4 mb-5">
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>02</span>
              <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#c4b5e8", letterSpacing: "0.12em" }}>
                ANALYTICAL COMMUNICATION
              </span>
            </div>

            <h2
              className="font-bold leading-none text-[#111] mb-5"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)" }}
            >
              VISUAL
              <br />STORIES
            </h2>

            <p
              className="mb-8 leading-snug text-[#111]"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", fontWeight: 500 }}
            >
              THE DATA DIDN'T CHANGE.
              <br />THE COMMUNICATION DID.
            </p>

            <p className="text-[14px] text-[#666] font-light leading-relaxed mb-8" style={{ maxWidth: "40ch" }}>
              Nine analytical exhibits. Same data in two states — technically correct versus intentionally communicative.
            </p>

            <Link
              href="/work/visual-stories"
              className="inline-flex items-center gap-2 text-[13px] text-[#111] group"
            >
              <span className="border-b border-[#111] group-hover:border-[#c4b5e8] group-hover:text-[#c4b5e8] transition-colors">
                View exhibits
              </span>
              <span className="group-hover:text-[#c4b5e8] transition-colors">→</span>
            </Link>
          </div>

          {/* Right: Story Off / Story On toggle preview */}
          <div className="flex-1">
            {/* Toggle */}
            <div className="flex items-center gap-1 mb-5">
              <button
                onClick={() => setStoryOn(false)}
                className="px-3 py-1 text-[10px] transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  background: !storyOn ? "#111" : "transparent",
                  color: !storyOn ? "#fff" : "#aaa",
                  border: "1px solid " + (!storyOn ? "#111" : "#e8e8e8"),
                }}
              >
                STORY OFF
              </button>
              <button
                onClick={() => setStoryOn(true)}
                className="px-3 py-1 text-[10px] transition-colors"
                style={{
                  fontFamily: "var(--font-mono)",
                  letterSpacing: "0.12em",
                  background: storyOn ? "#e8578a" : "transparent",
                  color: storyOn ? "#fff" : "#aaa",
                  border: "1px solid " + (storyOn ? "#e8578a" : "#e8e8e8"),
                }}
              >
                STORY ON
              </button>
            </div>

            {/* Chart */}
            <div className="border border-[#e8e8e8] p-6" style={{ maxWidth: 480 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: storyOn ? "#e8578a" : "#bbb", letterSpacing: "0.15em", marginBottom: 12, transition: "color 0.2s" }}>
                {storyOn ? "EXHIBIT 01 · LUMÉ SKINCARE — THE BESTSELLER TRAP" : "EXHIBIT 01 · PRODUCT CONTRIBUTION MARGIN"}
              </p>
              <VisualStoriesPreview storyOn={storyOn} />
              {storyOn && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#666", letterSpacing: "0.08em", marginTop: 12 }}>
                  The product driving 34% of revenue has a 3.4% standalone contribution margin.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
