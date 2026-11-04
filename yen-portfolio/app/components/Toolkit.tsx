const categories = [
  {
    label: "ANALYSIS & DATA",
    tools: ["Python", "R", "SQL", "Stata"],
    accent: "#e8578a",
  },
  {
    label: "VISUALIZATION & RESEARCH",
    tools: ["Tableau", "Power BI", "Qualtrics"],
    accent: "#c4b5e8",
  },
  {
    label: "FINANCE",
    tools: ["Excel", "Capital IQ"],
    accent: "#e8578a",
  },
  {
    label: "AI & DEVELOPMENT",
    tools: ["Claude Code", "VS Code", "Git / GitHub"],
    accent: "#c4b5e8",
  },
];

export default function Toolkit() {
  return (
    <section id="toolkit" className="bg-white border-t border-[#e8e8e8] px-[5.5vw] py-20">
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em", marginBottom: "2.5rem" }}>
        TOOLKIT
      </p>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-10">
        {categories.map((cat) => (
          <div key={cat.label}>
            <div className="flex items-center gap-3 mb-5">
              <span className="block w-4 h-[2px]" style={{ background: cat.accent }} />
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaa", letterSpacing: "0.18em" }}>
                {cat.label}
              </p>
            </div>
            <ul className="flex flex-col gap-2.5">
              {cat.tools.map((tool) => (
                <li
                  key={tool}
                  className="text-[#333] font-light"
                  style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 1.4vw, 1.25rem)" }}
                >
                  {tool}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
