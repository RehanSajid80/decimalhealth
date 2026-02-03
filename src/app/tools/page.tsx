'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Calculator, ClipboardCheck, ArrowRight } from 'lucide-react'
import Assessment, { type AssessmentResult } from '@/components/Assessment'
import AssessmentResults from '@/components/AssessmentResults'
import ROICalculator from '@/components/ROICalculator'
import { Navigation, Footer } from '@/components'

type Tool = 'assessment' | 'roi' | null

export default function ToolsPage() {
  const [activeTool, setActiveTool] = useState<Tool>(null)
  const [assessmentResult, setAssessmentResult] = useState<AssessmentResult | null>(null)

  const handleAssessmentComplete = (result: AssessmentResult) => {
    setAssessmentResult(result)
  }

  const handleBookCall = () => {
    window.open('https://calendly.com/decimal-health', '_blank')
  }

  // Assessment Results View
  if (activeTool === 'assessment' && assessmentResult) {
    return (
      <>
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container-lg">
            <button
              onClick={() => {
                setActiveTool(null)
                setAssessmentResult(null)
              }}
              className="text-decimal-teal font-medium mb-8 hover:underline"
            >
              ← Back to Tools
            </button>
            <AssessmentResults
              result={assessmentResult}
              onBookCall={handleBookCall}
            />
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Active Tool View
  if (activeTool) {
    return (
      <>
        <Navigation />
        <main className="pt-24 pb-20">
          <div className="container-lg">
            <button
              onClick={() => setActiveTool(null)}
              className="text-decimal-teal font-medium mb-8 hover:underline"
            >
              ← Back to Tools
            </button>

            {activeTool === 'assessment' && (
              <div>
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-bold text-decimal-navy mb-4">
                    Digital Health Readiness Assessment
                  </h1>
                  <p className="text-xl text-decimal-navy/70 max-w-2xl mx-auto">
                    Answer a few questions to get personalized recommendations for your digital health journey.
                  </p>
                </div>
                <Assessment onComplete={handleAssessmentComplete} />
              </div>
            )}

            {activeTool === 'roi' && (
              <div>
                <div className="text-center mb-12">
                  <h1 className="text-3xl md:text-4xl font-bold text-decimal-navy mb-4">
                    ROI Calculator
                  </h1>
                  <p className="text-xl text-decimal-navy/70 max-w-2xl mx-auto">
                    See the potential impact of strategic consulting on your digital health business.
                  </p>
                </div>
                <ROICalculator />
              </div>
            )}
          </div>
        </main>
        <Footer />
      </>
    )
  }

  // Tools Selection View
  return (
    <>
      <Navigation />
      <main className="pt-24 pb-20">
        <div className="container-lg">
          {/* Header */}
          <div className="text-center mb-16">
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-5xl font-bold text-decimal-navy mb-6"
            >
              Interactive Tools
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl text-decimal-navy/70 max-w-2xl mx-auto"
            >
              Get instant insights into your digital health strategy with our free tools.
            </motion.p>
          </div>

          {/* Tools Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Assessment Tool */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => setActiveTool('assessment')}
              className="text-left group"
            >
              <div className="card-elevated h-full flex flex-col hover:scale-[1.02] transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-decimal-teal text-white flex items-center justify-center mb-6">
                  <ClipboardCheck className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-decimal-navy mb-3">
                  Readiness Assessment
                </h2>

                <p className="text-decimal-navy/70 mb-6 flex-1">
                  Take our 2-minute assessment to discover your digital health readiness score
                  and get personalized recommendations.
                </p>

                <div className="flex items-center gap-2 text-decimal-teal font-semibold group-hover:gap-3 transition-all">
                  Start Assessment
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.button>

            {/* ROI Calculator */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              onClick={() => setActiveTool('roi')}
              className="text-left group"
            >
              <div className="card-elevated h-full flex flex-col hover:scale-[1.02] transition-transform">
                <div className="w-16 h-16 rounded-2xl bg-decimal-coral text-white flex items-center justify-center mb-6">
                  <Calculator className="w-8 h-8" />
                </div>

                <h2 className="text-2xl font-bold text-decimal-navy mb-3">
                  ROI Calculator
                </h2>

                <p className="text-decimal-navy/70 mb-6 flex-1">
                  Calculate the potential return on investment from strategic consulting
                  and see how it could impact your growth.
                </p>

                <div className="flex items-center gap-2 text-decimal-teal font-semibold group-hover:gap-3 transition-all">
                  Calculate ROI
                  <ArrowRight className="w-5 h-5" />
                </div>
              </div>
            </motion.button>
          </div>

          {/* Bottom CTA */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-center mt-16"
          >
            <p className="text-decimal-navy/60 mb-4">
              Want to discuss your results with an expert?
            </p>
            <Link href="#contact" className="btn-primary">
              Book a Strategy Call
            </Link>
          </motion.div>
        </div>
      </main>
      <Footer />
    </>
  )
}
