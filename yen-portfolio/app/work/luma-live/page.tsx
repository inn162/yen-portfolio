"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import { motion, useInView, AnimatePresence } from "framer-motion";
import LumaEmbed from "../../components/LumaEmbed";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

// ── Laptop device frame ────────────────────────────────────────────────────────

function LaptopFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full select-none" style={{ maxWidth: 860, margin: "0 auto" }}>
      {/* Lid */}
      <div style={{
        background: "#1c1c1e",
        borderRadius: "10px 10px 0 0",
        padding: "10px 10px 0 10px",
        boxShadow: "0 -1px 0 #111 inset, 0 1px 0 #333",
      }}>
        {/* Camera */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 6 }}>
          <div style={{ width: 5, height: 5, borderRadius: "50%", background: "#2a2a2e", border: "1px solid #333" }} />
        </div>
        {/* Screen */}
        <div style={{
          background: "#000",
          borderRadius: "3px 3px 0 0",
          overflow: "hidden",
          aspectRatio: "16/10",
          position: "relative",
        }}>
          {children}
        </div>
      </div>

      {/* Hinge */}
      <div style={{
        height: 5,
        background: "linear-gradient(to bottom, #111, #1e1e20)",
        borderLeft: "1px solid #2a2a2e",
        borderRight: "1px solid #2a2a2e",
      }} />

      {/* Base */}
      <div style={{
        background: "linear-gradient(to bottom, #232326, #1e1e21)",
        borderRadius: "0 0 10px 10px",
        height: 28,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        boxShadow: "0 4px 24px rgba(0,0,0,0.18), 0 1px 0 #333 inset",
        borderLeft: "1px solid #2a2a2e",
        borderRight: "1px solid #2a2a2e",
        borderBottom: "1px solid #2a2a2e",
      }}>
        <div style={{
          width: 72, height: 12, borderRadius: 4,
          background: "#1a1a1c", border: "1px solid #2e2e32",
        }} />
      </div>
    </div>
  );
}

function LaptopShowcase() {
  return (
    <div className="px-[5.5vw]" style={{ paddingTop: 48, paddingBottom: 56 }}>
      {/* Heading */}
      <div className="mb-10" style={{ maxWidth: 560 }}>
        <h3
          className="font-bold text-[#111] mb-3"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.3rem, 2.5vw, 2rem)" }}
        >
          Explore the Financial Model
        </h3>
        <p className="text-[14px] text-[#888] font-light leading-relaxed">
          Switch between monthly and weekly views, adjust the time period, hover over bars and
          data points to see transaction-level breakdowns, and explore how inflows, outflows,
          and cash balance connect.
        </p>
      </div>

      {/* Desktop — laptop frame */}
      <motion.div
        className="hidden md:block"
        style={{ maxWidth: "90%", margin: "0 auto" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease }}
      >
        <LaptopFrame>
          <LumaEmbed height="100%" className="absolute inset-0" />
        </LaptopFrame>
      </motion.div>

      {/* Mobile — browser chrome frame with live embed */}
      <div className="md:hidden">
        <div className="border border-[#e8e8e8] rounded-lg overflow-hidden">
          <div className="bg-[#f7f7f9] px-3 py-2 flex items-center gap-2 border-b border-[#e8e8e8]">
            <div className="flex gap-1.5">
              {[0,1,2].map(i => <div key={i} className="w-2 h-2 rounded-full bg-[#e0e0e0]" />)}
            </div>
            <div className="flex-1 bg-white rounded border border-[#e8e8e8] px-3 py-0.5 mx-2">
              <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb" }}>luma-live.vercel.app</p>
            </div>
          </div>
          <LumaEmbed height="480px" />
        </div>
      </div>
    </div>
  );
}

// ── Chapter 02: Event Economics timeline ───────────────────────────────────────

const PHASES = [
  { label: "PRESALES",   months: [0, 3],  color: "#e8578a" },
  { label: "DEPOSITS",   months: [3, 5],  color: "#c4b5e8" },
  { label: "MARKETING",  months: [4, 7],  color: "#888" },
  { label: "PRODUCTION", months: [5, 8],  color: "#e8578a" },
  { label: "EVENT",      months: [8, 8.3], color: "#111" },
  { label: "SETTLEMENT", months: [8.5, 11], color: "#c4b5e8" },
];

const MONTHS = ["JAN","FEB","MAR","APR","MAY","JUN","JUL","AUG","SEP","OCT","NOV","DEC"];

