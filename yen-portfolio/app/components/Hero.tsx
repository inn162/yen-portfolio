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

export default function Hero() {
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
      {/* Name label */}
      <motion.p
        className="absolute z-10"
        style={{ top: 72, left: "5.5vw", fontFamily: "var(--font-mono)", fontSize: "11px", color: "#aaa", letterSpacing: "0.2em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        YEN TRAN / UVA 2027
      </motion.p>

      {/* Portrait — z:2, behind all text */}
      <motion.div
        className="absolute z-[2] pointer-events-none"
        style={{
          top: 0,
          right: "-2vw",
          width: "clamp(240px, 36vw, 500px)",
          height: "100%",
          x: ptX,
          y: ptY,
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.1, delay: 0.3, ease }}
      >
        <Image
          src="/portrait.png"
          alt="Yen Tran"
          fill
          sizes="(max-width: 768px) 65vw, 36vw"
          className="object-contain object-top"
          priority
        />
      </motion.div>

      {/* SOME STORIES — z:5, always above portrait */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "19%", left: "5vw" }}
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
      >
        <h1
          className="font-bold leading-none tracking-tight text-[#111]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 9.5vw, 11rem)" }}
        >
          SOME STORIES
        </h1>
      </motion.div>

      {/* start with — italic accent, z:5, bridging toward center */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "37%", left: "16vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.25 }}
      >
        <p
          className="italic leading-none"
          style={{ fontFamily: "var(--font-accent)", fontSize: "clamp(1.8rem, 4.5vw, 5.5rem)", color: "#e8578a" }}
        >
          start with
        </p>
      </motion.div>

      {/* NUMBERS. — z:5, right-anchored, tighter vertical */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "52%", right: "3vw" }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.15 }}
      >
        <h2
          className="font-bold leading-none tracking-tight text-[#111]"
          style={{ fontFamily: "var(--font-display)", fontSize: "clamp(2.8rem, 9.5vw, 11rem)" }}
        >
          NUMBERS.
        </h2>
      </motion.div>

      {/* Bottom bar */}
      <motion.div
        className="absolute bottom-8 left-[5.5vw] right-[5.5vw] z-10 flex items-end justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.7 }}
      >
        <p className="text-[12px] text-[#aaa]">
          Commerce × Applied Statistics · University of Virginia
        </p>
        <div className="flex flex-col items-center gap-1.5">
          <p
            className="text-[10px] text-[#aaa] tracking-[0.22em] uppercase"
            style={{ fontFamily: "var(--font-mono)" }}
          >
            explore
          </p>
          <motion.div
            className="w-px bg-[#ccc] origin-top"
            style={{ height: 32 }}
            animate={{ scaleY: [0.2, 1, 0.2] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </section>
  );
}
