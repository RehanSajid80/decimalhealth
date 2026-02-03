'use client'

import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Calculator, DollarSign, Clock, TrendingUp, ArrowRight, Download } from 'lucide-react'

interface ROIInputs {
  currentSalesTeam: number
  avgDealSize: number
  salesCycleMonths: number
  winRate: number
  targetGrowth: number
}

interface ROIResults {
  currentRevenue: number
  projectedRevenue: number
  revenueGain: number
  timeSaved: number
  dealsClosed: number
  roi: number
}

export default function ROICalculator() {
  const [inputs, setInputs] = useState<ROIInputs>({
    currentSalesTeam: 5,
    avgDealSize: 100000,
    salesCycleMonths: 6,
    winRate: 20,
    targetGrowth: 50,
  })

  const [showResults, setShowResults] = useState(false)
  const [showLeadForm, setShowLeadForm] = useState(false)

  const results = useMemo<ROIResults>(() => {
    // Current state calculations
    const dealsPerPersonPerYear = 12 / inputs.salesCycleMonths * (inputs.winRate / 100) * 10 // 10 opps per month
    const currentRevenue = inputs.currentSalesTeam * dealsPerPersonPerYear * inputs.avgDealSize

    // With Decimal Health improvements
    const improvedWinRate = inputs.winRate * 1.4 // 40% improvement in win rate
    const improvedCycle = inputs.salesCycleMonths * 0.75 // 25% shorter sales cycle
    const improvedDealsPerPerson = 12 / improvedCycle * (improvedWinRate / 100) * 10

    const projectedRevenue = inputs.currentSalesTeam * improvedDealsPerPerson * inputs.avgDealSize
    const revenueGain = projectedRevenue - currentRevenue

    // Time savings (hours per week on strategy)
    const timeSaved = inputs.currentSalesTeam * 8 // 8 hours per person per week

    // Additional deals closed
    const dealsClosed = Math.round((improvedDealsPerPerson - dealsPerPersonPerYear) * inputs.currentSalesTeam)

    // ROI calculation (assuming $150k investment in Decimal services)
    const investment = 150000
    const roi = Math.round(((revenueGain - investment) / investment) * 100)

    return {
      currentRevenue,
      projectedRevenue,
      revenueGain,
      timeSaved,
      dealsClosed,
      roi,
    }
  }, [inputs])

  const formatCurrency = (value: number) => {
    if (value >= 1000000) {
      return `$${(value / 1000000).toFixed(1)}M`
    }
    return `$${(value / 1000).toFixed(0)}K`
  }

  const handleInputChange = (key: keyof ROIInputs, value: number) => {
    setInputs((prev) => ({ ...prev, [key]: value }))
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-3xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-decimal-navy p-6 md:p-8 text-white">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center">
              <Calculator className="w-6 h-6" />
            </div>
            <div>
              <h2 className="text-2xl font-bold">Digital Health ROI Calculator</h2>
              <p className="text-white/70">See the impact of strategic consulting on your growth</p>
            </div>
          </div>
        </div>

        {/* Calculator Body */}
        <div className="p-6 md:p-8">
          {!showResults ? (
            <div className="space-y-8">
              {/* Input: Sales Team Size */}
              <div>
                <label className="block text-decimal-navy font-semibold mb-3">
                  Sales/BD Team Size
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={inputs.currentSalesTeam}
                    onChange={(e) => handleInputChange('currentSalesTeam', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-decimal-cream rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-decimal-teal [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="w-16 text-2xl font-bold text-decimal-teal text-right">
                    {inputs.currentSalesTeam}
                  </span>
                </div>
              </div>

              {/* Input: Average Deal Size */}
              <div>
                <label className="block text-decimal-navy font-semibold mb-3">
                  Average Deal Size
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="10000"
                    max="1000000"
                    step="10000"
                    value={inputs.avgDealSize}
                    onChange={(e) => handleInputChange('avgDealSize', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-decimal-cream rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-decimal-teal [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="w-24 text-2xl font-bold text-decimal-teal text-right">
                    {formatCurrency(inputs.avgDealSize)}
                  </span>
                </div>
              </div>

              {/* Input: Sales Cycle */}
              <div>
                <label className="block text-decimal-navy font-semibold mb-3">
                  Average Sales Cycle (months)
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="18"
                    value={inputs.salesCycleMonths}
                    onChange={(e) => handleInputChange('salesCycleMonths', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-decimal-cream rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-decimal-teal [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="w-20 text-2xl font-bold text-decimal-teal text-right">
                    {inputs.salesCycleMonths} mo
                  </span>
                </div>
              </div>

              {/* Input: Win Rate */}
              <div>
                <label className="block text-decimal-navy font-semibold mb-3">
                  Current Win Rate
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="5"
                    max="50"
                    value={inputs.winRate}
                    onChange={(e) => handleInputChange('winRate', parseInt(e.target.value))}
                    className="flex-1 h-2 bg-decimal-cream rounded-full appearance-none cursor-pointer
                               [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-6
                               [&::-webkit-slider-thumb]:h-6 [&::-webkit-slider-thumb]:rounded-full
                               [&::-webkit-slider-thumb]:bg-decimal-teal [&::-webkit-slider-thumb]:cursor-pointer"
                  />
                  <span className="w-16 text-2xl font-bold text-decimal-teal text-right">
                    {inputs.winRate}%
                  </span>
                </div>
              </div>

              {/* Calculate Button */}
              <button
                onClick={() => setShowResults(true)}
                className="w-full btn-primary text-lg"
              >
                Calculate My ROI
                <ArrowRight className="w-5 h-5 ml-2" />
              </button>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-8"
            >
              {/* ROI Headline */}
              <div className="text-center p-8 bg-gradient-to-br from-decimal-teal to-decimal-cyan rounded-2xl text-white">
                <p className="text-white/80 mb-2">Your Projected ROI</p>
                <div className="text-6xl font-bold mb-2">{results.roi}%</div>
                <p className="text-white/80">Return on Investment</p>
              </div>

              {/* Results Grid */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="p-6 rounded-2xl bg-decimal-cream">
                  <div className="flex items-center gap-3 mb-4">
                    <DollarSign className="w-6 h-6 text-decimal-teal" />
                    <span className="font-semibold text-decimal-navy">Revenue Impact</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-decimal-navy/70">Current Annual Revenue</span>
                      <span className="font-semibold">{formatCurrency(results.currentRevenue)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-decimal-navy/70">Projected Revenue</span>
                      <span className="font-semibold text-decimal-teal">{formatCurrency(results.projectedRevenue)}</span>
                    </div>
                    <div className="pt-3 border-t flex justify-between">
                      <span className="font-semibold text-decimal-navy">Revenue Gain</span>
                      <span className="font-bold text-green-600">+{formatCurrency(results.revenueGain)}</span>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-decimal-cream">
                  <div className="flex items-center gap-3 mb-4">
                    <TrendingUp className="w-6 h-6 text-decimal-coral" />
                    <span className="font-semibold text-decimal-navy">Performance Gains</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-decimal-navy/70">Additional Deals/Year</span>
                      <span className="font-semibold text-decimal-teal">+{results.dealsClosed}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-decimal-navy/70">Win Rate Improvement</span>
                      <span className="font-semibold text-decimal-teal">+40%</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-decimal-navy/70">Sales Cycle Reduction</span>
                      <span className="font-semibold text-decimal-teal">-25%</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Assumptions Note */}
              <div className="p-4 rounded-xl bg-decimal-navy/5 text-sm text-decimal-navy/70">
                <strong>Assumptions:</strong> Based on typical improvements seen with strategic
                consulting engagement. Actual results may vary based on market conditions,
                execution, and other factors.
              </div>

              {/* CTA */}
              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={() => setShowLeadForm(true)}
                  className="flex-1 btn-primary"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Get Full Analysis
                </button>
                <button
                  onClick={() => setShowResults(false)}
                  className="flex-1 btn-secondary"
                >
                  Recalculate
                </button>
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  )
}
