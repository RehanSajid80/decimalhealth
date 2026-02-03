'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowRight, Calendar, MessageSquare } from 'lucide-react'
import Link from 'next/link'

export default function CTA() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section ref={ref} id="contact" className="section">
      <div className="container-lg">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-decimal-navy via-decimal-navy to-[#2a2a4a]"
        >
          {/* Background Shapes */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-decimal-teal/20 blur-3xl" />
          <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-decimal-coral/20 blur-3xl" />
          <div className="absolute top-1/2 right-1/4 w-40 h-40 rounded-full bg-decimal-gold/30" />
          <div className="absolute bottom-1/4 right-10 w-24 h-24 rounded-full bg-decimal-cyan/40" />

          <div className="relative z-10 px-8 py-16 md:px-16 md:py-24 text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm
                         text-white px-4 py-2 rounded-full text-sm font-medium mb-6"
            >
              <span className="w-2 h-2 bg-decimal-coral rounded-full animate-pulse" />
              Limited Availability
            </motion.div>

            {/* Headline */}
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-display-md md:text-display-lg text-white mb-6 max-w-3xl mx-auto"
            >
              Ready to Shift{' '}
              <span className="text-decimal-cyan">Care Forward?</span>
            </motion.h2>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-xl text-white/80 mb-10 max-w-2xl mx-auto"
            >
              Book a complimentary strategy call to discuss your digital health
              challenges and explore how we can help you accelerate.
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4"
            >
              <Link
                href="https://calendly.com/decimal-health"
                target="_blank"
                className="btn-coral group w-full sm:w-auto"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book Strategy Call
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="mailto:hello@decimal.health"
                className="inline-flex items-center justify-center px-8 py-4 w-full sm:w-auto
                           text-white font-semibold rounded-full
                           border-2 border-white/30 hover:bg-white/10
                           transition-all"
              >
                <MessageSquare className="w-5 h-5 mr-2" />
                Send a Message
              </Link>
            </motion.div>

            {/* Trust Line */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="text-white/50 text-sm mt-8"
            >
              Join 100+ companies who've accelerated their digital health journey with us
            </motion.p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
