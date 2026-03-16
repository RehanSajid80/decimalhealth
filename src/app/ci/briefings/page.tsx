'use client'

import { useState } from 'react'
import {
  FileText,
  Calendar,
  ChevronDown,
  ChevronUp,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react'
import { useBriefings } from '@/lib/hooks'
import type { Briefing, Urgency } from '@/types/database'

const urgencyIcons: Record<Urgency, { icon: typeof AlertCircle; color: string }> = {
  critical: { icon: AlertCircle, color: 'text-red-500' },
  high: { icon: AlertCircle, color: 'text-orange-500' },
  medium: { icon: AlertCircle, color: 'text-yellow-500' },
  low: { icon: CheckCircle2, color: 'text-gray-400' },
}

export default function BriefingsPage() {
  const { briefings, loading } = useBriefings()
  const [expandedId, setExpandedId] = useState<string | null>(null)

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading briefings...</div>
  }

  if (briefings.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
        <FileText className="w-12 h-12 mx-auto text-gray-300 mb-3" />
        <h2 className="text-lg font-semibold text-decimal-navy">No Briefings Yet</h2>
        <p className="text-sm text-gray-500 mt-2 max-w-md mx-auto">
          Weekly intelligence briefings will appear here once the pipeline generates them.
          Briefings are auto-generated every Monday at 6AM.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {briefings.map((briefing) => {
        const isExpanded = expandedId === briefing.id
        const content = briefing.briefing_content as any
        const actions = (briefing.recommended_actions || []) as any[]

        return (
          <div
            key={briefing.id}
            className="bg-white rounded-xl border border-gray-200 overflow-hidden"
          >
            {/* Briefing Header */}
            <button
              onClick={() => setExpandedId(isExpanded ? null : briefing.id)}
              className="w-full flex items-center justify-between p-5 hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-decimal-navy/5 flex items-center justify-center">
                  <FileText className="w-5 h-5 text-decimal-navy/60" />
                </div>
                <div className="text-left">
                  <h3 className="font-semibold text-decimal-navy">
                    Weekly Intelligence Briefing
                  </h3>
                  <div className="flex items-center gap-2 mt-0.5">
                    <Calendar className="w-3 h-3 text-gray-400" />
                    <span className="text-xs text-gray-500">
                      {new Date(briefing.period_start).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                      })}{' '}
                      —{' '}
                      {new Date(briefing.period_end).toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      })}
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                {briefing.key_themes?.length > 0 && (
                  <span className="text-xs text-gray-400 hidden sm:block">
                    {(briefing.key_themes as string[]).length} themes
                  </span>
                )}
                {isExpanded ? (
                  <ChevronUp className="w-4 h-4 text-gray-400" />
                ) : (
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                )}
              </div>
            </button>

            {/* Expanded Content */}
            {isExpanded && (
              <div className="px-5 pb-5 border-t border-gray-100 space-y-5">
                {/* Executive Summary */}
                {content?.executive_summary && (
                  <div className="mt-4">
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Executive Summary
                    </h4>
                    <p className="text-sm text-gray-700">{content.executive_summary}</p>
                  </div>
                )}

                {/* Key Themes */}
                {briefing.key_themes?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Key Themes
                    </h4>
                    <div className="flex gap-2 flex-wrap">
                      {(briefing.key_themes as string[]).map((theme, i) => (
                        <span
                          key={i}
                          className="text-xs px-3 py-1.5 rounded-lg bg-decimal-navy/5 text-decimal-navy font-medium"
                        >
                          {theme}
                        </span>
                      ))}
                    </div>
                  </div>
                )}

                {/* Key Movements */}
                {content?.key_movements?.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Key Competitive Movements
                    </h4>
                    <ul className="space-y-2">
                      {content.key_movements.map((m: string, i: number) => (
                        <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-decimal-teal mt-1.5 flex-shrink-0" />
                          {m}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Offering Insights */}
                {content?.offering_insights &&
                  Object.keys(content.offering_insights).length > 0 && (
                    <div>
                      <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                        Offering-Specific Insights
                      </h4>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {Object.entries(content.offering_insights).map(
                          ([offering, insight]: [string, any]) => (
                            <div key={offering} className="p-3 bg-gray-50 rounded-lg">
                              <p className="text-xs font-semibold text-decimal-teal">
                                {offering}
                              </p>
                              <p className="text-xs text-gray-600 mt-1">{insight}</p>
                            </div>
                          )
                        )}
                      </div>
                    </div>
                  )}

                {/* Competitive Landscape */}
                {content?.competitive_landscape && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Competitive Landscape
                    </h4>
                    <p className="text-sm text-gray-700">{content.competitive_landscape}</p>
                  </div>
                )}

                {/* Recommended Actions */}
                {actions.length > 0 && (
                  <div>
                    <h4 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                      Recommended Actions
                    </h4>
                    <div className="space-y-2">
                      {actions.map((action, i) => {
                        const urgency = urgencyIcons[action.priority as Urgency] || urgencyIcons.medium
                        const Icon = urgency.icon
                        return (
                          <div
                            key={i}
                            className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg"
                          >
                            <Icon className={`w-4 h-4 mt-0.5 flex-shrink-0 ${urgency.color}`} />
                            <div>
                              <p className="text-sm font-medium text-gray-700">
                                {action.action}
                              </p>
                              {action.rationale && (
                                <p className="text-xs text-gray-500 mt-0.5">
                                  {action.rationale}
                                </p>
                              )}
                              {action.related_offering && (
                                <span className="text-[10px] px-1.5 py-0.5 rounded bg-decimal-teal/10 text-decimal-teal mt-1 inline-block">
                                  {action.related_offering}
                                </span>
                              )}
                            </div>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
