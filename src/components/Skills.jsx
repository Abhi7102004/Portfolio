import React, { useRef, useState } from "react"
import { motion, useInView } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.25, 0.46, 0.45, 0.94]

const CAT_META = {
  "Languages":            { icon: "{ }",  color: "#F59E0B", proficiency: 92 },
  "Frontend":             { icon: "⬡",    color: "#3B82F6", proficiency: 88 },
  "Backend":              { icon: "⚙",    color: "#0D9488", proficiency: 90 },
  "Databases":            { icon: "◈",    color: "#8B5CF6", proficiency: 82 },
  "DevOps & Tools":       { icon: "▲",    color: "#EC4899", proficiency: 75 },
  "Security & Protocols": { icon: "◎",    color: "#EF4444", proficiency: 70 },
  "Core CS":              { icon: "○",    color: "#10B981", proficiency: 95 },
}

const CP = [
  { name: "LeetCode",   rating: 1871, max: 2800, badge: "Knight",     rank: "Top 10%",       color: "#F59E0B", icon: "LC" },
  { name: "CodeChef",   rating: 1916, max: 2500, badge: "4★",          rank: "Global Rank 83",color: "#8B5CF6", icon: "CC" },
  { name: "Codeforces", rating: 1495, max: 2000, badge: "Specialist",  rank: "Top 20%",       color: "#3B82F6", icon: "CF" },
]

function Pill({ skill, color }) {
  const [hov, setHov] = useState(false)
  return (
    <motion.span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        background: hov ? color + "18" : "transparent",
        borderColor: hov ? color + "70" : "#232321",
        color: hov ? color : "#9a9a94",
      }}
      transition={{ duration: 0.15 }}
      style={{
        fontFamily: "'Syne',sans-serif", fontSize: "0.78rem", fontWeight: 600,
        border: "1px solid #232321", padding: "4px 12px", cursor: "default",
        display: "inline-block", letterSpacing: "0.01em",
      }}
    >
      {skill}
    </motion.span>
  )
}

