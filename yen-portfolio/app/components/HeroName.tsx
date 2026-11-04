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
        viewBox="0 0 160 90"
        width="100%"
        height="auto"
        fill="none"
        style={{ overflow: "visible", display: "block" }}
        aria-hidden="true"
      >
        <path
          d="
            M 34,68
            C 22,72 14,60 22,50
            C 14,42 18,28 32,26
            C 28,12 44,6 56,16
            C 54,2 74,-2 84,10
            C 82,0 102,2 108,16
            C 124,10 136,22 132,36
            C 146,42 144,58 130,64
            C 128,76 112,78 106,66
            C 98,76 82,78 78,66
            C 70,76 54,76 50,66
            C 40,76 24,74 34,68
            Z
          "
          fill="white"
          stroke="#e8578a"
          strokeWidth="1.6"
          strokeDasharray="1 5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Trail — same diagonal, consistent gap cloud→puff1 = puff1→2 = puff2→3 (~12px each) */}
        <circle cx="152" cy="75" r="9"   fill="white" stroke="#e8578a" strokeWidth="1.4" strokeDasharray="1 4.5"  strokeLinecap="round" />
        <circle cx="174" cy="91" r="6"   fill="white" stroke="#e8578a" strokeWidth="1.3" strokeDasharray="1 4"    strokeLinecap="round" />
        <circle cx="192" cy="104" r="3.5" fill="white" stroke="#e8578a" strokeWidth="1.2" strokeDasharray="0.8 3.5" strokeLinecap="round" />
      </svg>

      {/* Text lowered ~4px within cloud for optical centering */}
      <p
        className="italic leading-none pointer-events-none"
        style={{
          position: "absolute",
          top: "46%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontFamily: "var(--font-accent)",
          fontSize: "clamp(0.82rem, 1.25vw, 1.12rem)",
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
      className="relative min-h-[90vh] bg-white overflow-hidden select-none"
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
        style={{ top: "27%", left: "59vw" }}
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
