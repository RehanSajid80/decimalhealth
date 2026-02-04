'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import { Calendar, MapPin, Clock, ArrowRight, Users, Sparkles } from 'lucide-react'
import Assessment, { type AssessmentResult } from '@/components/Assessment'
import AssessmentResults from '@/components/AssessmentResults'

export default function VivePage() {
  const [showAssessment, setShowAssessment] = useState(false)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result)
  }

  const handleBookCall = () => {
    window.open('https://calendly.com/decimal-health/vive-2026', '_blank')
  }

  // If assessment is complete, show results
  if (assessmentResult) {
    return (
      <div className="min-h-screen bg-decimal-cream">
        {/* Header */}
        <header className="bg-white shadow-sm py-4">
          <div className="container-lg flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="/decimalhealth/logo.png"
                alt="Decimal Health"
                className="h-14 md:h-16 lg:h-[4.5rem] w-auto"
              />
            </Link>
            <div className="flex items-center gap-2 text-sm">
              <span className="bg-decimal-coral text-white px-3 py-1 rounded-full font-semibold">
                VIVE 2026
              </span>
            </div>
          </div>
        </header>

        {/* Results Content */}
        <main className="py-12 md:py-20">
          <div className="container-lg">
            <AssessmentResults
              result={assessmentResult}
              onBookCall={handleBookCall}
              eventName="Vive 2026"
            />
          </div>
        </main>
      </div>
    )
  }

  // If taking assessment
  if (showAssessment) {
    return (
      <div className="min-h-screen bg-decimal-cream">
        {/* Header */}
        <header className="bg-white shadow-sm py-4">
          <div className="container-lg flex items-center justify-between">
            <Link href="/" className="flex items-center">
              <img
                src="/decimalhealth/logo.png"
                alt="Decimal Health"
                className="h-14 md:h-16 lg:h-[4.5rem] w-auto"
              />
            </Link>
            <button
              onClick={() => setShowAssessment(false)}
              className="text-decimal-navy/70 hover:text-decimal-navy transition-colors"
            >
              Exit Assessment
            </button>
          </div>
        </header>

        {/* Assessment Content */}
        <main className="py-12 md:py-20">
          <div className="container-lg">
            <Assessment
              onComplete={handleAssessmentComplete}
              eventName="Vive 2026"
            />
          </div>
        </main>
      </div>
    )
  }

  // Landing page
  return (
    <div className="min-h-screen bg-decimal-cream">
      {/* Header */}
      <header className="bg-white shadow-sm py-4">
        <div className="container-lg flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <img
              src="/decimalhealth/logo.png"
              alt="Decimal Health"
              className="h-14 md:h-16 lg:h-[4.5rem] w-auto"
            />
          </Link>
          <button
            onClick={handleBookCall}
            className="bg-decimal-coral text-white px-5 py-2 rounded-full font-semibold
                       hover:bg-decimal-navy hover:text-white transition-colors text-sm"
          >
            Book Meeting
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Shapes */}
        <div className="absolute inset-0">
          <div className="absolute -right-32 top-0 w-96 h-96 rounded-full bg-decimal-coral/20" />
          <div className="absolute right-20 top-40 w-32 h-32 rounded-full bg-decimal-cyan/40" />
          <div className="absolute -right-16 top-1/3 w-48 h-96 rounded-l-full bg-decimal-navy" />
          <div className="absolute left-10 bottom-10 w-24 h-24 rounded-full bg-decimal-gold/30" />
        </div>

        <div className="container-lg relative z-10 py-16 md:py-24">
          <div className="max-w-3xl">
            {/* Event Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-3 bg-decimal-coral text-white
                         px-5 py-2 rounded-full text-sm font-semibold mb-6"
            >
              <Sparkles className="w-4 h-4" />
              VIVE 2026 Exclusive
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-decimal-navy mb-6"
            >
              Is Your Digital Health Strategy{' '}
              <span className="text-decimal-teal">Ready to Scale?</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-decimal-navy/70 mb-8"
            >
              Take our 2-minute assessment and get personalized recommendations
              from the team that's launched 100+ digital health products.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <button
                onClick={() => setShowAssessment(true)}
                className="btn-primary text-lg group"
              >
                Start Free Assessment
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              </button>
              <button
                onClick={handleBookCall}
                className="btn-secondary text-lg"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Book a Meeting
              </button>
            </motion.div>

            {/* Event Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="mt-12 flex flex-wrap gap-6 text-decimal-navy/70"
            >
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-decimal-teal" />
                <span>Nashville, TN</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-decimal-teal" />
                <span>February 22-25, 2026</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-decimal-teal" />
                <span>Booth #XXX</span>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* What You'll Get Section */}
      <section className="py-16 bg-white">
        <div className="container-lg">
          <h2 className="text-3xl font-bold text-decimal-navy text-center mb-12">
            What You'll Get in 2 Minutes
          </h2>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: '📊',
                title: 'Readiness Score',
                description: 'See where you stand compared to industry benchmarks',
              },
              {
                icon: '🎯',
                title: 'Personalized Recommendations',
                description: 'Actionable next steps tailored to your stage and challenges',
              },
              {
                icon: '📋',
                title: 'Free Strategy Report',
                description: 'Detailed PDF with your assessment results and roadmap',
              },
            ].map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                viewport={{ once: true }}
                className="text-center p-8 rounded-2xl bg-decimal-cream"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-bold text-decimal-navy mb-2">
                  {item.title}
                </h3>
                <p className="text-decimal-navy/70">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-16">
        <div className="container-lg">
          <div className="bg-decimal-navy rounded-3xl p-8 md:p-12 text-white text-center">
            <h2 className="text-2xl md:text-3xl font-bold mb-8">
              Trusted by Leaders in Digital Health
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
              {[
                { stat: '100+', label: 'Companies Served' },
                { stat: '45+', label: 'Products Created' },
                { stat: '150+', label: 'Clinical Trials' },
                { stat: '10+', label: 'FDA Submissions' },
              ].map((item) => (
                <div key={item.label}>
                  <div className="text-4xl font-bold text-decimal-cyan">{item.stat}</div>
                  <div className="text-white/70 text-sm">{item.label}</div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setShowAssessment(true)}
              className="bg-decimal-coral text-white px-8 py-4 rounded-full font-semibold
                         hover:bg-white hover:text-decimal-navy transition-colors
                         inline-flex items-center gap-2"
            >
              Take the Assessment
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Meet Us Section */}
      <section className="py-16 bg-white">
        <div className="container-lg">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-decimal-navy mb-6">
                Meet Us at Vive 2026
              </h2>
              <p className="text-decimal-navy/70 mb-6">
                Book a 15-minute meeting with our team at Vive. Whether you're
                looking to validate your product, navigate regulatory pathways,
                or accelerate your go-to-market strategy — we're here to help.
              </p>

              <ul className="space-y-4 mb-8">
                {[
                  'Get expert feedback on your digital health strategy',
                  'Explore partnership opportunities',
                  'Learn about our accelerator programs',
                  'Discuss your specific challenges',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-decimal-teal/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-decimal-teal" />
                    </div>
                    <span className="text-decimal-navy">{item}</span>
                  </li>
                ))}
              </ul>

              <button
                onClick={handleBookCall}
                className="btn-primary"
              >
                <Calendar className="w-5 h-5 mr-2" />
                Schedule Your Meeting
              </button>
            </div>

            <div className="bg-decimal-cream rounded-3xl p-8">
              <div className="text-sm font-semibold text-decimal-teal mb-4">
                VIVE 2026
              </div>
              <h3 className="text-2xl font-bold text-decimal-navy mb-4">
                Event Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Calendar className="w-6 h-6 text-decimal-teal" />
                  <div>
                    <div className="font-semibold text-decimal-navy">February 22-25, 2026</div>
                    <div className="text-decimal-navy/60 text-sm">Sunday - Wednesday</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="w-6 h-6 text-decimal-teal" />
                  <div>
                    <div className="font-semibold text-decimal-navy">Nashville, TN</div>
                    <div className="text-decimal-navy/60 text-sm">Music City Center</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <Clock className="w-6 h-6 text-decimal-teal" />
                  <div>
                    <div className="font-semibold text-decimal-navy">9:00 AM - 5:00 PM</div>
                    <div className="text-decimal-navy/60 text-sm">Each day</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-16 bg-gradient-to-br from-decimal-teal to-decimal-cyan text-white text-center">
        <div className="container-lg">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Don't Leave Vive Without a Plan
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Get your free digital health readiness assessment and leave with
            actionable next steps for your business.
          </p>
          <button
            onClick={() => setShowAssessment(true)}
            className="bg-white text-decimal-teal px-8 py-4 rounded-full font-semibold text-lg
                       hover:bg-decimal-navy hover:text-white transition-colors
                       inline-flex items-center gap-2"
          >
            Start Your Free Assessment
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </section>

      {/* Simple Footer */}
      <footer className="bg-decimal-navy text-white py-8">
        <div className="container-lg flex flex-col md:flex-row justify-between items-center gap-4">
          <Link href="/" className="flex items-center gap-2">
            <span className="font-bold">decimal.health</span>
          </Link>
          <p className="text-white/60 text-sm">
            &copy; {new Date().getFullYear()} Decimal Health. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
