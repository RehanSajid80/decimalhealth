'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Events() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Left: Event Image/Poster */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="bg-decimal-navy rounded-2xl p-6 text-white">
              <div className="text-decimal-coral font-semibold mb-2">
                Monday, February 17
              </div>
              <div className="text-sm text-white/70 mb-4">
                10 am - 12 pm CST<br />
                205ABC, Music City Center, Nashville
              </div>

              <div className="text-xs text-white/50 mb-4">Hosted by</div>
              <div className="flex items-center gap-4 mb-6">
                <span className="text-white font-semibold">ADVOCATE HEALTH</span>
                <img
                  src="/decimalhealth/logo.png"
                  alt="Decimal Health"
                  className="h-8 w-auto brightness-0 invert"
                />
              </div>

              <div className="mt-6 pt-6 border-t border-white/20">
                <div className="text-3xl font-bold text-decimal-teal tracking-wide">
                  VIVE
                </div>
                <div className="text-sm text-white/70">
                  NASHVILLE<br />
                  February 16 - 19, 2025
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Event Details */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <div className="text-sm font-semibold text-decimal-coral uppercase tracking-wide mb-2">
              EVENT
            </div>
            <div className="text-sm text-decimal-navy/60 mb-4">
              February 17, 2025
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-4">
              VIVE Innovation & Health
            </h2>

            <p className="text-decimal-navy/70 leading-relaxed mb-6">
              A forum where leaders from Health Systems, Health Plans, Pharma, and Venture Capital come together to shape the future of healthcare.
            </p>

            <Link
              href="/vive"
              className="inline-flex items-center gap-2 text-decimal-coral font-semibold hover:text-decimal-navy transition-colors"
            >
              More News & Events
              <span className="w-6 h-6 rounded-full bg-decimal-coral flex items-center justify-center">
                <ArrowUpRight className="w-3.5 h-3.5 text-white" />
              </span>
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
