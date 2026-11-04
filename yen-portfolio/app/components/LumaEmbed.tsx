"use client";
import { useState, useEffect, useRef } from "react";
import { LUMA_DEMO_URL } from "../lib/luma";

interface Props {
  height?: string;
  className?: string;
}

export default function LumaEmbed({ height = "600px", className = "" }: Props) {
  const [showOverlay, setShowOverlay] = useState(true);
  const [hasError, setHasError] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    // Dismiss the loading overlay after a short delay regardless of onLoad
    const timer = setTimeout(() => setShowOverlay(false), 2500);

    // Also listen directly on the DOM element — React's synthetic onLoad
    // is unreliable for cross-origin iframes in some browsers
    const el = iframeRef.current;
    const onLoad = () => setShowOverlay(false);
    el?.addEventListener("load", onLoad);

    return () => {
      clearTimeout(timer);
      el?.removeEventListener("load", onLoad);
    };
  }, []);

  if (!LUMA_DEMO_URL) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-4 bg-[#0a0a14] ${className}`}
        style={{ height }}
      >
        <p style={{ fontFamily: "var(--font-mono)", fontSize: "10px", color: "#444", letterSpacing: "0.18em" }}>
          LUMA LIVE — COMING SOON
        </p>
      </div>
    );
  }

  if (hasError) {
    return (
      <div
        className={`flex flex-col items-center justify-center gap-5 bg-[#0a0a14] ${className}`}
        style={{ height }}
      >
        <div className="text-center">
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#555", letterSpacing: "0.18em", marginBottom: 8 }}>
            EMBED UNAVAILABLE
          </p>
          <p style={{ fontFamily: "var(--font-sans)", fontSize: "13px", color: "#444", maxWidth: 280, textAlign: "center", lineHeight: 1.6 }}>
            The live application can be opened in a dedicated window.
          </p>
        </div>
        <a
          href={LUMA_DEMO_URL}
          target="_blank"
          rel="noreferrer"
          className="inline-flex items-center gap-2 border border-[#e8578a]/40 px-4 py-2 text-[#e8578a] hover:bg-[#e8578a]/10 transition-colors"
          style={{ fontFamily: "var(--font-mono)", fontSize: "10px", letterSpacing: "0.14em" }}
        >
          OPEN FULL SYSTEM ↗
        </a>
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ height }}>
      {/* Loading overlay — fades out after iframe is ready */}
      {showOverlay && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-[#0a0a14] pointer-events-none"
          style={{ transition: "opacity 0.4s ease", opacity: showOverlay ? 1 : 0 }}>
          <div className="flex gap-1">
            {[0, 1, 2].map(i => (
              <span
                key={i}
                className="inline-block w-1 h-1 rounded-full bg-[#e8578a]"
                style={{ animation: `pulse 1.2s ease-in-out ${i * 0.2}s infinite` }}
              />
            ))}
          </div>
          <p style={{ fontFamily: "var(--font-mono)", fontSize: "9px", color: "#444", letterSpacing: "0.2em" }}>
            LOADING LUMA LIVE
          </p>
        </div>
      )}

      {/* The iframe — always visible, overlay sits on top while loading */}
      <iframe
        ref={iframeRef}
        src={LUMA_DEMO_URL}
        title="LUMA LIVE — Management Information System"
        className="w-full h-full border-0"
        onError={() => setHasError(true)}
        allow="fullscreen"
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
      />
    </div>
  );
}
