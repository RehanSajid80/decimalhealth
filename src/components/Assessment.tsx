'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react'

export interface AssessmentResult {
  score: number
  stage: 'early' | 'growth' | 'scale'
  persona: 'startup' | 'health-system' | 'pharma' | 'other'
  challenges: string[]
  answers: Record<string, string>
}

interface AssessmentProps {
  onComplete: (result: AssessmentResult) => void
  eventName?: string
}

const questions = [
  {
    id: 'persona',
    question: 'What best describes your organization?',
    options: [
      { value: 'startup', label: 'Digital Health Startup', icon: '🚀' },
      { value: 'health-system', label: 'Health System / Provider', icon: '🏥' },
      { value: 'pharma', label: 'Pharma / Biotech / MedTech', icon: '💊' },
      { value: 'other', label: 'Investor / Other', icon: '💼' },
    ],
  },
  {
    id: 'stage',
    question: 'What stage is your digital health initiative?',
    options: [
      { value: 'idea', label: 'Idea / Concept Stage', score: 1 },
      { value: 'mvp', label: 'Building MVP / Prototype', score: 2 },
      { value: 'pilot', label: 'Piloting with Customers', score: 3 },
      { value: 'scaling', label: 'Scaling / Growing', score: 4 },
    ],
  },
  {
    id: 'validation',
    question: 'How would you describe your clinical validation?',
    options: [
      { value: 'none', label: 'No clinical validation yet', score: 1 },
      { value: 'internal', label: 'Internal testing only', score: 2 },
      { value: 'pilot', label: 'Pilot study completed', score: 3 },
      { value: 'published', label: 'Published evidence / FDA cleared', score: 4 },
    ],
  },
  {
    id: 'gtm',
    question: 'How clear is your go-to-market strategy?',
    options: [
      { value: 'unclear', label: 'Still figuring it out', score: 1 },
      { value: 'developing', label: 'Have ideas, need refinement', score: 2 },
      { value: 'defined', label: 'Defined but not validated', score: 3 },
      { value: 'proven', label: 'Proven and repeatable', score: 4 },
    ],
  },
  {
    id: 'challenge',
    question: 'What\'s your biggest challenge right now?',
    multiSelect: true,
    options: [
      { value: 'product-market-fit', label: 'Finding product-market fit' },
      { value: 'clinical-validation', label: 'Clinical validation / evidence' },
      { value: 'regulatory', label: 'Regulatory pathway (FDA, etc.)' },
      { value: 'sales', label: 'Sales & customer acquisition' },
      { value: 'partnerships', label: 'Health system partnerships' },
      { value: 'fundraising', label: 'Fundraising / investment' },
    ],
  },
  {
    id: 'timeline',
    question: 'When do you need to see results?',
    options: [
      { value: 'urgent', label: 'ASAP - Next 30 days', score: 4 },
      { value: 'quarter', label: 'This quarter', score: 3 },
      { value: 'half', label: 'Next 6 months', score: 2 },
      { value: 'year', label: 'Within a year', score: 1 },
    ],
  },
]

