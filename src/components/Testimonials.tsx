'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'

const testimonials = [
  {
    id: 1,
    quote:
      "I can honestly say that if I had met Decimal even a year ago, we would have done so many things differently and spent our time far more efficiently. Decimal provided us with realistic, yet tremendously exciting strategies to effectively increase our traction, but also made them actionable for us based on our team size and skills.",
    author: 'Erica Plybeah',
    role: 'CEO and Founder',
    company: 'Medhaul',
    highlight:
      'They are extremely reliable advisors - at any time of day or at the 13th hour, I know I have someone to turn to.',
  },
  {
    id: 2,
    quote:
      "Decimal Health's deep clinical expertise and strategic guidance helped us navigate complex regulatory pathways and achieve FDA clearance faster than we anticipated. Their team became an extension of ours.",
    author: 'Healthcare Executive',
    role: 'Chief Digital Officer',
    company: 'Major Health System',
    highlight:
      'Their clinical expertise and regulatory knowledge is unmatched.',
  },
  {
    id: 3,
    quote:
      "Working with Decimal transformed our go-to-market strategy. They understood the nuances of selling to health systems and helped us build relationships that turned into meaningful pilots and contracts.",
    author: 'Digital Health Founder',
    role: 'CEO',
    company: 'Growth-Stage Startup',
    highlight:
      'They don\'t just advise - they roll up their sleeves and execute alongside you.',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [activeIndex, setActiveIndex] = useState(0)

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const activeTestimonial = testimonials[activeIndex]

  return (
    <section ref={ref} id="testimonials" className="section">
      <div className="container-lg">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="section-heading">
            Trusted by <span className="text-decimal-coral">Industry Leaders</span>
          </h2>
          <p className="section-subheading mx-auto">
            Hear from the founders, executives, and innovators we've helped succeed.
          </p>
        </motion.div>

        {/* Testimonial Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="max-w-4xl mx-auto"
        >
          <div className="relative">
            {/* Main Card */}
            <div className="bg-white rounded-[2rem] p-8 md:p-12 shadow-[0_4px_60px_rgba(61,61,107,0.1)]">
              {/* Quote Icon */}
              <div className="w-16 h-16 rounded-2xl bg-decimal-coral/10 flex items-center justify-center mb-8">
                <Quote className="w-8 h-8 text-decimal-coral" />
              </div>

              {/* Quote */}
              <motion.blockquote
                key={activeIndex}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3 }}
                className="text-xl md:text-2xl text-decimal-navy/80 leading-relaxed mb-8"
              >
                "{activeTestimonial.quote}"
              </motion.blockquote>

              {/* Highlight */}
              <motion.div
                key={`highlight-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.1 }}
                className="bg-decimal-teal/10 rounded-xl p-4 mb-8"
              >
                <p className="text-decimal-teal font-semibold italic">
                  "{activeTestimonial.highlight}"
                </p>
              </motion.div>

              {/* Author */}
              <motion.div
                key={`author-${activeIndex}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="flex items-center justify-between"
              >
                <div>
                  <div className="font-bold text-decimal-navy text-lg">
                    {activeTestimonial.author}
                  </div>
                  <div className="text-decimal-navy/60">
                    {activeTestimonial.role}, {activeTestimonial.company}
                  </div>
                </div>

                {/* Navigation */}
                <div className="flex items-center gap-3">
                  <button
                    onClick={prevTestimonial}
                    className="w-12 h-12 rounded-full border-2 border-decimal-navy/20
                               flex items-center justify-center
                               hover:bg-decimal-navy hover:text-white hover:border-decimal-navy
                               transition-all"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="w-12 h-12 rounded-full border-2 border-decimal-navy/20
                               flex items-center justify-center
                               hover:bg-decimal-navy hover:text-white hover:border-decimal-navy
                               transition-all"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setActiveIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all ${
                    index === activeIndex
                      ? 'bg-decimal-teal w-8'
                      : 'bg-decimal-navy/20 hover:bg-decimal-navy/40'
                  }`}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
