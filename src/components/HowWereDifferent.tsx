'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ChevronUp } from 'lucide-react'

const differentiators = [
  {
    id: 'operator-led',
    title: 'Operator & physician-led',
    description: 'Our leadership brings hands-on experience from the frontlines of healthcare delivery, combining clinical expertise with operational know-how.',
  },
  {
    id: 'practical-paths',
    title: 'Grounded in practical paths',
    description: 'We focus on what actually works in real healthcare environments, not theoretical frameworks that look good on paper.',
  },
  {
    id: 'adoption',
    title: 'Adoption, not just innovation',
    description: 'Innovation without adoption is just a science project. We prioritize getting solutions into the hands of those who need them.',
  },
  {
    id: 'execution',
    title: 'Proven pre- to post-market execution',
    description: 'From regulatory strategy to commercial launch and beyond, we have the track record to prove our approach works.',
  },
  {
    id: 'strategy',
    title: 'Strategy, build, and scale',
    description: 'End-to-end partnership from initial concept through market validation to scaled deployment across health systems.',
  },
]

export default function HowWereDifferent() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [expandedItem, setExpandedItem] = useState<string | null>(null)

  const toggleItem = (id: string) => {
    setExpandedItem(expandedItem === id ? null : id)
  }

  return (
    <section ref={ref} className="section bg-white">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Left: Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="relative"
          >
            <div className="rounded-full overflow-hidden aspect-square max-w-md mx-auto lg:mx-0">
              <img
                src="https://images.unsplash.com/photo-1559757148-5c350d0d3c56?auto=format&fit=crop&w=600&h=600&q=80"
                alt="Healthcare professional"
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Right: Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="text-sm font-semibold text-decimal-teal uppercase tracking-wide mb-2">
              How We're Different
            </h2>
            <h3 className="text-3xl md:text-4xl font-bold text-decimal-navy mb-8">
              Why Decimal Health?
            </h3>

            {/* Accordion */}
            <div className="space-y-0 border-t border-decimal-navy/10">
              {differentiators.map((item) => (
                <div key={item.id} className="border-b border-decimal-navy/10">
                  <button
                    onClick={() => toggleItem(item.id)}
                    className="w-full flex items-center justify-between py-4 text-left group"
                  >
                    <span className={`font-medium transition-colors ${
                      expandedItem === item.id ? 'text-decimal-purple' : 'text-decimal-navy'
                    } group-hover:text-decimal-purple`}>
                      {item.title}
                    </span>
                    <ChevronUp
                      className={`w-5 h-5 text-decimal-purple transition-transform ${
                        expandedItem === item.id ? 'rotate-0' : 'rotate-180'
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {expandedItem === item.id && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <p className="pb-4 text-decimal-navy/70 leading-relaxed">
                          {item.description}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
