"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

// ── Visual Stories — Exhibit 09: Meal Kit Star Ratings ───────────────────────
// Setup: 4 brands all average 4.2★ overall — but have completely different profiles.

const EX09_BRANDS = ["Brand A", "Brand B", "Brand C", "Brand D"];
// [Taste, Delivery, Value] — each row averages ~4.2
const EX09_PROFILES = [
  [4.8, 3.9, 3.8], // great taste, weak elsewhere
  [3.5, 4.9, 4.2], // weak taste, exceptional delivery
  [4.0, 3.6, 5.0], // weak delivery, top value
  [4.5, 4.3, 3.8], // taste & delivery-led, low value
];
const EX09_METRICS = ["Taste", "Delivery", "Value"];
const EX09_COLORS = ["#e8578a", "#c4b5e8", "#7c9cbf"];

function VisualStoriesPreview({ storyOn }: { storyOn: boolean }) {
  const svgW   = 300;
  const svgH   = 155;
  const LEFT   = 54;
  const RIGHT  = 16;
  const chartW = svgW - LEFT - RIGHT;
  const TOP    = 22;   // room for x-axis labels
  const BOTTOM = 22;   // room for legend
  const plotH  = svgH - TOP - BOTTOM;
  const rowH   = plotH / 4;
  const xFor   = (v: number) => LEFT + ((v - 1) / 4) * chartW;
  // All dots for a brand share this Y — the row center
  const yFor   = (i: number) => TOP + (i + 0.5) * rowH;
  const avgX   = xFor(4.2);

  return (
    <svg viewBox={`0 0 ${svgW} ${svgH}`} style={{ width: "100%", height: "auto", display: "block" }} aria-hidden>

      {/* Vertical scale lines */}
      {[1, 2, 3, 4, 5].map(v => (
        <g key={v}>
          <line x1={xFor(v)} y1={TOP - 5} x2={xFor(v)} y2={svgH - BOTTOM}
            stroke="#f0f0f0" strokeWidth={0.6} />
          <text x={xFor(v)} y={TOP - 8} textAnchor="middle"
            style={{ fontSize: 6.5, fill: "#ccc", fontFamily: "monospace" }}>{v}★</text>
        </g>
      ))}

      {/* Brand rows — all dots share the same cy = yFor(i) */}
      {EX09_BRANDS.map((brand, i) => {
        const y = yFor(i);
        return (
          <g key={brand}>
            <text x={LEFT - 5} y={y + 3.5} textAnchor="end"
              style={{ fontSize: 7.5, fill: storyOn ? "#555" : "#aaa", fontFamily: "monospace" }}>
              {brand}
            </text>
            {storyOn ? (
              EX09_PROFILES[i].map((v, mi) => (
                <circle key={mi}
                  cx={xFor(v)}
                  cy={y}
                  r={3.5}
                  fill={EX09_COLORS[mi]}
                  opacity={0.9}
                />
              ))
            ) : (
              <circle cx={avgX} cy={y} r={4.5} fill="#B8B9C0" opacity={0.65} />
            )}
          </g>
        );
      })}

      {/* Story Off: "all the same" guide line */}
      {!storyOn && (
        <>
          <line x1={avgX} y1={TOP - 3} x2={avgX} y2={svgH - BOTTOM}
            stroke="#e8e8e8" strokeWidth={1} strokeDasharray="3 3" />
          <text x={avgX} y={svgH - 5} textAnchor="middle"
            style={{ fontSize: 6.5, fill: "#ccc", fontFamily: "monospace" }}>
            Avg 4.2★
          </text>
        </>
      )}

      {/* Story On: attribute legend */}
      {storyOn && (
        <g>
          {EX09_METRICS.map((m, i) => (
            <g key={m}>
              <circle cx={LEFT + i * 76} cy={svgH - 7} r={3} fill={EX09_COLORS[i]} />
              <text x={LEFT + i * 76 + 7} y={svgH - 4}
                style={{ fontSize: 7, fill: "#888", fontFamily: "monospace" }}>{m}</text>
            </g>
          ))}
        </g>
      )}

    </svg>
  );
}

