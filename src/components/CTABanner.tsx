'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'

export default function CTABanner() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-50px' })

  return (
    <section ref={ref} className="bg-decimal-navy py-14 md:py-20 relative overflow-hidden">
      <div className="container-lg relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-6">
            Accelerate your healthcare innovation today with Decimal Health.
          </h2>
          <Link
            href="#contact"
            className="inline-flex items-center text-decimal-teal font-semibold underline underline-offset-4 hover:text-white transition-colors text-lg"
          >
            Let's build something
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
