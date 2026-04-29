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
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    function checkDesktop() {
      const isFinePointer = window.matchMedia("(pointer: fine)").matches;
      const isWideScreen = window.innerWidth > 768;
      const enable = isFinePointer && isWideScreen;

      setIsDesktop(enable);

      if (enable) {
        document.body.classList.add("custom-cursor-enabled");
      } else {
        document.body.classList.remove("custom-cursor-enabled");
      }
    }

    checkDesktop();
    window.addEventListener("resize", checkDesktop);
    return () => window.removeEventListener("resize", checkDesktop);
  }, []);

  return (
    <main style={{ overflowX: "hidden" }}>
      {/* Custom cursor — only rendered on desktop with fine pointer */}
      {isDesktop && <Cursor />}

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