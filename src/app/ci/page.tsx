'use client'

import { useState } from 'react'
import {
  Users,
  Radio,
  AlertTriangle,
  TrendingUp,
  Search,
  Filter,
  ExternalLink,
} from 'lucide-react'
import { useDashboardStats, useSignals, type SignalFilters } from '@/lib/hooks'
import type { SignalType, Urgency, OfferingTag } from '@/types/database'

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

const urgencyColors: Record<Urgency, string> = {
  critical: 'bg-red-100 text-red-700 border-red-200',
  high: 'bg-orange-100 text-orange-700 border-orange-200',
  medium: 'bg-yellow-100 text-yellow-700 border-yellow-200',
  low: 'bg-gray-100 text-gray-600 border-gray-200',
}

const urgencyDot: Record<Urgency, string> = {
  critical: 'bg-red-500',
  high: 'bg-orange-500',
  medium: 'bg-yellow-500',
  low: 'bg-gray-400',
}

const offerings: OfferingTag[] = [
  'Rural Health',
  'Clinical Trial Acceleration',
  'US Market Entry',
  'Build Buyer Partner',
  'GTM / Product-Market Fit',
  'Startup Sprint',
]

export default function CommandCenter() {
  const { stats, loading: statsLoading } = useDashboardStats()
  const [filters, setFilters] = useState<SignalFilters>({ days: 30 })
  const { signals, loading: signalsLoading } = useSignals(filters)
  const [showFilters, setShowFilters] = useState(false)

  const statCards = [
    {
      label: 'Competitors Tracked',
      value: stats.totalCompetitors,
      icon: Users,
      color: 'bg-decimal-navy',
    },
    {
      label: 'Total Signals',
      value: stats.totalSignals,
      icon: Radio,
      color: 'bg-decimal-teal',
    },
    {
      label: 'Unread Alerts',
      value: stats.criticalAlerts,
      icon: AlertTriangle,
      color: 'bg-decimal-coral',
    },
    {
      label: 'Signals This Week',
      value: stats.signalsThisWeek,
      icon: TrendingUp,
      color: 'bg-decimal-gold',
    },
  ]

  return (
    <div className="space-y-6">
      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((s) => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{s.label}</p>
                <p className="text-2xl font-bold text-decimal-navy mt-1">
                  {statsLoading ? '—' : s.value}
                </p>
              </div>
              <div className={`${s.color} p-3 rounded-xl`}>
                <s.icon className="w-5 h-5 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Signal Feed */}
      <div className="bg-white rounded-xl border border-gray-200">
        {/* Feed Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="text-base font-semibold text-decimal-navy">Signal Feed</h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-1.5 px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                showFilters
                  ? 'bg-decimal-navy text-white border-decimal-navy'
                  : 'text-gray-600 border-gray-200 hover:bg-gray-50'
              }`}
            >
              <Filter className="w-3.5 h-3.5" />
              Filters
            </button>
          </div>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div className="p-4 border-b border-gray-100 bg-gray-50 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            <select
              value={filters.signal_type || ''}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  signal_type: (e.target.value as SignalType) || undefined,
                }))
              }
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
            >
              <option value="">All Signal Types</option>
              {(Object.keys(signalTypeLabels) as SignalType[]).map((t) => (
                <option key={t} value={t}>
                  {signalTypeLabels[t]}
                </option>
              ))}
            </select>

            <select
              value={filters.urgency || ''}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  urgency: (e.target.value as Urgency) || undefined,
                }))
              }
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
            >
              <option value="">All Urgency</option>
              <option value="critical">Critical</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>

            <select
              value={filters.offering_tag || ''}
              onChange={(e) =>
                setFilters((f) => ({
                  ...f,
                  offering_tag: (e.target.value as OfferingTag) || undefined,
                }))
              }
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
            >
              <option value="">All Offerings</option>
              {offerings.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>

            <select
              value={filters.days || 30}
              onChange={(e) =>
                setFilters((f) => ({ ...f, days: Number(e.target.value) }))
              }
              className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
            >
              <option value={7}>Last 7 days</option>
              <option value={30}>Last 30 days</option>
              <option value={60}>Last 60 days</option>
              <option value={90}>Last 90 days</option>
            </select>
          </div>
        )}

        {/* Signal List */}
        <div className="divide-y divide-gray-100">
          {signalsLoading ? (
            <div className="p-12 text-center text-gray-400">Loading signals...</div>
          ) : signals.length === 0 ? (
            <div className="p-12 text-center">
              <Radio className="w-10 h-10 mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500 text-sm">No signals found</p>
              <p className="text-gray-400 text-xs mt-1">
                Signals will appear here as the collection pipeline processes competitor data.
              </p>
            </div>
          ) : (
            signals.map((signal) => (
              <div key={signal.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex items-start gap-3">
                  <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${urgencyDot[signal.urgency]}`} />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <span className="font-medium text-sm text-decimal-navy">
                        {(signal.competitor as any)?.name || 'Unknown'}
                      </span>
                      <span className="text-xs px-2 py-0.5 rounded-full bg-decimal-navy/10 text-decimal-navy">
                        {signalTypeLabels[signal.signal_type]}
                      </span>
                      <span
                        className={`text-xs px-2 py-0.5 rounded-full border ${urgencyColors[signal.urgency]}`}
                      >
                        {signal.urgency}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 line-clamp-2">
                      {signal.processed_summary}
                    </p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-xs text-gray-400">
                        {new Date(signal.detected_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                        })}
                      </span>
                      {signal.offering_tags?.length > 0 && (
                        <div className="flex gap-1 flex-wrap">
                          {(signal.offering_tags as string[]).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-decimal-teal/10 text-decimal-teal"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                      {signal.source_url && (
                        <a
                          href={signal.source_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-decimal-teal hover:underline flex items-center gap-0.5"
                        >
                          Source <ExternalLink className="w-3 h-3" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
