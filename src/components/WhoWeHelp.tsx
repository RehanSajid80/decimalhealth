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

const HealthSystemsIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M24 8C28.4183 8 32 11.5817 32 16C32 20.4183 28.4183 24 24 24C19.5817 24 16 20.4183 16 16C16 11.5817 19.5817 8 24 8Z" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M24 16V16.01" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
    <path d="M12 40C12 33.3726 17.3726 28 24 28C30.6274 28 36 33.3726 36 40" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M24 16C24 16 20 18 20 21C20 22.5 21 24 24 24C27 24 28 22.5 28 21C28 18 24 16 24 16Z" fill="currentColor" fillOpacity="0.3"/>
  </svg>
)

const HealthTechIcon = () => (
  <svg width="48" height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="24" cy="20" r="10" stroke="currentColor" strokeWidth="2.5"/>
    <path d="M24 14V26" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M18 20H30" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M12 32L16 36L24 28" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="36" cy="36" r="4" stroke="currentColor" strokeWidth="2"/>
    <path d="M33 39L28 44" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
  </svg>
)

const personas = [
  {
    id: 'life-sciences',
    icon: LifeSciencesIcon,
    title: 'Life Sciences',
    subtitle: '(Pharma & Biotech)',
    description:
      'Navigate regulatory pathways, generate clinical evidence, and accelerate market access for digital health solutions in the life sciences space.',
    href: '#life-sciences',
  },
  {
    id: 'health-systems',
    icon: HealthSystemsIcon,
    title: 'Health Systems',
    subtitle: '',
    description:
      'Transform care delivery through strategic digital health adoption, innovation programs, and sustainable technology implementation.',
    href: '#health-systems',
  },
  {
    id: 'health-tech',
    icon: HealthTechIcon,
    title: 'Health Tech &',
    subtitle: 'MedTech Innovators',
    description:
      'Turn bold ideas into market-ready solutions with clinical validation, go-to-market strategy, and health system partnership development.',
    href: '#health-tech',
  },
]

export default function WhoWeHelp() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="who-we-help" className="section bg-white">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-decimal-purple">Who We Help</h2>
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
              <Link href={persona.href} className="block group">
                <div className="bg-decimal-cream rounded-2xl p-6 lg:p-8 h-full hover:shadow-md transition-all duration-300">
                  {/* Icon */}
                  <div className="text-decimal-purple mb-5">
                    <persona.icon />
                  </div>

                  {/* Title */}
                  <h3 className="text-lg font-bold text-decimal-purple mb-1">
                    {persona.title}
                  </h3>
                  {persona.subtitle && (
                    <p className="text-sm font-medium text-decimal-purple/70 mb-4">
                      {persona.subtitle}
                    </p>
                  )}
                  {!persona.subtitle && <div className="mb-4" />}

                  {/* Description */}
                  <p className="text-sm text-decimal-navy/70 leading-relaxed">
                    {persona.description}
                  </p>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
