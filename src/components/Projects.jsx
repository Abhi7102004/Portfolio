import React, { useState } from "react";
import { motion } from "framer-motion";
import { ME } from "../data";
import {
  VIEWPORT,
  labelReveal,
  headingReveal,
  fadeUp,
  stagger,
  cardItem,
  fadeItem,
} from "../utils/animations";

// ─── Project card ─────────────────────────────────────────
// Uses variants so the parent stagger container drives timing.
// Internal hover effects (top bar, border glow) are kept as-is
// since they're already well-crafted.
function ProjectCard({ project }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      variants={cardItem}
      whileHover={{ y: -6, transition: { duration: 0.22 } }}
      onHoverStart={() => setHovered(true)}
      onHoverEnd={() => setHovered(false)}
      style={{
        border: `1px solid ${hovered ? project.color + "55" : "#232321"}`,
        background: hovered ? "#0E0E0D" : "#0C0C0B",
        padding: "2.2rem",
        display: "flex",
        flexDirection: "column",
        gap: "1.3rem",
        transition: "border 0.28s, background 0.28s",
        cursor: "pointer",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Accent bar slides in on hover */}
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 2,
          background: project.color,
          originX: 0,
        }}
        initial={{ scaleX: 0 }}
        animate={hovered ? { scaleX: 1 } : { scaleX: 0 }}
        transition={{ duration: 0.32 }}
      />

      {/* Header row */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div>
          <div
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.7rem",
              color: project.color,
              letterSpacing: "0.18em",
              marginBottom: 8,
            }}
          >
            {project.slug}
          </div>
          <h3
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "1.45rem",
              fontWeight: 800,
              color: "#F2EFE9",
              lineHeight: 1.1,
              marginBottom: 5,
            }}
          >
            {project.name}
          </h3>
          <p
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.70rem",
              color: "#7A7A74",
              letterSpacing: "0.08em",
            }}
          >
            {project.tagline}
          </p>
        </div>

        <motion.a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          whileHover={{ scale: 1.08, transition: { duration: 0.18 } }}
          style={{
            width: 36,
            height: 36,
            border: `1px solid ${hovered ? project.color : "#2A2A28"}`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: hovered ? project.color : "#C8C5BF",
            textDecoration: "none",
            fontSize: "1rem",
            flexShrink: 0,
            transition: "border-color 0.2s, color 0.2s",
          }}
        >
          ↗
        </motion.a>
      </div>

      {/* Description */}
      <p
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "0.97rem",
          color: "#9E9B96",
          lineHeight: 1.78,
        }}
      >
        {project.desc}
      </p>

      {/* Bottom row — tech pills + metric badge */}
      <motion.div
        variants={stagger(0.05, 0.1)}
        initial="hidden"
        whileInView="show"
        viewport={VIEWPORT}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 12,
          marginTop: "auto",
        }}
      >
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {project.tech.map((t) => (
            <motion.span
              key={t}
              variants={fadeItem}
              whileHover={{
                borderColor: project.color + "66",
                color: project.color,
                transition: { duration: 0.15 },
              }}
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.63rem",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                border: "1px solid #2A2A28",
                color: "#7A7A74",
                padding: "4px 10px",
                transition: "border-color 0.15s, color 0.15s",
              }}
            >
              {t}
            </motion.span>
          ))}
        </div>

        <motion.span
          variants={fadeItem}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.65rem",
            letterSpacing: "0.1em",
            color: project.color,
            border: `1px solid ${project.color}44`,
            padding: "4px 10px",
            background: `${project.color}11`,
          }}
        >
          {project.metric}
        </motion.span>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────
export default function Projects() {
  return (
    <section
      id="projects"
      style={{
        background: "var(--dark, #0C0C0B)",
        padding: "clamp(3.5rem, 8vw, 6rem) clamp(1.2rem, 5vw, 2.5rem)",
        borderTop: "1px solid #232321",
      }}
    >
      <div style={{ maxWidth: 1550, margin: "0 auto" }}>
        {/* ── Label ───────────────────────────────────── */}
        <motion.p
          variants={labelReveal}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.82rem",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "var(--teal)",
            marginBottom: "1.2rem",
          }}
        >
          Selected Work
        </motion.p>

        {/* ── Heading row ─────────────────────────────── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "1.5rem",
            marginBottom: "3rem",
          }}
        >
          <motion.h2
            variants={headingReveal}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.4rem,5vw,4.5rem)",
              lineHeight: 0.92,
              letterSpacing: "-0.03em",
              color: "#F2EFE9",
            }}
          >
            PROJ-
            <br />
            <span
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "var(--teal)",
              }}
            >
              ECTS.
            </span>
          </motion.h2>

          <motion.a
            href={ME.github}
            target="_blank"
            rel="noreferrer"
            variants={fadeUp}
            initial="hidden"
            whileInView="show"
            viewport={VIEWPORT}
            whileHover={{
              borderColor: "var(--teal)",
              color: "var(--teal)",
              transition: { duration: 0.2 },
            }}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontSize: "0.82rem",
              fontWeight: 700,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              color: "#F2EFE9",
              textDecoration: "none",
              border: "1.5px solid #2A2A28",
              padding: "0.7rem 1.5rem",
              transition: "border-color 0.2s, color 0.2s",
            }}
          >
            All on GitHub ↗
          </motion.a>
        </div>

        {/* ── Cards grid — staggered reveal ───────────── */}
        <motion.div
          variants={stagger(0.12, 0.05)}
          initial="hidden"
          whileInView="show"
          viewport={VIEWPORT}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
            gap: "1.25rem",
          }}
        >
          {ME.projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}