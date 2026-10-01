"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import FadeIn from "./FadeIn";

const experiences = [
  {
    company: "20in20 Partners",
    role: "Investment & AI Automation Intern",
    period: "Summer 2026",
    location: "Vietnam",
    description:
      "Investment analysis and reporting for a fund focused on emerging business opportunities in Vietnam. Built automated workflows combining AI tools with investment analysis and visualization.",
    bullets: [
      "Conducted investment analysis and company research across multiple sectors in Vietnam",
      "Prepared investment memoranda and preliminary investment briefs",
      "Built financial and operating analyses for portfolio companies",
      "Developed automated data analysis and reporting workflows using AI",
      "Built reporting tools integrating operating and transaction-level data",
      "Helped reduce repetitive reporting and analysis time significantly",
    ],
    tags: ["Investment Analysis", "AI Automation", "Financial Modeling", "Vietnam"],
  },
  {
    company: "Asia Business Builder",
    role: "Private Equity Intern",
    period: "2025",
    location: "Vietnam",
    description:
      "Private equity investment analysis focused on mid-market businesses across Vietnam, including full investment memorandum preparation and financial modeling.",
    bullets: [
      "Prepared a ~40-page investment and company information memorandum",
      "Built five-year financial models with scenario analysis",
      "Conducted commercial due diligence across target markets",
      "Performed market and distributor research to validate business assumptions",
    ],
    tags: ["Private Equity", "Due Diligence", "Financial Modeling", "Investment Memo"],
  },
  {
    company: "Portico Impact Fund",
    role: "Investment Analyst — Healthcare",
    period: "2024–2025",
    location: "UVA",
    description:
      "Student-run investment fund covering the healthcare sector. Responsible for investment research, company analysis, and sector coverage.",
    bullets: [
      "Led healthcare sector coverage including equity research and company analysis",
      "Presented investment recommendations to fund committee",
      "Monitored portfolio positions and tracked sector developments",
    ],
    tags: ["Equity Research", "Healthcare", "Investment Analysis"],
  },
  {
    company: "MB Securities",
    role: "Analyst Intern",
    period: "Summer 2024",
    location: "Vietnam",
    description:
      "Equity research and financial analysis at one of Vietnam's leading securities firms.",
    bullets: [
      "Supported equity research across publicly listed Vietnamese companies",
      "Conducted financial analysis and valuation work",
      "Assisted with client-facing research reports",
    ],
    tags: ["Equity Research", "Valuation", "Financial Analysis"],
  },
  {
    company: "KPIM Retail",
    role: "Data Analytics Intern",
    period: "2024",
    location: "Vietnam",
    description:
      "Data analytics and business intelligence for a retail business, focusing on dashboard development and performance reporting.",
    bullets: [
      "Built Power BI dashboards to track key retail performance metrics",
      "Designed visual reports for management decision-making",
      "Analyzed sales and operational data to identify trends and insights",
    ],
    tags: ["Power BI", "Data Analytics", "Business Intelligence", "Dashboards"],
  },
];

export default function Experience() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="experience" className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn direction="left">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
          02 — Experience
        </p>
        <h2
          className="text-4xl font-serif font-medium text-[#1A1517] mb-16 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Where I&apos;ve Worked
        </h2>
      </FadeIn>

      <div className="space-y-0 border-t border-[#EDEBE9]">
        {experiences.map((exp, i) => (
          <FadeIn key={i} delay={i * 0.07}>
            <div className="border-b border-[#EDEBE9]">
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full text-left py-6 group"
                aria-expanded={open === i}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-baseline gap-5 min-w-0">
                    <span className="font-mono text-[10px] text-[#AFA9B1] tracking-widest shrink-0">
                      0{i + 1}
                    </span>
                    <div className="min-w-0">
                      <span className="text-[#1A1517] font-medium text-base group-hover:text-[#6A4D67] transition-colors">
                        {exp.company}
                      </span>
                      <span className="text-[#7A757B] text-sm ml-3">
                        {exp.role}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-5 shrink-0">
                    <span className="font-mono text-xs text-[#AFA9B1] hidden sm:block">
                      {exp.period}
                    </span>
                    <span
                      className={`text-[#AFA9B1] transition-transform duration-300 ${
                        open === i ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  </div>
                </div>
              </button>

              <AnimatePresence initial={false}>
                {open === i && (
                  <motion.div
                    key="content"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pb-8 pl-9 grid md:grid-cols-[2fr_1fr] gap-8">
                      <div>
                        <p className="text-[#7A757B] text-sm leading-relaxed mb-5">
                          {exp.description}
                        </p>
                        <ul className="space-y-2">
                          {exp.bullets.map((b, j) => (
                            <li key={j} className="flex gap-3 text-[#3E3840] text-sm leading-relaxed">
                              <span className="text-[#BE8099] shrink-0 mt-[5px] text-[8px]">◆</span>
                              {b}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div className="space-y-3">
                        <p className="font-mono text-[10px] tracking-widest text-[#AFA9B1] uppercase">
                          {exp.location} · {exp.period}
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {exp.tags.map((t) => (
                            <span
                              key={t}
                              className="text-[11px] px-2.5 py-1 bg-[#EAE2E8] text-[#6A4D67] rounded-sm border border-[#DDD8DA]"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