function CatCard({ cat, index, inView }) {
  const meta = CAT_META[cat.cat] || { icon: "·", color: "#0D9488", proficiency: 80 }
  const [hov, setHov] = useState(false)
  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.06 + index * 0.07, ease: EXPO }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#111110" : "#0C0C0B",
        border: `1px solid ${hov ? meta.color + "44" : "#1e1e1c"}`,
        padding: "1.5rem", position: "relative", overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s",
      }}
    >
      {/* Glow */}
      <div style={{
        position: "absolute", top: 0, left: 0, width: 80, height: 80,
        background: `radial-gradient(circle, ${meta.color}22 0%, transparent 70%)`,
        opacity: hov ? 1 : 0, transition: "opacity 0.3s", pointerEvents: "none",
      }} />

      {/* Header */}
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.9rem" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <span style={{
            width: 30, height: 30, borderRadius: 6,
            background: meta.color + "18", border: `1px solid ${meta.color}44`,
            display: "flex", alignItems: "center", justifyContent: "center",
            fontFamily: "'Space Mono',monospace", fontSize: "0.6rem",
            color: meta.color, fontWeight: 700, flexShrink: 0,
          }}>
            {meta.icon}
          </span>
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: meta.color }}>
            {cat.cat}
          </span>
        </div>
        <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.68rem", fontWeight: 800, color: meta.color + "80" }}>
          {meta.proficiency}%
        </span>
      </div>

      {/* Bar */}
      <div style={{ height: 2, background: "#1e1e1c", borderRadius: 1, overflow: "hidden", marginBottom: "1rem" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${meta.proficiency}%` } : {}}
          transition={{ duration: 1, delay: 0.2 + index * 0.07, ease: EXPO }}
          style={{ height: "100%", background: meta.color, borderRadius: 1 }}
        />
      </div>

      {/* Pills */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
        {cat.items.map(s => <Pill key={s} skill={s} color={meta.color} />)}
      </div>
    </motion.div>
  )
}

function CPCard({ p, index, inView }) {
  const [hov, setHov] = useState(false)
  const pct = Math.round((p.rating / p.max) * 100)
  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: 0.5 + index * 0.1, ease: EXPO }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        background: hov ? "#111110" : "#0C0C0B",
        border: `1px solid ${hov ? p.color + "55" : "#1e1e1c"}`,
        padding: "1.8rem", position: "relative", overflow: "hidden",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      {/* Watermark */}
      <div style={{
        position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)",
        fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "4.5rem",
        color: p.color + "07", pointerEvents: "none", letterSpacing: "-0.05em",
      }}>
        {p.rating}
      </div>

      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1.1rem" }}>
        <div style={{
          width: 38, height: 38, borderRadius: 8,
          background: p.color + "18", border: `1px solid ${p.color}44`,
          display: "flex", alignItems: "center", justifyContent: "center",
          fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", color: p.color, fontWeight: 700,
        }}>
          {p.icon}
        </div>
        <span style={{
          fontFamily: "'Space Mono',monospace", fontSize: "0.58rem",
          letterSpacing: "0.15em", textTransform: "uppercase", color: p.color,
          border: `1px solid ${p.color}44`, padding: "3px 9px", background: p.color + "11",
        }}>
          {p.badge}
        </span>
      </div>

      <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#6B6B65", marginBottom: 4 }}>
        {p.name}
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "2rem", fontWeight: 800, color: "#F2EFE9", letterSpacing: "-0.03em", lineHeight: 1, marginBottom: 3 }}>
        {p.rating}
      </div>
      <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.73rem", color: "#6B6B65", marginBottom: "1rem" }}>
        {p.rank}
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", color: "#6B6B65" }}>0</span>
        <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", color: "#6B6B65" }}>{p.max}</span>
      </div>
      <div style={{ height: 3, background: "#1e1e1c", borderRadius: 2, overflow: "hidden" }}>
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay: 0.6 + index * 0.1, ease: EXPO }}
          style={{ height: "100%", background: `linear-gradient(to right, ${p.color}80, ${p.color})`, borderRadius: 2 }}
        />
      </div>
    </motion.div>
  )
}

export default function Skills() {
  const ref   = useRef(null)
  const cpRef = useRef(null)
  const inView   = useInView(ref,   { once: true, margin: "-60px" })
  const cpInView = useInView(cpRef, { once: true, margin: "-60px" })

  const allSkills = ME.skills.flatMap(s =>
    s.items.map(item => ({ item, color: (CAT_META[s.cat] || {}).color || "#0D9488" }))
  )

  return (
    <section id="about" ref={ref} style={{ background: "#0E0E0D", padding: "6rem 2.5rem", borderTop: "1px solid #1e1e1c" }}>
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>

        {/* Label */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#0D9488", marginBottom: "1.1rem" }}
        >
          Skills & Expertise
        </motion.p>

        {/* Heading + summary pills */}
        <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", marginBottom: "3rem" }}>
          <motion.h2
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EXPO }}
            style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(2.2rem,5vw,4rem)", lineHeight: 0.9, letterSpacing: "-0.03em", color: "#F2EFE9" }}
          >
            WHAT I<br />
            <span style={{ fontFamily: "'Instrument Serif',serif", fontStyle: "italic", fontWeight: 400, color: "#0D9488" }}>KNOW.</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28 }}
            style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {[{ n: "7", l: "Skill Areas" }, { n: "40+", l: "Technologies" }, { n: "3", l: "CP Platforms" }].map(s => (
              <div key={s.l} style={{ border: "1px solid #1e1e1c", padding: "0.65rem 1.1rem", display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <span style={{ fontFamily: "'Syne',sans-serif", fontSize: "1.25rem", fontWeight: 800, color: "#F2EFE9" }}>{s.n}</span>
                <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.15em", textTransform: "uppercase", color: "#6B6B65" }}>{s.l}</span>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Category grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: "1px", background: "#1e1e1c", border: "1px solid #1e1e1c", marginBottom: "5rem" }}>
          {ME.skills.map((cat, ci) => (
            <div key={cat.cat} style={{ background: "#0E0E0D" }}>
              <CatCard cat={cat} index={ci} inView={inView} />
            </div>
          ))}
        </div>

        {/* Marquee */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{
            overflow: "hidden", marginBottom: "5rem",
            maskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
            WebkitMaskImage: "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
          }}
        >
          <motion.div
            style={{ display: "flex", alignItems: "center", width: "max-content" }}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
          >
            {[...allSkills, ...allSkills].map(({ item, color }, i) => (
              <React.Fragment key={i}>
                <span style={{
                  fontFamily: "'Syne',sans-serif", fontWeight: 800,
                  fontSize: "clamp(1.6rem,2.8vw,2.4rem)",
                  color: i % 7 === 0 ? color : "rgba(242,239,233,0.05)",
                  whiteSpace: "nowrap", letterSpacing: "-0.02em", padding: "0 1.2rem",
                }}>
                  {item}
                </span>
                <span style={{ color: "#1e1e1c", fontSize: "0.5rem", flexShrink: 0 }}>◆</span>
              </React.Fragment>
            ))}
          </motion.div>
        </motion.div>

        {/* CP section */}
        <div ref={cpRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={cpInView ? { opacity: 1 } : {}}
            style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.62rem", letterSpacing: "0.35em", textTransform: "uppercase", color: "#0D9488", marginBottom: "0.9rem" }}
          >
            Competitive Programming
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={cpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem", marginBottom: "1.8rem" }}
          >
            <h3 style={{ fontFamily: "'Syne',sans-serif", fontWeight: 800, fontSize: "clamp(1.3rem,2.5vw,2rem)", color: "#F2EFE9", letterSpacing: "-0.02em" }}>
              800+ Problems Solved Across Platforms
            </h3>
            <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.85rem", color: "#6B6B65", maxWidth: 320, lineHeight: 1.65 }}>
              Consistent competitive programmer with peak ratings on LeetCode, CodeChef, and Codeforces.
            </p>
          </motion.div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "1px", background: "#1e1e1c", border: "1px solid #1e1e1c" }}>
            {CP.map((p, i) => (
              <div key={p.name} style={{ background: "#0E0E0D" }}>
                <CPCard p={p} index={i} inView={cpInView} />
              </div>
            ))}
            {/* Teal total cell */}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={cpInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.85 }}
              style={{ background: "#0D9488", padding: "1.8rem", display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 200 }}
            >
              <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.58rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "rgba(0,0,0,0.45)" }}>
                Total Solved
              </span>
              <div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "3.2rem", fontWeight: 800, color: "#0C0C0B", lineHeight: 1, letterSpacing: "-0.04em" }}>
                  800+
                </div>
                <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.82rem", color: "rgba(0,0,0,0.55)", marginTop: 3 }}>
                  DSA Problems
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Arrays","DP","Graphs","Trees","Strings"].map(t => (
                  <span key={t} style={{
                    fontFamily: "'Space Mono',monospace", fontSize: "0.52rem", letterSpacing: "0.1em", textTransform: "uppercase",
                    border: "1px solid rgba(0,0,0,0.2)", color: "rgba(0,0,0,0.65)", padding: "3px 8px",
                  }}>
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}