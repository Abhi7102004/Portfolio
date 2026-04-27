import React, { useRef } from "react"
import { motion, useScroll, useTransform, useSpring } from "framer-motion"

export default function DarkWrapper({ children }) {
  const ref = useRef(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "start 0.08"],
  })

  const smooth = useSpring(scrollYProgress, { stiffness: 120, damping: 28, mass: 0.6 })

  const borderRadius = useTransform(smooth, [0, 1], ["52px 52px 0 0", "0px 0px 0 0"])

  const y = useTransform(smooth, [0, 1], [40, 0])

  return (
    <motion.div
      ref={ref}
      style={{
        background: "#0C0C0B",
        borderRadius,
        position: "relative",
        zIndex: 10,
        marginTop: "-80px",           // glue to hero bottom
        overflow: "hidden",
      }}
    >
      <motion.div style={{ y }}>
        {children}
      </motion.div>
    </motion.div>
  )
}