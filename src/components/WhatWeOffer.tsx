'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import Link from 'next/link'

const services = [
  {
    id: 'advisory',
    number: '1',
    name: 'Advisory Services',
    description: 'Strategic guidance from clinical and business experts to navigate complex healthcare challenges.',
    href: '#advisory',
  },
  {
    id: 'partnering',
    number: '2',
    name: 'Partnering Services',
    description: 'Facilitate meaningful collaborations between innovators, providers, and life sciences companies.',
    href: '#partnering',
  },
  {
    id: 'regulatory',
    number: '3',
    name: 'Regulatory Strategy',
    description: 'Navigate FDA pathways, evidence generation, and compliance with expert regulatory guidance.',
    href: '#regulatory',
  },
  {
    id: 'market-adoption',
    number: '4',
    name: 'Market Adoption',
    description: 'Accelerate commercialization with go-to-market strategy, channel development, and pricing optimization.',
    href: '#market-adoption',
  },
  {
    id: 'ecosystem',
    number: '5',
    name: 'Ecosystem Solutions',
    description: 'Build and manage innovation ecosystems, accelerator programs, and community platforms.',
    href: '#ecosystem',
  },
]

export default function WhatWeOffer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredService, setHoveredService] = useState<string | null>(null)

  return (
    <section ref={ref} id="services" className="section">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="section-heading text-decimal-purple">What We Offer</h2>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 lg:gap-16 items-start">
          {/* Left: Description + Services List */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-decimal-navy/80 mb-8 leading-relaxed">
              Decimal Health partners with organizations across the healthcare ecosystem to turn innovation into measurable impact. Our services are structured by who you are, what you're trying to achieve, and where you are in the lifecycle—from pre-market validation to scaled commercialization and transformation.
            </p>

            {/* Services List */}
            <div className="border-t border-decimal-navy/10">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0 }}
                  animate={isInView ? { opacity: 1 } : {}}
                  transition={{ duration: 0.3, delay: 0.2 + index * 0.05 }}
                >
                  <Link
                    href={service.href}
                    className="service-item"
                    onMouseEnter={() => setHoveredService(service.id)}
                    onMouseLeave={() => setHoveredService(null)}
                  >
                    <div className="flex items-center gap-4">
                      <span className="text-decimal-purple/50 font-medium text-sm w-6">
                        {service.number}
                      </span>
                      <span className={`font-medium transition-colors ${
                        hoveredService === service.id ? 'text-decimal-purple' : 'text-decimal-navy'
                      }`}>
                        {service.name}
                      </span>
                    </div>
                    <ArrowUpRight className={`w-5 h-5 transition-all ${
                      hoveredService === service.id
                        ? 'text-decimal-purple translate-x-0.5 -translate-y-0.5'
                        : 'text-decimal-navy/30'
                    }`} />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right: Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="relative"
          >
            <div className="rounded-2xl overflow-hidden bg-decimal-cream-dark aspect-[4/3]">
              {/* Healthcare technology and innovation imagery */}
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare innovation and digital transformation"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
