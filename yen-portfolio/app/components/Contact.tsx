import { contact } from "../lib/data";

export default function Contact() {
  return (
    <section
      id="contact"
      className="border-t border-white/10"
      style={{ background: "#0f0f0f" }}
    >
      <div className="px-[5.5vw] pt-24 pb-20">
        <h2
          className="font-bold text-white leading-none mb-14"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(3.5rem, 8vw, 8rem)" }}
        >
          Let&apos;s talk.
        </h2>

        <div className="flex flex-col gap-5">
          <a
            href={`mailto:${contact.email}`}
            className="group inline-flex items-baseline gap-3 text-[#888] hover:text-white transition-colors"
          >
            <span className="text-[15px]">Email</span>
            <span className="text-[13px]">↗</span>
            <span
              className="text-[13px] group-hover:text-[#e8578a] transition-colors"
              style={{ fontFamily: "var(--font-mono)" }}
            >
              {contact.email}
            </span>
          </a>
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-baseline gap-3 text-[#888] hover:text-white transition-colors"
          >
            <span className="text-[15px]">LinkedIn</span>
            <span className="text-[13px]">↗</span>
          </a>
          <a
            href={contact.resume}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-baseline gap-3 text-[#888] hover:text-white transition-colors"
          >
            <span className="text-[15px]">Resume</span>
            <span className="text-[13px]">↗</span>
          </a>
        </div>
      </div>

      <div className="px-[5.5vw] py-6 border-t border-white/8 flex items-center justify-between">
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#444", letterSpacing: "0.18em" }}>
          YEN TRAN © {new Date().getFullYear()}
        </span>
        <span style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#444", letterSpacing: "0.18em" }}>
          CHARLOTTESVILLE, VA
        </span>
      </div>
    </section>
  );
}
