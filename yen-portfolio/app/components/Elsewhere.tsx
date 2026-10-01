"use client";
import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { photos } from "../lib/data";

// Free-layout positions: [top%, left%, width%, rotate]
const POSITIONS: [string, string, string, number][] = [
  ["8%",  "2%",  "22%", -3.5],
  ["5%",  "28%", "30%",  1.2],
  ["6%",  "62%", "20%",  3.8],
  ["42%", "5%",  "25%",  2.1],
  ["40%", "34%", "20%", -2.8],
  ["38%", "60%", "27%",  1.5],
];

function Photo({
  photo,
  position,
  index,
}: {
  photo: (typeof photos)[0];
  position: [string, string, string, number];
  index: number;
}) {
  const prefersReduced = useReducedMotion();
  const [hovered, setHovered] = useState(false);
  const [top, left, width, rotate] = position;

  return (
    <motion.div
      className="absolute cursor-grab active:cursor-grabbing"
      style={{ top, left, width }}
      drag={!prefersReduced}
      dragMomentum={false}
      dragElastic={0.06}
      whileDrag={{ scale: 1.04, zIndex: 20, rotate: 0 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0, rotate }}
      transition={{
        opacity: { delay: index * 0.07, duration: 0.5 },
        y:       { delay: index * 0.07, duration: 0.5 },
        rotate:  { type: "spring", damping: 18, stiffness: 90, delay: index * 0.07 },
      }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
    >
      {/* Caption on hover */}
      <motion.p
        className="absolute -top-6 left-0 whitespace-nowrap text-[#e8578a] pointer-events-none"
        style={{ fontFamily: "var(--font-mono)", fontSize: "9px", letterSpacing: "0.1em" }}
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.2 }}
      >
        {photo.caption && photo.caption !== "[Add caption]"
          ? photo.caption + (photo.location ? " — " + photo.location : "")
          : "[ Add caption ]"}
      </motion.p>

      {photo.src ? (
        <div className="relative overflow-hidden shadow-sm" style={{ paddingBottom: "130%" }}>
          <Image src={photo.src} alt={photo.caption ?? ""} fill className="object-cover" />
        </div>
      ) : (
        <div
          className="relative border border-dashed border-[#e8e8e8] flex items-end p-2"
          style={{
            paddingBottom: "130%",
            background: index % 2 === 0 ? "#fdf5f8" : "#f8f5fd",
          }}
        >
          <p
            className="absolute bottom-2 left-2"
            style={{ fontFamily: "var(--font-mono)", fontSize: "8px", color: "#ddd", letterSpacing: "0.08em" }}
          >
            [ photo ]
          </p>
        </div>
      )}
    </motion.div>
  );
}

export default function Elsewhere() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="elsewhere"
      className="border-t border-[#e8e8e8] overflow-hidden"
      style={{ background: "linear-gradient(to bottom, #ffffff 0%, #fdf5f8 50%, #f8f5fd 100%)" }}
    >
      <div className="px-[5.5vw] pt-28 pb-6">
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#aaa", letterSpacing: "0.22em" }}>
          ELSEWHERE
        </p>
      </div>

      {/* Free-layout photo collage */}
      <div
        ref={containerRef}
        className="relative mx-[5.5vw]"
        style={{ height: "clamp(480px, 80vh, 700px)" }}
      >
        {photos.map((photo, i) => (
          <Photo key={photo.id} photo={photo} position={POSITIONS[i]} index={i} />
        ))}
      </div>

      <div className="px-[5.5vw] pt-8 pb-24">
        <p className="text-[12px] text-[#bbb] font-light" style={{ fontFamily: "var(--font-mono)", letterSpacing: "0.1em" }}>
          Drag the photos around. Add yours later.
        </p>
      </div>
    </section>
  );
}
