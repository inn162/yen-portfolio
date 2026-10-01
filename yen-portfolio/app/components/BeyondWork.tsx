"use client";
import FadeIn from "./FadeIn";

const interests = [
  {
    label: "Travel",
    description:
      "Growing up in Vietnam and studying in the US has made me genuinely curious about how people live, build businesses, and think in different places.",
  },
  {
    label: "Data Visualization",
    description:
      "I find well-designed charts and dashboards compelling — there is craft in making complex information feel immediate and clear.",
  },
  {
    label: "Investing",
    description:
      "Outside of work, I follow markets and think about businesses — what makes them durable, what creates competitive advantage, and how industries evolve.",
  },
  {
    label: "Learning Industries",
    description:
      "One of my favorite parts of the work I do is entering an unfamiliar industry and building a mental model of how it operates from scratch.",
  },
];

// 6 photo placeholders — replace with actual images
const photos = Array.from({ length: 6 }, (_, i) => i);

export default function BeyondWork() {
  return (
    <section id="beyond" className="py-28 px-6 max-w-6xl mx-auto">
      <FadeIn direction="left">
        <p className="font-mono text-[10px] tracking-[0.25em] text-[#BE8099] uppercase mb-3">
          06 — Beyond Work
        </p>
        <h2
          className="text-4xl font-serif font-medium text-[#1A1517] mb-4 leading-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Outside the Work
        </h2>
        <p className="text-[#7A757B] text-sm mb-16 max-w-lg">
          The things I care about when I&apos;m not analyzing businesses.
        </p>
      </FadeIn>

      <div className="grid md:grid-cols-[2fr_1fr] gap-16 mb-16">
        {/* Photo grid */}
        <FadeIn>
          <div className="grid grid-cols-3 gap-3">
            {photos.map((i) => (
              <div
                key={i}
                className={`bg-[#EAE2E8] border border-dashed border-[#C9BEC9] rounded-2xl flex items-end p-3 ${
                  i === 0 ? "col-span-2 row-span-2 min-h-[200px]" : "min-h-[90px]"
                }`}
              >
                <p className="font-mono text-[8px] text-[#AFA9B1] tracking-widest">
                  [ Add photo ]
                </p>
              </div>
            ))}
          </div>
        </FadeIn>

        {/* Interests */}
        <div className="space-y-7">
          {interests.map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="border-l-2 border-[#EAE2E8] pl-4 hover:border-[#BE8099] transition-colors group">
                <p className="text-[#1A1517] font-medium text-sm mb-1 group-hover:text-[#6A4D67] transition-colors">
                  {item.label}
                </p>
                <p className="text-[#7A757B] text-xs leading-relaxed">{item.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
