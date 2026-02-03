'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import {
  CheckCircle2,
  ArrowRight,
  Download,
  Calendar,
  Share2,
  Lightbulb,
  Target,
  TrendingUp,
  AlertCircle,
} from 'lucide-react'
import type { AssessmentResult } from './Assessment'

interface AssessmentResultsProps {
  result: AssessmentResult
  onBookCall: () => void
  eventName?: string
}

const stageData = {
  early: {
    title: 'Early Stage Explorer',
    color: 'coral',
    bgColor: 'bg-decimal-coral',
    description:
      'You\'re in the crucial ideation and validation phase. The decisions you make now will shape your entire trajectory.',
    icon: Lightbulb,
    recommendations: [
      'Validate your clinical use-case with real stakeholders',
      'Build a minimum viable evidence strategy',
      'Map your regulatory pathway early',
      'Identify your ideal customer profile',
    ],
    services: ['Market Needs Assessment', 'Clinical Use-case Development', 'MVP Strategy'],
  },
  growth: {
    title: 'Growth Stage Builder',
    color: 'teal',
    bgColor: 'bg-decimal-teal',
    description:
      'You\'ve proven initial traction. Now it\'s time to build repeatable processes and scale your impact.',
    icon: Target,
    recommendations: [
      'Strengthen your evidence generation strategy',
      'Refine go-to-market for scalability',
      'Build strategic health system partnerships',
      'Prepare for Series A/B fundraising',
    ],
    services: ['Evidence Generation', 'Commercialization Strategy', 'Partnership Development'],
  },
  scale: {
    title: 'Scale Stage Leader',
    color: 'navy',
    bgColor: 'bg-decimal-navy',
    description:
      'You\'ve found product-market fit. The focus now is optimizing operations and expanding market reach.',
    icon: TrendingUp,
    recommendations: [
      'Expand into new clinical areas or geographies',
      'Optimize sales and implementation processes',
      'Build thought leadership and market presence',
      'Consider strategic partnerships or M&A',
    ],
    services: ['Growth Roadmap', 'BD & Sales Training', 'Strategic Advisory'],
  },
}

const challengeRecommendations: Record<string, string> = {
  'product-market-fit': 'Our clinical experts can help you identify the strongest use-cases and validate demand with real stakeholders.',
  'clinical-validation': 'We\'ve run 150+ clinical trials and can design an evidence strategy that\'s both rigorous and efficient.',
  'regulatory': 'With 10+ FDA submissions under our belt, we can navigate the regulatory maze and avoid costly delays.',
  'sales': 'Our go-to-market expertise has helped 100+ companies build repeatable sales processes.',
  'partnerships': 'We have deep relationships with health systems and can open doors that would take years otherwise.',
  'fundraising': 'We\'ve helped companies raise from seed to Series C with compelling clinical and commercial narratives.',
}

