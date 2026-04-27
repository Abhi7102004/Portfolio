import React, { useRef } from "react"
import { motion, useInView } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.25, 0.46, 0.45, 0.94]

export default function Experience() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-80px" })

  const exp = ME.experience[0]

  return (
    <section
      id="experience"
      ref={ref}
      style={{ background: "var(--dark-2, #141413)", padding: "6rem 2.5rem", borderTop: "1px solid var(--dark-border, #232321)" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, x: -16 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "1.2rem" }}
        >
          Experience
        </motion.p>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.75, delay: 0.08, ease: EXPO }}
          style={{
            fontFamily: "'Syne',sans-serif", fontWeight: 800,
            fontSize: "clamp(2.4rem,5vw,4.5rem)", lineHeight: 0.92,
            letterSpacing: "-0.03em", color: "#F2EFE9", marginBottom: "3.5rem",
          }}
        >
          WHERE I'VE<br />
          <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--teal)" }}>
            WORKED.
          </span>
        </motion.h2>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.18, ease: EXPO }}
          style={{
            border: "1px solid #232321",
            background: "#0C0C0B",
            padding: "2.5rem",
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: "3rem",
          }}
        >
          {/* Left — company info */}
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: "1rem" }}>
              <div style={{
                width: 44, height: 44, borderRadius: 8,
                background: "var(--teal)", display: "flex", alignItems: "center",
                justifyContent: "center", fontFamily: "'Syne',sans-serif",
                fontWeight: 800, fontSize: "1rem", color: "#0C0C0B",
              }}>
                PL
              </div>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.1rem", fontWeight: 700, color: "#F2EFE9" }}>{exp.company}</div>
                <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: "var(--teal)", letterSpacing: "0.1em" }}>{exp.location}</div>
              </div>
            </div>

            <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.82rem", color: "#F2EFE9", fontWeight: 600, marginBottom: 4 }}>{exp.role}</div>
            <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: "var(--muted)", marginBottom: "1.5rem" }}>{exp.period}</div>

            {/* Tech pills */}
            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {exp.tech.map(t => (
                <span key={t} style={{
                  fontFamily: "'Space Mono',monospace", fontSize: "0.6rem",
                  letterSpacing: "0.08em", textTransform: "uppercase",
                  border: "1px solid #232321", color: "var(--teal)",
                  padding: "3px 10px", background: "rgba(13,148,136,0.07)",
                }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — highlights */}
          <div style={{ borderLeft: "1px solid #232321", paddingLeft: "2.5rem" }}>
            <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--muted)", marginBottom: "1.2rem" }}>
              Key Contributions
            </p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "1.1rem" }}>
              {exp.highlights.map((h, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, x: 16 }}
                  animate={inView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                  style={{ display: "flex", gap: 12, alignItems: "flex-start" }}
                >
                  <span style={{ color: "var(--teal)", fontSize: "0.75rem", marginTop: 3, flexShrink: 0 }}>▸</span>
                  <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.88rem", color: "#9a9a94", lineHeight: 1.7 }}>{h}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        </motion.div>

        {/* Education row */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.55 }}
          style={{
            marginTop: "1.5rem",
            border: "1px solid #232321",
            background: "#0C0C0B",
            padding: "1.6rem 2.5rem",
            display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 8,
              background: "#1a1a18", border: "1px solid #232321",
              display: "flex", alignItems: "center", justifyContent: "center",
              fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "0.75rem", color: "#F2EFE9",
            }}>
              IIT
            </div>
            <div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.95rem", fontWeight: 700, color: "#F2EFE9" }}>{ME.education.short}</div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.78rem", color: "var(--muted)" }}>{ME.education.degree}</div>
            </div>
          </div>
          <div style={{ display: "flex", gap: "2.5rem" }}>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.3rem", fontWeight: 800, color: "#F2EFE9" }}>{ME.education.cgpa}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", color: "var(--teal)", letterSpacing: "0.15em", textTransform: "uppercase" }}>CGPA / 10</div>
            </div>
            <div style={{ textAlign: "right" }}>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.85rem", fontWeight: 600, color: "#F2EFE9" }}>{ME.education.period}</div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.6rem", color: "var(--muted)", letterSpacing: "0.1em" }}>B.Tech CSE</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}