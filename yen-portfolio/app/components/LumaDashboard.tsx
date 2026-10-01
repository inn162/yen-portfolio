"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const EVENTS = [
  { name: "AURORA FESTIVAL",    revenue: 1240, capacity: 94, color: "#e8578a" },
  { name: "NEON QUARTERLY",     revenue: 1680, capacity: 97, color: "#c4b5e8" },
  { name: "CIRCUIT SATURDAYS",  revenue: 890,  capacity: 81, color: "#e8578a" },
  { name: "HARBOR NIGHTS",      revenue: 640,  capacity: 73, color: "#c4b5e8" },
  { name: "MIDNIGHT SESSIONS",  revenue: 420,  capacity: 67, color: "#888" },
];

const MAX_REV = 1680;

const SPARKLINE = [22, 25, 23, 28, 26, 31, 29, 34, 32, 38, 36, 41];

function polyline(pts: number[]) {
  const w = 200;
  const h = 40;
  const min = Math.min(...pts);
  const max = Math.max(...pts);
  return pts
    .map((v, i) => {
      const x = (i / (pts.length - 1)) * w;
      const y = h - ((v - min) / (max - min)) * h;
      return `${x},${y}`;
    })
    .join(" ");
}

export default function LumaDashboard() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-15% 0px" });

  return (
    <div
      ref={ref}
      className="w-full rounded-none"
      style={{ background: "#0a0a14", padding: "clamp(24px,4vw,48px)" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-8 border-b border-white/10 pb-5">
        <div>
          <p
            className="text-white font-bold tracking-tight mb-1"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.4rem)" }}
          >
            LUMA LIVE
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#666", letterSpacing: "0.15em" }}>
            EVENT INTELLIGENCE DASHBOARD
          </p>
        </div>
        <div className="text-right hidden sm:block">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#e8578a", letterSpacing: "0.1em" }}>
            Q3 2026
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555" }}>
            LIVE
          </p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        {[
          { label: "TOTAL REVENUE", value: "$4.87M", sub: "+22% vs Q2" },
          { label: "AVG CAPACITY",  value: "82.4%",  sub: "+6.1pp" },
          { label: "EVENTS RUN",    value: "5",       sub: "Q3 2026" },
        ].map(kpi => (
          <div key={kpi.label} className="border border-white/8 p-3">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#555", letterSpacing: "0.1em" }}>
              {kpi.label}
            </p>
            <motion.p
              className="text-white font-bold mt-1"
              style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2.5vw, 1.5rem)" }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              {kpi.value}
            </motion.p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#e8578a", marginTop: 2 }}>
              {kpi.sub}
            </p>
          </div>
        ))}
      </div>

      {/* Revenue bars */}
      <div className="mb-8">
        <p
          className="mb-3"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#555", letterSpacing: "0.12em" }}
        >
          REVENUE BY EVENT
        </p>
        <div className="space-y-3">
          {EVENTS.map((ev, i) => (
            <div key={ev.name} className="flex items-center gap-3">
              <p
                className="text-right shrink-0"
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#555", width: "clamp(100px,18vw,160px)" }}
              >
                {ev.name}
              </p>
              <div className="flex-1 h-[6px] bg-white/5 relative overflow-hidden">
                <motion.div
                  className="absolute left-0 top-0 h-full"
                  style={{ background: ev.color, opacity: 0.85 }}
                  initial={{ width: 0 }}
                  animate={inView ? { width: `${(ev.revenue / MAX_REV) * 100}%` } : {}}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                />
              </div>
              <p
                className="shrink-0"
                style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#888", width: 48, textAlign: "right" }}
              >
                ${(ev.revenue / 1000).toFixed(1)}M
              </p>
              <div className="shrink-0 flex items-center gap-1">
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full"
                  style={{ background: ev.capacity >= 90 ? "#e8578a" : ev.capacity >= 75 ? "#c4b5e8" : "#555" }}
                />
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#555" }}>{ev.capacity}%</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Margin sparkline */}
      <div className="flex items-end gap-6 border-t border-white/8 pt-5">
        <div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#555", letterSpacing: "0.12em", marginBottom: 6 }}>
            GROSS MARGIN TREND
          </p>
          <svg viewBox={`0 0 200 40`} width="200" height="40" overflow="visible">
            <motion.polyline
              points={polyline(SPARKLINE)}
              fill="none"
              stroke="#e8578a"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.2, delay: 0.6, ease: "easeInOut" }}
            />
          </svg>
        </div>
        <div className="flex-1 grid grid-cols-2 gap-x-8 gap-y-1">
          {[
            { label: "PEAK MARGIN",  value: "41%" },
            { label: "FLOOR MARGIN", value: "19%" },
            { label: "BLENDED",      value: "34%" },
            { label: "YOY ΔMARGIN",  value: "+8pp" },
          ].map(s => (
            <div key={s.label}>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "#555" }}>{s.label}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#fff" }}>{s.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
