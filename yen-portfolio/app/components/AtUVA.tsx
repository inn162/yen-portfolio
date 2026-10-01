import { uvaOrgs } from "../lib/data";

export default function AtUVA() {
  return (
    <section id="uva" className="bg-white border-t border-[#e8e8e8]">
      <div className="px-[5.5vw] pt-28 pb-6">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
          AT UVA
        </p>
      </div>

      <div className="px-[5.5vw] pb-24 grid md:grid-cols-3 gap-0">
        {uvaOrgs.map((org, i) => (
          <div
            key={org.id}
            className={`py-10 ${i < uvaOrgs.length - 1 ? "md:border-r border-b md:border-b-0 border-[#e8e8e8]" : ""} ${i > 0 ? "md:pl-10" : ""}`}
          >
            {/* Visual placeholder */}
            <div
              className="mb-6 border border-dashed border-[#e8e8e8] flex items-center justify-center"
              style={{ height: 100, background: i === 0 ? "#fff5f8" : i === 1 ? "#fafaff" : "#f8fff8" }}
            >
              <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#ccc", letterSpacing: "0.1em" }}>
                [ ADD LOGO / ARTIFACT ]
              </p>
            </div>

            <p
              className="font-bold text-[#111] mb-1 leading-snug"
              style={{ fontFamily: "var(--font-display)", fontSize: "1.05rem" }}
            >
              {org.name}
            </p>
            <p className="text-[11px] text-[#e8578a] mb-3" style={{ fontFamily: "var(--font-mono)" }}>
              {org.role}
            </p>
            <p className="text-[13px] text-[#666] font-light leading-relaxed">
              {org.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
