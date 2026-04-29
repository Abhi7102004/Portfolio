// ── Easing curves ─────────────────────────────────────────
export const EXPO = [0.76, 0, 0.24, 1]
export const EASE = [0.25, 0.46, 0.45, 0.94]

// ── GSAP easing equivalents ───────────────────────────────
// Use these in gsap.to / gsap.from calls
export const GSAP_EXPO = "power4.inOut"
export const GSAP_EASE = "power2.out"

// ── Viewport trigger config for whileInView ───────────────
export const VIEWPORT = { once: true, margin: "-64px" }

// ─────────────────────────────────────────────────────────
// SECTION-LEVEL VARIANTS (Framer Motion)
// ─────────────────────────────────────────────────────────

export const labelReveal = {
  hidden: { opacity: 0, x: -18 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.48, ease: EASE } },
}

export const headingReveal = {
  hidden: { opacity: 0, y: 38 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.80, ease: EXPO } },
}

export const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.58, ease: EASE } },
}

export const slideLeft = {
  hidden: { opacity: 0, x: -22 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

export const slideRight = {
  hidden: { opacity: 0, x: 22 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.55, ease: EASE } },
}

// ─────────────────────────────────────────────────────────
// STAGGER CONTAINER
// ─────────────────────────────────────────────────────────

export const stagger = (staggerChildren = 0.09, delayChildren = 0) => ({
  hidden: {},
  show: {
    transition: { staggerChildren, delayChildren },
  },
})

export const cardItem = {
  hidden: { opacity: 0, y: 20 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.52, ease: EASE } },
}

export const listItem = {
  hidden: { opacity: 0, x: 14 },
  show:   { opacity: 1, x: 0, transition: { duration: 0.48, ease: EASE } },
}

export const fadeItem = {
  hidden: { opacity: 0, scale: 0.94 },
  show:   { opacity: 1, scale: 1, transition: { duration: 0.38, ease: EASE } },
}

// ─────────────────────────────────────────────────────────
// HOVER MICRO-INTERACTIONS
// ─────────────────────────────────────────────────────────

export const hoverLift = {
  whileHover: { y: -5, transition: { duration: 0.22, ease: EASE } },
}

export const hoverScale = {
  whileHover: { scale: 1.04, transition: { duration: 0.20, ease: EASE } },
}

export const HOVER_BORDER = "rgba(13,148,136,0.55)"
export const REST_BORDER  = "rgba(46,46,44,1)"

// ─────────────────────────────────────────────────────────
// GSAP SCROLL ANIMATION HELPERS
// ─────────────────────────────────────────────────────────

/**
 * Returns true if the device is touch-only (pointer: coarse)
 * or if the user has requested reduced motion.
 * Use this to skip parallax / heavy scroll animations.
 */
export function shouldReduceMotion() {
  if (typeof window === "undefined") return true
  const noMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  const isTouch  = window.matchMedia("(pointer: coarse)").matches
  return noMotion || isTouch
}

/**
 * Clip-path wipe config for GSAP ScrollTrigger.
 * Each section starts fully hidden (curtain closed) and
 * wipes open top-to-bottom as it enters the viewport.
 *
 * @param {Element} trigger   The section DOM element
 * @param {Element} container The element to animate (usually same as trigger)
 * @returns gsap.from() config object — spread into gsap.from()
 */
export function buildWipeConfig(trigger, container) {
  return {
    clipPath: "inset(8% 0 0 0)",
    opacity: 0,
    duration: 1.1,
    ease: GSAP_EXPO,
    scrollTrigger: {
      trigger,
      start: "top 88%",
      end:   "top 30%",
      toggleActions: "play none none none",
    },
  }
}