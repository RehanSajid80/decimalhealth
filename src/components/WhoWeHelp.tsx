'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

// Custom icons matching the wireframe
const LifeSciencesIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 8V18L14 28V36C14 38.2091 15.7909 40 18 40H30C32.2091 40 34 38.2091 34 36V28L28 18V8" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M16 8H32" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <circle cx="21" cy="30" r="2" fill="currentColor"/>
    <circle cx="27" cy="34" r="2" fill="currentColor"/>
    <path d="M20 18H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const InvestorsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8L24 40" stroke="#F25C5C" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M16 16L24 8L32 16" stroke="#F25C5C" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="24" cy="32" r="8" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M24 28V36" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <path d="M20 32H28" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
  </svg>
)

const HealthTechIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="8" y="12" width="32" height="24" rx="3" stroke="currentColor" strokeWidth="2.5" fill="none" />
    <path d="M16 24H32" stroke="#2D9596" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 18V30" stroke="#2D9596" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M20 40H28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
    <path d="M24 36V40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
)

const personas = [
  {
    id: 'life-sciences',
    icon: LifeSciencesIcon,
    title: 'Life Sciences',
    description:
      'Navigate regulatory pathways, generate clinical evidence, and accelerate market access for digital health solutions in the life sciences space.',
    href: '#life-sciences',
  },
  {
    id: 'investors',
    icon: InvestorsIcon,
    title: 'Investors',
    description:
      'Due diligence support, portfolio company optimization, and strategic guidance for healthcare technology investments.',
    href: '#investors',
  },
  {
    id: 'health-tech',
    icon: HealthTechIcon,
    title: 'Health Tech & Systems Innovators',
    description:
      'Turn bold ideas into market-ready solutions with clinical validation, go-to-market strategy, and health system partnership development.',
    href: '#health-tech',
  },
]

export default function WhoWeHelp() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="who-we-help" className="section bg-decimal-cream">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-decimal-navy">Who We Help</h2>
        </motion.div>

        {/* Persona Cards */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {personas.map((persona, index) => (
            <motion.div
              key={persona.id}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="bg-white rounded-2xl p-6 lg:p-8 h-full">
                {/* Icon */}
                <div className="text-decimal-navy mb-5">
                  <persona.icon />
                </div>

                {/* Title */}
                <h3 className="text-xl font-bold text-decimal-navy mb-4">
                  {persona.title}
                </h3>

                {/* Description */}
                <p className="text-decimal-navy/70 leading-relaxed mb-6">
                  {persona.description}
                </p>

                {/* Link */}
                <Link
                  href={persona.href}
                  className="text-decimal-purple font-medium underline underline-offset-4 hover:text-decimal-navy transition-colors"
                >
                  MORE
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
