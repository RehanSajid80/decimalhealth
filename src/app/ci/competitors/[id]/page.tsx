'use client'

import { use } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Globe,
  Building2,
  Clock,
  ExternalLink,
  Radio,
} from 'lucide-react'
import { useCompetitor } from '@/lib/hooks'
import type { SignalType, Urgency } from '@/types/database'

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
  critical: 'bg-red-100 text-red-700',
  high: 'bg-orange-100 text-orange-700',
  medium: 'bg-yellow-100 text-yellow-700',
  low: 'bg-gray-100 text-gray-600',
}

const tierColors: Record<number, string> = {
  1: 'bg-red-100 text-red-700',
  2: 'bg-orange-100 text-orange-700',
  3: 'bg-yellow-100 text-yellow-700',
  4: 'bg-blue-100 text-blue-700',
  5: 'bg-green-100 text-green-700',
}

export default function CompetitorDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = use(params)
  const { competitor, signals, loading } = useCompetitor(id)

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading competitor...</div>
  }

  if (!competitor) {
    return (
      <div className="p-12 text-center">
        <p className="text-gray-500">Competitor not found</p>
        <Link href="/ci/competitors" className="text-decimal-teal text-sm mt-2 inline-block">
          Back to competitors
        </Link>
      </div>
    )
  }

  const signalsByType = signals.reduce(
    (acc, s) => {
      acc[s.signal_type] = (acc[s.signal_type] || 0) + 1
      return acc
    },
    {} as Record<string, number>
  )

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/ci/competitors"
        className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-decimal-navy transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        All Competitors
      </Link>

      {/* Profile Card */}
      <div className="bg-white rounded-xl border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-xl bg-decimal-navy/5 flex items-center justify-center">
              <Building2 className="w-7 h-7 text-decimal-navy/60" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-decimal-navy">{competitor.name}</h2>
              <div className="flex items-center gap-2 mt-1">
                <span className={`text-xs font-medium px-2 py-0.5 rounded-full ${tierColors[competitor.segment_tier]}`}>
                  Tier {competitor.segment_tier}
                </span>
                <span className="text-sm text-gray-500">{competitor.segment_label}</span>
              </div>
            </div>
          </div>
          <a
            href={competitor.website_url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-decimal-navy text-white rounded-lg hover:bg-decimal-navy/90 transition-colors"
          >
            <Globe className="w-3.5 h-3.5" />
            Website
          </a>
        </div>

        <p className="text-sm text-gray-600 mt-4">{competitor.description}</p>

        {/* Offering Overlap */}
        {competitor.offerings_overlap?.length > 0 && (
          <div className="mt-4">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              Offering Overlap
            </p>
            <div className="flex gap-2 flex-wrap">
              {(competitor.offerings_overlap as string[]).map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1.5 rounded-lg bg-decimal-teal/10 text-decimal-teal font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Profile Summary */}
        {competitor.profile_summary && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
              AI-Generated Profile
            </p>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {competitor.profile_summary}
            </p>
          </div>
        )}
      </div>

      {/* Signal Breakdown */}
      {Object.keys(signalsByType).length > 0 && (
        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="text-sm font-semibold text-decimal-navy mb-3">Signal Breakdown</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {Object.entries(signalsByType)
              .sort(([, a], [, b]) => b - a)
              .map(([type, count]) => (
                <div key={type} className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-lg font-bold text-decimal-navy">{count}</p>
                  <p className="text-[10px] text-gray-500">
                    {signalTypeLabels[type as SignalType]}
                  </p>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Recent Signals */}
      <div className="bg-white rounded-xl border border-gray-200">
        <div className="p-4 border-b border-gray-100">
          <h3 className="text-sm font-semibold text-decimal-navy">
            Recent Signals ({signals.length})
          </h3>
        </div>
        <div className="divide-y divide-gray-100">
          {signals.length === 0 ? (
            <div className="p-8 text-center">
              <Radio className="w-8 h-8 mx-auto text-gray-300 mb-2" />
              <p className="text-sm text-gray-400">No signals collected yet</p>
            </div>
          ) : (
            signals.map((signal) => (
              <div key={signal.id} className="p-4">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs px-2 py-0.5 rounded-full bg-decimal-navy/10 text-decimal-navy">
                    {signalTypeLabels[signal.signal_type]}
                  </span>
                  <span className={`text-xs px-2 py-0.5 rounded-full ${urgencyColors[signal.urgency]}`}>
                    {signal.urgency}
                  </span>
                  <span className="text-xs text-gray-400">
                    {new Date(signal.detected_at).toLocaleDateString()}
                  </span>
                </div>
                <p className="text-sm text-gray-700">{signal.processed_summary}</p>
                {signal.strategic_assessment && (
                  <p className="text-xs text-gray-500 mt-2 italic">
                    {signal.strategic_assessment}
                  </p>
                )}
                {signal.source_url && (
                  <a
                    href={signal.source_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-decimal-teal hover:underline flex items-center gap-0.5 mt-2"
                  >
                    View source <ExternalLink className="w-3 h-3" />
                  </a>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}