function EventTimeline() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref}>
      {/* Accounting calendar */}
      <div className="mb-6">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb", letterSpacing: "0.16em", marginBottom: 8 }}>
          ACCOUNTING CALENDAR
        </p>
        <div className="grid grid-cols-12 gap-px">
          {MONTHS.map((m, i) => (
            <motion.div
              key={m}
              className="text-center py-2 border border-[#e8e8e8]"
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: i * 0.04, duration: 0.3 }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#999" }}>{m}</span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Accounting records when—line */}
      <div className="relative h-2 mb-1">
        <div className="absolute inset-0 border-l border-r border-t border-dashed border-[#e8e8e8]" />
        <p className="absolute -top-5 left-0" style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#ccc", letterSpacing: "0.1em" }}>
          ACCOUNTING RECORDS WHEN TRANSACTION POSTS
        </p>
      </div>

      {/* Divider with label */}
      <div className="flex items-center gap-4 my-6">
        <div className="flex-1 border-t border-dashed border-[#e8e8e8]" />
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#aaa", letterSpacing: "0.12em" }}>
          SOLARIS — EVENT ECONOMIC WINDOW — JUN 7
        </p>
        <div className="flex-1 border-t border-dashed border-[#e8e8e8]" />
      </div>

      {/* Event economic phases */}
      <div className="relative h-10 mb-2">
        {PHASES.map((ph, i) => {
          const left = `${(ph.months[0] / 12) * 100}%`;
          const width = `${((ph.months[1] - ph.months[0]) / 12) * 100}%`;
          return (
            <motion.div
              key={ph.label}
              className="absolute top-0 h-full flex items-center justify-center"
              style={{ left, width, background: ph.color, opacity: 0.12 }}
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ delay: 0.4 + i * 0.12, duration: 0.5, ease }}
            />
          );
        })}
        {PHASES.map((ph, i) => {
          const left = `${(ph.months[0] / 12) * 100}%`;
          const width = `${((ph.months[1] - ph.months[0]) / 12) * 100}%`;
          return (
            <motion.div
              key={ph.label + "-label"}
              className="absolute top-0 h-full flex items-center justify-center overflow-hidden"
              style={{ left, width }}
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + i * 0.12, duration: 0.3 }}
            >
              <span style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: ph.color === "#111" ? "#111" : ph.color, letterSpacing: "0.08em", whiteSpace: "nowrap" }}>
                {ph.label}
              </span>
            </motion.div>
          );
        })}
      </div>

      <p className="mt-6" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb", letterSpacing: "0.12em" }}>
        MANAGEMENT NEEDS TO KNOW WHAT IT BELONGS TO.
      </p>
    </div>
  );
}

// ── Chapter 03: Drilldown ──────────────────────────────────────────────────────

interface DrillNode {
  id: string;
  label: string;
  amount: number;
  vendor?: string;
  date?: string;
  account?: string;
  children?: DrillNode[];
}

const DRILL_TREE: DrillNode = {
  id: "root",
  label: "ALL EVENTS — DIRECT COSTS",
  amount: 3_870_000,
  children: [
    {
      id: "sol",
      label: "SOLARIS — Jun 7, 2026",
      amount: 2_000_000,
      children: [
        {
          id: "talent",
          label: "TALENT",
          amount: 680_000,
          children: [
            {
              id: "talent-deposit",
              label: "Artist Fee — deposit 1/2",
              amount: 280_000,
              vendor: "Cascade Artist Management",
              date: "28 Jan 2026",
              account: "5100-110",
            },
            {
              id: "talent-balance",
              label: "Artist Fee — balance + support acts",
              amount: 400_000,
              vendor: "Cascade Artist Management",
              date: "10 May 2026",
              account: "5100-110",
            },
          ],
        },
        {
          id: "production",
          label: "PRODUCTION & VENUE",
          amount: 1_060_000,
          children: [
            {
              id: "stage-deposit",
              label: "Stage Build — deposit",
              amount: 200_000,
              vendor: "Summit Production Group",
              date: "12 Mar 2026",
              account: "5200-210",
            },
            {
              id: "stage-final",
              label: "Stage Build — final",
              amount: 340_000,
              vendor: "Summit Production Group",
              date: "7 Jun 2026",
              account: "5200-210",
            },
            {
              id: "av",
              label: "AV & Lighting",
              amount: 340_000,
              vendor: "Vivid Sound & Lighting",
              date: "8 Apr – 8 Jul 2026",
              account: "5200-240",
            },
            {
              id: "staging-deposit2",
              label: "Main-stage production deposit",
              amount: 84_200,
              vendor: "Northstar Stageworks",
              date: "14 Apr 2026",
              account: "5200-210",
            },
          ],
        },
        {
          id: "ops",
          label: "EVENT OPERATIONS",
          amount: 280_000,
          children: [
            {
              id: "security",
              label: "Security, medical & staffing",
              amount: 280_000,
              vendor: "Redline Security Services",
              date: "7 Jun 2026",
              account: "5300-310",
            },
          ],
        },
      ],
    },
    { id: "hbr", label: "HARBOR — Jul 26, 2026", amount: 700_000 },
    { id: "mrd", label: "MERIDIAN — Sep 20, 2026", amount: 1_170_000 },
  ],
};

