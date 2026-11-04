export default function About() {
  return (
    <section id="about" className="px-[5.5vw] pt-16 pb-20 border-t border-[#e8e8e8]">
      <p
        className="mb-8"
        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#ddd", letterSpacing: "0.22em" }}
      >
        ABOUT
      </p>

      <div className="flex flex-col md:flex-row md:items-start gap-8 md:gap-12">
        <h2
          className="font-bold text-[#111] leading-tight md:flex-1"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1.7rem, 4vw, 4rem)" }}
        >
          <span className="block">I grew up in Vietnam</span>
          <span className="block">before moving across</span>
          <span className="block">the world to UVA.</span>
        </h2>

        <div className="flex flex-col gap-3 md:w-44 md:shrink-0 md:pt-1">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.18em", lineHeight: "1.7" }}>
            FOURTH YEAR<br />UNIVERSITY OF VIRGINIA
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.18em", lineHeight: "1.7" }}>
            COMMERCE<br />+ APPLIED STATISTICS
          </p>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.18em", lineHeight: "1.7" }}>
            FINANCE<br />+ AI &amp; ANALYTICS
          </p>
        </div>
      </div>

      <p
        className="mt-10 md:mt-12 text-[15px] text-[#666] leading-relaxed font-light"
        style={{ maxWidth: "60ch" }}
      >
        Along the way, I&apos;ve worked across private equity, public markets, data analytics, and AI automation.{" "}
        I&apos;m interested in understanding what&apos;s really driving the numbers—and what to do with that information.
      </p>
    </section>
  );
}
