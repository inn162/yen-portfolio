"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import FadeIn from "./FadeIn";

const projects = [
  {
    number: "01",
    title: "AI-Powered Investment Analysis",
    summary:
      "Workflows combining AI tools with investment research to produce sharper, faster investment memoranda.",
    tags: ["AI", "Investing", "Python", "Data Visualization"],
    problem:
      "Investment analysis involves processing large volumes of information — financials, market data, competitor research — that is time-intensive to synthesize manually.",
    approach:
      "Built automated pipelines using LLM-based tools to process company information and generate structured analysis. Combined with custom visualizations to make findings immediately legible.",
    tools: ["Python", "LLM APIs", "Data Visualization", "Excel"],
    outcome:
      "Significantly reduced time spent on first-pass research, allowing more time for judgment and insight rather than data collection.",
  },
  {
    number: "02",
    title: "Monthly Operating Report Platform",
    summary:
      "A reporting system combining event, operating, and transaction-level data to analyze performance, variance, and cash flow.",
    tags: ["Analytics", "Automation", "Finance", "Data Visualization"],
    problem:
      "Management reporting was fragmented across multiple data sources with high manual effort required each cycle.",
    approach:
      "Designed an integrated data model pulling from operating and transaction-level sources. Built automated variance and cash flow views with visual outputs for management review.",
    tools: ["Python", "Excel", "Power BI", "Automation"],
    outcome:
      "Replaced a largely manual reporting process with an automated system, reducing reporting time and improving analytical depth.",
  },
  {
    number: "03",
    title: "Investment Research — Vietnam Markets",
    summary:
      "Investment memoranda and preliminary investment briefs across companies and industries in Vietnam.",
    tags: ["Private Equity", "Due Diligence", "Valuation"],
    problem:
      "Target companies operated in unfamiliar industries with limited public information, requiring bottom-up research from primary sources.",
    approach:
      "Conducted market, competitor, and distributor research. Built structured investment frameworks and wrote comprehensive memoranda presenting findings and investment rationale.",
    tools: ["Financial Modeling", "Excel", "Research", "Writing"],
    outcome:
      "Delivered ~40-page investment memorandum used in active deal evaluation process.",
  },
  {
    number: "04",
    title: "Financial Modeling",
    summary:
      "Operating models, five-year forecasts, scenario analyses, and return analyses for PE due diligence.",
    tags: ["Financial Modeling", "Strategy", "Investing"],
    problem:
      "Evaluating investment opportunities requires rigorous financial models that can test assumptions and generate credible return scenarios.",
    approach:
      "Built integrated operating and financial models from the ground up, incorporating revenue drivers, cost structure, working capital, and debt schedules with linked scenario analysis.",
    tools: ["Excel", "VBA", "Financial Modeling"],
    outcome:
      "Models used directly in investment committee presentations and deal evaluation.",
  },
  {
    number: "05",
    title: "Data Visualization & Business Intelligence",
    summary:
      "Dashboards and visual analyses translating business performance data into clear management views.",
    tags: ["Power BI", "Analytics", "Business Intelligence"],
    problem:
      "Raw operational data was not structured in a way that was useful for management decision-making.",
    approach:
      "Designed Power BI dashboards with clean visual hierarchies, tracking KPIs, trends, and variance across business units.",
    tools: ["Power BI", "Data Analysis", "Business Intelligence"],
    outcome:
      "Adopted as the standard management reporting format across the business.",
  },
];

export default function Work() {
  const [expanded, setExpanded] = useState<number | null>(null);

  return (
    <section id="work" className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn direction="left">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
          03 — Selected Work
        </p>
        <h2
          className="text-4xl font-serif font-medium text-[#1A1517] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Projects
        </h2>
        <p className="text-[#7A757B] text-sm mb-16 max-w-lg">
          A selection of work across investing, analytics, and AI automation. Click any project for details.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p, i) => (
          <FadeIn key={i} delay={i * 0.08}>
            <motion.div
              layout
              className={`border rounded-sm overflow-hidden transition-colors duration-300 cursor-pointer ${
                expanded === i
                  ? "border-[#6A4D67] bg-[#FDFCFA]"
                  : "border-[#EDEBE9] bg-[#FDFCFA] hover:border-[#C9BEC9]"
              }`}
              onClick={() => setExpanded(expanded === i ? null : i)}
              role="button"
              aria-expanded={expanded === i}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <span className="font-mono text-[10px] text-[#AFA9B1] tracking-widest">
                    {p.number}
                  </span>
                  <ArrowUpRight
                    size={14}
                    className={`text-[#AFA9B1] transition-transform duration-300 ${
                      expanded === i ? "rotate-90 text-[#6A4D67]" : ""
                    }`}
                  />
                </div>

                {/* Image placeholder */}
                <div className="w-full h-32 bg-[#EAE2E8] rounded-sm mb-5 flex items-center justify-center border border-dashed border-[#C9BEC9]">
                  <p className="font-mono text-[9px] text-[#AFA9B1] tracking-widest text-center px-4">
                    [ Add project visual ]
                  </p>
                </div>

                <h3 className="text-[#1A1517] font-medium text-sm mb-2 leading-snug">
                  {p.title}
                </h3>
                <p className="text-[#7A757B] text-xs leading-relaxed mb-4">
                  {p.summary}
                </p>

                <div className="flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="text-[10px] px-2 py-0.5 bg-[#EAE2E8] text-[#6A4D67] rounded-sm">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Expandable detail */}
              <AnimatePresence initial={false}>
                {expanded === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-6 border-t border-[#EDEBE9] pt-5 space-y-4">
                      <div>
                        <p className="font-mono text-[9px] tracking-widest text-[#AFA9B1] uppercase mb-1.5">
                          Problem
                        </p>
                        <p className="text-[#3E3840] text-xs leading-relaxed">{p.problem}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] tracking-widest text-[#AFA9B1] uppercase mb-1.5">
                          Approach
                        </p>
                        <p className="text-[#3E3840] text-xs leading-relaxed">{p.approach}</p>
                      </div>
                      <div>
                        <p className="font-mono text-[9px] tracking-widest text-[#AFA9B1] uppercase mb-1.5">
                          Outcome
                        </p>
                        <p className="text-[#3E3840] text-xs leading-relaxed">{p.outcome}</p>
                      </div>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {p.tools.map((t) => (
                          <span key={t} className="text-[10px] px-2 py-0.5 border border-[#DDD8DA] text-[#7A757B] rounded-sm">
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
