import React, { useRef, useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.76, 0, 0.24, 1]
const LINKS = ["About", "Experience", "Projects", "Contact"]

export default function Navbar({ introComplete }) {
  const [dark, setDark] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    // Switch to dark theme the moment hero bottom leaves viewport
    setDark(y > window.innerHeight - 64)
  })

  if (!introComplete) return null

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}           // always visible after intro
      transition={{ duration: 0.5, ease: EXPO }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 2.5rem",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      {/* animated background layer — Framer interpolates this */}
      <motion.div
        animate={{
          background: dark ? "rgba(11,11,10,0.96)" : "rgba(242,239,233,0.93)",
          borderBottomColor: dark ? "#232321" : "rgba(14,14,13,0.09)",
        }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{
          position: "absolute", inset: 0,
          borderBottom: "1px solid",
          borderBottomColor: dark ? "#232321" : "rgba(14,14,13,0.09)",
          zIndex: -1,
        }}
      />

      {/* Logo */}
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <motion.div
          animate={{ background: dark ? "#F2EFE9" : "#0E0E0D", color: dark ? "#0C0C0B" : "#F2EFE9" }}
          transition={{ duration: 0.35 }}
          style={{
            width: 32, height: 32, borderRadius: "50%",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", fontWeight: 700,
          }}
        >
          AY
        </motion.div>
        <motion.span
          animate={{ color: dark ? "#F2EFE9" : "#0E0E0D" }}
          transition={{ duration: 0.35 }}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.78rem", letterSpacing: "0.2em", fontWeight: 700 }}
        >
          AY.
        </motion.span>
      </a>

      {/* Links */}
      <div style={{ display: "flex", alignItems: "center", gap: "2.2rem" }}>
        {LINKS.map((item, i) => (
          <motion.a
            key={item}
            href={`#${item.toLowerCase()}`}
            animate={{ color: dark ? "rgba(242,239,233,0.5)" : "rgba(14,14,13,0.45)" }}
            transition={{ duration: 0.35 }}
            initial={{ opacity: 0, y: -8 }}
            style={{
              fontFamily: "'Syne',sans-serif", fontSize: "0.75rem",
              fontWeight: 600, letterSpacing: "0.15em", textTransform: "uppercase",
              textDecoration: "none",
            }}
            whileHover={{ color: dark ? "#F2EFE9" : "#0E0E0D" }}
          >
            {item}
          </motion.a>
        ))}
      </div>

      {/* Hire Me */}
      <motion.a
        href={`mailto:${ME.email}`}
        animate={{
          color:       dark ? "#F2EFE9" : "#0E0E0D",
          borderColor: dark ? "#F2EFE9" : "#0E0E0D",
        }}
        transition={{ duration: 0.35 }}
        style={{
          fontFamily: "'Syne',sans-serif", fontSize: "0.72rem", fontWeight: 700,
          letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
          padding: "0.5rem 1.3rem", border: "1.5px solid", background: "transparent",
          transition: "background 0.22s",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.background = dark ? "#F2EFE9" : "#0E0E0D"
          e.currentTarget.style.color = dark ? "#0C0C0B" : "#F2EFE9"
        }}
        onMouseLeave={e => {
          e.currentTarget.style.background = "transparent"
          e.currentTarget.style.color = dark ? "#F2EFE9" : "#0E0E0D"
        }}
      >
        Hire Me →
      </motion.a>
    </motion.nav>
  )
}