'use client'

import Link from 'next/link'
import { useState } from 'react'
import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  ResponsiveContainer, ReferenceLine, ReferenceArea,
} from 'recharts'

// ── TOKENS ────────────────────────────────────────────────────────────────────
const NAVY  = '#1a3a4c'
const TEAL  = '#2a6a7a'
const PINK  = '#e8578a'
const SLATE = '#7a8a9a'
const MUTED = '#c0bcc4'
const GRID  = '#f0eef2'
const MONO  = 'var(--font-mono)'
const SANS  = 'var(--font-sans)'
const DISP  = 'var(--font-display)'

// ── DATA ──────────────────────────────────────────────────────────────────────

const CAC_DATA = [
  { q: '1Q23', metro: 58,  wf: 15, lk: 14, rv: 14 },
  { q: '2Q23', metro: 54,  wf: 14, lk: 13, rv: 15 },
  { q: '3Q23', metro: 68,  wf: 18, lk: 16, rv: 17 },
  { q: '4Q23', metro: 92,  wf: 22, lk: 20, rv: 19 },
  { q: '1Q24', metro: 128, wf: 25, lk: 21, rv: 22 },
  { q: '2Q24', metro: 158, wf: 28, lk: 24, rv: 24 },
  { q: '3Q24', metro: 171, wf: 29, lk: 26, rv: 23 },
  { q: '4Q24', metro: 112, wf: 26, lk: 28, rv: 21 },
  { q: '1Q25', metro: 85,  wf: 32, lk: 24, rv: 20 },
]

const LTV_DATA = [
  { q: 'Q1', c2021: 42,  c2022: 48,  c2023: 55,  c2024: 71  },
  { q: 'Q2', c2021: 78,  c2022: 89,  c2023: 102, c2024: 138 },
  { q: 'Q3', c2021: 108, c2022: 122, c2023: 142, c2024: 190 },
  { q: 'Q4', c2021: 134, c2022: 149, c2023: 174, c2024: 228 },
  { q: 'Q5', c2021: 156, c2022: 171, c2023: 201, c2024: 254 },
  { q: 'Q6', c2021: 174, c2022: 188, c2023: 220, c2024: 268 },
  { q: 'Q7', c2021: 190, c2022: 204, c2023: 236, c2024: 278 },
  { q: 'Q8', c2021: 203, c2022: 218, c2023: 248, c2024: 285 },
]

const RETENTION_DATA = [
  { q: 'Q0', rate: 100  },
  { q: 'Q1', rate: 72   },
  { q: 'Q2', rate: 58   },
  { q: 'Q3', rate: 52   },
  { q: 'Q4', rate: 50   },
  { q: 'Q5', rate: 48   },
  { q: 'Q6', rate: 47   },
  { q: 'Q7', rate: 46.5 },
  { q: 'Q8', rate: 46   },
]

const BUBBLES = [
  { label: 'Responsive staff',   cat: 'Service',    freq: 847, r: 19, cx: 130, cy: 128 },
  { label: 'Quick resolution',   cat: 'Service',    freq: 712, r: 17, cx: 220, cy:  90 },
  { label: 'Personalized help',  cat: 'Service',    freq: 523, r: 15, cx: 174, cy: 192 },
  { label: 'Consistent quality', cat: 'Product',    freq: 923, r: 20, cx: 548, cy: 108 },
  { label: 'Wide selection',     cat: 'Product',    freq: 634, r: 17, cx: 630, cy: 162 },
  { label: 'Reliable packaging', cat: 'Product',    freq: 445, r: 14, cx: 480, cy: 162 },
  { label: 'Fair pricing',       cat: 'Value',      freq: 589, r: 16, cx: 290, cy: 288 },
  { label: 'Loyalty rewards',    cat: 'Value',      freq: 398, r: 13, cx: 362, cy: 350 },
  { label: 'Easy returns',       cat: 'Experience', freq: 512, r: 15, cx: 525, cy: 318 },
  { label: 'Fast delivery',      cat: 'Experience', freq: 467, r: 14, cx: 600, cy: 278 },
]

const CAT_COLORS: Record<string, string> = {
  Service: NAVY, Product: TEAL, Value: SLATE, Experience: PINK,
}

