import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Skills from "./components/Skills";
import Timeline from "./components/Timeline";
import Projects from "./components/Projects";
import GitHubStats from "./components/GitHubStats";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="relative bg-[#F7F4F0]">
      <Navbar />

      {/* Very subtle warm ambient wash */}
      <div
        className="fixed inset-0 pointer-events-none"
        style={{
          backgroundImage:
            "radial-gradient(ellipse at 80% 10%, rgba(190,128,153,0.05) 0%, transparent 50%), radial-gradient(ellipse at 20% 90%, rgba(106,77,103,0.04) 0%, transparent 50%)",
        }}
      />

      <Hero />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <Experience />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <Timeline />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <Skills />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <Projects />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <GitHubStats />

      <div className="max-w-6xl mx-auto px-6">
        <div className="border-t border-[#EDE9EB]" />
      </div>

      <Contact />

      <footer className="py-10 text-center text-[#B0AAB2] text-xs font-mono border-t border-[#EDE9EB] tracking-wide">
        Designed &amp; built by Yen Tran · {new Date().getFullYear()}
      </footer>
    </main>
  );
}