export default function AssessmentResults({
  result,
  onBookCall,
  eventName = 'Vive 2026',
}: AssessmentResultsProps) {
  const [showLeadForm, setShowLeadForm] = useState(false)
  const [formSubmitted, setFormSubmitted] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    phone: '',
  })

  const stageInfo = stageData[result.stage]
  const StageIcon = stageInfo.icon

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would send to your CRM/backend
    console.log('Lead captured:', { ...formData, ...result })
    setFormSubmitted(true)
  }

  const scorePercentage = Math.round((result.score / 16) * 100)

  return (
    <div className="max-w-3xl mx-auto">
      {/* Results Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-10"
      >
        <div
          className={`inline-flex items-center justify-center w-20 h-20 rounded-full ${stageInfo.bgColor} text-white mb-6`}
        >
          <StageIcon className="w-10 h-10" />
        </div>

        <h1 className="text-3xl md:text-4xl font-bold text-decimal-navy mb-3">
          You're a {stageInfo.title}
        </h1>

        <p className="text-xl text-decimal-navy/70 max-w-xl mx-auto">
          {stageInfo.description}
        </p>
      </motion.div>

      {/* Score Visualization */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="bg-white rounded-3xl p-8 shadow-lg mb-8"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-decimal-navy">Your Readiness Score</h3>
          <span className="text-3xl font-bold text-decimal-teal">{result.score}/16</span>
        </div>

        <div className="h-4 bg-decimal-cream rounded-full overflow-hidden mb-4">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${scorePercentage}%` }}
            transition={{ duration: 1, delay: 0.3 }}
            className="h-full bg-gradient-to-r from-decimal-coral via-decimal-teal to-decimal-cyan"
          />
        </div>

        <div className="flex justify-between text-sm text-decimal-navy/60">
          <span>Early Stage</span>
          <span>Growth Stage</span>
          <span>Scale Stage</span>
        </div>
      </motion.div>

      {/* Personalized Recommendations */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="bg-white rounded-3xl p-8 shadow-lg mb-8"
      >
        <h3 className="font-bold text-decimal-navy text-xl mb-6 flex items-center gap-2">
          <CheckCircle2 className="w-6 h-6 text-decimal-teal" />
          Your Personalized Recommendations
        </h3>

        <div className="space-y-4">
          {stageInfo.recommendations.map((rec, index) => (
            <motion.div
              key={rec}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-start gap-4 p-4 rounded-xl bg-decimal-cream/50"
            >
              <span className="w-8 h-8 rounded-full bg-decimal-teal/20 flex items-center justify-center flex-shrink-0 text-decimal-teal font-bold">
                {index + 1}
              </span>
              <span className="text-decimal-navy">{rec}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Challenge-Specific Insights */}
      {result.challenges && result.challenges.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-decimal-navy rounded-3xl p-8 text-white mb-8"
        >
          <h3 className="font-bold text-xl mb-6 flex items-center gap-2">
            <AlertCircle className="w-6 h-6 text-decimal-gold" />
            Addressing Your Top Challenges
          </h3>

          <div className="space-y-4">
            {result.challenges.slice(0, 3).map((challenge) => (
              <div key={challenge} className="p-4 rounded-xl bg-white/10">
                <div className="font-semibold text-decimal-cyan mb-1 capitalize">
                  {challenge.replace(/-/g, ' ')}
                </div>
                <p className="text-white/80 text-sm">
                  {challengeRecommendations[challenge]}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Lead Capture / CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="bg-gradient-to-br from-decimal-teal to-decimal-cyan rounded-3xl p-8 text-white"
      >
        {!showLeadForm && !formSubmitted ? (
          <div className="text-center">
            <h3 className="font-bold text-2xl mb-3">
              Get Your Full Report + Strategy Session
            </h3>
            <p className="text-white/90 mb-6 max-w-md mx-auto">
              Enter your details to receive a detailed PDF report with actionable next steps,
              plus book a complimentary 30-minute strategy call.
            </p>
            <button
              onClick={() => setShowLeadForm(true)}
              className="bg-white text-decimal-teal px-8 py-4 rounded-full font-semibold
                         hover:bg-decimal-navy hover:text-white transition-colors
                         inline-flex items-center gap-2"
            >
              Get My Free Report
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : formSubmitted ? (
          <div className="text-center">
            <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center mx-auto mb-4">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="font-bold text-2xl mb-3">You're All Set!</h3>
            <p className="text-white/90 mb-6">
              Check your email for your personalized report. We'll reach out shortly
              to schedule your strategy call.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={onBookCall}
                className="bg-white text-decimal-teal px-6 py-3 rounded-full font-semibold
                           hover:bg-decimal-navy hover:text-white transition-colors
                           inline-flex items-center justify-center gap-2"
              >
                <Calendar className="w-5 h-5" />
                Book Call Now
              </button>
              <button
                className="bg-white/20 text-white px-6 py-3 rounded-full font-semibold
                           hover:bg-white/30 transition-colors
                           inline-flex items-center justify-center gap-2"
              >
                <Share2 className="w-5 h-5" />
                Share Results
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <h3 className="font-bold text-xl mb-6 text-center">
              Almost there! Where should we send your report?
            </h3>

            <div className="space-y-4">
              <input
                type="text"
                placeholder="Your Name"
                required
                value={formData.name}
                onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white/60
                           border border-white/20 focus:border-white focus:outline-none"
              />
              <input
                type="email"
                placeholder="Work Email"
                required
                value={formData.email}
                onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white/60
                           border border-white/20 focus:border-white focus:outline-none"
              />
              <input
                type="text"
                placeholder="Company Name"
                required
                value={formData.company}
                onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white/60
                           border border-white/20 focus:border-white focus:outline-none"
              />
              <input
                type="tel"
                placeholder="Phone (optional)"
                value={formData.phone}
                onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                className="w-full px-5 py-4 rounded-xl bg-white/20 text-white placeholder-white/60
                           border border-white/20 focus:border-white focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="w-full mt-6 bg-white text-decimal-teal px-8 py-4 rounded-full font-semibold
                         hover:bg-decimal-navy hover:text-white transition-colors
                         inline-flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Send My Report
            </button>

            <p className="text-white/60 text-xs text-center mt-4">
              We respect your privacy. No spam, ever.
            </p>
          </form>
        )}
      </motion.div>

      {/* Recommended Services */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 text-center"
      >
        <p className="text-decimal-navy/60 mb-4">
          Services we recommend for your stage:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {stageInfo.services.map((service) => (
            <span
              key={service}
              className="px-4 py-2 rounded-full bg-decimal-teal/10 text-decimal-teal font-medium"
            >
              {service}
            </span>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
