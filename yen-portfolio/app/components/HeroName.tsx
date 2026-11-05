import Image from "next/image";

export default function HeroName() {
  return (
    <section id="hero" className="bg-white pt-14">
      <div className="max-w-[1440px] mx-auto px-[5.5vw]">
        <div className="flex flex-col lg:grid lg:grid-cols-[2fr_3fr] lg:gap-10 lg:items-center lg:min-h-[calc(100vh-3.5rem)]">

          {/* Portrait — stacks top on mobile/tablet, left column on desktop */}
          <div className="flex items-center justify-center pt-10 lg:pt-0">
            <div className="relative w-44 h-44 md:w-56 md:h-56 lg:w-64 lg:h-64 xl:w-80 xl:h-80 rounded-full overflow-hidden ring-2 ring-[#e8578a]">
              <Image
                src="/portrait.png"
                alt="Yen Tran"
                fill
                sizes="(max-width: 768px) 176px, (max-width: 1024px) 224px, (max-width: 1280px) 256px, 320px"
                className="object-cover object-top"
                priority
              />
            </div>
          </div>

          {/* Text column */}
          <div className="flex flex-col py-10 lg:py-16">

            <p
              className="mb-5 text-[11px] text-[#aaa] tracking-[0.18em]"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              UVA &apos;27 · FINANCE × DATA × AI
            </p>

            {/* Name + pink rule — wrapper shrinks to name width */}
            <div style={{ width: "max-content", maxWidth: "100%" }} className="mb-6">
              <h1
                className="text-[#111]"
                style={{
                  fontFamily: "'Amulya', var(--font-display)",
                  fontSize: "clamp(2.5rem, 5.5vw, 5rem)",
                  fontWeight: 600,
                  lineHeight: 1.05,
                }}
              >
                Yen Tran
              </h1>
              <div
                className="bg-[#e8578a]"
                style={{ height: "2px", marginTop: "10px" }}
              />
            </div>

            <p
              className="text-[#111] mb-6"
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "clamp(1.15rem, 2vw, 1.75rem)",
                fontWeight: 500,
                lineHeight: 1.3,
              }}
            >
              Curious about the numbers.<br />Even more curious about what I can do with them.
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
              My work spans private equity, investment research, and AI-powered analytics.
              I enjoy finding patterns in messy data, connecting the dots, and turning
              scattered information into something useful.
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
