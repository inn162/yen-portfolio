import Link from "next/link";

export default function Education() {
  return (
    <section id="education" className="bg-white border-t border-[#e8e8e8] px-[5.5vw] py-20">
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em", marginBottom: "2rem" }}>
        EDUCATION
      </p>

      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0 mb-8">
        <h2
          className="font-bold text-[#111] md:mr-16"
          style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
        >
          University of Virginia
        </h2>
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.15em" }}>
          CLASS OF 2027
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 max-w-2xl">
        <div className="border-l-2 border-[#e8578a] pl-5">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaa", letterSpacing: "0.15em", marginBottom: 8 }}>
            MCINTIRE SCHOOL OF COMMERCE
          </p>
          <p className="font-bold text-[#111] mb-2" style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "1.2rem" }}>
            Commerce
          </p>
          <p className="text-[13px] text-[#666] font-light">Finance concentration</p>
          <p className="text-[13px] text-[#666] font-light">AI &amp; Analytics track</p>
        </div>

        <div className="border-l-2 border-[#c4b5e8] pl-5">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaa", letterSpacing: "0.15em", marginBottom: 8 }}>
            COLLEGE OF ARTS &amp; SCIENCES
          </p>
          <p className="font-bold text-[#111] mb-2" style={{ fontFamily: "'Amulya', var(--font-display)", fontSize: "1.2rem" }}>
            Applied Statistics
          </p>
          <p className="text-[13px] text-[#666] font-light">Data Science concentration</p>
        </div>
      </div>

      {/* Current coursework */}
      <div className="mt-16">
        <div className="flex items-center gap-3 mb-8">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
            CURRENT COURSEWORK
          </p>
          <span
            className="text-[9px] tracking-widest px-2 py-0.5 rounded-sm"
            style={{ fontFamily: "var(--font-mono)", background: "#fff5f8", color: "#e8578a", border: "1px solid #f5ccd8" }}
          >
            IN PROGRESS
          </span>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
          {[
            { name: "Foundations of ML/AI", tools: ["Python", "Anaconda", "VS Code", "Claude Code", "Git / GitHub"], color: "#e8578a" },
            { name: "Market Research & Analytic Tech", tools: ["Qualtrics", "Sawtooth", "Claude"], color: "#e8578a" },
            { name: "Statistical Machine Learning", tools: ["R"], color: "#c4b5e8" },
          ].map((course) => (
            <div key={course.name} className="border-l border-dashed pl-5" style={{ borderColor: course.color }}>
              <p className="text-[13px] text-[#111] font-light leading-snug mb-3">{course.name}</p>
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#bbb", letterSpacing: "0.1em" }}>
                {course.tools.join(" · ")}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Prior coursework */}
      <div className="mt-12">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em", marginBottom: "2rem" }}>
          RELEVANT PRIOR COURSEWORK
        </p>
        <div className="grid md:grid-cols-3 gap-8 max-w-3xl">
          {[
            {
              name: "Data Mgmt for Decision Making",
              tools: ["SQL", "Tableau", "Miro"],
              color: "#e8578a",
              projects: [{ slug: "student-club-db", label: "Student Club DB" }],
            },
            {
              name: "Strategic Value Creation",
              tools: ["PowerPoint", "Excel", "Figma", "Tableau", "Canva", "Claude Code"],
              color: "#e8578a",
              projects: [
                { slug: "road-ready-bundle", label: "CarMax" },
                { slug: "ebay-entrupy", label: "eBay" },
                { slug: "michelin-strategy", label: "Michelin" },
              ],
            },
            {
              name: "Intro to Regression Analysis",
              tools: ["R"],
              color: "#c4b5e8",
              projects: [],
            },
          ].map((course) => (
            <div key={course.name} className="border-l border-dashed pl-5 flex flex-col" style={{ borderColor: course.color }}>
              <p className="text-[13px] text-[#111] font-light leading-snug mb-2">{course.name}</p>
              {course.tools.length > 0 && (
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#bbb", letterSpacing: "0.1em" }}>
                  {course.tools.join(" · ")}
                </p>
              )}
              <div className="mt-auto pt-2">
                {course.projects.length > 0 && (
                  <div className="flex flex-row flex-nowrap gap-4">
                    {course.projects.map((p) => (
                      <Link
                        key={p.slug}
                        href={`/work/${p.slug}`}
                        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.15em", color: course.color, opacity: 0.8, display: "inline", whiteSpace: "nowrap" }}
                        className="hover:opacity-100 transition-opacity"
                      >
                        {p.label} →
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
