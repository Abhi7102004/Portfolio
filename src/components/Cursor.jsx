import React, { useEffect, useState } from "react"
import { motion, useMotionValue, useSpring } from "framer-motion"

export default function Cursor() {
  const mx = useMotionValue(-200)
  const my = useMotionValue(-200)

  /* Dot follows instantly */
  const dotX = useSpring(mx, { stiffness: 1200, damping: 60 })
  const dotY = useSpring(my, { stiffness: 1200, damping: 60 })

  /* Ring follows with spring lag */
  const ringX = useSpring(mx, { stiffness: 260, damping: 28 })
  const ringY = useSpring(my, { stiffness: 260, damping: 28 })

  const [hover,   setHover]   = useState(false)
  const [click,   setClick]   = useState(false)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    /* Only mount on pointer-fine (desktop) devices */
    if (window.matchMedia("(pointer: coarse)").matches) return

    const onMove = (e) => {
      mx.set(e.clientX)
      my.set(e.clientY)
      setVisible(true)
    }
    const onOver = (e) => {
      setHover(!!e.target.closest(
        "a, button, [role='button'], input, textarea, select, label, [data-hover]"
      ))
    }
    const onDown  = () => setClick(true)
    const onUp    = () => setClick(false)
    const onLeave = () => setVisible(false)
    const onEnter = () => setVisible(true)

    window.addEventListener("mousemove",  onMove)
    window.addEventListener("mouseover",  onOver)
    window.addEventListener("mousedown",  onDown)
    window.addEventListener("mouseup",    onUp)
    window.addEventListener("mouseleave", onLeave)
    window.addEventListener("mouseenter", onEnter)

    return () => {
      window.removeEventListener("mousemove",  onMove)
      window.removeEventListener("mouseover",  onOver)
      window.removeEventListener("mousedown",  onDown)
      window.removeEventListener("mouseup",    onUp)
      window.removeEventListener("mouseleave", onLeave)
      window.removeEventListener("mouseenter", onEnter)
    }
  }, [mx, my])

  if (!visible) return null

  return (
    <>
      {/* ── Lagging outer ring ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99998,
          borderRadius: "50%",
          border: `1.5px solid ${hover ? "#0D9488" : "rgba(13,148,136,0.55)"}`,
          background: hover ? "rgba(13,148,136,0.07)" : "transparent",
          width:  hover ? 48 : click ? 20 : 34,
          height: hover ? 48 : click ? 20 : 34,
          transition: "width 0.18s ease, height 0.18s ease, border-color 0.2s ease, background 0.2s ease",
        }}
      />

      {/* ── Precise inner dot ── */}
      <motion.div
        style={{
          position: "fixed",
          top: 0, left: 0,
          x: dotX, y: dotY,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none",
          zIndex: 99999,
          borderRadius: "50%",
          background: "#0D9488",
          width:  hover ? 9 : click ? 3 : 5,
          height: hover ? 9 : click ? 3 : 5,
          transition: "width 0.14s ease, height 0.14s ease",
        }}
      />
    </>
  )
}