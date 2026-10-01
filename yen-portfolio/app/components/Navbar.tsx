"use client";
import { useState, useEffect } from "react";

const links = [
  { label: "About",        id: "about" },
  { label: "Experience",   id: "experience" },
  { label: "Work",         id: "work" },
  { label: "Education",    id: "education" },
  { label: "Beyond Work",  id: "beyond" },
  { label: "Contact",      id: "contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 40);

      const sections = links.map((l) => document.getElementById(l.id));
      const current = sections.findLast(
        (el) => el && el.getBoundingClientRect().top < 120
      );
      if (current) setActive(current.id);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-[#F7F4F0]/94 backdrop-blur-md border-b border-[#DDD8DA]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-mono text-xs tracking-[0.2em] text-[#1A1517] hover:text-[#6A4D67] transition-colors uppercase"
        >
          Yen Tran
        </button>

        <div className="hidden lg:flex items-center gap-7">
          {links.map((l) => (
            <button
              key={l.id}
              onClick={() => scrollTo(l.id)}
              className={`text-xs tracking-wide transition-colors pb-0.5 border-b ${
                active === l.id
                  ? "text-[#6A4D67] border-[#6A4D67]"
                  : "text-[#7A757B] border-transparent hover:text-[#1A1517]"
              }`}
            >
              {l.label}
            </button>
          ))}
        </div>

        <a
          href="/resume.pdf"
          target="_blank"
          className="text-xs border border-[#6A4D67] text-[#6A4D67] px-4 py-2 rounded-full hover:bg-[#6A4D67] hover:text-white transition-all tracking-wide"
        >
          Resume
        </a>
      </div>
    </nav>
  );
}
