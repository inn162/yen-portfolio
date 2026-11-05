import Image from "next/image";

export default function HeroName() {
  return (
    <section id="hero" className="bg-white pt-14">
      <div className="max-w-[1440px] mx-auto px-[5.5vw]">
        <div className="flex flex-col md:grid md:grid-cols-[2fr_3fr] md:gap-10 md:items-center md:min-h-[calc(100vh-3.5rem)]">

          {/* Portrait — circle, centered in left column */}
          <div className="flex items-center justify-center pt-10 md:pt-0">
            <div className="relative w-52 h-52 md:w-80 md:h-80 rounded-full overflow-hidden ring-1 ring-[#e8e8e8]">
              <Image
                src="/portrait.png"
                alt="Yen Tran"
                fill
                sizes="(max-width: 768px) 208px, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text column */}
          <div className="flex flex-col py-12 md:py-16">

            <p
              className="mb-5 text-[11px] text-[#aaa] tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              UVA &apos;27 · FINANCE × DATA × AI
            </p>

            <h1
              className="text-[#111] mb-6"
              style={{
                fontFamily: "var(--font-accent)",
                fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                fontWeight: 400,
                lineHeight: 1.05,
              }}
            >
              Yen Tran
            </h1>

            <p
              className="text-[#111] mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.15rem, 2vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              Curious about the numbers. Even more curious about what I can do with them.
            </p>

            <p
              className="text-[#444] mb-4"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: "54ch",
              }}
            >
              I grew up in Vietnam and now study Commerce and Applied Statistics at the University
              of Virginia. My work spans private equity, investment research, and AI-powered
              analytics, with a focus on turning complex information into something useful.
            </p>

            <p
              className="text-[#444] mb-9"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1rem, 1.15vw, 1.1rem)",
                fontWeight: 400,
                lineHeight: 1.65,
                maxWidth: "54ch",
              }}
            >
              When I&apos;m not doing that, I&apos;m probably overplanning a trip, rating a
              restaurant, or squeezing in one more spin class than I probably should.
            </p>

            <div className="flex flex-wrap gap-3">
              <a
                href="#work"
                className="inline-flex items-center justify-center px-6 min-h-[44px] text-[14px] font-medium text-white bg-[#e8578a] hover:bg-[#d4466f] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Explore my work
              </a>
              <a
                href="mailto:haiyen.tran1612@gmail.com"
                className="inline-flex items-center justify-center px-6 min-h-[44px] text-[14px] font-medium text-[#333] border border-[#d8d8d8] hover:border-[#e8578a] hover:text-[#e8578a] transition-colors"
                style={{ fontFamily: "var(--font-sans)" }}
              >
                Get in touch
              </a>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
