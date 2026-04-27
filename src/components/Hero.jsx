import React, { useEffect, useRef, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { ME } from "../data"

const EXPO = [0.76, 0, 0.24, 1]
const EASE = [0.25, 0.46, 0.45, 0.94]

if (typeof window !== "undefined") {
  if (window.history.scrollRestoration) window.history.scrollRestoration = "manual"
  window.scrollTo(0, 0)
}

function useTypewriter(words, speed = 72, pause = 2000) {
  const [text, setText]         = useState("")
  const [idx, setIdx]           = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const word  = words[idx % words.length]
    const delay = deleting ? speed / 2 : speed
    const t = setTimeout(() => {
      if (!deleting) {
        const next = word.slice(0, text.length + 1)
        setText(next)
        if (next === word) setTimeout(() => setDeleting(true), pause)
      } else {
        const next = text.slice(0, -1)
        setText(next)
        if (next === "") { setDeleting(false); setIdx(i => i + 1) }
      }
    }, delay)
    return () => clearTimeout(t)
  }, [text, deleting, idx, words, speed, pause])

  return text
}

// ── 5 commands, one terse output each — total ~3-4 s ─────────────────────────
const TERMINAL_STEPS = [
  {
    cmd: "init portfolio.config",
    outputs: [{ text: "[ok]   config loaded" }],
  },
  {
    cmd: "load user.details",
    outputs: [{ text: "[ok]   profile fetched" }],
  },
  {
    cmd: "load user.{experience,skills,projects}",
    outputs: [{ text: "[ok]   modules resolved  (3/3)" }],
  },
  {
    cmd: "verify user.profile",
    outputs: [{ text: "[ok]   integrity check passed" }],
  },
  {
    cmd: "launch portfolio",
    outputs: [],
    isLaunch: true,
  },
]

function TerminalIntro({ onDone }) {
  const [lines,    setLines]    = useState([])
  const [cmdText,  setCmdText]  = useState("")
  const [progress, setProgress] = useState(-1)
  const [exiting,  setExiting]  = useState(false)
  const [clock,    setClock]    = useState("")
  const bottomRef = useRef(null)

  useEffect(() => {
    function tick() { setClock(new Date().toTimeString().slice(0, 8)) }
    tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
  }, [])

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [lines, cmdText, progress])

  useEffect(() => {
    document.body.style.overflow = "hidden"
    window.scrollTo(0, 0)
    let cancelled = false
    const sleep = ms => new Promise(r => setTimeout(r, ms))

    // type speed 32ms/char — fast but readable
    async function typeCmd(text, speed = 32) {
      for (let i = 0; i <= text.length; i++) {
        if (cancelled) return
        setCmdText(text.slice(0, i))
        await sleep(speed)
      }
    }

    async function run() {
      await sleep(220)
      for (const step of TERMINAL_STEPS) {
        if (cancelled) return
        await sleep(60)
        await typeCmd(step.cmd)
        await sleep(80)
        setLines(l => [...l, { kind: "cmd", text: step.cmd }])
        setCmdText("")
        for (const out of step.outputs) {
          if (cancelled) return
          await sleep(35)
          setLines(l => [...l, { kind: "out", text: out.text }])
        }
        if (step.isLaunch) {
          await sleep(100)
          setProgress(0)
          // 100 ticks × 10 ms = 1 s for progress bar
          for (let p = 1; p <= 100; p++) {
            if (cancelled) return
            setProgress(p)
            await sleep(10)
          }
          await sleep(160)
          setLines(l => [...l, { kind: "out", text: "[ok]   launching..." }])
          await sleep(320)
          setExiting(true)
          await sleep(820)
          document.body.style.overflow = ""
          window.scrollTo(0, 0)
          onDone?.()
        }
      }
    }

    run()
    return () => { cancelled = true; document.body.style.overflow = "" }
  }, [])

  const BAR_LEN = 28
  const filled  = progress >= 0 ? Math.round((progress / 100) * BAR_LEN) : 0
  const bar     = "█".repeat(filled) + "░".repeat(BAR_LEN - filled)

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          key="terminal-overlay"
          initial={{ y: 0 }}
          exit={{ y: "-100%" }}
          transition={{ duration: 0.82, ease: EXPO }}
          style={{
            position: "fixed", inset: 0, zIndex: 200,
            background: "#0C0C0B",
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1.5rem",
          }}
        >
          <div style={{
            width: "100%", maxWidth: 780,
            background: "#111110",
            borderRadius: 16,
            border: "1px solid #2a2a28",
          }}>
            {/* Title bar */}
            <div style={{
              display: "flex", alignItems: "center", gap: 8,
              padding: "13px 18px",
              borderBottom: "1px solid #1e1e1c",
              background: "#161615",
              borderRadius: "16px 16px 0 0",
            }}>
              {["#FF5F57", "#FEBC2E", "#28C840"].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: "50%", background: c }} />
              ))}
              <span style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.62rem", letterSpacing: "0.18em", color: "#3a3a36",
                marginLeft: "auto",
              }}>
                system@portfolio ~ zsh
              </span>
              <span style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.58rem", color: "#3a3a36", marginLeft: "1.5rem",
              }}>
                {clock}
              </span>
            </div>

            {/* Terminal body */}
            <div style={{
              padding: "1.6rem 2rem 1.8rem",
              minHeight: 300,
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.74rem",
              lineHeight: 2.1,
              borderRadius: "0 0 16px 16px",
            }}>
              {lines.map((ln, i) => (
                <div key={i}>
                  {ln.kind === "cmd" && (
                    <div>
                      <span style={{ color: "#0D9488" }}>{"~ $ "}</span>
                      <span style={{ color: "#F2EFE9" }}>{ln.text}</span>
                    </div>
                  )}
                  {ln.kind === "out" && (
                    <div style={{ paddingLeft: "1.6rem", color: "#28C840" }}>
                      {ln.text}
                    </div>
                  )}
                </div>
              ))}

              {/* Active typing line */}
              {cmdText !== "" && (
                <div>
                  <span style={{ color: "#0D9488" }}>{"~ $ "}</span>
                  <span style={{ color: "#F2EFE9" }}>{cmdText}</span>
                  <motion.span
                    animate={{ opacity: [1, 0, 1] }}
                    transition={{ duration: 0.82, repeat: Infinity }}
                    style={{
                      display: "inline-block", width: 8, height: 14,
                      background: "#0D9488", verticalAlign: "middle", marginLeft: 2,
                    }}
                  />
                </div>
              )}

              {/* Progress bar */}
              {progress >= 0 && (
                <div style={{ paddingLeft: "1.6rem", marginTop: "0.2rem" }}>
                  <span style={{ color: "#0D9488" }}>{bar}</span>
                  <span style={{ color: "#F2EFE9", marginLeft: 14 }}>
                    {String(progress).padStart(3, " ")}%
                  </span>
                </div>
              )}

              <div ref={bottomRef} />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

