'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'

export default function Newsletter() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [email, setEmail] = useState('')

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log('Subscribe:', email)
    setEmail('')
  }

  return (
    <section ref={ref} className="py-12 bg-decimal-teal relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute right-8 top-1/2 -translate-y-1/2 hidden md:flex items-center gap-4">
        <div className="w-12 h-12 rounded-full bg-decimal-navy flex items-center justify-center">
          <ArrowUpRight className="w-5 h-5 text-white" />
        </div>
        <div className="w-16 h-16 rounded-full bg-decimal-cyan" />
      </div>

      <div className="container-lg relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-xl"
        >
          <h2 className="text-xl md:text-2xl font-medium text-white mb-4">
            Subscribe to our newsletter.
          </h2>

          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your email"
              className="flex-1 px-4 py-3 bg-white/20 border border-white/30 rounded-lg
                         text-white placeholder:text-white/60 focus:outline-none focus:ring-2
                         focus:ring-white/50"
              required
            />
            <button
              type="submit"
              className="text-white font-medium underline underline-offset-4 hover:text-white/80 transition-colors"
            >
              Submit
            </button>
          </form>
        </motion.div>
      </div>
    </section>
  )
}
