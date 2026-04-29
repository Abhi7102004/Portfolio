import React, { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { ME } from "../data";

const EXPO = [0.25, 0.46, 0.45, 0.94];

const DI = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons";

/* Representative devicon for each category header box */
const CAT_HEADER_ICON = {
  Languages: `${DI}/cplusplus/cplusplus-original.svg`,
  Frontend: `${DI}/react/react-original.svg`,
  Backend: `${DI}/nodejs/nodejs-original.svg`,
  Databases: `${DI}/mongodb/mongodb-original.svg`,
  "DevOps & Tools": `${DI}/docker/docker-original.svg`,
  "Security & Protocols": null,
  "Core CS": `${DI}/linux/linux-original.svg`,
};

const SKILL_ICON = {
  "C/C++": `${DI}/cplusplus/cplusplus-original.svg`,
  Java: `${DI}/java/java-original.svg`,
  JavaScript: `${DI}/javascript/javascript-original.svg`,
  TypeScript: `${DI}/typescript/typescript-original.svg`,
  Python: `${DI}/python/python-original.svg`,
  HTML: `${DI}/html5/html5-original.svg`,
  CSS: `${DI}/css3/css3-original.svg`,
  ReactJS: `${DI}/react/react-original.svg`,
  "Next.js": `${DI}/nextjs/nextjs-original.svg`,
  TailwindCSS: `${DI}/tailwindcss/tailwindcss-original.svg`,
  "Redux Toolkit": `${DI}/redux/redux-original.svg`,
  "Framer Motion": null,
  "Node.js": `${DI}/nodejs/nodejs-original.svg`,
  "Express.js": `${DI}/express/express-original.svg`,
  FastAPI: `${DI}/fastapi/fastapi-original.svg`,
  WebSocket: null,
  "REST APIs": null,
  MongoDB: `${DI}/mongodb/mongodb-original.svg`,
  SQL: `${DI}/mysql/mysql-original.svg`,
  "PL/SQL": `${DI}/oracle/oracle-original.svg`,
  Redis: `${DI}/redis/redis-original.svg`,
  Docker: `${DI}/docker/docker-original.svg`,
  Git: `${DI}/git/git-original.svg`,
  GitHub: `${DI}/github/github-original.svg`,
  Grafana: `${DI}/grafana/grafana-original.svg`,
  Bitbucket: `${DI}/bitbucket/bitbucket-original.svg`,
  Postman: `${DI}/postman/postman-original.svg`,
  OpenSSL: null,
  "ISO 8583": null,
  "OAuth 2.0": null,
  Cloudinary: `${DI}/cloudinary/cloudinary-original.svg`,
  DSA: null,
  "System Design": null,
  DBMS: `${DI}/mysql/mysql-original.svg`,
  OS: `${DI}/linux/linux-original.svg`,
  "Computer Networks": null,
};

const DARK_ICONS = new Set(["GitHub", "Express.js", "Next.js"]);

const CAT_META = {
  Languages: { icon: "{ }", color: "#F59E0B" },
  Frontend: { icon: "⬡", color: "#3B82F6" },
  Backend: { icon: "⚙", color: "#0D9488" },
  Databases: { icon: "◈", color: "#8B5CF6" },
  "DevOps & Tools": { icon: "▲", color: "#EC4899" },
  "Security & Protocols": { icon: "◎", color: "#EF4444" },
  "Core CS": { icon: "○", color: "#10B981" },
};

const CP = [
  {
    name: "LeetCode",
    rating: 1871,
    max: 2800,
    badge: "Knight",
    rank: "Top 10%",
    color: "#F59E0B",
    icon: "LC",
  },
  {
    name: "CodeChef",
    rating: 1916,
    max: 2500,
    badge: "4★",
    rank: "Global Rank 83",
    color: "#8B5CF6",
    icon: "CC",
  },
  {
    name: "Codeforces",
    rating: 1495,
    max: 2000,
    badge: "Specialist",
    rank: "Top 20%",
    color: "#3B82F6",
    icon: "CF",
  },
];

function SkillPill({ skill, color }) {
  const [hov, setHov] = useState(false);
  const src = SKILL_ICON[skill];
  const needsInvert = DARK_ICONS.has(skill);
  return (
    <motion.span
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      animate={{
        background: hov ? color + "14" : "rgba(255,255,255,0.025)",
        borderColor: hov ? color + "60" : "#272725",
        color: hov ? color : "#B8B5AF",
      }}
      transition={{ duration: 0.15 }}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "'Syne',sans-serif",
        fontSize: "0.83rem",
        fontWeight: 600,
        border: "1px solid #272725",
        padding: "6px 14px",
        cursor: "default",
        letterSpacing: "0.01em",
        whiteSpace: "nowrap",
      }}
    >
      {src ? (
        <img
          src={src}
          alt={skill}
          width={20}
          height={20}
          style={{
            objectFit: "contain",
            flexShrink: 0,
            filter: needsInvert ? "invert(1) brightness(2)" : "none",
          }}
          onError={(e) => {
            e.target.style.display = "none";
          }}
        />
      ) : (
        <span
          style={{
            width: 20,
            height: 20,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "0.42rem",
            color,
            opacity: 0.6,
          }}
        >
          ◆
        </span>
      )}
      {skill}
    </motion.span>
  );
}

