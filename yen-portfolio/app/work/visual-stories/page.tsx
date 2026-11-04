import Link from "next/link";

const EXHIBITS = [
  { num: "01", company: "Lumé Skincare · DTC skincare", title: "The Bestseller Trap", setup: "The product driving 34% of revenue has a 3.4% standalone contribution margin." },
  { num: "02", company: "Forma · Wellness subscription app", title: "Customers Weren't Leaving Faster. They Were Leaving Earlier.", setup: "Overall 12-month retention fell 11 points across cohorts. The product team built new features." },
  { num: "03", company: "Stelo Coffee · Premium urban coffee chain", title: "Twelve New Stores Produced the Revenue of Seven", setup: "The company opened 12 locations. Each new store hit its standalone revenue target." },
  { num: "04", company: "Vantage Retail · 80-store specialty retail chain", title: "Nothing Happened to the Average. Everything Happened Underneath It.", setup: "Average revenue per store is $1.43M in 2020 and $1.47M in 2024. Looks stable." },
  { num: "05", company: "Aria Airways · Mid-size regional carrier", title: "The Route That Loses $4M May Be Worth $40M", setup: "Route analysis flagged Linden → Hargrove for closure: $4.2M annual standalone loss." },
  { num: "06", company: "Lume Originals · Mid-tier streaming service", title: "The Show Everyone Watched Left the Platform Weaker", setup: '"Eclipse" drove record sign-ups — 2.3M in launch month. The platform celebrated.' },
  { num: "07", company: "Folio · Artisan marketplace, 2,000 sellers", title: "GMV Grew 28%. The Marketplace Got Narrower.", setup: "GMV rose 28% over three years. Management cited platform health." },
  { num: "08", company: "SPF Beauty Category · Investor diligence · 8 major brands", title: "In a Market With 400 SPF Products, One Zone Was Empty", setup: "The SPF category looks crowded. 400+ SKUs across 8 brands." },
  { num: "09", company: "Meal Kit Category · Investor diligence · 4 brands · 8,000 reviews", title: "All Four Competitors Average 4.2 Stars. They Are Not the Same Business.", setup: "Consumer reviews show four competing brands clustered between 4.1 and 4.3 stars. Indistinguishable." },
];

export default function VisualStories() {
  return (
    <div className="min-h-screen bg-[#F8F6F2]">
      {/* Header */}
      <header className="px-6 md:px-10 py-5 border-b border-[#D8D3D6]">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            style={{ fontFamily: "var(--font-display)", fontSize: "1rem", color: "#17151A" }}
            className="hover:text-[#c4b5e8] transition-colors"
          >
            Yen Tran
          </Link>
          <Link
            href="/#work"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#8C8690", letterSpacing: "0.15em" }}
            className="hover:text-[#17151A] transition-colors uppercase"
          >
            ← All Work
          </Link>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 md:px-10 py-20">

        {/* Title block */}
        <div className="mb-16">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8C8690", letterSpacing: "0.22em" }} className="mb-4 uppercase">
            02 / Analytical Communication
          </p>
          <h1
            className="font-bold text-[#17151A] leading-none mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 7vw, 6rem)" }}
          >
            VISUAL
            <br />STORIES
          </h1>
          <p
            className="text-[#17151A] mb-6"
            style={{ fontFamily: "var(--font-display)", fontSize: "clamp(1rem, 2vw, 1.4rem)", fontWeight: 500 }}
          >
            THE CHART ISN'T THE POINT.
            <br />WHAT YOU SEE IS.
          </p>
          <p className="text-[#3C3840] font-light leading-relaxed" style={{ fontSize: "15px", maxWidth: "60ch" }}>
            Nine exhibits. Each starts with a business situation — something management thought was true. Then the data.
            The same numbers in two states: technically valid, and analytically communicative. The difference is not
            about making charts prettier. It's about making the right thing visible.
          </p>
        </div>

        {/* Story Off / Story On explanation */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div className="border border-[#D8D3D6] p-6 bg-white">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#8C8690", letterSpacing: "0.18em" }} className="mb-3">
              STORY OFF
            </p>
            <p className="text-[14px] text-[#3C3840] font-light leading-relaxed">
              Technically correct. All categories shown equally. No hierarchy. No annotation.
              The data is there — but the reader has to find the signal themselves.
            </p>
          </div>
          <div className="border border-[#c4b5e8] p-6 bg-white">
            <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#c4b5e8", letterSpacing: "0.18em" }} className="mb-3">
              STORY ON
            </p>
            <p className="text-[14px] text-[#3C3840] font-light leading-relaxed">
              Same data. Intentional hierarchy. The finding is made visible — not invented.
              Color, annotation, and framing direct the reader toward what matters.
            </p>
          </div>
        </div>

        {/* Exhibit index */}
        <div className="mb-12">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8C8690", letterSpacing: "0.22em" }} className="mb-8">
            EXHIBITS
          </p>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {EXHIBITS.map((ex) => (
              <div key={ex.num} className="border-l-2 border-[#D8D3D6] pl-4 py-1">
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#8C8690", letterSpacing: "0.15em" }} className="mb-1">
                  {ex.num} · {ex.company.split(" · ")[0]}
                </p>
                <p className="text-[13px] text-[#17151A] font-light leading-snug mb-2">{ex.title}</p>
                <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#B8B9C0", letterSpacing: "0.05em" }}>
                  {ex.setup.substring(0, 60)}{ex.setup.length > 60 ? "…" : ""}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Iframe — the actual exhibits */}
        <div className="mb-8">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#8C8690", letterSpacing: "0.22em" }} className="mb-4">
            INTERACTIVE EXHIBITS
          </p>
          <p className="text-[13px] text-[#8C8690] font-light mb-6" style={{ maxWidth: "55ch" }}>
            Each exhibit contains both states. Toggle between Story Off and Story On to see how
            analytical communication changes what becomes visible — without changing the data.
          </p>
          <div className="border border-[#D8D3D6] bg-white overflow-hidden">
            <iframe
              src="/portfolio_visual_stories.html"
              title="Visual Stories — Nine Analytical Exhibits"
              style={{
                width: "100%",
                height: "clamp(600px, 85vh, 1000px)",
                border: "none",
                display: "block",
              }}
              loading="lazy"
            />
          </div>
        </div>

        {/* Footer nav */}
        <div className="mt-20 pt-10 border-t border-[#D8D3D6] flex items-center justify-between">
          <Link
            href="/#work"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#8C8690", letterSpacing: "0.15em" }}
            className="hover:text-[#c4b5e8] transition-colors uppercase"
          >
            ← All Work
          </Link>
          <Link
            href="/work/luma-live"
            style={{ fontFamily: "var(--font-mono)", fontSize: "11px", color: "#8C8690", letterSpacing: "0.15em" }}
            className="hover:text-[#e8578a] transition-colors uppercase"
          >
            01 · LUMA LIVE →
          </Link>
        </div>
      </main>
    </div>
  );
}
