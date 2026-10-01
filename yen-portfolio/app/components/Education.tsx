export default function Education() {
  return (
    <section id="education" className="bg-white border-t border-[#e8e8e8] px-[5.5vw] py-20">
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em", marginBottom: "2rem" }}>
        EDUCATION
      </p>

      <div className="flex flex-col md:flex-row md:items-baseline gap-4 md:gap-0 mb-8">
        <h2
          className="font-bold text-[#111] md:mr-16"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.6rem, 3vw, 2.8rem)" }}
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
          <p className="font-bold text-[#111] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            Commerce
          </p>
          <p className="text-[13px] text-[#666] font-light">Finance concentration</p>
          <p className="text-[13px] text-[#666] font-light">AI &amp; Analytics track</p>
        </div>

        <div className="border-l-2 border-[#c4b5e8] pl-5">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#aaa", letterSpacing: "0.15em", marginBottom: 8 }}>
            COLLEGE OF ARTS &amp; SCIENCES
          </p>
          <p className="font-bold text-[#111] mb-2" style={{ fontFamily: "var(--font-display)", fontSize: "1.2rem" }}>
            Applied Statistics
          </p>
          <p className="text-[13px] text-[#666] font-light">Data Science concentration</p>
        </div>
      </div>
    </section>
  );
}