function fmt(n: number) {
  return n >= 1_000_000
    ? `$${(n / 1_000_000).toFixed(1)}M`
    : `$${(n / 1_000).toFixed(0)}K`;
}

function DrillRow({ node, depth = 0 }: { node: DrillNode; depth?: number }) {
  const [open, setOpen] = useState(depth < 2);
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = !hasChildren;

  return (
    <div>
      {isLeaf ? (
        // Transaction leaf card
        <div
          className="ml-6 mb-2 border border-[#e8e8e8] p-3"
          style={{ marginLeft: `${depth * 20}px` }}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[13px] text-[#111] font-medium mb-0.5">{node.vendor}</p>
              <p className="text-[12px] text-[#888] font-light">{node.label}</p>
              {node.date && (
                <p className="mt-1" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb" }}>
                  {node.date} · {node.account}
                </p>
              )}
            </div>
            <span
              className="shrink-0 font-bold text-[14px] text-[#111]"
              style={{ fontFamily: "'Amulya', var(--font-display)" }}
            >
              {fmt(node.amount)}
            </span>
          </div>
        </div>
      ) : (
        <div style={{ marginLeft: `${depth * 20}px` }}>
          <button
            onClick={() => setOpen(o => !o)}
            className="w-full flex items-center justify-between py-2.5 group"
            style={{ borderBottom: "1px solid #f0f0f0" }}
          >
            <div className="flex items-center gap-3">
              <span
                className="text-[#bbb] group-hover:text-[#e8578a] transition-colors"
                style={{ fontFamily: "var(--font-mono)", fontSize: 9 }}
              >
                {open ? "▾" : "▸"}
              </span>
              <span
                className="text-[13px] text-[#111] font-medium group-hover:text-[#e8578a] transition-colors"
                style={{ fontFamily: depth === 0 ? "'Amulya', var(--font-display)" : "var(--font-sans)", letterSpacing: depth <= 1 ? "0.04em" : 0 }}
              >
                {node.label}
              </span>
            </div>
            <span
              className="font-bold text-[13px] text-[#111]"
              style={{ fontFamily: "'Amulya', var(--font-display)" }}
            >
              {fmt(node.amount)}
            </span>
          </button>

          <AnimatePresence initial={false}>
            {open && node.children && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25, ease }}
                style={{ overflow: "hidden" }}
              >
                <div className="py-1">
                  {node.children.map(child => (
                    <DrillRow key={child.id} node={child} depth={depth + 1} />
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </div>
  );
}

// ── Chapter 04: Data sources ───────────────────────────────────────────────────

const SOURCES = [
  { label: "ACCOUNTING GL", sub: "classified actuals" },
  { label: "SALES / TICKETING", sub: "cash receipts" },
  { label: "APPROVED BUDGET", sub: "event budgets" },
  { label: "CASH FORECAST", sub: "forward commitments" },
];

const OUTPUTS = [
  "CASH POSITION",
  "EVENT P&L",
  "FUNDING BRIDGE",
  "MANAGEMENT REPORT",
];

function DataSources() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-15% 0px" });

  return (
    <div ref={ref} className="flex flex-col items-center gap-0">
      {/* Sources */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl mb-0">
        {SOURCES.map((s, i) => (
          <motion.div
            key={s.label}
            className="border border-[#e8e8e8] p-3 text-center"
            initial={{ opacity: 0, y: -10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: i * 0.1, duration: 0.4, ease }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#111", letterSpacing: "0.1em", marginBottom: 3 }}>
              {s.label}
            </p>
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#bbb" }}>{s.sub}</p>
          </motion.div>
        ))}
      </div>

      {/* Converging lines */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.5, duration: 0.4 }}
      >
        <div className="w-px h-8 bg-[#e8e8e8]" />
        <div className="w-[60%] max-w-xs border-t border-[#e8e8e8]" />
        <div className="w-px h-6 bg-[#e8e8e8]" />
      </motion.div>

      {/* LUMA node */}
      <motion.div
        className="border-2 border-[#111] px-10 py-4 text-center mb-0"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={inView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.7, duration: 0.4, ease }}
      >
        <p className="font-bold" style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "1.1rem", letterSpacing: "0.06em" }}>
          LUMA LIVE
        </p>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: 8, color: "#aaa", letterSpacing: "0.1em", marginTop: 3 }}>
          MANAGEMENT INFORMATION SYSTEM
        </p>
      </motion.div>

      {/* Diverging lines */}
      <motion.div
        className="flex flex-col items-center"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ delay: 0.9, duration: 0.4 }}
      >
        <div className="w-px h-6 bg-[#e8e8e8]" />
        <div className="w-[70%] max-w-md border-t border-[#e8e8e8]" />
        <div className="w-px h-8 bg-[#e8e8e8]" />
      </motion.div>

      {/* Outputs */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 w-full max-w-2xl">
        {OUTPUTS.map((o, i) => (
          <motion.div
            key={o}
            className="border border-[#e8578a]/30 p-3 text-center"
            style={{ background: "#fff9fc" }}
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0 + i * 0.08, duration: 0.4, ease }}
          >
            <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#e8578a", letterSpacing: "0.1em" }}>
              {o}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ── Section wrapper ────────────────────────────────────────────────────────────

function Chapter({ num, title, children }: { num: string; title: string; children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: "-20% 0px" });

  return (
    <section ref={ref} className="border-t border-[#e8e8e8] px-[5.5vw] py-20">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease }}
      >
        <p className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb", letterSpacing: "0.18em" }}>
          {num}
        </p>
        <h2
          className="font-bold text-[#111] mb-10"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2.6rem)" }}
        >
          {title}
        </h2>
        {children}
      </motion.div>
    </section>
  );
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function LumaCaseStudy() {
  const [showAssumption, setShowAssumption] = useState(false);
  return (
    <div className="min-h-screen bg-white">

      {/* Nav */}
      <header className="px-[5.5vw] py-5 flex items-center justify-between border-b border-[#e8e8e8] sticky top-0 bg-white/95 backdrop-blur-sm z-50">
        <Link
          href="/"
          className="font-bold text-[#111] hover:text-[#e8578a] transition-colors"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontWeight: 600, fontSize: "1rem" }}
        >
          Yen Tran
        </Link>
        <Link
          href="/#work"
          className="text-[#aaa] hover:text-[#111] transition-colors"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.16em" }}
        >
          ← All work
        </Link>
      </header>

      {/* Hero */}
      <div className="px-[5.5vw] pt-20 pb-16">
        <p className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#aaa", letterSpacing: "0.2em" }}>
          LUMA LIVE · MANAGEMENT INFORMATION SYSTEM
        </p>

        <h1
          className="font-bold text-[#111] leading-none mb-8"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 7.5rem)" }}
        >
          Will we need
          <br />more cash?
        </h1>

        <p className="text-[16px] text-[#666] font-light leading-relaxed mb-6" style={{ maxWidth: "52ch" }}>
          A multi-event business can be profitable on paper and still run short of cash between events. LUMA connects accounting actuals, event economics and forward commitments to show when liquidity becomes constrained—and what management can do about it.
        </p>

        {/* Disclosure */}
        <div className="border-l-2 border-[#e8e8e8] pl-4 py-1">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb", letterSpacing: "0.12em", marginBottom: 3 }}>
            FICTIONALIZED CASE STUDY
          </p>
          <p className="text-[12px] text-[#bbb] font-light leading-relaxed" style={{ maxWidth: "52ch" }}>
            This case study recreates the analytical architecture of a management reporting system developed during an internship. Company names, events, transactions, financial figures and business data have been fictionalized to protect confidential information.
          </p>
        </div>
      </div>

      {/* Chapter 01 — THE DECISION */}
      <div className="border-t border-[#e8e8e8]">
        <div className="px-[5.5vw] pt-16 pb-6">
          <p className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#bbb", letterSpacing: "0.18em" }}>
            CHAPTER 01
          </p>
          <h2
            className="font-bold text-[#111] mb-4"
            style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.4rem, 3vw, 2.6rem)" }}
          >
            THE DECISION
          </h2>
          <p className="text-[15px] text-[#666] font-light leading-relaxed" style={{ maxWidth: "52ch" }}>
            An event business can generate attractive annual economics while still facing temporary liquidity pressure—because receipts and payments occur at different times.
          </p>
        </div>

        <LaptopShowcase />

        {/* VIEW ASSUMPTION */}
        <div className="px-[5.5vw] py-8">
          <button
            onClick={() => setShowAssumption(s => !s)}
            className="transition-colors duration-200"
            style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.16em", color: showAssumption ? "#e8578a" : "#bbb" }}
          >
            {showAssumption ? "HIDE ASSUMPTION ↑" : "VIEW ASSUMPTION ↓"}
          </button>
          <AnimatePresence>
            {showAssumption && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                style={{ overflow: "hidden" }}
              >
                <div className="mt-4 border border-[#e8e8e8] p-5 max-w-lg" style={{ background: "#f7f7f9" }}>
                  <p className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#aaa", letterSpacing: "0.16em" }}>
                    CASH TROUGH METHODOLOGY
                  </p>
                  <p className="mb-3" style={{ fontFamily: "var(--font-mono)", fontSize: 11, color: "#555", lineHeight: 1.6 }}>
                    The trough is the minimum running cash balance over the forecast horizon.
                  </p>
                  <pre style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#666", lineHeight: 1.9, background: "none", margin: 0, padding: 0, whiteSpace: "pre" }}>{`Running Balance(t) = Opening Cash
                   + Σ Receipts committed through t
                   − Σ Payments due through t`}</pre>
                  <div className="mt-3 pt-3 border-t border-[#e8e8e8]">
                    <p style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#888", lineHeight: 1.7 }}>
                      Deferrable payments are flagged by contract terms.<br />
                      Financing requirement = Trough balance − Deferrable commitments.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Chapter 02 — THE ECONOMICS */}
      <Chapter num="CHAPTER 02" title="Accounting period ≠ Event economics">
        <p className="text-[15px] text-[#666] font-light leading-relaxed mb-6" style={{ maxWidth: "52ch" }}>
          A transaction knows when it posted. Management needs to know what event it belongs to.
        </p>
        <div className="mb-10 border-l-2 border-[#e8578a] pl-5 py-1 max-w-lg">
          <p className="mb-2" style={{ fontFamily: "var(--font-mono)", fontSize: 9, color: "#e8578a", letterSpacing: "0.14em" }}>
            EXAMPLE
          </p>
          <p className="text-[14px] text-[#444] font-light leading-relaxed">
            A ticket sold on March 15 for a June 7 event posts as revenue in the March accounting period. Economically, it belongs to the June event. Without a bridge between the two views, management sees one thing and the event sees another.
          </p>
        </div>
        <EventTimeline />
      </Chapter>

      {/* Chapter 03 — THE DRILL */}
      <Chapter num="CHAPTER 03" title="One number. All the way down.">
        <p className="text-[15px] text-[#666] font-light leading-relaxed mb-10" style={{ maxWidth: "52ch" }}>
          Every management KPI can be traced into its underlying transactions. Click a line to expand.
        </p>
        <div className="max-w-2xl">
          <DrillRow node={DRILL_TREE} depth={0} />
        </div>
      </Chapter>

      {/* Chapter 04 — THE SYSTEM */}
      <Chapter num="CHAPTER 04" title="Four sources. One management view.">
        <p className="text-[15px] text-[#666] font-light leading-relaxed mb-12" style={{ maxWidth: "52ch" }}>
          The dashboard and management report derive from the same underlying model—accounting actuals, event economics, approved budgets, and forward cash commitments combined.
        </p>
        <DataSources />
      </Chapter>

      {/* Closing */}
      <section className="border-t border-[#e8e8e8] px-[5.5vw] py-24 text-center">
        <p className="mb-4" style={{ fontFamily: "var(--font-mono)", fontSize: 10, color: "#bbb", letterSpacing: "0.18em" }}>
          THE SYSTEM IS THE CASE STUDY.
        </p>
        <h2
          className="font-bold text-[#111] mb-8"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.8rem, 4vw, 4rem)" }}
        >
          EXPLORE LUMA LIVE
        </h2>
      </section>

      {/* Footer nav */}
      <div className="px-[5.5vw] py-8 border-t border-[#e8e8e8] flex items-center justify-between">
        <Link
          href="/#work"
          className="text-[#aaa] hover:text-[#111] transition-colors"
          style={{ fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.14em" }}
        >
          ← ALL WORK
        </Link>
        <Link
          href="/"
          className="font-bold text-[#111] hover:text-[#e8578a] transition-colors"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontWeight: 600, fontSize: "1rem" }}
        >
          Yen Tran
        </Link>
      </div>
    </div>
  );
}
