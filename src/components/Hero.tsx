'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 overflow-hidden bg-decimal-cream">
      {/* Background curved shape */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-0 top-0 bottom-0 w-[60%] bg-white rounded-r-[4rem] lg:rounded-r-[6rem]" />
      </div>

      <div className="container-lg relative">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-4 items-center">
          {/* Content */}
          <div className="relative z-10">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="lg:pr-4"
            >
              {/* Headline */}
              <h1 className="text-4xl md:text-5xl lg:text-[3.25rem] font-bold text-decimal-navy leading-[1.1] mb-5">
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
                  <span className="w-6 h-6 rounded-full bg-decimal-coral flex items-center justify-center">
                    <ArrowUpRight className="w-3.5 h-3.5 text-white" />
                  </span>
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
            className="relative z-10"
          >
            {/* Image Container with curved left edge */}
            <div className="relative overflow-hidden rounded-[2rem] lg:rounded-l-[4rem] lg:rounded-r-[2rem] aspect-[4/5] lg:aspect-[3/4]">
              {/* Elderly patient with caregiver using mobile health app */}
              <img
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&h=1200&q=80"
                alt="Healthcare provider helping elderly patient with mobile health technology"
                className="absolute inset-0 w-full h-full object-cover"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
