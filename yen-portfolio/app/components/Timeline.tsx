"use client";
import { useState } from "react";

const items = [
  {
    year: "2023",
    title: "Started at UVA",
    subtitle: "University of Virginia",
    description:
      "Began double degree at McIntire School of Commerce (Finance + AI & Analytics) and College of Arts & Sciences (Applied Statistics — Data Science concentration).",
    type: "education",
  },
  {
    year: "2024",
    title: "First Analytics Internship",
    subtitle: "Data Analytics Team",
    description:
      "Built dashboards and automated reporting pipelines. First hands-on experience applying Python and Tableau to real business problems.",
    type: "work",
  },
  {
    year: "2024",
    title: "AI Research Project",
    subtitle: "UVA McIntire",
    description:
      "Built an NLP pipeline to extract financial signals from earnings call transcripts. Presented at McIntire research symposium.",
    type: "project",
  },
  {
    year: "2025",
    title: "Private Equity Internship",
    subtitle: "PE Firm",
    description:
      "Conducted due diligence, built LBO models, and contributed to deal sourcing. Deepened conviction in data-driven investment analysis.",
    type: "work",
  },
  {
    year: "2027",
    title: "Expected Graduation",
    subtitle: "B.S. Commerce + B.A. Statistics",
    description:
      "On track to graduate May 2027 with dual degrees in Finance/AI and Applied Statistics.",
    type: "education",
  },
];

const typeStyle: Record<string, { dot: string; label: string; labelColor: string }> = {
  education: { dot: "bg-[#6A4D67]",   label: "Education",  labelColor: "text-[#6A4D67]" },
  work:      { dot: "bg-[#BE8099]",   label: "Work",       labelColor: "text-[#BE8099]" },
  project:   { dot: "bg-[#C9BECA]",   label: "Project",    labelColor: "text-[#79747A]"  },
};

export default function Timeline() {
  const [hovered, setHovered] = useState<number | null>(null);

  return (
    <section id="timeline" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-[#BE8099] tracking-widest">02</span>
        <h2 className="text-3xl font-bold text-[#1A1517] tracking-tight">Journey</h2>
      </div>
      <div className="w-8 h-px bg-[#BE8099] mb-6 ml-10" />

      <div className="flex gap-5 mb-12 text-xs text-[#B0AAB2] ml-10">
        {Object.entries(typeStyle).map(([type, s]) => (
          <span key={type} className="flex items-center gap-1.5 capitalize">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            {s.label}
          </span>
        ))}
      </div>

      <div className="relative">
        <div className="absolute left-6 top-0 bottom-0 w-px bg-[#DDD7DA]" />
        <div className="space-y-7">
          {items.map((item, i) => {
            const s = typeStyle[item.type];
            return (
              <div
                key={i}
                className="relative flex gap-8 cursor-default"
                onMouseEnter={() => setHovered(i)}
                onMouseLeave={() => setHovered(null)}
              >
                <div className="relative z-10 shrink-0">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center text-xs font-bold text-white transition-transform duration-200 ${s.dot} ${
                      hovered === i ? "scale-110 shadow-md" : ""
                    }`}
                  >
                    {item.year.slice(2)}
                  </div>
                </div>
                <div
                  className={`flex-1 bg-[#FDFCFA] rounded-xl p-5 border transition-all duration-200 ${
                    hovered === i
                      ? "border-[#C9BECA] shadow-sm"
                      : "border-[#EDE9EB]"
                  }`}
                >
                  <div className="flex items-start justify-between mb-1">
                    <h3 className="text-[#1A1517] font-semibold text-sm">{item.title}</h3>
                    <span className="text-xs text-[#B0AAB2] font-mono">{item.year}</span>
                  </div>
                  <p className={`text-xs mb-2 font-medium ${s.labelColor}`}>{item.subtitle}</p>
                  <p className="text-[#79747A] text-sm leading-relaxed">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
