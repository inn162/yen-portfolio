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

/*
  Cloud path: 7 organic lobes, slightly asymmetric, in a 158×90 viewBox.
  Visual center of the main cloud body ≈ (78, 39).
  Trailing puffs extend lower-right (toward portrait head) beyond the viewBox.
  strokeDasharray "1 5.5" + round linecap → evenly-spaced round dots.
*/
function ThoughtBubble({
  onClick,
  reduced,
}: {
  onClick: () => void;
  reduced: boolean;
}) {
  return (
    <motion.div
      className="cursor-pointer select-none"
      style={{ position: "relative", width: "clamp(120px, 12.5vw, 172px)" }}
      whileHover={reduced ? undefined : { rotate: 1, y: -2 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      onClick={onClick}
    >
      <svg
        viewBox="0 0 158 90"
        width="100%"
        height="auto"
        fill="none"
        style={{ overflow: "visible", display: "block" }}
        aria-hidden="true"
      >
        {/* Hand-drawn cloud — 6 large irregular lobes, loose editorial feel */}
        <path
          d="
            M 24,68
            C 8,68 4,54 14,44
            C 6,36 16,20 30,22
            C 26,8 46,2 58,14
            C 56,2 78,-4 90,12
            C 92,0 114,4 118,20
            C 130,14 144,30 136,46
            C 148,52 142,68 128,68
            C 116,78 100,72 96,64
            C 80,74 60,74 56,64
            C 44,72 28,72 24,68
            Z
          "
          fill="white"
          stroke="#e8578a"
          strokeWidth="1.6"
          strokeDasharray="1 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trailing puffs — tighter spacing toward portrait head */}
        <circle cx="146" cy="84"  r="9"   fill="white" stroke="#e8578a" strokeWidth="1.4" strokeDasharray="1 4.5"  strokeLinecap="round" />
        <circle cx="160" cy="96"  r="6"   fill="white" stroke="#e8578a" strokeWidth="1.3" strokeDasharray="1 4"    strokeLinecap="round" />
        <circle cx="171" cy="106" r="3.5" fill="white" stroke="#e8578a" strokeWidth="1.2" strokeDasharray="0.8 3.5" strokeLinecap="round" />
      </svg>

      {/* Text overlay — centered in the cloud body (≈49%, 43% of viewBox) */}
      <p
        className="italic leading-none pointer-events-none"
        style={{
          position: "absolute",
          top: "40%",
          left: "48%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-accent)",
          fontSize: "clamp(0.72rem, 1.1vw, 1rem)",
          color: "#e8578a",
          whiteSpace: "nowrap",
        }}
      >
        come along?
      </p>
    </motion.div>
  );
}

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
      {/* UVA / 2027 — quiet upper-left */}
      <motion.p
        className="absolute z-10"
        style={{ top: 72, left: "5.5vw", fontFamily: "var(--font-mono)", fontSize: "11px", color: "#aaa", letterSpacing: "0.2em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
      >
        UVA / 2027
      </motion.p>

      {/* Portrait — large, right-edge anchored, behind all text */}
      <motion.div
        className="absolute z-[2] pointer-events-none"
        style={{
          bottom: 0,
          right: "-2vw",
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

      {/* Left identity block: YEN / TRAN. / FINANCE × ANALYTICS */}
      <motion.div
        className="absolute z-[5]"
        style={{ top: "24%", left: "5vw" }}
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease, delay: 0.05 }}
      >
        <h1
          className="font-bold tracking-tight text-[#111]"
          style={{
            fontFamily: "var(--font-display)",
            fontSize: "clamp(2.8rem, 9.5vw, 11rem)",
            lineHeight: 0.93,
          }}
        >
          YEN
          <br />
          TRAN.
        </h1>
        <p
          style={{
            fontFamily: "var(--font-mono)",
            fontSize: "clamp(0.65rem, 1.05vw, 0.95rem)",
            color: "#e8578a",
            letterSpacing: "0.2em",
            marginTop: "clamp(0.7rem, 2vw, 1.6rem)",
          }}
        >
          FINANCE × ANALYTICS
        </p>
      </motion.div>

      {/* Thought bubble — left of portrait head, trails toward portrait */}
      <motion.div
        className="absolute z-[6]"
        style={{ top: "28%", left: "59vw" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.1, duration: 0.8 }}
      >
        <ThoughtBubble
          onClick={() => document.getElementById("work")?.scrollIntoView({ behavior: "smooth" })}
          reduced={!!prefersReduced}
        />
      </motion.div>

      {/* Academic descriptor — quiet lower-left */}
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