const SLOPE_DATA = [
  { name: 'CoreBrand', ra: 1, rs: 7, focal: false },
  { name: 'Prestige',  ra: 2, rs: 6, focal: false },
  { name: 'Summit',    ra: 3, rs: 5, focal: false },
  { name: 'NovaCo',   ra: 4, rs: 3, focal: false },
  { name: 'Radius',   ra: 5, rs: 4, focal: false },
  { name: 'Vela',     ra: 6, rs: 1, focal: true  },
  { name: 'Apex',     ra: 7, rs: 2, focal: false },
]

const slopeY = (rank: number) => 48 + (rank - 1) * 60

// ── CHART A — CAC by Market ───────────────────────────────────────────────────

function CACArrow({ xAxisMap, yAxisMap, storyOn }: any) {
  if (!storyOn || !xAxisMap || !yAxisMap) return null
  const xAxis = xAxisMap[0] ?? Object.values(xAxisMap)[0] as any
  const yAxis = yAxisMap[0] ?? Object.values(yAxisMap)[0] as any
  if (!xAxis?.scale || !yAxis?.scale) return null

  const bw = (xAxis.bandwidth?.() ?? 0) / 2
  const x1 = xAxis.scale('3Q24') + bw
  const y1 = yAxis.scale(171) + 22   // just below the "$171" label
  const x2 = xAxis.scale('1Q25') + bw
  const y2 = yAxis.scale(85) - 8     // just above the final dot
  if (x1 == null || y1 == null || x2 == null || y2 == null) return null

  const mx = x1 + (x2 - x1) * 0.35
  const my = y1 + (y2 - y1) * 0.2

  return (
    <g>
      <defs>
        <marker id="cac-arr" markerWidth="7" markerHeight="6" refX="6" refY="3" orient="auto">
          <polygon points="0 0, 7 3, 0 6" fill={NAVY} opacity={0.75} />
        </marker>
      </defs>
      <path
        d={`M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}`}
        stroke={NAVY} strokeWidth={1.2} fill="none"
        markerEnd="url(#cac-arr)" opacity={0.55}
      />
    </g>
  )
}

