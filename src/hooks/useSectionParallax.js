import { useRef } from "react"
import { useScroll, useTransform, useSpring } from "framer-motion"
import { shouldReduceMotion } from "../utils/animations"

/**
 * @param {Object} options
 * @param {number} options.speed  Parallax intensity 0–1 (default 0.10)
 */
export default function useSectionParallax({ speed = 0.10 } = {}) {
  const reduce = shouldReduceMotion()
  const ref    = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  // Convert 0→1 scroll progress to a pixel offset.
  // Negative = element moves up slower than the page (floats behind).
  const rawY = useTransform(
    scrollYProgress,
    [0, 1],
    [`${speed * 120}px`, `${-speed * 120}px`]
  )

  // Spring smoothing so the parallax doesn't feel mechanical
  const y = useSpring(rawY, { stiffness: 80, damping: 22, mass: 0.4 })

  return {
    ref,
    y: reduce ? 0 : y,
  }
}