// ── Luma Live UI replica ───────────────────────────────────────────────────────
// Unified combo chart: balance line + inflow/outflow bars in same plotting area.
// Dual Y-axes: left = closing cash balance, right = period inflows/outflows.

const LL_LABELS = ['Jul','Aug','Sep','Oct','Nov','Dec'];
const LL_IS_ACT = [true, true, true, false, false, false];

// Month-end closing balance ($K)
const LL_BAL = [2240, 2020, 2180, 1000, -560, -540];

// Total inflows / outflows per month ($K)
const LL_TOT_IN  = [640, 420, 760, 320, 220, 500];
const LL_TOT_OUT = [360, 640, 600, 1160, 1780, 480];

// SVG dimensions — single unified panel
const LVW  = 760;
const LP   = { top: 12, left: 54, right: 54, bottom: 28 };
const PLOT_H = 210;
const LVH    = LP.top + PLOT_H + LP.bottom + 14;
const plotX0 = LP.left;
const plotX1 = LVW - LP.right;
const plotY0 = LP.top;
const plotY1 = LP.top + PLOT_H;
const L_PLW  = plotX1 - plotX0;
const L_N    = 6;
const L_PW   = L_PLW / L_N;
const L_BW   = L_PW * 0.68;

function lxOf(i: number) { return LP.left + (i + 0.5) * L_PW; }

// Balance scale (left axis, $K, padded)
const LL_RAW_MAX = 2240, LL_RAW_MIN = -560, LL_SPREAD = 2800;
const LL_BAL_MAX = LL_RAW_MAX + LL_SPREAD * 0.14;
const LL_BAL_MIN = LL_RAW_MIN - LL_SPREAD * 0.14;
const LL_BAL_RNG = LL_BAL_MAX - LL_BAL_MIN;
function lyBal(vK: number) { return plotY0 + PLOT_H * (1 - (vK - LL_BAL_MIN) / LL_BAL_RNG); }

// Flow scale (right axis, symmetric, $K)
const LL_FLOW_MAG = Math.max(...LL_TOT_IN, ...LL_TOT_OUT) * 1.18;
const LL_HALF_H   = PLOT_H / 2;
const LL_FLOW_PX  = LL_HALF_H / LL_FLOW_MAG;
const ly0Flow     = plotY0 + LL_HALF_H;
function lyFlow(vK: number) { return ly0Flow - vK * LL_FLOW_PX; }

// Actual/forecast separator X
const L_SEP = (lxOf(2) + lxOf(3)) / 2;

// Colors
const LLC = {
  inflow:      '#236B58',
  outflow:     '#244C7B',
  actualBal:   '#283044',
  forecastBal: '#7861D8',
  gap:         '#F52D94',
  zero:        '#CBD5E1',
};

const LL_MUTE = '#6B7280';

