'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'

const impactStories = [
  {
    id: 1,
    quote: "Decimal Health helped us navigate the complex path from concept to FDA clearance, cutting our timeline significantly and ensuring we had the evidence base to succeed.",
    metric: "40%",
    metricLabel: "faster time to market",
    category: "Life Sciences",
  },
  {
    id: 2,
    quote: "Their deep understanding of health system operations transformed our digital health adoption program, resulting in measurable improvements in care delivery.",
    metric: "3x",
    metricLabel: "increase in adoption rates",
    category: "Health Systems",
  },
  {
    id: 3,
    quote: "The strategic guidance we received on go-to-market and partnership development was instrumental in our Series B success.",
    metric: "$25M",
    metricLabel: "Series B raised",
    category: "Health Tech",
  },
]

export default function OurImpact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  return (
    <section ref={ref} className="section">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12">
          {/* Left: Images Grid */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="grid grid-cols-2 gap-4"
          >
            {/* Top left - small image: Mobile health */}
            <div className="rounded-xl overflow-hidden bg-decimal-cream-dark aspect-square">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?auto=format&fit=crop&w=400&q=80"
                alt="Mobile health technology"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Top right - large image spanning 2 rows: Healthcare professionals */}
            <div className="rounded-xl overflow-hidden bg-decimal-cream-dark aspect-[3/4] row-span-2">
              <img
                src="https://images.unsplash.com/photo-1582750433449-648ed127bb54?auto=format&fit=crop&w=600&q=80"
                alt="Healthcare professionals collaborating"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Bottom left - small image: Data analytics */}
            <div className="rounded-xl overflow-hidden bg-decimal-cream-dark aspect-square">
              <img
                src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=400&q=80"
                alt="Healthcare data analytics dashboard"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Impact Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex flex-col justify-center"
          >
            {/* Icon */}
            <div className="w-12 h-12 rounded-full bg-decimal-cream flex items-center justify-center mb-6">
              <svg className="w-6 h-6 text-decimal-purple" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
              </svg>
            </div>

            <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-6">
              Our impact
            </h2>

            {/* Impact Story */}
            <div className="mb-8">
              <p className="text-decimal-navy/70 leading-relaxed mb-6">
                {impactStories[activeIndex].quote}
              </p>

              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-decimal-purple">
                  {impactStories[activeIndex].metric}
                </span>
                <span className="text-decimal-navy/60">
                  {impactStories[activeIndex].metricLabel}
                </span>
              </div>

              <span className="inline-block mt-3 text-sm text-decimal-purple/70 bg-decimal-purple/10 px-3 py-1 rounded-full">
                {impactStories[activeIndex].category}
              </span>
            </div>

            {/* Carousel Dots */}
            <div className="flex items-center gap-2">
              {impactStories.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-decimal-purple w-6'
                      : 'bg-decimal-navy/20 hover:bg-decimal-navy/40'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
