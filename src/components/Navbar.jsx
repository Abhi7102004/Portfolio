import React, { useState } from "react";
import {
  motion,
  useMotionValueEvent,
  useScroll,
  AnimatePresence,
} from "framer-motion";
import { ME } from "../data";

const EXPO = [0.76, 0, 0.24, 1];

const LINKS = [
  { label: "Home", href: "#home" },
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar({ introComplete }) {
  const [dark, setDark] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (y) => {
    setDark(y > window.innerHeight - 64);
  });

  if (!introComplete) return null;

  const bg = dark ? "rgba(11,11,10,0.96)" : "rgba(242,239,233,0.93)";
  const fg = dark ? "#F2EFE9" : "#0E0E0D";
  const fgDim = dark ? "rgba(242,239,233,0.72)" : "rgba(14,14,13,0.62)";
  const border = dark ? "#2a2a28" : "rgba(14,14,13,0.09)";

  return (
    <>
      <motion.nav
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, ease: EXPO }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 50,
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
        }}
      >
        {/* Background layer */}
        <motion.div
          animate={{ background: bg }}
          transition={{ duration: 0.35, ease: "easeInOut" }}
          style={{
            position: "absolute",
            inset: 0,
            borderBottom: "1px solid",
            borderBottomColor: border,
            zIndex: -1,
          }}
        />

        {/* ── Main bar ── */}
        <div
          style={{
            height: 64,
            maxWidth: 1200,
            margin: "0 auto",
            display: "grid",
            gridTemplateColumns: "1fr auto 1fr",
            alignItems: "center",
            padding: "0 2rem",
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              textDecoration: "none",
            }}
          >
            <motion.div
              animate={{ background: fg, color: dark ? "#0C0C0B" : "#F2EFE9" }}
              transition={{ duration: 0.35 }}
              style={{
                width: 32,
                height: 32,
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.58rem",
                fontWeight: 700,
              }}
            >
              AY
            </motion.div>
            <motion.span
              animate={{ color: fg }}
              transition={{ duration: 0.35 }}
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.78rem",
                letterSpacing: "0.2em",
                fontWeight: 700,
              }}
            >
              AY.
            </motion.span>
          </a>

          {/* Desktop nav links — hidden below 768px */}
          <div
            style={{ display: "flex", alignItems: "center", gap: "1.8rem" }}
            className="nav-links-desktop"
          >
            {LINKS.map(({ label, href }) => (
              <motion.a
                key={label}
                href={href}
                animate={{ color: fgDim }}
                whileHover={{ color: fg }}
                transition={{ duration: 0.35 }}
                onClick={() => setMenuOpen(false)}
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontSize: "0.73rem",
                  fontWeight: 600,
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  textDecoration: "none",
                }}
              >
                {label}
              </motion.a>
            ))}
          </div>

          {/* Desktop CTA + Mobile hamburger */}
          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              gap: 16,
            }}
          >
            {/* Hire Me — desktop only */}
            <motion.a
              href={`mailto:${ME.email}`}
              animate={{ color: fg, borderColor: fg }}
              transition={{ duration: 0.35 }}
              className="hire-btn-desktop"
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "0.72rem",
                fontWeight: 700,
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textDecoration: "none",
                padding: "0.5rem 1.3rem",
                border: "1.5px solid",
                background: "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = fg;
                e.currentTarget.style.color = dark ? "#0C0C0B" : "#F2EFE9";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.color = fg;
              }}
            >
              Hire Me →
            </motion.a>

            {/* Hamburger — mobile only */}
            <button
              className="hamburger-btn"
              onClick={() => setMenuOpen((o) => !o)}
              aria-label="Toggle menu"
              style={{
                background: "none",
                border: "none",
                cursor: "pointer",
                padding: 4,
                display: "flex",
                flexDirection: "column",
                gap: 5,
              }}
            >
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  animate={
                    menuOpen
                      ? i === 0
                        ? { rotate: 45, y: 7 }
                        : i === 1
                        ? { opacity: 0 }
                        : { rotate: -45, y: -7 }
                      : { rotate: 0, y: 0, opacity: 1 }
                  }
                  transition={{ duration: 0.2 }}
                  style={{
                    display: "block",
                    width: 22,
                    height: 2,
                    background: fg,
                    borderRadius: 1,
                  }}
                />
              ))}
            </button>
          </div>
        </div>

        {/* ── Mobile drawer ── */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EXPO }}
              style={{ overflow: "hidden" }}
            >
              <motion.div
                animate={{ background: bg }}
                style={{
                  borderTop: "1px solid",
                  borderTopColor: border,
                  padding: "1.4rem 2rem 2rem",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.2rem",
                  }}
                >
                  {LINKS.map(({ label, href }) => (
                    <motion.a
                      key={label}
                      href={href}
                      animate={{ color: fgDim }}
                      whileHover={{ color: fg }}
                      onClick={() => setMenuOpen(false)}
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: "0.85rem",
                        fontWeight: 600,
                        letterSpacing: "0.12em",
                        textTransform: "uppercase",
                        textDecoration: "none",
                      }}
                    >
                      {label}
                    </motion.a>
                  ))}
                  <motion.a
                    href={`mailto:${ME.email}`}
                    animate={{ color: fg, borderColor: fg }}
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "0.8rem",
                      fontWeight: 700,
                      letterSpacing: "0.12em",
                      textTransform: "uppercase",
                      textDecoration: "none",
                      padding: "0.6rem 1.2rem",
                      border: "1.5px solid",
                      background: "transparent",
                      width: "fit-content",
                      marginTop: "0.4rem",
                    }}
                  >
                    Hire Me →
                  </motion.a>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>

      {/* ── Responsive CSS ── */}
      <style>{`
        .nav-links-desktop { display: flex !important; }
        .hire-btn-desktop   { display: inline-block !important; }
        .hamburger-btn      { display: none !important; }

        @media (max-width: 767px) {
          .nav-links-desktop { display: none !important; }
          .hire-btn-desktop   { display: none !important; }
          .hamburger-btn      { display: flex !important; }
        }
      `}</style>
    </>
  );
}
