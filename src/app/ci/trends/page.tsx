'use client'

import { useState, useEffect, useMemo } from 'react'
import {
  TrendingUp,
  BarChart3,
  PieChart as PieChartIcon,
  Activity,
} from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Signal, Competitor, SignalType, OfferingTag } from '@/types/database'

const signalTypeLabels: Record<SignalType, string> = {
  NEW_OFFERING: 'New Offering',
  CLIENT_WIN: 'Client Win',
  THOUGHT_LEADERSHIP: 'Thought Leadership',
  TALENT_MOVE: 'Talent Move',
  PARTNERSHIP: 'Partnership',
  ACQUISITION: 'Acquisition',
  EVENT_PRESENCE: 'Event Presence',
  PRICING_SIGNAL: 'Pricing Signal',
  REGULATORY_COMMENT: 'Regulatory',
  CAPABILITY_SHIFT: 'Capability Shift',
}

const offeringColors: Record<string, string> = {
  'Rural Health': 'bg-emerald-500',
  'Clinical Trial Acceleration': 'bg-blue-500',
  'US Market Entry': 'bg-purple-500',
  'Build Buyer Partner': 'bg-orange-500',
  'GTM / Product-Market Fit': 'bg-pink-500',
  'Startup Sprint': 'bg-yellow-500',
}

