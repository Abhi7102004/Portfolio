import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.25, 0.46, 0.45, 0.94]

const links = [
  { label: "GitHub",   href: ME.github,   hint: "Abhi7102004" },
  { label: "LinkedIn", href: ME.linkedin, hint: "abhishek-yadav" },
  { label: "LeetCode", href: ME.leetcode, hint: "Knight · 1871" },
  { label: "Email",    href: `mailto:${ME.email}`, hint: ME.email },
]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  return (
    <section
      id="contact"
      ref={ref}
      style={{ background: "#0A0A09", padding: "6rem 2.5rem 5rem", borderTop: "1px solid #232321" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "1.2rem" }}
        >
          Get in Touch
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: EXPO }}
          style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.8rem,7vw,6rem)", lineHeight: 0.9,
            letterSpacing: "-0.03em", color: "#F2EFE9", marginBottom: "1.5rem",
          }}
        >
          LET'S<br />
          <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--teal)" }}>
            CONNECT.
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.25 }}
          style={{ fontFamily: "'Syne',sans-serif", fontSize: "1rem", color: "var(--muted)", lineHeight: 1.75, maxWidth: 480, marginBottom: "3rem" }}
        >
          Open to internship and full-time opportunities in backend, fintech, and full-stack engineering. Let's build something production-grade together.
        </motion.p>

        {/* Primary CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.38 }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "4rem" }}
        >
          <a
            href={`mailto:${ME.email}`}
            style={{
              fontFamily: "'Syne',sans-serif", fontSize: "0.82rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              background: "var(--teal)", color: "#0A0A09",
              padding: "0.9rem 2.2rem", textDecoration: "none",
              transition: "background 0.25s",
            }}
            onMouseEnter={e => e.currentTarget.style.background = "#0fbfac"}
            onMouseLeave={e => e.currentTarget.style.background = "var(--teal)"}
          >
            Send Email →
          </a>
          <a
            href={`tel:${ME.phone}`}
            style={{
              fontFamily: "'Syne',sans-serif", fontSize: "0.82rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              border: "1.5px solid #232321", color: "#F2EFE9",
              padding: "0.9rem 2.2rem", textDecoration: "none",
              transition: "border-color 0.25s, color 0.25s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.color = "var(--teal)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#232321"; e.currentTarget.style.color = "#F2EFE9" }}
          >
            {ME.phone}
          </a>
        </motion.div>

        {/* Links row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
          style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1px", border: "1px solid #232321", marginBottom: "4rem" }}
        >
          {links.map((lnk, i) => (
            <a
              key={lnk.label}
              href={lnk.href}
              target={lnk.href.startsWith("mailto") ? undefined : "_blank"}
              rel="noreferrer"
              style={{
                padding: "1.5rem 1.8rem",
                background: "#0C0C0B",
                textDecoration: "none",
                borderRight: i < links.length - 1 ? "1px solid #232321" : "none",
                display: "flex", flexDirection: "column", gap: 6,
                transition: "background 0.25s",
              }}
              onMouseEnter={e => e.currentTarget.style.background = "#111110"}
              onMouseLeave={e => e.currentTarget.style.background = "#0C0C0B"}
            >
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.9rem", fontWeight: 700, color: "#F2EFE9" }}>{lnk.label}</span>
                <span style={{ color: "var(--teal)", fontSize: "0.9rem" }}>↗</span>
              </div>
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", color: "var(--muted)", letterSpacing: "0.08em" }}>{lnk.hint}</span>
            </a>
          ))}
        </motion.div>

        {/* Footer */}
        <div style={{
          borderTop: "1px solid #232321", paddingTop: "2rem",
          display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
        }}>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", color: "rgba(242,239,233,0.2)", letterSpacing: "0.1em" }}>
            AY. — Abhishek Yadav · IIIT Nagpur · {new Date().getFullYear()}
          </span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", color: "rgba(242,239,233,0.2)", letterSpacing: "0.1em" }}>
            Built with React · Framer Motion · Tailwind
          </span>
        </div>
      </div>
    </section>
  )
}