function CACChart({ storyOn }: { storyOn: boolean }) {
  const metroColor = storyOn ? NAVY : MUTED
  const metroWidth = storyOn ? 3 : 1.5

  const metroDot = storyOn
    ? (props: any) => {
        const { cx, cy, index } = props
        if (index === 6) {
          return (
            <g key={`m${index}`}>
              <circle cx={cx} cy={cy} r={4.5} fill={NAVY} />
              <text x={cx} y={cy - 14} textAnchor="middle" fontSize={10} fill={NAVY} fontFamily={MONO} fontWeight={700}>
                $171
              </text>
            </g>
          )
        }
        if (index === 8) {
          return (
            <g key={`m${index}`}>
              <circle cx={cx} cy={cy} r={4} fill={NAVY} />
              {/* white bg makes the callout pop */}
              <rect x={cx + 8} y={cy - 12} width={116} height={26} fill="white" opacity={0.9} rx={2} />
              <text x={cx + 12} y={cy - 1} fontSize={10} fill={NAVY} fontFamily={MONO} fontWeight={700}>Metro West</text>
              <text x={cx + 12} y={cy + 11} fontSize={9} fill={NAVY} fontFamily={MONO}>$85 · ↓50%</text>
            </g>
          )
        }
        return <g key={`m${index}`} />
      }
    : false

  const sideDot = (topLabel: string, val: string) =>
    storyOn
      ? (props: any) => {
          const { cx, cy, index } = props
          if (index !== 8) return <g key={`s${index}`} />
          return (
            <g key={`s${index}`}>
              <circle cx={cx} cy={cy} r={2.5} fill={MUTED} />
              <rect x={cx + 8} y={cy - 7} width={90} height={14} fill="white" opacity={0.85} rx={2} />
              <text x={cx + 10} y={cy + 4} fontSize={9} fill="#888" fontFamily={MONO}>
                {topLabel} · {val}
              </text>
            </g>
          )
        }
      : false

  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={CAC_DATA} margin={{ top: 28, right: 175, bottom: 8, left: 4 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="q" tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${v}`}
            domain={[0, 190]} ticks={[0, 50, 100, 150]} width={38}
          />
          <Line dataKey="wf" stroke={MUTED} strokeWidth={1.5} dot={sideDot('Westfield', '$32')} isAnimationActive={false} />
          <Line dataKey="lk" stroke={MUTED} strokeWidth={1.5} dot={sideDot('Lakeshore', '$24')} isAnimationActive={false} />
          <Line dataKey="rv" stroke={MUTED} strokeWidth={1.5} dot={sideDot('Riverton', '$20')} isAnimationActive={false} />
          <Line dataKey="metro" stroke={metroColor} strokeWidth={metroWidth} dot={metroDot} isAnimationActive={false} />
          {storyOn && <Customized component={CACArrow} storyOn={storyOn} />}
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── CHART B — LTV by Cohort ───────────────────────────────────────────────────

function LTVChart({ storyOn }: { storyOn: boolean }) {
  const c24Color = storyOn ? PINK : MUTED
  const c24Width = storyOn ? 2.5 : 1.5

  const dot2024 = storyOn
    ? (props: any) => {
        const { cx, cy, index } = props
        if (index === LTV_DATA.length - 1) {
          return (
            <g key={`ltv${index}`}>
              <circle cx={cx} cy={cy} r={3.5} fill={PINK} />
              <text x={cx + 10} y={cy - 2} fontSize={10} fill={PINK} fontFamily={MONO} fontWeight={700}>2024 Cohort</text>
              <text x={cx + 10} y={cy + 11} fontSize={9} fill={PINK} fontFamily={MONO}>$285</text>
            </g>
          )
        }
        if (index === 2) {
          return (
            <g key={`ltv${index}`}>
              <circle cx={cx} cy={cy} r={3.5} fill={PINK} />
            </g>
          )
        }
        return <g key={`ltv${index}`} />
      }
    : false

  const oldDot = (label: string, val: string) =>
    storyOn
      ? (props: any) => {
          const { cx, cy, index } = props
          if (index !== LTV_DATA.length - 1) return <g key={`od${index}`} />
          return (
            <g key={`od${index}`}>
              <circle cx={cx} cy={cy} r={2.5} fill={MUTED} />
              <text x={cx + 10} y={cy + 4} fontSize={9} fill="#aaa" fontFamily={MONO}>
                {label} · {val}
              </text>
            </g>
          )
        }
      : false

  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={LTV_DATA} margin={{ top: 28, right: 155, bottom: 8, left: 4 }}>
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="q" tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `$${v}`}
            domain={[0, 300]} ticks={[0, 100, 200, 300]} width={38}
          />
          {storyOn && (
            <ReferenceLine x="Q3" stroke="#ede9f4" strokeDasharray="4 3" />
          )}
          <Line dataKey="c2021" stroke={MUTED} strokeWidth={1.5} dot={oldDot('2021', '$203')} isAnimationActive={false} />
          <Line dataKey="c2022" stroke={MUTED} strokeWidth={1.5} dot={oldDot('2022', '$218')} isAnimationActive={false} />
          <Line dataKey="c2023" stroke={MUTED} strokeWidth={1.5} dot={oldDot('2023', '$248')} isAnimationActive={false} />
          <Line dataKey="c2024" stroke={c24Color} strokeWidth={c24Width} dot={dot2024} isAnimationActive={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── CHART C — Review Bubbles ──────────────────────────────────────────────────

function BubbleChart({ storyOn }: { storyOn: boolean }) {
  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <svg viewBox="0 0 760 415" style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Customer review themes">
        {storyOn && (
          <>
            <text x={80}  y={48}  fontSize={8.5} fill={NAVY}  fontFamily={MONO} letterSpacing={1.8}>SERVICE</text>
            <text x={462} y={70}  fontSize={8.5} fill={TEAL}  fontFamily={MONO} letterSpacing={1.8}>PRODUCT</text>
            <text x={252} y={254} fontSize={8.5} fill={SLATE} fontFamily={MONO} letterSpacing={1.8}>VALUE</text>
            <text x={500} y={245} fontSize={8.5} fill={PINK}  fontFamily={MONO} letterSpacing={1.8}>EXPERIENCE</text>
          </>
        )}
        {BUBBLES.map((b, i) => {
          const color = storyOn ? CAT_COLORS[b.cat] : MUTED
          const textY  = b.cy + b.r + 13
          const textY2 = b.cy + b.r + 23
          return (
            <g key={i}>
              <circle cx={b.cx} cy={b.cy} r={b.r} fill={color} opacity={storyOn ? 0.82 : 0.55} />
              <text x={b.cx} y={textY} textAnchor="middle" fontSize={8.5} fill={storyOn ? '#444' : '#aaa'} fontFamily={MONO}>
                {b.label}
              </text>
              {storyOn && (
                <text x={b.cx} y={textY2} textAnchor="middle" fontSize={7.5} fill="#bbb" fontFamily={MONO}>
                  {b.freq.toLocaleString()}
                </text>
              )}
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── CHART D — Slope Chart ─────────────────────────────────────────────────────

function SlopeChart({ storyOn }: { storyOn: boolean }) {
  const LX = 148, RX = 462

  return (
    <div style={{ width: '100%', overflowX: 'hidden' }}>
      <svg viewBox="0 0 610 460" style={{ width: '100%', height: 'auto', display: 'block' }} aria-label="Competitive assortment ranking comparison">
        <text x={LX} y={22} textAnchor="middle" fontSize={8.5} fill="#aaa" fontFamily={MONO} letterSpacing={1.5}>RANKED BY # OF SKUs</text>
        <text x={RX} y={22} textAnchor="middle" fontSize={8.5} fill="#aaa" fontFamily={MONO} letterSpacing={1.5}>RANKED BY % OF CATEGORY</text>
        {SLOPE_DATA.map((co) => {
          const y1 = slopeY(co.ra)
          const y2 = slopeY(co.rs)
          const color = storyOn ? (co.focal ? PINK : MUTED) : MUTED
          const width = storyOn && co.focal ? 2.5 : 1.5
          const opacity = storyOn && !co.focal ? 0.5 : 1
          return (
            <line key={co.name + '-line'} x1={LX} y1={y1} x2={RX} y2={y2}
              stroke={color} strokeWidth={width} opacity={opacity} />
          )
        })}
        {SLOPE_DATA.map((co) => {
          const y1 = slopeY(co.ra)
          const y2 = slopeY(co.rs)
          const color = storyOn ? (co.focal ? PINK : '#999') : '#999'
          const bold = storyOn && co.focal ? 700 : 400
          const r = storyOn && co.focal ? 4.5 : 3
          return (
            <g key={co.name}>
              <circle cx={LX} cy={y1} r={r} fill={color} />
              <text x={LX - 12} y={y1 + 4} textAnchor="end" fontSize={10} fill={color} fontFamily={MONO} fontWeight={bold}>
                {co.name}
              </text>
              <circle cx={RX} cy={y2} r={r} fill={color} />
              <text x={RX + 12} y={y2 + 4} textAnchor="start" fontSize={10} fill={color} fontFamily={MONO} fontWeight={bold}>
                {storyOn ? (co.focal ? `↑ #${co.rs}` : `#${co.rs}`) : co.name}
              </text>
            </g>
          )
        })}
      </svg>
    </div>
  )
}