export default function TrendsPage() {
  const [signals, setSignals] = useState<Signal[]>([])
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)
  const [timeRange, setTimeRange] = useState(90)

  useEffect(() => {
    async function load() {
      const since = new Date()
      since.setDate(since.getDate() - timeRange)

      const [sigRes, compRes] = await Promise.all([
        supabase
          .from('dh_signals')
          .select('*, competitor:dh_competitors(id, name, segment_tier)')
          .gte('detected_at', since.toISOString())
          .order('detected_at', { ascending: false }),
        supabase.from('dh_competitors').select('*').order('segment_tier'),
      ])

      if (sigRes.data) setSignals(sigRes.data as Signal[])
      if (compRes.data) setCompetitors(compRes.data as Competitor[])
      setLoading(false)
    }
    load()
  }, [timeRange])

  // Signal count by type
  const signalsByType = useMemo(() => {
    const counts: Record<string, number> = {}
    signals.forEach((s) => {
      counts[s.signal_type] = (counts[s.signal_type] || 0) + 1
    })
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([type, count]) => ({
        type: signalTypeLabels[type as SignalType] || type,
        count,
        key: type,
      }))
  }, [signals])

  // Signal count by tier
  const signalsByTier = useMemo(() => {
    const counts: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    signals.forEach((s) => {
      const tier = (s.competitor as any)?.segment_tier
      if (tier) counts[tier] = (counts[tier] || 0) + 1
    })
    return counts
  }, [signals])

  // Top competitors by signal volume
  const topCompetitors = useMemo(() => {
    const counts: Record<string, { name: string; count: number }> = {}
    signals.forEach((s) => {
      const comp = s.competitor as any
      if (comp?.name) {
        if (!counts[comp.id]) counts[comp.id] = { name: comp.name, count: 0 }
        counts[comp.id].count++
      }
    })
    return Object.values(counts)
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)
  }, [signals])

  // Offering intensity
  const offeringIntensity = useMemo(() => {
    const counts: Record<string, number> = {}
    signals.forEach((s) => {
      ;(s.offering_tags as string[])?.forEach((tag) => {
        counts[tag] = (counts[tag] || 0) + 1
      })
    })
    return Object.entries(counts)
      .sort(([, a], [, b]) => b - a)
      .map(([tag, count]) => ({ tag, count }))
  }, [signals])

  // Urgency distribution
  const urgencyDist = useMemo(() => {
    const counts = { critical: 0, high: 0, medium: 0, low: 0 }
    signals.forEach((s) => {
      counts[s.urgency] = (counts[s.urgency] || 0) + 1
    })
    return counts
  }, [signals])

  const maxSignalType = Math.max(...signalsByType.map((s) => s.count), 1)
  const maxCompetitor = Math.max(...topCompetitors.map((c) => c.count), 1)
  const maxOffering = Math.max(...offeringIntensity.map((o) => o.count), 1)

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading analytics...</div>
  }

  return (
    <div className="space-y-6">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {signals.length} signals analyzed across {competitors.length} competitors
        </p>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          {[30, 60, 90].map((d) => (
            <button
              key={d}
              onClick={() => setTimeRange(d)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
                timeRange === d
                  ? 'bg-white text-decimal-navy shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {d}d
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Signal Types Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <BarChart3 className="w-4 h-4 text-decimal-navy" />
            <h3 className="text-sm font-semibold text-decimal-navy">Signals by Type</h3>
          </div>
          <div className="space-y-3">
            {signalsByType.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No data</p>
            ) : (
              signalsByType.map((item) => (
                <div key={item.key} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-28 truncate">{item.type}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-decimal-teal h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(item.count / maxSignalType) * 100}%` }}
                    >
                      <span className="text-[10px] text-white font-medium">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Top Competitors by Activity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Activity className="w-4 h-4 text-decimal-navy" />
            <h3 className="text-sm font-semibold text-decimal-navy">
              Most Active Competitors
            </h3>
          </div>
          <div className="space-y-3">
            {topCompetitors.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No data</p>
            ) : (
              topCompetitors.map((comp, i) => (
                <div key={comp.name} className="flex items-center gap-3">
                  <span className="text-xs text-gray-400 w-5">{i + 1}</span>
                  <span className="text-xs text-gray-600 w-32 truncate">{comp.name}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className="bg-decimal-navy h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2"
                      style={{ width: `${(comp.count / maxCompetitor) * 100}%` }}
                    >
                      <span className="text-[10px] text-white font-medium">{comp.count}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Offering Competitive Intensity */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <PieChartIcon className="w-4 h-4 text-decimal-navy" />
            <h3 className="text-sm font-semibold text-decimal-navy">
              Offering Competitive Intensity
            </h3>
          </div>
          <div className="space-y-3">
            {offeringIntensity.length === 0 ? (
              <p className="text-sm text-gray-400 text-center py-4">No data</p>
            ) : (
              offeringIntensity.map((item) => (
                <div key={item.tag} className="flex items-center gap-3">
                  <span className="text-xs text-gray-600 w-40 truncate">{item.tag}</span>
                  <div className="flex-1 bg-gray-100 rounded-full h-5 overflow-hidden">
                    <div
                      className={`${offeringColors[item.tag] || 'bg-gray-500'} h-full rounded-full transition-all duration-500 flex items-center justify-end pr-2`}
                      style={{ width: `${(item.count / maxOffering) * 100}%` }}
                    >
                      <span className="text-[10px] text-white font-medium">{item.count}</span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Urgency & Tier Distribution */}
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="w-4 h-4 text-decimal-navy" />
            <h3 className="text-sm font-semibold text-decimal-navy">Distribution</h3>
          </div>

          <div className="space-y-5">
            {/* Urgency */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                By Urgency
              </p>
              <div className="grid grid-cols-4 gap-2">
                {(
                  [
                    { key: 'critical', label: 'Critical', color: 'bg-red-500' },
                    { key: 'high', label: 'High', color: 'bg-orange-500' },
                    { key: 'medium', label: 'Medium', color: 'bg-yellow-500' },
                    { key: 'low', label: 'Low', color: 'bg-gray-400' },
                  ] as const
                ).map((u) => (
                  <div key={u.key} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className={`w-2 h-2 rounded-full ${u.color} mx-auto mb-1`} />
                    <p className="text-lg font-bold text-decimal-navy">
                      {urgencyDist[u.key]}
                    </p>
                    <p className="text-[10px] text-gray-500">{u.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* By Tier */}
            <div>
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                By Competitor Tier
              </p>
              <div className="grid grid-cols-5 gap-2">
                {[1, 2, 3, 4, 5].map((tier) => (
                  <div key={tier} className="text-center p-3 bg-gray-50 rounded-lg">
                    <p className="text-lg font-bold text-decimal-navy">
                      {signalsByTier[tier] || 0}
                    </p>
                    <p className="text-[10px] text-gray-500">Tier {tier}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
