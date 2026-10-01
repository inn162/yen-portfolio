export default function About() {
  return (
    <section id="about" className="px-[5.5vw] py-24 border-t border-[#e8e8e8] max-w-3xl">
      <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em", marginBottom: "1.5rem" }}>
        ABOUT
      </p>
      <p className="text-[18px] text-[#111] leading-relaxed font-light mb-4">
        I grew up in Vietnam and now study Commerce and Applied Statistics at UVA. My work has taken me across private equity, securities research, data analytics, and AI automation.
      </p>
      <p className="text-[15px] text-[#666] leading-relaxed font-light">
        I&apos;m drawn to problems at the edge of finance and technology — where the data already exists but the insight hasn&apos;t been built yet.
      </p>
    </section>
  );
}
