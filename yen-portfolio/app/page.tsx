import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import WorkIndex from "./components/WorkIndex";
import Experience from "./components/Experience";
import AtUVA from "./components/AtUVA";
import Education from "./components/Education";
import Elsewhere from "./components/Elsewhere";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      <About />
      <WorkIndex />
      <Experience />
      <AtUVA />
      <Education />
      <Elsewhere />
      <Contact />
    </main>
  );
}
