"use client";
import { motion } from "framer-motion";
import { ArrowRight, ExternalLink } from "lucide-react";

const stagger = {
  container: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
  item: {
    hidden:  { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
  },
};

export default function Hero() {
  return (
    <section id="about" className="min-h-screen flex flex-col justify-center px-6 max-w-6xl mx-auto pt-24 pb-16">
      {/* Faint dotted grid — purely decorative */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, #C9BEC9 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          opacity: 0.18,
          maskImage: "radial-gradient(ellipse 70% 70% at 85% 50%, black 0%, transparent 100%)",
        }}
      />

      <motion.div
        variants={stagger.container}
        initial="hidden"
        animate="visible"
        className="relative max-w-3xl"
      >
        <motion.p
          variants={stagger.item}
          className="font-mono text-[10px] tracking-[0.3em] text-[#BE8099] uppercase mb-8"
        >
          University of Virginia · Class of 2027
        </motion.p>

        <motion.h1
          variants={stagger.item}
          className="text-[clamp(3.5rem,9vw,6.5rem)] leading-[0.95] font-serif font-medium text-[#1A1517] mb-8 tracking-tight"
          style={{ fontFamily: "var(--font-playfair)" }}
        >
          Yen Tran
        </motion.h1>

        <motion.p
          variants={stagger.item}
          className="text-[clamp(1rem,2.2vw,1.25rem)] text-[#7A757B] font-light leading-relaxed max-w-xl mb-3"
        >
          Finance, investing, and analytics —
          <br />
          <span className="text-[#3E3840]">with a curiosity for how data can make better decisions.</span>
        </motion.p>

        <motion.div
          variants={stagger.item}
          className="font-mono text-[10px] tracking-[0.2em] text-[#AFA9B1] uppercase mt-6 mb-12 flex flex-wrap gap-x-5 gap-y-1"
        >
          <span>McIntire School of Commerce</span>
          <span className="text-[#DDD8DA]">·</span>
          <span>Finance · AI &amp; Analytics</span>
          <span className="text-[#DDD8DA]">·</span>
          <span>Applied Statistics</span>
        </motion.div>

        <motion.div variants={stagger.item} className="flex flex-wrap gap-4">
          <button
            onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
            className="inline-flex items-center gap-2 px-6 py-3 bg-[#1A1517] hover:bg-[#6A4D67] text-white text-sm tracking-wide rounded-sm transition-all duration-300"
          >
            View My Work <ArrowRight size={14} />
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#DDD8DA] hover:border-[#6A4D67] text-[#7A757B] hover:text-[#6A4D67] text-sm tracking-wide rounded-sm transition-all duration-300"
          >
            Resume <ExternalLink size={13} />
          </a>
          <a
            href="https://linkedin.com/in/yen-tran"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[#DDD8DA] hover:border-[#6A4D67] text-[#7A757B] hover:text-[#6A4D67] text-sm tracking-wide rounded-sm transition-all duration-300"
          >
            LinkedIn <ExternalLink size={13} />
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.8 }}
        className="absolute bottom-10 left-6 flex items-center gap-3 text-[#AFA9B1]"
      >
        <motion.div
          className="w-px h-10 bg-[#AFA9B1] origin-top"
          animate={{ scaleY: [0, 1, 1, 0] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <span className="font-mono text-[9px] tracking-[0.25em] uppercase">Scroll</span>
      </motion.div>
    </section>
  );
}
