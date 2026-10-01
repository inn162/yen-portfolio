"use client";
import { useState } from "react";
import { ExternalLink, GitBranch } from "lucide-react";

const projects = [
  {
    title: "Earnings Signal Extractor",
    description:
      "NLP pipeline that processes earnings call transcripts to extract key financial signals. Uses transformer-based models to identify sentiment, guidance, and risk factors.",
    tags: ["Python", "NLP", "Finance", "Transformers"],
    category: "AI/ML",
    github: "#",
    live: null,
    featured: true,
  },
  {
    title: "Portfolio Analytics Dashboard",
    description:
      "Interactive dashboard for portfolio performance analysis. Tracks returns, Sharpe ratio, drawdowns, and sector exposure with live-updating charts.",
    tags: ["Python", "Dash", "Finance", "Data Viz"],
    category: "Finance",
    github: "#",
    live: "#",
    featured: true,
  },
  {
    title: "Macro Indicator Tracker",
    description:
      "Automated data pipeline that pulls macro indicators (CPI, yields, PMI) from public APIs and generates weekly summary reports with trend analysis.",
    tags: ["Python", "APIs", "Automation", "Statistics"],
    category: "Data",
    github: "#",
    live: null,
    featured: true,
  },
  {
    title: "LBO Model Template",
    description:
      "Comprehensive LBO model built in Excel with automated sensitivity analysis. Includes management rollover, debt waterfall, and IRR bridge.",
    tags: ["Excel", "VBA", "Finance", "Private Equity"],
    category: "Finance",
    github: null,
    live: "#",
    featured: false,
  },
  {
    title: "Stock Screener",
    description:
      "Python-based stock screener using fundamental and technical filters. Pulls data from financial APIs and ranks stocks by custom scoring factors.",
    tags: ["Python", "Finance", "APIs", "pandas"],
    category: "AI/ML",
    github: "#",
    live: null,
    featured: false,
  },
];

const categories = ["All", "Finance", "AI/ML", "Data"];

export default function Projects() {
  const [filter, setFilter] = useState("All");

  const filtered =
    filter === "All" ? projects : projects.filter((p) => p.category === filter);

  return (
    <section id="projects" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-[#BE8099] tracking-widest">04</span>
        <h2 className="text-3xl font-bold text-[#1A1517] tracking-tight">Projects</h2>
      </div>
      <div className="w-8 h-px bg-[#BE8099] mb-8 ml-10" />

      <div className="flex gap-2 mb-10 flex-wrap ml-10">
        {categories.map((c) => (
          <button
            key={c}
            onClick={() => setFilter(c)}
            className={`text-xs px-4 py-1.5 rounded-full border transition-all ${
              filter === c
                ? "bg-[#6A4D67] border-[#6A4D67] text-white"
                : "border-[#DDD7DA] text-[#79747A] hover:border-[#6A4D67] hover:text-[#6A4D67]"
            }`}
          >
            {c}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filtered.map((p, i) => (
          <div
            key={i}
            className="group bg-[#FDFCFA] rounded-xl p-6 border border-[#EDE9EB] hover:border-[#C9BECA] transition-all duration-200 hover:shadow-md hover:shadow-[#6A4D67]/6 flex flex-col"
          >
            {p.featured && (
              <span className="text-[10px] text-[#BE8099] font-mono tracking-widest uppercase mb-3">
                Featured
              </span>
            )}
            <div className="flex items-start justify-between mb-3">
              <h3 className="text-[#1A1517] font-semibold text-sm group-hover:text-[#6A4D67] transition-colors leading-snug">
                {p.title}
              </h3>
              <div className="flex gap-3 shrink-0 ml-2">
                {p.github && (
                  <a href={p.github} className="text-[#C9BECA] hover:text-[#6A4D67] transition-colors">
                    <GitBranch size={15} />
                  </a>
                )}
                {p.live && (
                  <a href={p.live} className="text-[#C9BECA] hover:text-[#6A4D67] transition-colors">
                    <ExternalLink size={15} />
                  </a>
                )}
              </div>
            </div>
            <p className="text-[#79747A] text-sm leading-relaxed mb-5 flex-1">{p.description}</p>
            <div className="flex flex-wrap gap-1.5 mt-auto">
              {p.tags.map((t) => (
                <span
                  key={t}
                  className="text-[11px] px-2 py-0.5 bg-[#EAE2E8] text-[#6A4D67] rounded"
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
