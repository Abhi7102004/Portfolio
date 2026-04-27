import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.25, 0.46, 0.45, 0.94]

function ProjectCard({ project, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: "-60px" })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.13, ease: EXPO }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? project.color + "55" : "#232321"}`,
        background: hovered ? "#0E0E0D" : "#0C0C0B",
        padding: "2rem",
        display: "flex", flexDirection: "column", gap: "1.2rem",
        transition: "border 0.3s, background 0.3s",
        cursor: "pointer",
        position: "relative", overflow: "hidden",
      }}
    >
      {/* Colored top bar */}
      <motion.div
        style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 2,
          background: project.color,
        }}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.35 }}
        transformOrigin="left"
      />

      {/* Header row */}
      <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12 }}>
        <div>
          <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", color: project.color, letterSpacing: "0.2em", marginBottom: 6 }}>
            {project.slug}
          </div>
          <h3 style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.4rem", fontWeight: 800, color: "#F2EFE9", lineHeight: 1.1, marginBottom: 4 }}>
            {project.name}
          </h3>
          <p style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", color: "var(--muted)", letterSpacing: "0.1em" }}>
            {project.tagline}
          </p>
        </div>
        <a
          href={project.github} target="_blank" rel="noreferrer"
          onClick={e => e.stopPropagation()}
          style={{
            width: 36, height: 36, border: "1px solid #232321",
            display: "flex", alignItems: "center", justifyContent: "center",
            color: "#F2EFE9", textDecoration: "none", fontSize: "1rem",
            flexShrink: 0, transition: "border 0.2s, color 0.2s",
            borderColor: hovered ? project.color : "#232321",
          }}
        >
          ↗
        </a>
      </div>

      {/* Description */}
      <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.88rem", color: "#6B6B65", lineHeight: 1.75 }}>
        {project.desc}
      </p>

      {/* Bottom row */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginTop: "auto" }}>
        {/* Tech pills */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map(t => (
            <span key={t} style={{
              fontFamily: "'Space Mono',monospace", fontSize: "0.58rem",
              letterSpacing: "0.08em", textTransform: "uppercase",
              border: "1px solid #232321", color: "var(--muted)",
              padding: "3px 9px",
            }}>
              {t}
            </span>
          ))}
        </div>
        {/* Metric badge */}
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: "0.62rem",
          letterSpacing: "0.1em", color: project.color,
          border: `1px solid ${project.color}44`,
          padding: "4px 10px", background: `${project.color}11`,
        }}>
          {project.metric}
        </span>
      </div>
    </motion.div>
  )
}

export default function Projects() {
  const headerRef = useRef(null)
  const inView = useInView(headerRef, { once: true, margin: "-80px" })

  return (
    <section
      id="projects"
      style={{ background: "var(--dark, #0C0C0B)", padding: "6rem 2.5rem", borderTop: "1px solid #232321" }}
    >
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        <motion.p
          ref={headerRef}
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.65rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "var(--teal)", marginBottom: "1.2rem" }}
        >
          Selected Work
        </motion.p>

        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08, ease: EXPO }}
            style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.4rem,5vw,4.5rem)", lineHeight: 0.92,
              letterSpacing: "-0.03em", color: "#F2EFE9",
            }}
          >
            PROJ-<br />
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "var(--teal)" }}>
              ECTS.
            </span>
          </motion.h2>

          <motion.a
            href={ME.github} target="_blank" rel="noreferrer"
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              fontFamily: "'Syne',sans-serif", fontSize: "0.78rem", fontWeight: 700,
              letterSpacing: "0.12em", textTransform: "uppercase",
              color: "#F2EFE9", textDecoration: "none",
              border: "1.5px solid #232321", padding: "0.7rem 1.5rem",
              transition: "border-color 0.2s, color 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--teal)"; e.currentTarget.style.color = "var(--teal)" }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "#232321"; e.currentTarget.style.color = "#F2EFE9" }}
          >
            All on GitHub ↗
          </motion.a>
        </div>

        {/* 3-column grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "1.25rem" }}>
          {ME.projects.map((p, i) => (
            <ProjectCard key={p.slug} project={p} index={i} />
          ))}
        </div>
      </div>
    </section>
  )
}