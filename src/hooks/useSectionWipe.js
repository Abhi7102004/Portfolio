// src/hooks/useSectionWipe.js
import { useEffect, useRef } from "react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

function shouldReduceMotion() {
  if (typeof window === "undefined") return true
  return (
    window.matchMedia("(prefers-reduced-motion: reduce)").matches ||
    window.matchMedia("(pointer: coarse)").matches
  )
}

export default function useSectionWipe({
  start    = "top 90%",
  clipFrom = "inset(7% 0 0 0)",
  duration = 1.05,
  delay    = 0,
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el || shouldReduceMotion()) return

    gsap.set(el, { clipPath: clipFrom, opacity: 0 })

    const tween = gsap.to(el, {
      clipPath: "inset(0% 0 0 0)",
      opacity:  1,
      duration,
      delay,
      ease: "power4.inOut",
      scrollTrigger: {
        trigger:       el,
        start,
        toggleActions: "play none none none",
      },
    })

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
  }, [])

  return ref
}