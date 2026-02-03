'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const stats = [
  {
    number: '100+',
    label: 'Companies Served',
    description: 'From seed-stage to Fortune 500',
  },
  {
    number: '45+',
    label: 'Products Created',
    description: 'Digital health solutions built',
  },
  {
    number: '150+',
    label: 'Clinical Trials',
    description: 'Run as PI or co-PI',
  },
  {
    number: '500+',
    label: 'Publications',
    description: 'In peer-reviewed journals',
  },
]

const expertise = [
  'Digital Therapeutics',
  'Remote Patient Monitoring',
  'Clinical Validation',
  'FDA Clearance',
  'Evidence Generation',
  'Go-to-Market Strategy',
]

export default function SocialProof() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-decimal-navy text-white relative overflow-hidden">
      {/* Background Shapes */}
      <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-decimal-teal/10" />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-decimal-coral/10" />

      <div className="container-lg relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-display-md md:text-display-lg text-white mb-4">
            We Know What <span className="text-decimal-cyan">Moves the Needle</span>
          </h2>
          <p className="text-xl text-white/70 max-w-2xl mx-auto">
            Building and launching digital health companies since 2008.
            Powered by deep knowledge, real-world data, and clinical expertise.
          </p>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-8 rounded-3xl bg-white/5 backdrop-blur-sm
                         border border-white/10 hover:bg-white/10 transition-colors"
            >
              <div className="text-5xl md:text-6xl font-extrabold text-decimal-cyan mb-2">
                {stat.number}
              </div>
              <div className="text-lg font-semibold text-white mb-1">
                {stat.label}
              </div>
              <div className="text-sm text-white/60">
                {stat.description}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Expertise Pills */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.5 }}
          className="flex flex-wrap justify-center gap-3"
        >
          {expertise.map((item) => (
            <span
              key={item}
              className="px-5 py-2 rounded-full bg-white/10 text-white/80 text-sm font-medium"
            >
              {item}
            </span>
          ))}
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="mt-16 pt-12 border-t border-white/10"
        >
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-decimal-gold font-bold text-lg mb-2">
                Harvard, Yale, Stanford
              </div>
              <div className="text-white/60 text-sm">
                Curated bench of 200+ clinicians
              </div>
            </div>
            <div>
              <div className="text-decimal-gold font-bold text-lg mb-2">
                NIH, RWJF, PCORI
              </div>
              <div className="text-white/60 text-sm">
                Grants from acclaimed organizations
              </div>
            </div>
            <div>
              <div className="text-decimal-gold font-bold text-lg mb-2">
                2000+ Citations
              </div>
              <div className="text-white/60 text-sm">
                For authored publications
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
