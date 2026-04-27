import React, { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'

const services = [
  {
    icon: '⬡',
    title: 'Backend Engineering',
    desc: 'Design and build scalable server-side systems, REST APIs, and microservices using Java, Spring Boot, and cloud-native architectures.',
    skills: ['Java', 'Spring Boot', 'REST APIs', 'Microservices', 'PostgreSQL'],
  },
  {
    icon: '◈',
    title: 'Data Science & ML',
    desc: 'From exploratory analysis to production ML pipelines — building models that turn raw data into intelligent, actionable systems.',
    skills: ['Python', 'PyTorch', 'Pandas', 'Scikit-learn', 'SQL'],
  },
  {
    icon: '◇',
    title: 'Fullstack Development',
    desc: 'End-to-end web applications with performant frontends and robust backends, from design system to deployment.',
    skills: ['React', 'TypeScript', 'Node.js', 'Tailwind', 'Docker'],
  },
  {
    icon: '○',
    title: 'Database & Cloud',
    desc: 'Architecting data layers that scale — relational modeling, query optimization, and cloud infrastructure on AWS/GCP.',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'AWS', 'CI/CD'],
  },
]

function ServiceCard({ service, index }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      className="border-t py-10 flex flex-col md:flex-row md:items-start gap-8 group cursor-default"
      style={{ borderColor: 'var(--dark-border)' }}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.25, 0.46, 0.45, 0.94] }}
    >
      {/* Number */}
      <div
        className="font-mono text-xs tracking-widest shrink-0 mt-1"
        style={{ color: 'var(--teal)', width: 40 }}
      >
        {String(index + 1).padStart(2, '0')}
      </div>

      {/* Icon + Title */}
      <div className="shrink-0 md:w-64">
        <div
          className="text-2xl mb-4 transition-transform duration-500 group-hover:scale-110 w-fit"
          style={{ color: 'var(--teal)' }}
        >
          {service.icon}
        </div>
        <h3
          className="text-2xl font-bold tracking-tight"
          style={{ fontFamily: 'Syne, sans-serif', color: '#f0ede6' }}
        >
          {service.title}
        </h3>
      </div>

      {/* Description */}
      <p
        className="flex-1 leading-relaxed text-base md:text-base"
        style={{ color: '#6b6b65', fontFamily: 'Syne, sans-serif' }}
      >
        {service.desc}
      </p>

      {/* Skills pills */}
      <div className="flex flex-wrap gap-2 md:max-w-[220px]">
        {service.skills.map(skill => (
          <span
            key={skill}
            className="text-xs px-3 py-1 tracking-wider uppercase font-mono transition-colors duration-300 group-hover:border-teal-600"
            style={{
              border: '1px solid var(--dark-border)',
              color: '#6b6b65',
              background: 'rgba(255,255,255,0.02)',
            }}
          >
            {skill}
          </span>
        ))}
      </div>
    </motion.div>
  )
}

export default function WhatIDo() {
  const ref = useRef(null)
  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-100px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start start'] })
  const borderRadius = useTransform(scrollYProgress, [0, 1], ['60px 60px 0px 0px', '0px'])

  return (
    <motion.section
      ref={ref}
      id="about"
      style={{
        background: 'var(--dark-bg)',
        borderRadius,
        position: 'relative',
        zIndex: 10,
        marginTop: '-2px',
      }}
      className="px-8 md:px-16 pt-24 pb-32 min-h-screen"
    >
      {/* Header */}
      <div ref={headerRef} className="mb-20">
        <motion.p
          className="text-xs tracking-[0.4em] uppercase mb-6"
          style={{ color: 'var(--teal)', fontFamily: 'Space Mono, monospace' }}
          initial={{ opacity: 0, x: -20 }}
          animate={headerInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          What I Do
        </motion.p>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8">
          <motion.h2
            className="font-bold leading-none tracking-tighter"
            style={{
              fontFamily: 'Syne, sans-serif',
              fontSize: 'clamp(52px, 8vw, 110px)',
              color: '#f0ede6',
              lineHeight: 0.9,
            }}
            initial={{ opacity: 0, y: 50 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.76, 0, 0.24, 1] }}
          >
            WHAT I<br />
            <span className="font-display italic" style={{ fontFamily: 'Instrument Serif, serif', color: 'var(--teal)' }}>
              DO.
            </span>
          </motion.h2>

          <motion.p
            className="max-w-xs text-base leading-relaxed"
            style={{ color: '#6b6b65', fontFamily: 'Syne, sans-serif' }}
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            My obsession is to deliver digital experiences that not only serve a great purpose, but give your business an unfair advantage.
          </motion.p>
        </div>
      </div>

      {/* Services list */}
      <div>
        {services.map((s, i) => (
          <ServiceCard key={s.title} service={s} index={i} />
        ))}
        {/* Bottom border */}
        <div className="border-t" style={{ borderColor: 'var(--dark-border)' }} />
      </div>

      {/* Tech Stack marquee */}
      <TechMarquee />
    </motion.section>
  )
}

function TechMarquee() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const techs = ['Java', 'Spring Boot', 'Python', 'React', 'TypeScript', 'PostgreSQL', 'Redis', 'Docker', 'AWS', 'PyTorch', 'Kafka', 'Kubernetes']

  return (
    <motion.div
      ref={ref}
      className="mt-24 overflow-hidden"
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.8 }}
    >
      <p className="text-xs tracking-[0.4em] uppercase mb-8" style={{ color: 'var(--teal)', fontFamily: 'Space Mono, monospace' }}>
        Tech Stack
      </p>
      <div className="relative flex gap-12 overflow-hidden" style={{ maskImage: 'linear-gradient(to right, transparent, black 15%, black 85%, transparent)' }}>
        <motion.div
          className="flex gap-12 shrink-0"
          animate={{ x: [0, '-50%'] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'linear' }}
        >
          {[...techs, ...techs].map((tech, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-bold whitespace-nowrap shrink-0 tracking-tight"
              style={{
                fontFamily: 'Syne, sans-serif',
                color: i % 4 === 0 ? 'var(--teal)' : 'rgba(240,237,230,0.15)',
              }}
            >
              {tech}
            </span>
          ))}
        </motion.div>
      </div>
    </motion.div>
  )
}