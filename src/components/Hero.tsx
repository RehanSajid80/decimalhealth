'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden">
      <div className="container-lg">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          {/* Content */}
          <div className="relative z-10">
            {/* Curved background shape */}
            <div className="absolute -left-8 -top-8 -bottom-8 right-1/4 bg-white rounded-[2rem] -z-10 hidden lg:block" />

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:pr-8"
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.5rem] font-bold text-decimal-navy leading-tight mb-4">
                From bold ideas{' '}
                <span className="text-decimal-purple">to impact</span>
              </h1>

              {/* Subheadline */}
              <p className="text-xl md:text-2xl font-medium text-decimal-navy mb-6">
                Accelerating digital transformation that shifts care forward
              </p>

              {/* Body Copy */}
              <p className="text-base text-decimal-navy/70 mb-8 leading-relaxed max-w-lg">
                From opportunity to adoption, Decimal Health operates at the intersection of{' '}
                <strong className="text-decimal-navy">strategy, execution, and real-world operational expertise</strong>.
                We don't just advise—we architect, validate, and implement solutions that move organizations from vision to measurable impact.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-6">
                <Link
                  href="#who-we-help"
                  className="inline-flex items-center gap-2 text-decimal-purple font-semibold hover:text-decimal-navy transition-colors"
                >
                  Who We Help
                  <ArrowUpRight className="w-5 h-5" />
                </Link>
                <Link
                  href="#services"
                  className="text-decimal-purple font-medium underline underline-offset-4 hover:text-decimal-navy transition-colors"
                >
                  What We Offer
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Image */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            {/* Image Container with rounded corners */}
            <div className="relative rounded-[1.5rem] overflow-hidden bg-decimal-cream-dark aspect-[4/5] lg:aspect-[3/4]">
              {/* Healthcare provider with elderly patient */}
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80"
                alt="Healthcare provider consulting with patient"
                className="absolute inset-0 w-full h-full object-cover"
              />

              {/* Decorative overlay shape */}
              <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-decimal-cream/30 to-transparent" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
