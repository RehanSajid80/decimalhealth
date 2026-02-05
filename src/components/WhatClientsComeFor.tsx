'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const benefits = [
  'Clear 12-24 month value creation plans',
  'Faster go / no-go decisions',
  'Reduced implementation risk',
  'Translation to real-world workflows',
]

export default function WhatClientsComeFor() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} className="section bg-[#E8E4DF]">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-start gap-4 mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy">
                What Clients Come to Us For
              </h2>
              {/* Decorative icon */}
              <div className="w-12 h-12 rounded-full bg-decimal-cream flex items-center justify-center flex-shrink-0">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M9 12L11 14L15 10" stroke="#2D9596" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="9" stroke="#3D3D6B" strokeWidth="2"/>
                </svg>
              </div>
            </div>

            <ul className="space-y-4">
              {benefits.map((benefit, index) => (
                <motion.li
                  key={benefit}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
                  className="flex items-center gap-3"
                >
                  <div className="w-6 h-6 rounded-full border-2 border-decimal-teal flex items-center justify-center flex-shrink-0">
                    <div className="w-2 h-2 rounded-full bg-decimal-teal" />
                  </div>
                  <span className="text-decimal-navy">{benefit}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right: Images */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="grid grid-cols-2 gap-4">
              {/* Top image - rounded */}
              <div className="col-span-2 flex justify-end">
                <div className="w-48 h-48 rounded-full overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=400&h=400&q=80"
                    alt="Healthcare professional"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Bottom image - rectangular */}
              <div className="col-span-2 flex justify-end">
                <div className="w-72 h-48 rounded-2xl overflow-hidden">
                  <img
                    src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=600&h=400&q=80"
                    alt="Healthcare technology"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
