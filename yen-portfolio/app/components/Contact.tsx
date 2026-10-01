"use client";
import { Mail, Link, GitBranch, MapPin } from "lucide-react";

const links = [
  {
    label: "Email",
    value: "nbp4ps@virginia.edu",
    href: "mailto:nbp4ps@virginia.edu",
    icon: Mail,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/yen-tran",
    href: "https://linkedin.com/in/yen-tran",
    icon: Link,
  },
  {
    label: "GitHub",
    value: "github.com/inn162",
    href: "https://github.com/inn162",
    icon: GitBranch,
  },
];

export default function Contact() {
  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="flex items-baseline gap-4 mb-2">
        <span className="text-xs font-mono text-[#BE8099] tracking-widest">06</span>
        <h2 className="text-3xl font-bold text-[#1A1517] tracking-tight">Get in Touch</h2>
      </div>
      <div className="w-8 h-px bg-[#BE8099] mb-12 ml-10" />

      <div className="grid md:grid-cols-2 gap-12 items-center">
        <div>
          <p className="text-[#79747A] leading-relaxed mb-8 text-sm font-light max-w-sm">
            I&apos;m always open to conversations about data-driven investing, AI in finance, or
            new opportunities. Whether you have a question, a project idea, or just want to
            connect — feel free to reach out.
          </p>
          <div className="flex items-center gap-2 text-[#B0AAB2] text-xs font-mono mb-8">
            <MapPin size={12} />
            Charlottesville, VA · Available May 2027
          </div>
          <a
            href="mailto:nbp4ps@virginia.edu"
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#6A4D67] hover:bg-[#4E3A4C] text-white rounded-lg font-medium transition-all hover:shadow-lg hover:shadow-[#6A4D67]/15 text-sm"
          >
            <Mail size={15} />
            Say Hello
          </a>
        </div>

        <div className="space-y-3">
          {links.map(({ label, value, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              className="flex items-center gap-4 bg-[#FDFCFA] rounded-xl p-5 border border-[#EDE9EB] hover:border-[#C9BECA] transition-all group"
            >
              <div className="w-9 h-9 bg-[#EAE2E8] rounded-lg flex items-center justify-center shrink-0 group-hover:bg-[#6A4D67] transition-colors">
                <Icon size={15} className="text-[#6A4D67] group-hover:text-white transition-colors" />
              </div>
              <div>
                <p className="text-[10px] text-[#B0AAB2] mb-0.5 font-mono tracking-wide uppercase">{label}</p>
                <p className="text-[#3E3840] text-sm group-hover:text-[#6A4D67] transition-colors">
                  {value}
                </p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
