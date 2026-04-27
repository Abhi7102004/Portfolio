import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import DarkWrapper from "./components/DarkWrapper";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  // Ensure page always starts at top on load/reload
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* Navbar is hidden during intro, mounts only after */}
      <Navbar introComplete={introComplete} />

      {/* Light hero — passes callback so Navbar knows when to appear */}
      <Hero onIntroComplete={() => setIntroComplete(true)} />

      {/* Dark sections slide up from below with rounded top */}
      <DarkWrapper>
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </DarkWrapper>
    </main>
  );
}