// ── CHART E — Retention ───────────────────────────────────────────────────────

function RetentionChart({ storyOn }: { storyOn: boolean }) {
  const lineColor = storyOn ? NAVY : MUTED

  const retDot = storyOn
    ? (props: any) => {
        const { cx, cy, index } = props
        if (index === 1) {
          return (
            <g key={`r${index}`}>
              <circle cx={cx} cy={cy} r={3.5} fill={NAVY} />
              <text x={cx + 9} y={cy - 5} fontSize={9} fill={NAVY} fontFamily={MONO}>72%</text>
            </g>
          )
        }
        if (index === 2) {
          return (
            <g key={`r${index}`}>
              <circle cx={cx} cy={cy} r={3.5} fill={NAVY} />
              <text x={cx + 9} y={cy + 4} fontSize={10} fill={NAVY} fontFamily={MONO} fontWeight={700}>58%</text>
              <text x={cx + 9} y={cy + 16} fontSize={9} fill="#aaa" fontFamily={MONO}>curve flattens</text>
            </g>
          )
        }
        if (index === 8) {
          return (
            <g key={`r${index}`}>
              <circle cx={cx} cy={cy} r={3} fill={NAVY} />
              <text x={cx + 9} y={cy + 4} fontSize={9} fill="#aaa" fontFamily={MONO}>~46% plateau</text>
            </g>
          )
        }
        return <g key={`r${index}`} />
      }
    : false

  return (
    <div style={{ width: '100%', height: 380 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={RETENTION_DATA} margin={{ top: 28, right: 80, bottom: 8, left: 4 }}>
          {storyOn && (
            <ReferenceArea x1="Q0" x2="Q2" fill={PINK} fillOpacity={0.06} />
          )}
          <CartesianGrid stroke={GRID} vertical={false} />
          <XAxis dataKey="q" tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }} axisLine={false} tickLine={false} />
          <YAxis
            tick={{ fontSize: 10, fill: '#aaa', fontFamily: MONO }}
            axisLine={false} tickLine={false}
            tickFormatter={(v) => `${v}%`}
            domain={[40, 100]} ticks={[40, 60, 80, 100]} width={38}
          />
          {storyOn && (
            <ReferenceLine y={58} stroke="#f0d0dc" strokeDasharray="4 3" />
          )}
          <Line
            dataKey="rate"
            stroke={lineColor}
            strokeWidth={storyOn ? 2.5 : 1.5}
            dot={retDot}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  )
}

