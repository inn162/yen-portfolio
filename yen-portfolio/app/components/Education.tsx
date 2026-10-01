import FadeIn from "./FadeIn";

const degrees = [
  {
    institution: "University of Virginia",
    school: "McIntire School of Commerce",
    degree: "Bachelor of Science in Commerce",
    concentrations: ["Finance", "AI & Analytics"],
    period: "2023 — 2027",
    note: "Expected May 2027",
  },
  {
    institution: "University of Virginia",
    school: "College of Arts & Sciences",
    degree: "Bachelor of Arts in Applied Statistics",
    concentrations: ["Data Science"],
    period: "2023 — 2027",
    note: "Expected May 2027",
  },
];

export default function Education() {
  return (
    <section id="education" className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn direction="left">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
          05 — Education
        </p>
        <h2
          className="text-4xl font-serif font-medium text-[#1A1517] mb-16 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          University of Virginia
        </h2>
      </FadeIn>

      <div className="grid md:grid-cols-2 gap-6">
        {degrees.map((d, i) => (
          <FadeIn key={i} delay={i * 0.12}>
            <div className="bg-[#FDFCFA] border border-[#EDEBE9] rounded-sm p-8 hover:border-[#C9BEC9] transition-colors">
              <p className="font-mono text-[10px] tracking-widest text-[#AFA9B1] uppercase mb-5">
                {d.period}
              </p>
              <h3
                className="text-xl font-serif font-medium text-[#1A1517] mb-1 leading-snug"
                style={{ fontFamily: "var(--font-playfair)" }}
              >
                {d.degree}
              </h3>
              <p className="text-[#6A4D67] text-sm mb-4">{d.school}</p>
              <div className="flex flex-wrap gap-2 mb-6">
                {d.concentrations.map((c) => (
                  <span
                    key={c}
                    className="text-xs px-2.5 py-1 bg-[#EAE2E8] text-[#6A4D67] rounded-sm border border-[#DDD8DA]"
                  >
                    {c}
                  </span>
                ))}
              </div>

              {/* Placeholders */}
              <div className="border-t border-[#EDEBE9] pt-5 space-y-3">
                <div>
                  <p className="font-mono text-[9px] tracking-widest text-[#AFA9B1] uppercase mb-1.5">
                    Relevant Coursework
                  </p>
                  <p className="text-xs text-[#C9BEC9] italic">Add coursework here</p>
                </div>
                <div>
                  <p className="font-mono text-[9px] tracking-widest text-[#AFA9B1] uppercase mb-1.5">
                    Activities &amp; Awards
                  </p>
                  <p className="text-xs text-[#C9BEC9] italic">Add activities here</p>
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </section>
  );
}