const BTNS = [
  { label: "GitHub \u2197",       solid: true,  ghost: false },
  { label: "Email Me",            solid: false, ghost: false },
  { label: "See Projects \u2193", solid: false, ghost: true  },
]

export default function Hero({ onIntroComplete }) {
  const [introDone, setIntroDone] = useState(false)
  const role = useTypewriter(ME.roles, 70, 2000)

  useEffect(() => { window.scrollTo(0, 0) }, [])

  function getBtnHref(label) {
    if (label.startsWith("GitHub")) return ME.github
    if (label.startsWith("Email")) return "mailto:" + ME.email
    return "#experience"
  }

  return (
    <section
      id="home"
      style={{ position: "relative", minHeight: "100vh", background: "#F2EFE9", overflow: "hidden" }}
    >
      <TerminalIntro
        onDone={() => {
          setIntroDone(true)
          onIntroComplete?.()
        }}
      />

      <div style={{
        minHeight: "100vh", display: "flex", flexDirection: "column",
        justifyContent: "center", padding: "6rem 2.5rem 8rem",
        maxWidth: 1200, margin: "0 auto", position: "relative",
      }}>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            border: "1px solid rgba(13,148,136,0.45)", borderRadius: 999,
            padding: "0.38rem 1rem", marginBottom: "2rem", width: "fit-content",
            background: "rgba(13,148,136,0.07)",
          }}
        >
          <motion.span
            animate={{ opacity: [1, 0.15, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            style={{ width: 6, height: 6, borderRadius: "50%", background: "#0D9488", display: "inline-block" }}
          />
          <span style={{
            fontFamily: "'Space Mono',monospace", fontSize: "0.6rem",
            letterSpacing: "0.22em", textTransform: "uppercase", color: "#0D9488", fontWeight: 700,
          }}>
            Open to Work · SDE · Backend · Fintech
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.12, ease: EASE }}
          style={{
            fontFamily: "'Space Mono',monospace", fontSize: "0.72rem",
            letterSpacing: "0.28em", textTransform: "uppercase", color: "#9a9a94", marginBottom: "0.5rem",
          }}
        >
          Hi there, I&apos;m
        </motion.p>

        <div style={{ overflow: "hidden", lineHeight: 1 }}>
          <motion.h1
            initial={{ y: "108%" }}
            animate={introDone ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.22, ease: EXPO }}
            style={{
              fontFamily: "'Syne',sans-serif", fontWeight: 800,
              fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
              lineHeight: 0.92, letterSpacing: "-0.03em", color: "#0E0E0D",
            }}
          >
            Abhishek
          </motion.h1>
        </div>

        <div style={{ overflow: "hidden", lineHeight: 1, marginBottom: "2rem" }}>
          <motion.h1
            initial={{ y: "108%" }}
            animate={introDone ? { y: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.34, ease: EXPO }}
            style={{
              fontFamily: "'Instrument Serif',serif", fontWeight: 400, fontStyle: "italic",
              fontSize: "clamp(2.8rem, 7vw, 5.8rem)",
              lineHeight: 0.92, letterSpacing: "-0.01em", color: "#0D9488",
            }}
          >
            Yadav.
          </motion.h1>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.52, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "2.5rem", alignItems: "flex-start", marginBottom: "2.5rem" }}
        >
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
              <span style={{
                fontFamily: "'Space Mono',monospace", fontSize: "0.82rem",
                fontWeight: 700, color: "#0E0E0D", minWidth: 200,
              }}>
                {role}
              </span>
              <motion.span
                animate={{ opacity: [1, 0, 1] }}
                transition={{ duration: 0.85, repeat: Infinity }}
                style={{ display: "inline-block", width: 2, height: 17, background: "#0D9488" }}
              />
            </div>
            <div style={{ width: 36, height: 1, background: "#0E0E0D", opacity: 0.15 }} />
          </div>
          <p style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.93rem", lineHeight: 1.8, color: "#6B6B65", maxWidth: 400 }}>
            {ME.bio}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.66, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "0.85rem", marginBottom: "4.5rem" }}
        >
          {BTNS.map(btn => (
            <a
              key={btn.label}
              href={getBtnHref(btn.label)}
              target={getBtnHref(btn.label).startsWith("http") ? "_blank" : undefined}
              rel="noreferrer"
              style={{
                fontFamily: "'Syne',sans-serif", fontSize: "0.78rem", fontWeight: 700,
                letterSpacing: "0.12em", textTransform: "uppercase", textDecoration: "none",
                padding: btn.ghost ? "0.85rem 0.5rem" : "0.85rem 2rem",
                background: btn.solid ? "#0E0E0D" : "transparent",
                color: btn.ghost ? "#0E0E0D" : btn.solid ? "#F2EFE9" : "#0E0E0D",
                border: btn.ghost ? "none" : btn.solid ? "none" : "1.5px solid #0E0E0D",
                opacity: btn.ghost ? 0.4 : 1,
                transition: "background 0.25s, color 0.25s, opacity 0.2s",
              }}
              onMouseEnter={e => {
                if (btn.solid) e.currentTarget.style.background = "#0D9488"
                if (!btn.solid && !btn.ghost) { e.currentTarget.style.background = "#0E0E0D"; e.currentTarget.style.color = "#F2EFE9" }
                if (btn.ghost) e.currentTarget.style.opacity = "1"
              }}
              onMouseLeave={e => {
                if (btn.solid) e.currentTarget.style.background = "#0E0E0D"
                if (!btn.solid && !btn.ghost) { e.currentTarget.style.background = "transparent"; e.currentTarget.style.color = "#0E0E0D" }
                if (btn.ghost) e.currentTarget.style.opacity = "0.4"
              }}
            >
              {btn.label}
            </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 22 }}
          animate={introDone ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.82, ease: EASE }}
          style={{ display: "flex", flexWrap: "wrap", gap: "3rem" }}
        >
          {ME.stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 14 }}
              animate={introDone ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.9 + i * 0.09 }}
            >
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "clamp(1.4rem,2.5vw,2rem)", fontWeight: 800, color: "#0E0E0D", lineHeight: 1 }}>
                {s.val}
              </div>
              <div style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.57rem", letterSpacing: "0.18em", textTransform: "uppercase", color: "#0D9488", marginTop: 5 }}>
                {s.label}
              </div>
              <div style={{ fontFamily: "'Syne',sans-serif", fontSize: "0.7rem", color: "#9a9a94", marginTop: 2 }}>
                {s.sub}
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.pre
          className="code-block"
          initial={{ opacity: 0, x: 28 }}
          animate={introDone ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.7, delay: 1.05, ease: EASE }}
          style={{
            position: "absolute", right: "2%", top: "50%", transform: "translateY(-50%)",
            fontFamily: "'Space Mono',monospace", fontSize: "0.68rem", lineHeight: 2.1,
            color: "#9a9a94", background: "rgba(14,14,13,0.04)",
            border: "1px solid rgba(14,14,13,0.08)", padding: "1.4rem 1.8rem",
          }}
        >{`class Engineer {
  name      = "Abhishek"
  company   = "Pine Labs"
  stack     = ["Java","React","Node"]
  problems  = 800+
  cf_rating = 1495
  available = True
}`}</motion.pre>

        <motion.div
          initial={{ opacity: 0 }}
          animate={introDone ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 1.4 }}
          style={{
            position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8,
          }}
        >
          <span style={{ fontFamily: "'Space Mono',monospace", fontSize: "0.57rem", letterSpacing: "0.3em", textTransform: "uppercase", color: "#9a9a94" }}>
            Scroll
          </span>
          <motion.div
            style={{ width: 1, height: 46, background: "linear-gradient(to bottom, #0E0E0D, transparent)", opacity: 0.2 }}
            animate={{ scaleY: [1, 0.3, 1], opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
        </motion.div>
      </div>

      <style>{`
        .code-block { display: none; }
        @media (min-width: 1100px) { .code-block { display: block !important; } }
      `}</style>
    </section>
  )
}