function LumaSystemPreview() {
  const [hovered, setHovered] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const mx = useMotionValue(0.5);
  const my = useMotionValue(0.5);
  const sp = { damping: 40, stiffness: 280 };
  const panX = useSpring(useTransform(mx, [0, 1], [-8, 8]), sp);
  const panY = useSpring(useTransform(my, [0, 1], [-4, 4]), sp);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set((e.clientX - r.left) / r.width);
    my.set((e.clientY - r.top) / r.height);
  };
  const onLeave = () => { mx.set(0.5); my.set(0.5); setHovered(false); };

  const kpis = [
    { label: "SPENDABLE CASH",   value: "$1.8M", sub: "Oct 1 — excl. $340K restricted",  red: false, crit: false },
    { label: "FUNDING GAP",      value: "$900K", sub: "Trough: Dec 15 · −$900K",          red: true,  crit: false },
    { label: "DEFERRABLE",       value: "$280K", sub: "Negotiable outflows that can shift", red: false, crit: false },
    { label: "TRUE REQUIREMENT", value: "$620K", sub: "External capital if no mitigation",  red: false, crit: true  },
  ];

  return (
    <div
      ref={ref}
      className="relative h-full overflow-hidden select-none"
      style={{ cursor: "pointer" }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onLeave}
      onMouseMove={onMove}
    >
      {/* Edge fades */}
      <div className="absolute inset-y-0 left-0 z-20 pointer-events-none"
        style={{ width: 72, background: "linear-gradient(to right, #fff 0%, transparent 100%)" }} />
      <div className="absolute bottom-0 left-0 right-0 z-20 pointer-events-none"
        style={{ height: 44, background: "linear-gradient(to top, #fff 0%, transparent 100%)" }} />

      {/* Hover overlay — desktop */}
      <motion.div
        className="absolute inset-0 z-30 hidden md:flex items-center justify-center pointer-events-none"
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.18 }}
        aria-hidden
      >
        <div style={{
          background: "rgba(10,10,18,0.42)",
          position: "absolute", inset: 0,
        }} />
        <div style={{
          position: "relative",
          display: "flex", alignItems: "center", gap: 8,
          background: "rgba(255,255,255,0.10)",
          border: "1px solid rgba(255,255,255,0.22)",
          padding: "10px 22px", borderRadius: 6,
        }}>
          <span style={{
            color: "#fff", fontFamily: "var(--font-mono)", fontSize: 13,
            fontWeight: 600, letterSpacing: "0.08em",
          }}>
            Explore interactive dashboard ↗
          </span>
        </div>
      </motion.div>

      {/* Mobile tap hint — always visible on touch devices */}
      <div className="md:hidden absolute bottom-12 left-0 right-0 z-30 flex justify-center pointer-events-none">
        <span style={{
          background: "rgba(40,48,68,0.80)",
          color: "#fff", fontSize: 11, fontWeight: 600,
          fontFamily: "var(--font-mono)", letterSpacing: "0.1em",
          padding: "6px 16px", borderRadius: 20,
        }}>
          Tap to explore ↗
        </span>
      </div>

      <motion.div style={{ x: panX, y: panY }} className="h-full">

        {/* ── Nav ── */}
        <div style={{
          display: "flex", alignItems: "stretch",
          padding: "0 20px", height: 40, borderBottom: "1px solid #E8E8ED",
          background: "#fff",
          fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
        }}>
          <span style={{ fontSize: 12, fontWeight: 800, color: "#111", marginRight: 20, display: "flex", alignItems: "center", letterSpacing: "0.04em" }}>
            LUMA LIVE
          </span>
          {["Cash Overview","Funding Analysis","Cash Drivers","Event Economics","How It Works"].map(tab => (
            <span key={tab} style={{
              fontSize: 11, fontWeight: 600, padding: "0 12px", display: "flex", alignItems: "center",
              color: tab === "Cash Overview" ? "#FF3EA5" : LL_MUTE,
              borderBottom: tab === "Cash Overview" ? "2px solid #FF3EA5" : "2px solid transparent",
            }}>{tab}</span>
          ))}
          <span style={{ marginLeft: "auto", display: "flex", alignItems: "center", fontSize: 10, color: LL_MUTE }}>
            As of Oct 1, 2026
          </span>
        </div>

        {/* ── Content ── */}
        <div style={{ padding: "12px 20px", fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif" }}>

          {/* KPI Cards */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 7, marginBottom: 10 }}>
            {kpis.map(c => (
              <div key={c.label} style={{
                border: `1px solid ${c.crit ? LLC.gap : "#E8E8ED"}`,
                borderRadius: 8, padding: "9px 11px",
                background: c.crit ? LLC.gap : "#fff",
              }}>
                <p style={{ fontSize: 7.5, letterSpacing: "0.09em", marginBottom: 3, fontWeight: 700, fontFamily: "monospace",
                  color: c.crit ? "rgba(255,255,255,0.75)" : LL_MUTE }}>{c.label}</p>
                <p style={{ fontSize: 19, fontWeight: 800, lineHeight: 1, marginBottom: 3,
                  color: c.crit ? "#fff" : c.red ? "#DC2626" : "#111" }}>{c.value}</p>
                <p style={{ fontSize: 8, lineHeight: 1.3,
                  color: c.crit ? "rgba(255,255,255,0.7)" : c.red ? "#DC2626" : LL_MUTE }}>{c.sub}</p>
              </div>
            ))}
          </div>

          {/* Two-panel chart card */}
          <div style={{ border: "1px solid #E8E8ED", borderRadius: 8, padding: "8px 10px 4px", background: "#fff" }}>

            {/* Controls + legend row */}
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 7, flexWrap: "wrap" }}>
              {/* Granularity toggle (visual only) */}
              <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", border: "1px solid #E8E8ED", flexShrink: 0 }}>
                {["Monthly","Weekly"].map((opt, i) => (
                  <span key={opt} style={{
                    fontSize: 8, fontFamily: "monospace", padding: "3px 7px", fontWeight: 600,
                    background: i === 0 ? LLC.actualBal : "#fff",
                    color: i === 0 ? "#fff" : LL_MUTE,
                  }}>{opt}</span>
                ))}
              </div>
              {/* Period toggle (visual only) */}
              <div style={{ display: "flex", borderRadius: 4, overflow: "hidden", border: "1px solid #E8E8ED", flexShrink: 0 }}>
                {["3M","6M","12M"].map((opt, i) => (
                  <span key={opt} style={{
                    fontSize: 8, fontFamily: "monospace", padding: "3px 7px", fontWeight: 600,
                    background: i === 1 ? LLC.actualBal : "#fff",
                    color: i === 1 ? "#fff" : LL_MUTE,
                  }}>{opt}</span>
                ))}
              </div>
              {/* Legend */}
              <div style={{ display: "flex", gap: 10, alignItems: "center", flexWrap: "wrap" }}>
                {[
                  { color: LLC.inflow,  label: "Total inflows" },
                  { color: LLC.outflow, label: "Total outflows" },
                ].map(({ color, label }) => (
                  <span key={label} style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 7.5, color: LL_MUTE, fontFamily: "monospace" }}>
                    <span style={{ width: 6, height: 6, background: color, display: "inline-block", borderRadius: 1, flexShrink: 0 }} />
                    {label}
                  </span>
                ))}
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 7.5, color: LL_MUTE, fontFamily: "monospace" }}>
                  <svg width="12" height="6"><line x1="0" y1="3" x2="12" y2="3" stroke={LLC.actualBal} strokeWidth="1.5"/></svg>
                  Actual
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 7.5, color: LL_MUTE, fontFamily: "monospace" }}>
                  <svg width="12" height="6"><line x1="0" y1="3" x2="12" y2="3" stroke={LLC.forecastBal} strokeWidth="1.5" strokeDasharray="3 2"/></svg>
                  Forecast
                </span>
              </div>
            </div>

            {/* SVG unified combo chart */}
            <svg viewBox={`0 0 ${LVW} ${LVH}`} style={{ width: "100%", height: "auto", display: "block" }}>

              {/* Plot background */}
              <rect x={plotX0} y={plotY0} width={L_PLW} height={PLOT_H} fill="#FAFBFC" />

              {/* ── Left axis: balance gridlines + labels ── */}
              {[-500, 0, 500, 1000, 1500, 2000].map(vK => {
                const y = lyBal(vK);
                if (y < plotY0 - 2 || y > plotY1 + 2) return null;
                const isZero = vK === 0;
                return (
                  <g key={vK}>
                    <line x1={plotX0} y1={y} x2={plotX1} y2={y}
                      stroke={isZero ? LLC.zero : "#ECEEF2"}
                      strokeWidth={isZero ? 0.9 : 0.4} />
                    <text x={plotX0 - 4} y={y + 3} textAnchor="end"
                      style={{ fontSize: 7.5, fill: isZero ? "#64748B" : "#CBD5E1", fontFamily: "monospace" }}>
                      {vK === 0 ? "$0" : vK >= 1000 ? `$${vK / 1000}M` : `$${vK}K`}
                    </text>
                  </g>
                );
              })}

              {/* Left axis title */}
              <text x={10} y={plotY0 + PLOT_H / 2} textAnchor="middle"
                transform={`rotate(-90, 10, ${plotY0 + PLOT_H / 2})`}
                style={{ fontSize: 6.5, fill: "#CBD5E1", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                CASH BALANCE
              </text>

              {/* ── Right axis: flow labels ── */}
              {[750, 0, -750, -1500].map(vK => {
                const y = lyFlow(vK);
                if (y < plotY0 - 2 || y > plotY1 + 2) return null;
                return (
                  <text key={vK} x={plotX1 + 4} y={y + 3} textAnchor="start"
                    style={{ fontSize: 7.5, fill: vK === 0 ? "#64748B" : "#CBD5E1", fontFamily: "monospace" }}>
                    {vK === 0 ? "$0" : vK > 0 ? `$${vK}K` : `−$${Math.abs(vK)}K`}
                  </text>
                );
              })}

              {/* Right axis title */}
              <text x={LVW - 10} y={plotY0 + PLOT_H / 2} textAnchor="middle"
                transform={`rotate(90, ${LVW - 10}, ${plotY0 + PLOT_H / 2})`}
                style={{ fontSize: 6.5, fill: "#CBD5E1", fontFamily: "monospace", letterSpacing: "0.08em" }}>
                INFLOWS / OUTFLOWS
              </text>

              {/* Flow zero reference line */}
              <line x1={plotX0} y1={ly0Flow} x2={plotX1} y2={ly0Flow}
                stroke="#E2E8F0" strokeWidth={0.6} strokeDasharray="3 3" />

              {/* Actual/forecast separator */}
              <line x1={L_SEP} y1={plotY0} x2={L_SEP} y2={plotY1}
                stroke="#E8E8ED" strokeWidth={0.8} strokeDasharray="3 3" />
              <text x={L_SEP - 5} y={plotY0 + 9} textAnchor="end"
                style={{ fontSize: 6.5, fill: "#CBD5E1", fontFamily: "monospace" }}>ACTUAL</text>
              <text x={L_SEP + 5} y={plotY0 + 9}
                style={{ fontSize: 6.5, fill: "#CBD5E1", fontFamily: "monospace" }}>FORECAST</text>

              {/* ── Bars ── */}
              {LL_LABELS.map((_, i) => {
                const alpha = LL_IS_ACT[i] ? 1 : 0.72;
                const x = lxOf(i) - L_BW / 2;
                const inH  = Math.min(LL_TOT_IN[i]  * LL_FLOW_PX, ly0Flow - plotY0);
                const outH = Math.min(LL_TOT_OUT[i] * LL_FLOW_PX, plotY1 - ly0Flow);
                return (
                  <g key={i} opacity={alpha}>
                    {inH  > 0 && <rect x={x} y={ly0Flow - inH}  width={L_BW} height={inH}  fill={LLC.inflow} />}
                    {outH > 0 && <rect x={x} y={ly0Flow}         width={L_BW} height={outH} fill={LLC.outflow} />}
                  </g>
                );
              })}

              {/* ── Balance lines (on top of bars) ── */}

              {/* Actual line (Jul–Sep) */}
              <polyline
                points={LL_BAL.slice(0, 3).map((v, i) => `${lxOf(i)},${lyBal(v)}`).join(" ")}
                fill="none" stroke={LLC.actualBal} strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" />
              {LL_BAL.slice(0, 3).map((v, i) => (
                <circle key={i} cx={lxOf(i)} cy={lyBal(v)} r={3}
                  fill={LLC.actualBal} stroke="white" strokeWidth={1} />
              ))}

              {/* Forecast line (Sep→Dec) */}
              <polyline
                points={LL_BAL.slice(2).map((v, i) => `${lxOf(2 + i)},${lyBal(v)}`).join(" ")}
                fill="none" stroke={LLC.forecastBal} strokeWidth={2}
                strokeLinecap="round" strokeLinejoin="round" strokeDasharray="5 4" />
              {LL_BAL.slice(3).map((v, i) => (
                <circle key={i} cx={lxOf(3 + i)} cy={lyBal(v)} r={2.5}
                  fill={LLC.forecastBal} stroke="white" strokeWidth={1} />
              ))}

              {/* Trough annotation — Nov month-end lowest at −$560K */}
              <motion.g animate={{ opacity: hovered ? 1 : 0 }} transition={{ duration: 0.18 }}>
                {(() => {
                  const tx = lxOf(4);
                  const ty = lyBal(-560);
                  const label = "−$560K";
                  const lblW = label.length * 5.6 + 10;
                  return (
                    <g>
                      <line x1={tx} y1={ty - 5} x2={tx} y2={ty - 18}
                        stroke={LLC.gap} strokeWidth={0.8} />
                      <rect x={tx - lblW / 2} y={ty - 30} width={lblW} height={14} rx={3}
                        fill={LLC.gap} />
                      <text x={tx} y={ty - 20} textAnchor="middle"
                        style={{ fontSize: 8, fill: "#fff", fontFamily: "monospace", fontWeight: 700 }}>
                        {label}
                      </text>
                    </g>
                  );
                })()}
              </motion.g>

              {/* X-axis labels */}
              {LL_LABELS.map((m, i) => (
                <text key={m} x={lxOf(i)} y={plotY1 + 12} textAnchor="middle"
                  style={{ fontSize: 9, fill: "#aaa", fontFamily: "monospace" }}>{m}</text>
              ))}

              {/* Plot border */}
              <rect x={plotX0} y={plotY0} width={L_PLW} height={PLOT_H}
                fill="none" stroke="#E8E8ED" strokeWidth={0.4} />

            </svg>
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

          {/* Eyebrow */}
          <div className="flex items-baseline gap-3 mb-6">
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa" }}>01</span>
            <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.14em" }}>
              LUMA LIVE · MANAGEMENT INFORMATION SYSTEM
            </span>
          </div>

          {/* Headline — full-width row */}
          <h2
            className="font-bold leading-tight text-[#111] mb-8"
            style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.9rem, 3.2vw, 3rem)" }}
          >
            Will we need more cash?
          </h2>

          {/* Two-column grid: description left, disclaimer right */}
          <div
            className="grid grid-cols-1 md:grid-cols-[62fr_35fr] items-start gap-5 mb-8"
          >
            <p className="text-[15px] text-[#666] font-light leading-relaxed">
              A multi-event business can be profitable on paper and still run short of cash between events. Luma connects accounting actuals, event economics, and forward commitments to show when liquidity tightens — and what can be done about it.
            </p>
            <div style={{ borderLeft: "1px solid #e8e8e8", paddingLeft: 14 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", fontWeight: 700, color: "#bbb", letterSpacing: "0.14em", marginBottom: 5 }}>
                FICTIONALIZED CASE STUDY
              </p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "#bbb", lineHeight: 1.65 }}>
                This case study recreates the analytical architecture of a management reporting system developed during an internship. Company names, events, transactions, financial figures and business data have been fictionalized to protect confidential information.
              </p>
            </div>
          </div>

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

        {/* Right: LUMA system preview — static snapshot, click navigates to case study */}
        <Link href="/work/luma-live" className="flex-1 self-stretch relative block" style={{ minHeight: 400 }}>
          <LumaSystemPreview />
        </Link>

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
              style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(2rem, 4vw, 4.5rem)" }}
            >
              Visual
              <br />Stories
            </h2>

            <p
              className="mb-8 leading-snug text-[#111]"
              style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(0.95rem, 1.6vw, 1.3rem)", fontWeight: 500 }}
            >
              The data didn&apos;t change.
              <br />The communication did.
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
                Story off
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
                Story on
              </button>
            </div>

            {/* Chart */}
            <div className="border border-[#e8e8e8] p-6" style={{ maxWidth: 480 }}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: storyOn ? "#e8578a" : "#bbb", letterSpacing: "0.15em", marginBottom: 12, transition: "color 0.2s" }}>
                {storyOn ? "EXHIBIT 09 · MEAL KIT CATEGORY — INVESTOR DILIGENCE" : "EXHIBIT 09 · OVERALL RATING · 4 BRANDS · 8,000 REVIEWS"}

              </p>
              <VisualStoriesPreview storyOn={storyOn} />
              {storyOn && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#666", letterSpacing: "0.08em", marginTop: 12 }}>
                  Similar overall ratings mask very different competitive strengths.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
