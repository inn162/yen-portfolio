"use client";
import Link from "next/link";
import { useState, useEffect } from "react";

const links = [
  { label: "Work",       href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Elsewhere",  href: "#elsewhere" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-sm border-b border-[#e8e8e8]" : ""
      }`}
    >
      <div className="flex items-center justify-between px-[5.5vw] h-14">
        <Link
          href="/"
          className="font-bold text-[15px] text-[#111] tracking-tight"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Yen Tran
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              className="text-[13px] text-[#666] hover:text-[#111] transition-colors"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="text-[13px] text-[#666] hover:text-[#e8578a] transition-colors"
          >
            CV ↗
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden flex flex-col gap-[5px] p-2"
          onClick={() => setOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-5 h-px bg-[#111] transition-all duration-200 ${open ? "rotate-45 translate-y-[6px]" : ""}`} />
          <span className={`block w-5 h-px bg-[#111] transition-all duration-200 ${open ? "opacity-0" : ""}`} />
          <span className={`block w-5 h-px bg-[#111] transition-all duration-200 ${open ? "-rotate-45 -translate-y-[6px]" : ""}`} />
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="md:hidden bg-white border-b border-[#e8e8e8] px-[5.5vw] pb-6 pt-2">
          {links.map(({ label, href }) => (
            <a
              key={label}
              href={href}
              onClick={() => setOpen(false)}
              className="block py-3 text-[15px] text-[#111] border-b border-[#e8e8e8]"
            >
              {label}
            </a>
          ))}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="block py-3 text-[15px] text-[#e8578a]"
          >
            CV ↗
          </a>
        </div>
      )}
    </nav>
  );
}
