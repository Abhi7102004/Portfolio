import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ME } from "../data";

const EXPO = [0.25, 0.46, 0.45, 0.94];

function PineLabsBadge() {
  return (
    <div
      style={{
        width: 54,
        height: 54,
        borderRadius: 10,
        background: "#1A4D2E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
        padding: "0 6px",
        gap: 2,
      }}
    >
      <span
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "0.62rem",
          fontWeight: 800,
          color: "#FFFFFF",
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        pine
      </span>
      <div
        style={{ width: 22, height: 1, background: "rgba(255,255,255,0.22)" }}
      />
      <span
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "0.62rem",
          fontWeight: 800,
          color: "rgba(255,255,255,0.7)",
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}
      >
        labs
      </span>
    </div>
  );
}

export default function Experience() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const exp = ME.experience[0];

  return (
    <>
      <style>{`
        .exp-grid {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: 3rem;
        }
        .exp-contributions {
          border-left: 1px solid #2e2e2c;
          padding-left: 2.8rem;
        }
        .edu-row {
          flex-direction: row;
          align-items: center;
        }
        @media (max-width: 767px) {
          .exp-grid {
            grid-template-columns: 1fr;
            gap: 0;
          }
          .exp-contributions {
            border-left: none;
            padding-left: 0;
            border-top: 1px solid #2e2e2c;
            padding-top: 1.8rem;
            margin-top: 1.8rem;
          }
          .edu-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.2rem !important;
          }
        }
      `}</style>

      <section
        id="experience"
        ref={ref}
        style={{
          background: "#111110",
          padding: "clamp(3.5rem, 8vw, 7rem) clamp(1.2rem, 5vw, 2.5rem)",
          borderTop: "1px solid #2a2a28",
        }}
      >
        <div style={{ maxWidth: 1100, margin: "0 auto" }}>
          <motion.p
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.82rem",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "#0D9488",
              marginBottom: "1rem",
            }}
          >
            Experience
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.75, delay: 0.08, ease: EXPO }}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 4.8rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#F2EFE9",
              marginBottom: "clamp(2rem, 5vw, 4rem)",
            }}
          >
            WHERE I&apos;VE
            <br />
            <span
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#0D9488",
              }}
            >
              WORKED.
            </span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.18, ease: EXPO }}
            style={{
              border: "1px solid #2e2e2c",
              background: "#161614",
              padding: "clamp(1.4rem, 4vw, 2.8rem)",
            }}
          >
            <div className="exp-grid">
              {/* Left: company info */}
              <div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: 14,
                    marginBottom: "1.4rem",
                  }}
                >
                  <PineLabsBadge />
                  <div>
                    <div
                      style={{
                        fontFamily: "'Syne',sans-serif",
                        fontSize: "1.2rem",
                        fontWeight: 700,
                        color: "#F2EFE9",
                      }}
                    >
                      {exp.company}
                    </div>
                    <div
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: "0.7rem",
                        color: "#5A5A54",
                        letterSpacing: "0.08em",
                        marginTop: 2,
                      }}
                    >
                      {exp.location}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "0.98rem",
                    color: "#E8E5DF",
                    fontWeight: 600,
                    marginBottom: 6,
                  }}
                >
                  {exp.role}
                </div>
                <div
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.7rem",
                    color: "#5A5A54",
                    marginBottom: "1.8rem",
                  }}
                >
                  {exp.period}
                </div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
                  {exp.tech.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontFamily: "'Space Mono',monospace",
                        fontSize: "0.65rem",
                        letterSpacing: "0.08em",
                        textTransform: "uppercase",
                        border: "1px solid #2a2a28",
                        color: "#8A8A84",
                        padding: "5px 12px",
                        background: "rgba(255,255,255,0.03)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Right: contributions */}
              <div className="exp-contributions">
                <p
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.70rem",
                    letterSpacing: "0.22em",
                    textTransform: "uppercase",
                    color: "#525250",
                    marginBottom: "1.6rem",
                  }}
                >
                  Key Contributions
                </p>
                <ul
                  style={{
                    listStyle: "none",
                    display: "flex",
                    flexDirection: "column",
                    gap: "1.6rem",
                  }}
                >
                  {exp.highlights.map((h, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: 16 }}
                      animate={inView ? { opacity: 1, x: 0 } : {}}
                      transition={{ duration: 0.5, delay: 0.35 + i * 0.1 }}
                      style={{
                        display: "flex",
                        gap: 14,
                        alignItems: "flex-start",
                      }}
                    >
                      <span
                        style={{
                          color: "#0D9488",
                          fontSize: "0.8rem",
                          marginTop: 5,
                          flexShrink: 0,
                        }}
                      >
                        ▸
                      </span>
                      <span
                        style={{
                          fontFamily: "'Syne',sans-serif",
                          fontSize: "clamp(0.88rem, 2vw, 1rem)",
                          color: "#D0CCC6",
                          lineHeight: 1.82,
                        }}
                      >
                        {h}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </motion.div>

          {/* Education */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.55 }}
            style={{
              marginTop: "1.5rem",
              border: "1px solid #2e2e2c",
              background: "#161614",
              padding: "clamp(1.4rem, 4vw, 2rem) clamp(1.2rem, 4vw, 2.8rem)",
            }}
          >
            <div
              className="edu-row"
              style={{
                display: "flex",
                justifyContent: "space-between",
                flexWrap: "wrap",
                gap: "1rem",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                <div
                  style={{
                    width: 50,
                    height: 50,
                    borderRadius: 10,
                    background: "#1e1e1c",
                    border: "1px solid #2e2e2c",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'Syne',sans-serif",
                    fontWeight: 800,
                    fontSize: "0.76rem",
                    color: "#F2EFE9",
                    letterSpacing: "0.04em",
                  }}
                >
                  IIT
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "1.05rem",
                      fontWeight: 700,
                      color: "#F2EFE9",
                    }}
                  >
                    {ME.education.short}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "0.88rem",
                      color: "#7A7A74",
                      marginTop: 3,
                    }}
                  >
                    {ME.education.degree}
                  </div>
                </div>
              </div>
              <div style={{ display: "flex", gap: "2.5rem" }}>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "1.6rem",
                      fontWeight: 800,
                      color: "#F2EFE9",
                    }}
                  >
                    {ME.education.cgpa}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.65rem",
                      color: "#0D9488",
                      letterSpacing: "0.15em",
                      textTransform: "uppercase",
                    }}
                  >
                    CGPA / 10
                  </div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div
                    style={{
                      fontFamily: "'Syne',sans-serif",
                      fontSize: "0.95rem",
                      fontWeight: 600,
                      color: "#F2EFE9",
                    }}
                  >
                    {ME.education.period}
                  </div>
                  <div
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.65rem",
                      color: "#6B6B65",
                      letterSpacing: "0.1em",
                    }}
                  >
                    B.Tech CSE
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
