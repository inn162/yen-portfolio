"use client";
import {
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
} from "recharts";
import { useState } from "react";

const radarData = [
  { skill: "Finance",    value: 90 },
  { skill: "Python",     value: 82 },
  { skill: "Statistics", value: 85 },
  { skill: "SQL",        value: 75 },
  { skill: "ML/AI",      value: 78 },
  { skill: "Data Viz",   value: 80 },
];

const barData = [
  { name: "Python",     value: 82 },
  { name: "R",          value: 70 },
  { name: "SQL",        value: 75 },
  { name: "Excel/VBA",  value: 88 },
  { name: "Tableau",    value: 72 },
  { name: "TypeScript", value: 65 },
  { name: "LLM APIs",   value: 76 },
];

// Plum → dusty rose → lavender gradient for bars
const barColors = [
  "#6A4D67", "#7B5778", "#8D6289", "#9E6D8A", "#B0788B", "#BE8099", "#C9BECA",
];

const categories = [
  { label: "Finance",        items: ["Financial Modeling", "Valuation (DCF, LBO)", "Private Equity", "Investment Analysis", "Bloomberg Terminal"] },
  { label: "Data & Analytics", items: ["Python (pandas, sklearn)", "R", "SQL", "Tableau", "Data Wrangling"] },
  { label: "AI & ML",        items: ["Machine Learning", "NLP / LLMs", "scikit-learn", "Feature Engineering", "Model Evaluation"] },
  { label: "Tools",          items: ["Git & GitHub", "Excel / VBA", "PowerPoint", "VS Code", "Jupyter"] },
];

export default function Skills() {
  const [view, setView] = useState<"radar" | "bar">("radar");

  return (
    <section id="skills" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-[#BE8099] tracking-widest">03</span>
        <h2 className="text-3xl font-bold text-[#1A1517] tracking-tight">Skills</h2>
      </div>
      <div className="w-8 h-px bg-[#BE8099] mb-12 ml-10" />

      <div className="grid md:grid-cols-2 gap-12 items-start">
        {/* Chart card */}
        <div className="bg-[#FDFCFA] rounded-xl p-6 border border-[#EDE9EB]">
          <div className="flex items-center justify-between mb-6">
            <p className="text-[#79747A] text-xs font-mono tracking-wide uppercase">Proficiency overview</p>
            <div className="flex gap-1 bg-[#F7F4F0] rounded-lg p-1 border border-[#EDE9EB]">
              {(["radar", "bar"] as const).map((v) => (
                <button
                  key={v}
                  onClick={() => setView(v)}
                  className={`text-xs px-3 py-1.5 rounded capitalize transition-all ${
                    view === v
                      ? "bg-[#6A4D67] text-white shadow-sm"
                      : "text-[#B0AAB2] hover:text-[#3E3840]"
                  }`}
                >
                  {v}
                </button>
              ))}
            </div>
          </div>

          {view === "radar" ? (
            <ResponsiveContainer width="100%" height={280}>
              <RadarChart data={radarData}>
                <PolarGrid stroke="#EDE9EB" />
                <PolarAngleAxis dataKey="skill" tick={{ fill: "#79747A", fontSize: 12 }} />
                <Radar
                  dataKey="value"
                  stroke="#6A4D67"
                  fill="#6A4D67"
                  fillOpacity={0.15}
                  strokeWidth={1.5}
                />
              </RadarChart>
            </ResponsiveContainer>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={barData} layout="vertical" margin={{ left: 20 }}>
                <XAxis type="number" domain={[0, 100]} tick={{ fill: "#B0AAB2", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#79747A", fontSize: 12 }} width={80} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#FDFCFA", border: "1px solid #DDD7DA", borderRadius: 8, boxShadow: "0 4px 12px rgba(106,77,103,0.08)" }}
                  labelStyle={{ color: "#1A1517", fontSize: 13 }}
                  itemStyle={{ color: "#6A4D67" }}
                  formatter={(v) => [`${v}%`, "Proficiency"]}
                />
                <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                  {barData.map((_, i) => (
                    <Cell key={i} fill={barColors[i % barColors.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* Skill categories */}
        <div className="grid grid-cols-1 gap-4">
          {categories.map((cat) => (
            <div key={cat.label} className="bg-[#FDFCFA] rounded-xl p-5 border border-[#EDE9EB]">
              <h4 className="text-[#1A1517] font-medium mb-3 text-xs tracking-wide uppercase">{cat.label}</h4>
              <div className="flex flex-wrap gap-2">
                {cat.items.map((item) => (
                  <span
                    key={item}
                    className="text-xs px-2.5 py-1 bg-[#EAE2E8] text-[#6A4D67] rounded border border-[#DDD7DA] hover:bg-[#6A4D67] hover:text-white hover:border-[#6A4D67] transition-all cursor-default"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
