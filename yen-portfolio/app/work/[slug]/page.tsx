import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "../../lib/data";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return projects.map(p => ({ slug: p.slug }));
}

export default async function CaseStudy({ params }: Props) {
  const { slug } = await params;
  const project = projects.find(p => p.slug === slug);
  if (!project) notFound();

  const sections = [
    { label: "01 / Context",  content: project.context  },
    { label: "02 / Question", content: project.question },
    { label: "03 / Approach", content: project.approach },
    { label: "04 / Analysis", content: project.analysis },
    { label: "05 / Output",   content: project.output   },
  ];

  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header */}
      <header className="px-6 md:px-10 py-5 border-b border-[#D8D3D6]">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="font-serif text-base text-[#17151A] hover:text-[#6B4866] transition-colors"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            Yen Tran
          </Link>
          <Link
            href="/#work"
            className="font-mono text-[11px] text-[#8C8690] hover:text-[#17151A] transition-colors tracking-widest uppercase"
          >
            ← All Work
          </Link>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 md:px-10 py-20">
        {/* Title block */}
        <div className="mb-16">
          <p className="font-mono text-[10px] text-[#8C8690] tracking-[0.2em] uppercase mb-4">
            {project.number}
          </p>
          <h1
            className="font-serif text-4xl md:text-6xl text-[#17151A] leading-tight mb-6"
            style={{ fontFamily: "var(--font-serif)" }}
          >
            {project.title}
          </h1>
          <p className="text-[#3C3840] text-lg font-light leading-relaxed max-w-2xl">
            {project.tagline}
          </p>
          <div className="flex flex-wrap gap-3 mt-6">
            {project.tags.map(t => (
              <span
                key={t}
                className="font-mono text-[10px] text-[#6B4866] tracking-widest border border-[#D8D3D6] px-3 py-1.5 uppercase"
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Image placeholder */}
        <div className="w-full h-64 md:h-80 bg-gradient-to-br from-[#EDE6F1] to-[#E8DDE8] border border-dashed border-[#C4849D]/40 flex items-center justify-center mb-16">
          <p className="font-mono text-[10px] text-[#8C8690] tracking-widest">
            [ Add project visual — screenshot, chart, or diagram ]
          </p>
        </div>

        {/* Case study sections */}
        <div className="space-y-14">
          {sections.map(s => (
            <div key={s.label} className="grid md:grid-cols-[180px_1fr] gap-6 md:gap-12">
              <p className="font-mono text-[10px] text-[#8C8690] tracking-[0.18em] uppercase pt-1.5">
                {s.label}
              </p>
              <div>
                <p className="text-[#3C3840] text-[15px] leading-relaxed font-light">
                  {s.content}
                </p>
                {/* Placeholder for visual */}
                <div className="mt-6 w-full h-44 bg-[#F2EBF4] border border-dashed border-[#D8CCE0] flex items-center justify-center">
                  <p className="font-mono text-[9px] text-[#8C8690] tracking-widest">
                    [ Add supporting visual ]
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation to other projects */}
        <div className="mt-24 pt-10 border-t border-[#D8D3D6] flex items-center justify-between">
          <Link
            href="/#work"
            className="font-mono text-[11px] text-[#8C8690] hover:text-[#6B4866] transition-colors tracking-widest uppercase"
          >
            ← All Work
          </Link>
          {(() => {
            const idx = projects.findIndex(p => p.slug === slug);
            const next = projects[(idx + 1) % projects.length];
            return (
              <Link
                href={`/work/${next.slug}`}
                className="font-mono text-[11px] text-[#8C8690] hover:text-[#6B4866] transition-colors tracking-widest uppercase"
              >
                Next: {next.title} →
              </Link>
            );
          })()}
        </div>
      </main>
    </div>
  );
}
