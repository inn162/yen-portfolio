"use client";
import { useRef } from "react";
import Image from "next/image";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1];

export default function HeroName() {
  const prefersReduced = useReducedMotion();
  const sectionRef = useRef<HTMLElement>(null);

  const rawX = useMotionValue(0.5);
  const rawY = useMotionValue(0.5);
  const spring = { damping: 50, stiffness: 150 };
  const ptX = useSpring(useTransform(rawX, [0, 1], [-8, 8]), spring);
  const ptY = useSpring(useTransform(rawY, [0, 1], [-5, 5]), spring);

  const onMouseMove = (e: React.MouseEvent<HTMLElement>) => {
    if (prefersReduced) return;
    const r = sectionRef.current?.getBoundingClientRect();
    if (!r) return;
    rawX.set((e.clientX - r.left) / r.width);
    rawY.set((e.clientY - r.top) / r.height);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="relative h-screen bg-white overflow-hidden select-none"
      onMouseMove={onMouseMove}
      onMouseLeave={() => { rawX.set(0.5); rawY.set(0.5); }}
    >
      {/* Metadata — name is the hero now, so just UVA / 2027 */}
      <motion.p
        className="absolute z-10"
        style={{ top: 72, left: "5.5vw", fontFamily: "var(--font-mono)", fontSize: "11px", color: "#aaa", letterSpacing: "0.2em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        UVA / 2027
      </motion.p>

      {/* Portrait — z:2, central, behind all text, bottom-anchored */}
      <motion.div
        className="absolute z-[2] pointer-events-none"
        style={{
          bottom: 0,
          left: "36vw",
          width: "clamp(260px, 44vw, 620px)",
          height: "95%",
          x: ptX,
          y: ptY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.2, ease }}
      >
        <Image
          src="/portrait.png"
          alt="Yen Tran"
          fill
          sizes="(max-width: 768px) 75vw, 44vw"
          className="object-contain object-bottom"
          priority
        />
      </motion.div>

      {/* YEN — flush left, first anchor */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "18%", left: "4vw" }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
      >
        <h1
          className="font-bold leading-none tracking-tight text-[#111]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 9.5vw, 11rem)" }}
        >
          YEN
        </h1>
      </motion.div>

      {/* FINANCE × ANALYTICS — left side, between YEN and TRAN */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "38%", left: "8vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7, delay: 0.6 }}
      >
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.65rem, 1.05vw, 0.95rem)",
            color: "#e8578a",
            letterSpacing: "0.2em",
          }}
        >
          FINANCE × ANALYTICS
        </p>
      </motion.div>

      {/* TRAN. — flush left, mirrors YEN, portrait body between them */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "58%", left: "4vw" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.35 }}
      >
        <h2
          className="font-bold leading-none tracking-tight text-[#111]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 9.5vw, 11rem)" }}
        >
          TRAN.
        </h2>
      </motion.div>

      {/* come along? — near portrait head, personal invitation */}
      <motion.div
        className="absolute z-[6] cursor-pointer"
        style={{ top: "14%", left: "62vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
        whileHover={{ opacity: 0.7 }}
        onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
      >
        <p
          className="italic leading-none"
          style={{ fontFamily: "var(--font-accent)", fontSize: "clamp(0.85rem, 1.3vw, 1.2rem)", color: "#e8578a" }}
        >
          come along?
        </p>
      </motion.div>

      {/* Bottom bar — academic descriptor only */}
      <motion.div
        className="absolute bottom-8 left-[5.5vw] z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <p className="text-[12px] text-[#777]">
          Commerce × Applied Statistics · University of Virginia
        </p>
      </motion.div>
    </section>
  );
}
