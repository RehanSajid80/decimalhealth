'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Rocket, Building2, FlaskConical } from 'lucide-react'
import Link from 'next/link'

const solutions = [
  {
    id: 'startups',
    icon: Rocket,
    title: 'For Startups',
    subtitle: 'Seed to Growth Stage',
    color: 'coral',
    bgColor: 'bg-decimal-coral',
    description:
      'Go-to-market strategy, clinical validation, and growth acceleration for digital health startups.',
    benefits: [
      'Product-market fit validation',
      'Clinical use-case development',
      'Fundraising support',
      'Pilot implementation',
    ],
    cta: 'Accelerate Your Growth',
    href: '#startups',
  },
  {
    id: 'health-systems',
    icon: Building2,
    title: 'For Health Systems',
    subtitle: 'Innovation & Transformation',
    color: 'teal',
    bgColor: 'bg-decimal-teal',
    description:
      'Digital transformation strategy, innovation program design, and technology adoption for providers.',
    benefits: [
      'Innovation ecosystem design',
      'Digital health adoption',
      'Startup accelerator programs',
      'Performance improvement',
    ],
    cta: 'Transform Your Organization',
    href: '#health-systems',
  },
  {
    id: 'pharma',
    icon: FlaskConical,
    title: 'For Pharma & Biotech',
    subtitle: 'Regulatory & Market Access',
    color: 'navy',
    bgColor: 'bg-decimal-navy',
    description:
      'Regulatory navigation, evidence generation, and commercial strategy for life sciences companies.',
    benefits: [
      'FDA submission support',
      'Evidence generation',
      'Payor strategy',
      'Commercialization roadmap',
    ],
    cta: 'Navigate to Market',
    href: '#pharma',
  },
]

export default function Solutions() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="solutions" className="section">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            Solutions Tailored to <span className="text-decimal-teal">Your Stage</span>
          </h2>
          <p className="section-subheading mx-auto">
            Whether you're a startup seeking product-market fit, a health system
            driving innovation, or pharma navigating regulatory pathways — we meet you where you are.
          </p>
        </motion.div>

        {/* Solutions Cards */}
        <div className="grid lg:grid-cols-3 gap-8">
          {solutions.map((solution, index) => (
            <motion.div
              key={solution.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="group"
            >
              <div
                className={`card-elevated h-full flex flex-col
                            hover:scale-[1.02] transition-transform duration-300`}
              >
                {/* Icon */}
                <div
                  className={`w-16 h-16 rounded-2xl ${solution.bgColor} text-white
                              flex items-center justify-center mb-6`}
                >
                  <solution.icon className="w-8 h-8" />
                </div>

                {/* Content */}
                <div className="flex-1">
                  <div className="text-sm font-semibold text-decimal-teal mb-2">
                    {solution.subtitle}
                  </div>
                  <h3 className="text-2xl font-bold text-decimal-navy mb-3">
                    {solution.title}
                  </h3>
                  <p className="text-decimal-navy/70 mb-6">
                    {solution.description}
                  </p>

                  {/* Benefits */}
                  <ul className="space-y-3 mb-8">
                    {solution.benefits.map((benefit) => (
                      <li
                        key={benefit}
                        className="flex items-center gap-3 text-decimal-navy/80"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-decimal-teal" />
                        {benefit}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* CTA */}
                <Link
                  href={solution.href}
                  className="inline-flex items-center gap-2 text-decimal-teal font-semibold
                             group-hover:gap-3 transition-all"
                >
                  {solution.cta}
                  <ArrowRight className="w-5 h-5" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