function CatCard({ cat, index, inView }) {
  const meta = CAT_META[cat.cat] || { icon: "·", color: "#0D9488" };
  const catImg = CAT_HEADER_ICON[cat.cat];
  const [hov, setHov] = useState(false);
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
        padding: "1.6rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.3s, border-color 0.3s",
        height: "100%",
        boxSizing: "border-box",
      }}
    >
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: 90,
          height: 90,
          background: `radial-gradient(circle, ${meta.color}1A 0%, transparent 70%)`,
          opacity: hov ? 1 : 0,
          transition: "opacity 0.3s",
          pointerEvents: "none",
        }}
      />

      {/* Header — devicon fills the 38px box */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 10,
          marginBottom: "1rem",
        }}
      >
        <span
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: meta.color + "14",
            border: `1px solid ${meta.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            overflow: "hidden",
          }}
        >
          {catImg ? (
            <img
              src={catImg}
              alt={cat.cat}
              width={26}
              height={26}
              style={{ objectFit: "contain" }}
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span
              style={{
                fontFamily: "'Space Mono',monospace",
                fontSize: "0.85rem",
                color: meta.color,
                fontWeight: 700,
              }}
            >
              {meta.icon}
            </span>
          )}
        </span>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.66rem",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            color: meta.color,
          }}
        >
          {cat.cat}
        </span>
      </div>

      <div
        style={{
          height: 1,
          background: meta.color + "1E",
          marginBottom: "1.1rem",
        }}
      />
      <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
        {cat.items.map((s) => (
          <SkillPill key={s} skill={s} color={meta.color} />
        ))}
      </div>
    </motion.div>
  );
}

function SmartMarquee({ allSkills }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [centeredIdx, setCenteredIdx] = useState(-1);

  useEffect(() => {
    let rafId;
    const update = () => {
      if (containerRef.current && trackRef.current) {
        const cRect = containerRef.current.getBoundingClientRect();
        const centerX = cRect.left + cRect.width / 2;
        const items = trackRef.current.querySelectorAll("[data-mq]");
        let best = -1,
          bestD = Infinity;
        items.forEach((el, i) => {
          const r = el.getBoundingClientRect();
          const d = Math.abs(r.left + r.width / 2 - centerX);
          if (d < bestD) {
            bestD = d;
            best = i;
          }
        });
        if (best !== -1) setCenteredIdx(best);
      }
      rafId = requestAnimationFrame(update);
    };
    rafId = requestAnimationFrame(update);
    return () => cancelAnimationFrame(rafId);
  }, []);

  const doubled = [...allSkills, ...allSkills];
  return (
    <div
      ref={containerRef}
      style={{
        overflow: "hidden",
        maskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
        WebkitMaskImage:
          "linear-gradient(to right, transparent, black 10%, black 90%, transparent)",
      }}
    >
      <motion.div
        ref={trackRef}
        style={{ display: "flex", alignItems: "center", width: "max-content" }}
        animate={{ x: ["0%", "-50%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
      >
        {doubled.map(({ item, color }, i) => {
          const isCenter = i === centeredIdx;
          return (
            <React.Fragment key={i}>
              <span
                data-mq
                style={{
                  fontFamily: "'Syne',sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
                  color: isCenter ? color : "rgba(242,239,233,0.055)",
                  textShadow: isCenter
                    ? `0 0 70px ${color}AA, 0 0 30px ${color}66`
                    : "none",
                  whiteSpace: "nowrap",
                  letterSpacing: "-0.02em",
                  padding: "0 1.6rem",
                  transition: "color 0.38s ease, text-shadow 0.38s ease",
                }}
              >
                {item}
              </span>
              <span
                style={{ color: "#181816", fontSize: "0.3rem", flexShrink: 0 }}
              >
                ◆
              </span>
            </React.Fragment>
          );
        })}
      </motion.div>
    </div>
  );
}

function CPCard({ p, index, inView }) {
  const [hov, setHov] = useState(false);
  const pct = Math.round((p.rating / p.max) * 100);
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
        padding: "1.8rem",
        position: "relative",
        overflow: "hidden",
        transition: "background 0.25s, border-color 0.25s",
      }}
    >
      <div
        style={{
          position: "absolute",
          right: 12,
          top: "50%",
          transform: "translateY(-50%)",
          fontFamily: "'Syne',sans-serif",
          fontWeight: 800,
          fontSize: "4.5rem",
          color: p.color + "07",
          pointerEvents: "none",
          letterSpacing: "-0.05em",
        }}
      >
        {p.rating}
      </div>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "1.1rem",
        }}
      >
        <div
          style={{
            width: 38,
            height: 38,
            borderRadius: 8,
            background: p.color + "18",
            border: `1px solid ${p.color}44`,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.62rem",
            color: p.color,
            fontWeight: 700,
          }}
        >
          {p.icon}
        </div>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.6rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: p.color,
            border: `1px solid ${p.color}44`,
            padding: "3px 9px",
            background: p.color + "11",
          }}
        >
          {p.badge}
        </span>
      </div>
      <div
        style={{
          fontFamily: "'Space Mono',monospace",
          fontSize: "0.62rem",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
          color: "#6B6B65",
          marginBottom: 4,
        }}
      >
        {p.name}
      </div>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "2.1rem",
          fontWeight: 800,
          color: "#F2EFE9",
          letterSpacing: "-0.03em",
          lineHeight: 1,
          marginBottom: 3,
        }}
      >
        {p.rating}
      </div>
      <div
        style={{
          fontFamily: "'Syne',sans-serif",
          fontSize: "0.82rem",
          color: "#8A8A84",
          marginBottom: "1rem",
        }}
      >
        {p.rank}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginBottom: 5,
        }}
      >
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.55rem",
            color: "#5A5A54",
          }}
        >
          0
        </span>
        <span
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.55rem",
            color: "#5A5A54",
          }}
        >
          {p.max}
        </span>
      </div>
      <div
        style={{
          height: 3,
          background: "#1e1e1c",
          borderRadius: 2,
          overflow: "hidden",
        }}
      >
        <motion.div
          initial={{ width: 0 }}
          animate={inView ? { width: `${pct}%` } : {}}
          transition={{ duration: 1.1, delay: 0.6 + index * 0.1, ease: EXPO }}
          style={{
            height: "100%",
            background: `linear-gradient(to right, ${p.color}80, ${p.color})`,
            borderRadius: 2,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function Skills() {
  const ref = useRef(null);
  const cpRef = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const cpInView = useInView(cpRef, { once: true, margin: "-60px" });

  const allSkills = ME.skills.flatMap((s) =>
    s.items.map((item) => ({
      item,
      color: (CAT_META[s.cat] || {}).color || "#0D9488",
    }))
  );

  return (
    <section
      id="skills"
      ref={ref}
      style={{
        background: "#0E0E0D",
        padding: "6rem 2.5rem",
        borderTop: "1px solid #1e1e1c",
      }}
    >
      <div style={{ maxWidth: 1550, margin: "0 auto" }}>
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          style={{
            fontFamily: "'Space Mono',monospace",
            fontSize: "0.82rem",
            letterSpacing: "0.30em",
            textTransform: "uppercase",
            color: "#0D9488",
            marginBottom: "1.1rem",
          }}
        >
          Skills & Expertise
        </motion.p>

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
            initial={{ opacity: 0, y: 26 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.08, ease: EXPO }}
            style={{
              fontFamily: "'Syne',sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem,5vw,4rem)",
              lineHeight: 0.9,
              letterSpacing: "-0.03em",
              color: "#F2EFE9",
            }}
          >
            WHAT I<br />
            <span
              style={{
                fontFamily: "'Instrument Serif',serif",
                fontStyle: "italic",
                fontWeight: 400,
                color: "#0D9488",
              }}
            >
              KNOW.
            </span>
          </motion.h2>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.28 }}
            style={{ display: "flex", gap: 8, flexWrap: "wrap" }}
          >
            {[
              { n: "7", l: "Skill Areas" },
              { n: "40+", l: "Technologies" },
              { n: "3", l: "CP Platforms" },
            ].map((s) => (
              <div
                key={s.l}
                style={{
                  border: "1px solid #1e1e1c",
                  padding: "0.7rem 1.2rem",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 3,
                }}
              >
                <span
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "1.3rem",
                    fontWeight: 800,
                    color: "#F2EFE9",
                  }}
                >
                  {s.n}
                </span>
                <span
                  style={{
                    fontFamily: "'Space Mono',monospace",
                    fontSize: "0.55rem",
                    letterSpacing: "0.15em",
                    textTransform: "uppercase",
                    color: "#6B6B65",
                  }}
                >
                  {s.l}
                </span>
              </div>
            ))}
          </motion.div>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
            gap: "1px",
            background: "#1e1e1c",
            border: "1px solid #1e1e1c",
            marginBottom: "5rem",
          }}
        >
          {ME.skills.map((cat, ci) => (
            <div key={cat.cat} style={{ background: "#0E0E0D" }}>
              <CatCard cat={cat} index={ci} inView={inView} />
            </div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          style={{ marginBottom: "5rem" }}
        >
          <SmartMarquee allSkills={allSkills} />
        </motion.div>

        <div ref={cpRef}>
          <motion.p
            initial={{ opacity: 0 }}
            animate={cpInView ? { opacity: 1 } : {}}
            style={{
              fontFamily: "'Space Mono',monospace",
              fontSize: "0.82rem",
              letterSpacing: "0.30em",
              textTransform: "uppercase",
              color: "#0D9488",
              marginBottom: "0.9rem",
            }}
          >
            Competitive Programming
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={cpInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            style={{
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "1rem",
              marginBottom: "1.8rem",
            }}
          >
            <h3
              style={{
                fontFamily: "'Syne',sans-serif",
                fontWeight: 800,
                fontSize: "clamp(1.5rem,2.8vw,2.2rem)",
                color: "#F2EFE9",
                letterSpacing: "-0.02em",
              }}
            >
              800+ Problems Solved Across Platforms
            </h3>
            <p
              style={{
                fontFamily: "'Syne',sans-serif",
                fontSize: "0.95rem",
                color: "#8A8A84",
                maxWidth: 320,
                lineHeight: 1.72,
              }}
            >
              Consistent competitive programmer with peak ratings on LeetCode,
              CodeChef, and Codeforces.
            </p>
          </motion.div>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))",
              gap: "1px",
              background: "#1e1e1c",
              border: "1px solid #1e1e1c",
            }}
          >
            {CP.map((p, i) => (
              <div key={p.name} style={{ background: "#0E0E0D" }}>
                <CPCard p={p} index={i} inView={cpInView} />
              </div>
            ))}
            <motion.div
              initial={{ opacity: 0, y: 24 }}
              animate={cpInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: 0.85 }}
              style={{
                background: "#0D9488",
                padding: "1.8rem",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: 200,
              }}
            >
              <span
                style={{
                  fontFamily: "'Space Mono',monospace",
                  fontSize: "0.62rem",
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "rgba(0,0,0,0.45)",
                }}
              >
                Total Solved
              </span>
              <div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "3.2rem",
                    fontWeight: 800,
                    color: "#0C0C0B",
                    lineHeight: 1,
                    letterSpacing: "-0.04em",
                  }}
                >
                  800+
                </div>
                <div
                  style={{
                    fontFamily: "'Syne',sans-serif",
                    fontSize: "0.88rem",
                    color: "rgba(0,0,0,0.55)",
                    marginTop: 3,
                  }}
                >
                  DSA Problems
                </div>
              </div>
              <div style={{ display: "flex", gap: 5, flexWrap: "wrap" }}>
                {["Arrays", "DP", "Graphs", "Trees", "Strings"].map((t) => (
                  <span
                    key={t}
                    style={{
                      fontFamily: "'Space Mono',monospace",
                      fontSize: "0.55rem",
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      border: "1px solid rgba(0,0,0,0.2)",
                      color: "rgba(0,0,0,0.65)",
                      padding: "3px 8px",
                    }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
