import FadeIn from "./FadeIn";

export default function About() {
  return (
    <section id="about-text" className="py-28 px-6 max-w-6xl mx-auto">
      <div className="grid md:grid-cols-[1fr_2fr] gap-16 items-start">
        <FadeIn direction="left">
          <div>
            <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
              01 — About
            </p>
            <h2
              className="text-4xl font-serif font-medium text-[#1A1517] leading-tight"
              style={{ fontFamily: "var(--font-playfair)" }}
            >
              Background
            </h2>
          </div>
        </FadeIn>

        <div className="space-y-5">
          <FadeIn delay={0.1}>
            <p className="text-[#3E3840] leading-relaxed text-[0.97rem]">
              I grew up in Vietnam and now study at the University of Virginia, where I am double
              majoring in Commerce at the McIntire School and Applied Statistics. My experience
              has been primarily in investing and private equity — analyzing businesses across
              very different industries, from consumer goods to healthcare.
            </p>
          </FadeIn>
          <FadeIn delay={0.18}>
            <p className="text-[#3E3840] leading-relaxed text-[0.97rem]">
              One thing I particularly enjoy is entering an industry I initially know very little
              about, understanding how the business works, identifying the important questions,
              and eventually turning a large amount of information into a clear investment or
              strategic perspective. There is something satisfying about making the complex feel
              obvious.
            </p>
          </FadeIn>
          <FadeIn delay={0.26}>
            <p className="text-[#3E3840] leading-relaxed text-[0.97rem]">
              More recently, my work has combined investing with AI and data analytics. This has
              made me increasingly interested in how technology, data visualization, and
              thoughtful communication can help people make better business decisions — not just
              faster ones.
            </p>
          </FadeIn>

          <FadeIn delay={0.34}>
            <div className="pt-6 flex flex-wrap gap-3">
              {[
                "Investing",
                "Private Equity",
                "Strategy",
                "Data Analytics",
                "AI & Automation",
                "Business Visualization",
              ].map((t) => (
                <span
                  key={t}
                  className="text-xs px-3 py-1.5 border border-[#DDD8DA] text-[#7A757B] rounded-sm hover:border-[#6A4D67] hover:text-[#6A4D67] transition-colors cursor-default"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}
