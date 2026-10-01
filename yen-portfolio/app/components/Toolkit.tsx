import FadeIn from "./FadeIn";

const categories = [
  {
    label: "Investing & Finance",
    items: [
      "Financial Modeling",
      "Valuation",
      "DCF",
      "Comparable Companies",
      "LBO",
      "Investment Research",
      "Due Diligence",
      "Investment Memoranda",
      "Market Research",
    ],
  },
  {
    label: "Analytics",
    items: ["Python", "R", "SQL", "Stata", "Excel", "pandas", "Data Wrangling", "Statistical Analysis"],
  },
  {
    label: "Visualization & BI",
    items: ["Power BI", "Tableau", "Data Visualization", "Business Intelligence", "Dashboard Design"],
  },
  {
    label: "AI & Automation",
    items: [
      "AI-assisted analysis",
      "Workflow automation",
      "LLM-based research",
      "Prompt engineering",
      "Automated reporting",
    ],
  },
];

export default function Toolkit() {
  return (
    <section id="skills" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <FadeIn direction="left">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
              04 — Toolkit
            </p>
            <h2
              className="text-4xl font-serif font-medium text-[#1A1517] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Skills &amp; Tools
            </h2>
            <p className="text-[#7A757B] text-sm mt-4 leading-relaxed max-w-xs">
              Organized by domain rather than proficiency — the most useful tools are
              the ones deployed together.
            </p>
          </div>
        </FadeIn>

        <div className="grid sm:grid-cols-2 gap-8">
          {categories.map((cat, i) => (
            <FadeIn key={cat.label} delay={i * 0.1}>
              <div>
                <p className="font-mono text-[10px] tracking-[0.2em] text-[#AFA9B1] uppercase mb-4">
                  {cat.label}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.items.map((item) => (
                    <span
                      key={item}
                      className="text-xs px-3 py-1.5 bg-[#FDFCFA] text-[#3E3840] rounded-sm border border-[#EDEBE9] hover:border-[#6A4D67] hover:text-[#6A4D67] transition-colors cursor-default"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