export default function Assessment({ onComplete, eventName = 'Vive 2026' }: AssessmentProps) {
  const [currentStep, setCurrentStep] = useState(0)
  const [answers, setAnswers] = useState<Record<string, string | string[]>>({})
  const [selectedMulti, setSelectedMulti] = useState<string[]>([])

  const currentQuestion = questions[currentStep]
  const progress = ((currentStep + 1) / questions.length) * 100

  const handleSelect = (value: string) => {
    if (currentQuestion.multiSelect) {
      setSelectedMulti((prev) =>
        prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
      )
    } else {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }))
      // Auto-advance for single select
      setTimeout(() => {
        if (currentStep < questions.length - 1) {
          setCurrentStep((prev) => prev + 1)
        }
      }, 300)
    }
  }

  const handleNext = () => {
    if (currentQuestion.multiSelect) {
      setAnswers((prev) => ({ ...prev, [currentQuestion.id]: selectedMulti }))
      setSelectedMulti([])
    }

    if (currentStep < questions.length - 1) {
      setCurrentStep((prev) => prev + 1)
    } else {
      // Calculate results
      calculateResults()
    }
  }

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const calculateResults = () => {
    // Calculate score
    let totalScore = 0
    questions.forEach((q) => {
      if (q.id !== 'persona' && q.id !== 'challenge') {
        const answer = answers[q.id] as string
        const option = q.options.find((o) => o.value === answer)
        if (option && 'score' in option) {
          totalScore += option.score
        }
      }
    })

    // Determine stage
    let stage: 'early' | 'growth' | 'scale'
    if (totalScore <= 8) {
      stage = 'early'
    } else if (totalScore <= 12) {
      stage = 'growth'
    } else {
      stage = 'scale'
    }

    const result: AssessmentResult = {
      score: totalScore,
      stage,
      persona: answers.persona as 'startup' | 'health-system' | 'pharma' | 'other',
      challenges: (answers.challenge as string[]) || selectedMulti,
      answers: answers as Record<string, string>,
    }

    onComplete(result)
  }

  const isCurrentAnswered = currentQuestion.multiSelect
    ? selectedMulti.length > 0
    : !!answers[currentQuestion.id]

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between text-sm text-decimal-navy/60 mb-2">
          <span>Question {currentStep + 1} of {questions.length}</span>
          <span>{Math.round(progress)}% complete</span>
        </div>
        <div className="h-2 bg-decimal-cream rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-decimal-teal to-decimal-cyan"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>
      </div>

      {/* Question */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-8">
            {currentQuestion.question}
          </h2>

          {/* Options */}
          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const isSelected = currentQuestion.multiSelect
                ? selectedMulti.includes(option.value)
                : answers[currentQuestion.id] === option.value

              return (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left p-5 rounded-2xl border-2 transition-all duration-200
                             flex items-center gap-4 group
                             ${
                               isSelected
                                 ? 'border-decimal-teal bg-decimal-teal/5'
                                 : 'border-decimal-navy/10 hover:border-decimal-teal/50 bg-white'
                             }`}
                >
                  {/* Checkbox/Radio */}
                  <div
                    className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0
                                ${
                                  isSelected
                                    ? 'border-decimal-teal bg-decimal-teal'
                                    : 'border-decimal-navy/30'
                                }`}
                  >
                    {isSelected && <CheckCircle2 className="w-4 h-4 text-white" />}
                  </div>

                  {/* Icon (if exists) */}
                  {'icon' in option && (
                    <span className="text-2xl">{option.icon}</span>
                  )}

                  {/* Label */}
                  <span
                    className={`text-lg font-medium ${
                      isSelected ? 'text-decimal-teal' : 'text-decimal-navy'
                    }`}
                  >
                    {option.label}
                  </span>
                </button>
              )
            })}
          </div>

          {currentQuestion.multiSelect && (
            <p className="text-sm text-decimal-navy/60 mt-4">
              Select all that apply
            </p>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-10">
        <button
          onClick={handleBack}
          disabled={currentStep === 0}
          className={`flex items-center gap-2 px-6 py-3 rounded-full font-medium
                     ${
                       currentStep === 0
                         ? 'text-decimal-navy/30 cursor-not-allowed'
                         : 'text-decimal-navy hover:bg-decimal-cream'
                     }`}
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </button>

        {(currentQuestion.multiSelect || currentStep === questions.length - 1) && (
          <button
            onClick={handleNext}
            disabled={!isCurrentAnswered}
            className={`flex items-center gap-2 px-8 py-3 rounded-full font-semibold
                       ${
                         isCurrentAnswered
                           ? 'bg-decimal-teal text-white hover:bg-decimal-navy'
                           : 'bg-decimal-navy/10 text-decimal-navy/40 cursor-not-allowed'
                       }`}
          >
            {currentStep === questions.length - 1 ? (
              <>
                See My Results
                <Sparkles className="w-5 h-5" />
              </>
            ) : (
              <>
                Next
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
        )}
      </div>
    </div>
  )
}
