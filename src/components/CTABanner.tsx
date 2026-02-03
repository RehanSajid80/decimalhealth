'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-decimal-purple py-10 md:py-14 relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center gap-4 pr-8 md:pr-16">
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-decimal-teal"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="w-12 h-12 md:w-16 md:h-16 rounded-full border-2 border-white/30 flex items-center justify-center"
        >
          <svg className="w-6 h-6 md:w-8 md:h-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.div>
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={isInView ? { scale: 1, opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-14 h-14 md:w-16 md:h-16 rounded-full bg-decimal-cyan hidden md:block"
        />
      </div>

      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
            Accelerate your healthcare innovation today with Decimal Health.
          </h2>
          <Link
            href="#contact"
            className="inline-flex items-center text-white font-semibold underline underline-offset-4 hover:text-decimal-cyan transition-colors"
          >
            Let's build something
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
