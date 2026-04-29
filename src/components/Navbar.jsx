import React, { useState } from "react"
import { motion, useMotionValueEvent, useScroll } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.76, 0, 0.24, 1]

const LINKS = [
  { label: "Home",       href: "#home"       },
  { label: "Experience", href: "#experience" },
  { label: "Projects",   href: "#projects"   },
  { label: "Skills",     href: "#skills"     },
  { label: "Contact",    href: "#contact"    },
]

export default function Navbar({ introComplete }) {
  const [dark, setDark] = useState(false)
  const { scrollY } = useScroll()

  useMotionValueEvent(scrollY, "change", (y) => {
    setDark(y > window.innerHeight - 64)
  })

  if (!introComplete) return null

  return (
    <motion.nav
      initial={{ y: -72, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: EXPO }}
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 50,
        height: 64,
        display: "grid",
        gridTemplateColumns: "1fr auto 1fr",
        alignItems: "center",
        padding: "0 2.5rem",
        backdropFilter: "blur(20px) saturate(180%)",
        WebkitBackdropFilter: "blur(20px) saturate(180%)",
      }}
    >
      <motion.div
        animate={{ background: dark ? "rgba(11,11,10,0.96)" : "rgba(242,239,233,0.93)" }}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        style={{ position: "absolute", inset: 0, borderBottom: "1px solid", borderBottomColor: dark ? "#2a2a28" : "rgba(14,14,13,0.09)", zIndex: -1 }}
      />

      {/* Logo */}
      <a href="#home" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none" }}>
        <motion.div animate={{ background: dark ? "#F2EFE9" : "#0E0E0D", color: dark ? "#0C0C0B" : "#F2EFE9" }} transition={{ duration: 0.35 }} style={{ width: 32, height: 32, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", fontWeight: 700 }}>
          AY
        </motion.div>
        <motion.span animate={{ color: dark ? "#F2EFE9" : "#0E0E0D" }} transition={{ duration: 0.35 }} style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.78rem", letterSpacing: "0.2em", fontWeight: 700 }}>
          AY.
        </motion.span>
      </a>

      {/* 5 nav links centered */}
      <div style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}>
        {LINKS.map(({ label, href }) => (
          <motion.a
            key={label}
            href={href}
            animate={{ color: dark ? "rgba(242,239,233,0.72)" : "rgba(14,14,13,0.62)" }}
            transition={{ duration: 0.35 }}
            whileHover={{ color: dark ? "#F2EFE9" : "#0E0E0D" }}
            style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.73rem", fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none" }}
          >
            {label}
          </motion.a>
        ))}
      </div>

      {/* Hire Me */}
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <motion.a
          href={`mailto:${ME.email}`}
          animate={{ color: dark ? "#F2EFE9" : "#0E0E0D", borderColor: dark ? "#F2EFE9" : "#0E0E0D" }}
          transition={{ duration: 0.35 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.72rem", fontWeight: 700, letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none", padding: "0.5rem 1.3rem", border: "1.5px solid", background: "transparent" }}
          onMouseEnter={e => { e.currentTarget.style.background = dark ? "#F2EFE9" : "#0E0E0D"; e.currentTarget.style.color = dark ? "#0C0C0B" : "#F2EFE9" }}
          onMouseLeave={e => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = dark ? "#F2EFE9" : "#0E0E0D" }}
        >
          Hire Me →
        </motion.a>
      </div>
    </motion.nav>
  )
}