import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Skills from "./components/Skills";
import Contact from "./components/Contact";
import DarkWrapper from "./components/DarkWrapper";
import Cursor from "./components/Cursor";

export default function App() {
  const [introComplete, setIntroComplete] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* Custom cursor — renders above everything */}
      <Cursor />

      <Navbar introComplete={introComplete} />

      <Hero onIntroComplete={() => setIntroComplete(true)} />

      <DarkWrapper>
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </DarkWrapper>
    </main>
  );
}