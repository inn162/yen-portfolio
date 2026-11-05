import Nav from "./components/Nav";
import Hero from "./components/HeroName"; // swap to HeroSlogan to restore previous version
// import About from "./components/About"; // content integrated into HeroName first screen
import WorkIndex from "./components/WorkIndex";
import Experience from "./components/Experience";
import AtUVA from "./components/AtUVA";
import Education from "./components/Education";
// import Elsewhere from "./components/Elsewhere";
import Contact from "./components/Contact";

export default function Home() {
  return (
    <main className="bg-white">
      <Nav />
      <Hero />
      {/* <About /> — content integrated into HeroName first screen */}
      <WorkIndex />
      <Experience />
      <AtUVA />
      <Education />
      {/* <Elsewhere /> */}
      <Contact />
    </main>
  );
}
