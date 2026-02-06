'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'

export default function Hero() {
  return (
    <section className="relative pt-20 md:pt-24 overflow-hidden bg-decimal-cream min-h-[90vh] flex items-center">
      {/* White curved background shape - wraps from left behind text */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <svg
          className="absolute left-0 top-0 h-full w-[75%] lg:w-[62%]"
          viewBox="0 0 800 900"
          preserveAspectRatio="none"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 0H680C680 0 800 0 800 120V780C800 780 800 900 680 900H0V0Z"
            fill="white"
          />
        </svg>
      </div>

      {/* Decorative brand elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Large "d" shape watermark - very subtle */}
        <div className="absolute -left-20 bottom-0 w-[280px] h-[340px] opacity-[0.03]">
          <svg viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
            <path
              d="M18 0H22V32H18C8.05888 32 0 23.9411 0 14V14C0 6.26801 6.26801 0 14 0H18Z"
              fill="#3D3D6B"
            />
            <circle cx="14" cy="18" r="6" fill="#3D3D6B" />
            <circle cx="26" cy="38" r="5" fill="#7B7BAD" />
          </svg>
        </div>
        {/* Small purple dot accent */}
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="absolute left-[55%] top-[15%] w-3 h-3 rounded-full bg-decimal-purple/40 hidden lg:block"
        />
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="absolute left-[48%] bottom-[20%] w-2 h-2 rounded-full bg-decimal-teal/30 hidden lg:block"
        />
      </div>

      <div className="container-lg relative z-10 py-12 md:py-16">
        <div className="grid lg:grid-cols-12 gap-6 lg:gap-0 items-center">
          {/* Content - Left Side */}
          <div className="relative z-20 lg:col-span-5">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Headline */}
              <h1 className="text-[2.5rem] md:text-5xl lg:text-[3.5rem] xl:text-[4rem] font-bold text-decimal-navy leading-[1.05] mb-5 tracking-tight">
                From bold{' '}
                <br className="hidden md:block" />
                ideas{' '}
                <span className="text-decimal-purple font-extrabold">to{' '}
                <br className="hidden md:block" />
                impact</span>
              </h1>

              {/* Subheadline */}
              <p className="text-lg md:text-xl font-medium text-decimal-navy/80 mb-6 leading-snug italic">
                Accelerating digital transformation{' '}
                <br className="hidden md:block" />
                that shifts care forward
              </p>

              {/* Body Copy */}
              <p className="text-[15px] text-decimal-navy/60 mb-8 leading-relaxed max-w-md">
                From opportunity to adoption, Decimal Health operates at the intersection of{' '}
                <strong className="text-decimal-navy font-semibold">strategy, execution, and real-world operational expertise</strong>.
                We don&apos;t just advise—we architect, validate, and implement solutions that move organizations from vision to measurable impact.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-5">
                <Link
                  href="#who-we-help"
                  className="inline-flex items-center gap-2 text-decimal-purple font-semibold hover:text-decimal-navy transition-colors group"
                >
                  Who We Help
                  <span className="w-7 h-7 rounded-full bg-decimal-coral flex items-center justify-center group-hover:bg-decimal-navy transition-colors">
                    <ArrowUpRight className="w-4 h-4 text-white" />
                  </span>
                </Link>
                <Link
                  href="#services"
                  className="text-decimal-purple font-medium underline underline-offset-4 decoration-decimal-purple/40 hover:decoration-decimal-navy hover:text-decimal-navy transition-colors"
                >
                  What We Offer
                </Link>
              </div>
            </motion.div>
          </div>

          {/* Hero Image - Right Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="lg:col-span-7 relative lg:-mr-8 xl:-mr-16"
          >
            {/* Image with custom clip path for organic curved left edge */}
            <div className="relative">
              {/* Image container */}
              <div
                className="relative overflow-hidden aspect-[4/5] md:aspect-[5/6] lg:aspect-[4/5]"
                style={{
                  borderRadius: '2rem',
                  clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%, 0% 12%)',
                }}
              >
                <img
                  src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=1200&h=1500&q=85"
                  alt="Healthcare provider consulting with elderly patient using mobile health technology"
                  className="w-full h-full object-cover"
                  loading="eager"
                />
                {/* Subtle gradient overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-decimal-navy/10 via-transparent to-transparent" />
              </div>

              {/* Decorative curved overlay shape on left edge */}
              <svg
                className="absolute left-0 top-0 h-full w-[20%] pointer-events-none"
                viewBox="0 0 200 900"
                preserveAspectRatio="none"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M0 0H0C0 0 180 100 160 450C140 800 0 900 0 900V0Z"
                  fill="#F5F3F0"
                  fillOpacity="0.6"
                />
              </svg>

              {/* Bottom-left accent circle */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.6 }}
                className="absolute -bottom-4 -left-4 w-24 h-24 rounded-full bg-white shadow-lg hidden lg:flex items-center justify-center"
              >
                <div className="w-16 h-16 rounded-full bg-decimal-teal/10 flex items-center justify-center">
                  <svg width="24" height="30" viewBox="0 0 36 44" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="M18 0H22V32H18C8.05888 32 0 23.9411 0 14V14C0 6.26801 6.26801 0 14 0H18Z"
                      fill="#3D3D6B"
                    />
                    <circle cx="14" cy="18" r="6" fill="#F5F3F0" />
                    <circle cx="26" cy="38" r="5" fill="#7B7BAD" />
                  </svg>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
