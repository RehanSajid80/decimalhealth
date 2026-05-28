'use client'

import { useState, useMemo } from 'react'
import { Activity, ArrowRight } from 'lucide-react'

type TherapeuticArea = 'Oncology' | 'Rare Disease' | 'Neuro' | 'Immunology'
type Phase = 'Phase I' | 'Phase II' | 'Phase III'

// Cost of diagnostic delay per patient per month, by therapeutic area.
// Calibrated so Rare Disease + Phase II + 1,200 patients ≈ $4.2M/mo,
// matching the benchmark surfaced via Decimal Health's CI platform.
const AREA_BASE: Record<TherapeuticArea, number> = {
  Oncology: 5000,
  'Rare Disease': 3500,
  Neuro: 3000,
  Immunology: 4000,
}

const PHASE_MULTIPLIER: Record<Phase, number> = {
  'Phase I': 0.5,
  'Phase II': 1.0,
  'Phase III': 1.8,
}

const AREAS: TherapeuticArea[] = [
  'Oncology',
  'Rare Disease',
  'Neuro',
  'Immunology',
]
const PHASES: Phase[] = ['Phase I', 'Phase II', 'Phase III']

export default function CostOfDelayCalculator() {
  const [area, setArea] = useState<TherapeuticArea>('Rare Disease')
  const [phase, setPhase] = useState<Phase>('Phase II')
  const [enrollment, setEnrollment] = useState<number>(1200)

  const monthlyCost = useMemo(() => {
    return AREA_BASE[area] * PHASE_MULTIPLIER[phase] * enrollment
  }, [area, phase, enrollment])

  const formatCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`
    if (value >= 1_000) return `$${(value / 1_000).toFixed(0)}K`
    return `$${value.toFixed(0)}`
  }

  const handleEnrollmentChange = (raw: string) => {
    const digits = raw.replace(/[^\d]/g, '')
    if (digits === '') {
      setEnrollment(0)
      return
    }
    const parsed = parseInt(digits, 10)
    setEnrollment(Math.min(50000, Math.max(0, parsed)))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-2xl shadow-sm border border-decimal-navy/10 overflow-hidden">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-decimal-cream/40 border-b border-decimal-navy/10">
          <div className="flex items-center gap-2">
            <Activity className="w-4 h-4 text-decimal-coral" />
            <span className="text-xs font-bold tracking-wider text-decimal-navy">
              INTERACTIVE CALCULATOR
            </span>
          </div>
          <span className="text-xs text-decimal-navy/50 font-mono">
            /clinical-trials/cost-of-delay
          </span>
        </div>

        {/* Body */}
        <div className="px-6 md:px-8 py-7 space-y-6">
          <div>
            <h2 className="text-2xl font-bold text-decimal-navy">
              Cost of Delay Calculator
            </h2>
            <p className="text-decimal-navy/70 mt-1">
              See what diagnostic delay is costing your trial portfolio.
              90 seconds.
            </p>
          </div>

          {/* Therapeutic Area */}
          <div>
            <label className="block text-sm text-decimal-navy/70 mb-2">
              Therapeutic Area
            </label>
            <div className="flex flex-wrap gap-2">
              {AREAS.map((option) => {
                const active = option === area
                return (
                  <button
                    key={option}
                    onClick={() => setArea(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      active
                        ? 'bg-violet-50 text-violet-700 border-violet-300'
                        : 'bg-white text-decimal-navy/80 border-decimal-navy/15 hover:border-decimal-navy/30'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Phase */}
          <div>
            <label className="block text-sm text-decimal-navy/70 mb-2">
              Phase
            </label>
            <div className="flex flex-wrap gap-2">
              {PHASES.map((option) => {
                const active = option === phase
                return (
                  <button
                    key={option}
                    onClick={() => setPhase(option)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium border transition-all ${
                      active
                        ? 'bg-violet-50 text-violet-700 border-violet-300'
                        : 'bg-white text-decimal-navy/80 border-decimal-navy/15 hover:border-decimal-navy/30'
                    }`}
                  >
                    {option}
                  </button>
                )
              })}
            </div>
          </div>

          {/* Target enrollment */}
          <div>
            <label className="block text-sm text-decimal-navy/70 mb-2">
              Target enrollment
            </label>
            <div className="relative">
              <input
                type="text"
                inputMode="numeric"
                value={enrollment.toLocaleString()}
                onChange={(e) => handleEnrollmentChange(e.target.value)}
                className="w-full px-4 py-3 bg-decimal-cream/40 border border-decimal-navy/10 rounded-lg font-mono text-decimal-navy focus:outline-none focus:ring-2 focus:ring-violet-200 focus:border-violet-300"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-decimal-navy/50 font-mono text-sm pointer-events-none">
                patients
              </span>
            </div>
          </div>

          {/* Result */}
          <div className="rounded-xl border border-decimal-coral/30 bg-gradient-to-br from-decimal-coral/10 to-decimal-cream/40 p-6">
            <div className="text-xs font-bold tracking-wider text-decimal-coral mb-3">
              YOUR COST OF DELAY
            </div>
            <div className="text-5xl font-bold text-decimal-coral">
              {formatCurrency(monthlyCost)}
            </div>
            <p className="text-sm text-decimal-navy/70 mt-2 mb-5">
              per month of diagnostic delay · based on your inputs
            </p>
            <button
              onClick={() =>
                window.open('https://calendly.com/decimal-health', '_blank')
              }
              className="inline-flex items-center gap-2 px-5 py-3 rounded-lg bg-decimal-coral text-white font-semibold hover:bg-decimal-coral/90 transition-colors"
            >
              Book a Pathway Workshop
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between px-6 py-3 bg-decimal-cream/40 border-t border-decimal-navy/10 text-xs">
          <span className="text-decimal-navy/60">
            Expected: 30 MQLs · 12% completion-to-form
          </span>
          <span className="text-decimal-coral font-medium">
            In build (Rehan)
          </span>
        </div>
      </div>
    </div>
  )
}