// ── EXHIBIT WRAPPER (owns its own toggle state) ───────────────────────────────

function Exhibit({
  num, category, headline, storyOnHeadline, setup, takeaway, storyOnTakeaway, children,
}: {
  num: string
  category: string
  headline: string
  storyOnHeadline: string
  setup: string
  takeaway: string
  storyOnTakeaway: string
  children: (storyOn: boolean) => React.ReactNode
}) {
  const [storyOn, setStoryOn] = useState(true)

  return (
    <section style={{ paddingTop: 72, paddingBottom: 72, borderTop: '1px solid #ece8f0' }}>
      {/* Number + toggle row */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
        <p style={{ fontFamily: MONO, fontSize: 10, color: '#bbb', letterSpacing: '0.2em', margin: 0 }}>
          {num} / {category.toUpperCase()}
        </p>
        {/* Per-exhibit toggle */}
        <div style={{ display: 'flex', background: '#f5f4f7', borderRadius: 5, padding: 2, gap: 1, flexShrink: 0 }}>
          {([false, true] as const).map((val) => {
            const active = storyOn === val
            return (
              <button
                key={String(val)}
                onClick={() => setStoryOn(val)}
                style={{
                  fontFamily: MONO,
                  fontSize: 9,
                  letterSpacing: '0.12em',
                  padding: '4px 12px',
                  borderRadius: 3,
                  border: 'none',
                  cursor: 'pointer',
                  background: active ? '#fff' : 'transparent',
                  color: active ? '#111' : '#ccc',
                  boxShadow: active ? '0 1px 3px rgba(0,0,0,0.09)' : 'none',
                  transition: 'all 0.15s',
                }}
              >
                {val ? 'STORY ON' : 'STORY OFF'}
              </button>
            )
          })}
        </div>
      </div>

      {/* Headline + setup */}
      <div style={{ marginBottom: 28 }}>
        <h2 style={{
          fontFamily: DISP,
          fontSize: 'clamp(1.25rem, 2.4vw, 1.9rem)',
          fontWeight: 700,
          color: '#111',
          lineHeight: 1.2,
          maxWidth: '52ch',
          marginBottom: 16,
        }}>
          {storyOn ? storyOnHeadline : headline}
        </h2>
        <p style={{ fontSize: 14, color: '#666', maxWidth: '60ch', lineHeight: 1.7, fontFamily: SANS }}>
          {setup}
        </p>
      </div>

      {/* Chart */}
      <div style={{ marginBottom: 36 }}>
        {children(storyOn)}
      </div>

      {/* Takeaway */}
      <div style={{ paddingTop: 20, borderTop: storyOn ? `2px solid ${PINK}` : '1px solid #ece8f0' }}>
        <p style={{ fontSize: 13, color: storyOn ? '#333' : '#999', maxWidth: '64ch', lineHeight: 1.75, fontFamily: SANS }}>
          {storyOn ? storyOnTakeaway : takeaway}
        </p>
      </div>
    </section>
  )
}

// ── PAGE ──────────────────────────────────────────────────────────────────────

export default function VisualStories() {
  return (
    <div style={{ minHeight: '100vh', background: '#fff' }}>

      {/* Header */}
      <header style={{ borderBottom: '1px solid #ece8f0' }}>
        <div style={{ maxWidth: 960, margin: '0 auto', padding: '20px 32px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/" style={{ fontFamily: DISP, fontSize: 15, color: '#111', textDecoration: 'none' }}>
            Yen Tran
          </Link>
          <Link href="/#work" style={{ fontFamily: MONO, fontSize: 10, color: '#bbb', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="hover:text-[#111] transition-colors">
            ← ALL WORK
          </Link>
        </div>
      </header>

      <main style={{ maxWidth: 900, margin: '0 auto', padding: '0 32px' }}>

        {/* Hero */}
        <div style={{ paddingTop: 80, paddingBottom: 56 }}>
          <p style={{ fontFamily: MONO, fontSize: 10, color: '#bbb', letterSpacing: '0.22em', marginBottom: 20 }}>
            02 / ANALYTICAL COMMUNICATION
          </p>
          <h1 style={{
            fontFamily: DISP,
            fontSize: 'clamp(2.4rem, 5vw, 4rem)',
            fontWeight: 800,
            color: '#111',
            lineHeight: 1,
            marginBottom: 20,
          }}>
            Visual Stories
          </h1>
          <p style={{ fontFamily: DISP, fontSize: 'clamp(1rem, 1.8vw, 1.25rem)', fontWeight: 500, color: '#333', marginBottom: 20, maxWidth: '50ch' }}>
            The chart isn&apos;t the point. What you see is.
          </p>
          <p style={{ fontSize: 14, color: '#666', maxWidth: '60ch', lineHeight: 1.75, fontFamily: SANS }}>
            Five exhibits. Each begins with a business situation and a dataset. The same numbers appear in two states —
            technically correct, and analytically communicative. The difference between them is not aesthetics.
            It&apos;s what becomes visible.
          </p>
        </div>

        {/* Story Off / Story On explanation */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 72 }}>
          <div style={{ borderLeft: '2px solid #ece8f0', paddingLeft: 16 }}>
            <p style={{ fontFamily: MONO, fontSize: 9, color: '#bbb', letterSpacing: '0.18em', marginBottom: 8 }}>STORY OFF</p>
            <p style={{ fontSize: 13, color: '#888', lineHeight: 1.65, fontFamily: SANS }}>
              Technically correct. All series shown equally. No hierarchy, no annotation. The signal is present — the reader must find it.
            </p>
          </div>
          <div style={{ borderLeft: `2px solid ${PINK}`, paddingLeft: 16 }}>
            <p style={{ fontFamily: MONO, fontSize: 9, color: PINK, letterSpacing: '0.18em', marginBottom: 8 }}>STORY ON</p>
            <p style={{ fontSize: 13, color: '#555', lineHeight: 1.65, fontFamily: SANS }}>
              Same data. Intentional hierarchy. The finding is made visible — not invented. Color, weight, and annotation direct the reader toward what matters.
            </p>
          </div>
        </div>

        {/* ── Exhibit A ── */}
        <Exhibit
          num="01" category="Customer Economics"
          headline="Customer Acquisition Cost by Market, Quarterly"
          storyOnHeadline="One Market Peaked at Nearly 7× the Acquisition Cost of Its Peers"
          setup="Four regional markets. Same growth targets. The company was acquiring customers — but at very different costs. No single blended metric surfaced the disparity."
          takeaway="Blended CAC per new customer across four regional markets, plotted quarterly. Metro West, Westfield, Lakeshore, and Riverton tracked from Q1 2023 through Q1 2025."
          storyOnTakeaway="Metro West's CAC peaked at $171 in Q3 2024 — nearly 7× Riverton's $23 that quarter. Operational changes brought it to $85 by Q1 2025, a 50% reduction. The finding redirected investment across markets and informed where to expand next."
        >
          {(storyOn) => <CACChart storyOn={storyOn} />}
        </Exhibit>

        {/* ── Exhibit B ── */}
        <Exhibit
          num="02" category="Customer Lifetime Value"
          headline="Cumulative LTV by Acquisition Cohort"
          storyOnHeadline="New Customers Reached the Same Lifetime Value in Half the Time"
          setup="Four acquisition cohorts, tracked across equivalent customer lifetimes. Management saw aggregate LTV rising. The question was whether the business had changed — or whether the customers had."
          takeaway="Cumulative lifetime value per customer by acquisition cohort, tracked across eight quarters from first visit. 2021, 2022, 2023, and 2024 cohorts shown."
          storyOnTakeaway="The 2024 cohort reached $190 cumulative LTV by Q3 — the same level the 2021 cohort required seven quarters to achieve. Faster ramp means earlier payback, lower CAC breakeven, and higher tolerance for acquisition investment on the newest customers."
        >
          {(storyOn) => <LTVChart storyOn={storyOn} />}
        </Exhibit>

        {/* ── Exhibit C ── */}
        <Exhibit
          num="03" category="Voice of Customer"
          headline="Customer Review Themes by Frequency"
          storyOnHeadline="What Thousands of Customer Reviews Revealed About Loyalty"
          setup="Over 8,000 Google reviews from repeat customers. The company knew its ratings. It did not know what those ratings were actually measuring."
          takeaway="Recurring customer review themes extracted from 8,200+ verified reviews. Circle area is proportional to theme frequency across the sample."
          storyOnTakeaway="Service quality — especially responsiveness and resolution — dominated review language for repeat customers. Product consistency came second. Price barely registered. Loyalty was not being purchased with discounts; it was being earned through reliability."
        >
          {(storyOn) => <BubbleChart storyOn={storyOn} />}
        </Exhibit>

        {/* ── Exhibit D ── */}
        <Exhibit
          num="04" category="Competitive Positioning"
          headline="Competitive Assortment: Absolute vs. Relative Ranking"
          storyOnHeadline="The Smallest Assortment Was Winning on Concentration"
          setup="Seven competitors in a specialty retail category. The conventional analysis ranked them by SKU count. A different question — how focused is each assortment? — produced a completely different picture."
          takeaway="Seven competitors ranked by two measures: total SKU count (left) and percentage of SKUs in the focal category (right). Lines connect each competitor's rank across both dimensions."
          storyOnTakeaway="Vela ranked sixth by absolute SKU count. By share of category SKUs, it ranked first — with 28% of its assortment concentrated in the focal category, versus CoreBrand's 3% despite having five times as many total SKUs. Concentration, not scale, was the differentiator."
        >
          {(storyOn) => <SlopeChart storyOn={storyOn} />}
        </Exhibit>

        {/* ── Exhibit E ── */}
        <Exhibit
          num="05" category="Customer Retention"
          headline="Customer Retention Rate by Quarter Since Acquisition"
          storyOnHeadline="The Retention Problem Was Concentrated in the First Two Quarters"
          setup="A subscription product with declining retention. The team had been building engagement features to address it. The data showed something simpler."
          takeaway="Customer retention rate by quarter since acquisition, cohort-averaged across the trailing four quarters. Q0 represents 100% of the acquired cohort."
          storyOnTakeaway="42 percentage points of churn occurred in the first two quarters. After Q2, the retention curve became nearly flat — stabilizing around 46%. The problem was not long-term disengagement. It was an early experience that most customers did not survive."
        >
          {(storyOn) => <RetentionChart storyOn={storyOn} />}
        </Exhibit>

        {/* Disclosure */}
        <div style={{ paddingTop: 40, paddingBottom: 56, borderTop: '1px solid #ece8f0' }}>
          <p style={{ fontSize: 11, color: '#ccc', lineHeight: 1.6, fontFamily: MONO, maxWidth: '64ch' }}>
            Illustrative data. Visualizations adapted from professional analytical work. All company names, markets,
            figures, and identifying details have been replaced with synthetic equivalents for confidentiality.
            No actual client data is reproduced.
          </p>
        </div>

        {/* Footer nav */}
        <div style={{ paddingBottom: 60, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Link href="/#work" style={{ fontFamily: MONO, fontSize: 10, color: '#bbb', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="hover:text-[#111] transition-colors">
            ← ALL WORK
          </Link>
          <Link href="/work/luma-live" style={{ fontFamily: MONO, fontSize: 10, color: '#bbb', letterSpacing: '0.15em', textDecoration: 'none' }}
            className="hover:text-[#e8578a] transition-colors">
            01 · LUMA LIVE →
          </Link>
        </div>
      </main>
    </div>
  )
}
