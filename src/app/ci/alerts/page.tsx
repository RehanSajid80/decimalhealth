'use client'

import { useState } from 'react'
import {
  Bell,
  BellOff,
  Check,
  AlertTriangle,
  ExternalLink,
  Filter,
} from 'lucide-react'
import { useAlerts } from '@/lib/hooks'
import type { Urgency, SignalType } from '@/types/database'

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
  critical: 'border-l-red-500 bg-red-50/50',
  high: 'border-l-orange-500 bg-orange-50/50',
  medium: 'border-l-yellow-500 bg-yellow-50/30',
  low: 'border-l-gray-300 bg-white',
}

export default function AlertCenterPage() {
  const { alerts, loading, acknowledge } = useAlerts()
  const [filter, setFilter] = useState<'all' | 'unread' | 'read'>('all')

  const filtered = alerts.filter((a) => {
    if (filter === 'unread') return !a.acknowledged_at
    if (filter === 'read') return !!a.acknowledged_at
    return true
  })

  const unreadCount = alerts.filter((a) => !a.acknowledged_at).length

  if (loading) {
    return <div className="p-12 text-center text-gray-400">Loading alerts...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-500">
          {unreadCount > 0
            ? `${unreadCount} unacknowledged alert${unreadCount !== 1 ? 's' : ''}`
            : 'All alerts acknowledged'}
        </p>
        <div className="flex gap-1 bg-gray-100 rounded-lg p-0.5">
          {(['all', 'unread', 'read'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1.5 text-xs font-medium rounded-md capitalize transition-colors ${
                filter === f
                  ? 'bg-white text-decimal-navy shadow-sm'
                  : 'text-gray-500 hover:text-gray-700'
              }`}
            >
              {f}
              {f === 'unread' && unreadCount > 0 && (
                <span className="ml-1 bg-decimal-coral text-white text-[10px] px-1.5 py-0.5 rounded-full">
                  {unreadCount}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Alert List */}
      {filtered.length === 0 ? (
        <div className="bg-white rounded-xl border border-gray-200 p-12 text-center">
          <BellOff className="w-10 h-10 mx-auto text-gray-300 mb-3" />
          <p className="text-sm text-gray-500">
            {filter === 'unread'
              ? 'No unread alerts'
              : filter === 'read'
                ? 'No acknowledged alerts'
                : 'No alerts yet'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Alerts are generated when critical or high-urgency signals are detected.
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {filtered.map((alert) => {
            const signal = alert.signal as any
            const competitor = signal?.competitor
            const urgency = (signal?.urgency as Urgency) || 'medium'
            const isAcknowledged = !!alert.acknowledged_at

            return (
              <div
                key={alert.id}
                className={`rounded-xl border border-gray-200 border-l-4 p-4 transition-all ${urgencyColors[urgency]} ${
                  isAcknowledged ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex items-start gap-3 flex-1">
                    <div className="mt-0.5">
                      {isAcknowledged ? (
                        <Check className="w-4 h-4 text-green-500" />
                      ) : (
                        <AlertTriangle className="w-4 h-4 text-decimal-coral" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap mb-1">
                        {competitor?.name && (
                          <span className="font-semibold text-sm text-decimal-navy">
                            {competitor.name}
                          </span>
                        )}
                        {signal?.signal_type && (
                          <span className="text-xs px-2 py-0.5 rounded-full bg-decimal-navy/10 text-decimal-navy">
                            {signalTypeLabels[signal.signal_type as SignalType]}
                          </span>
                        )}
                        <span className="text-xs capitalize font-medium text-gray-500">
                          {urgency}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {signal?.processed_summary || alert.alert_type}
                      </p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-400">
                          {new Date(alert.delivered_at).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </span>
                        <span className="text-xs text-gray-400">
                          via {alert.delivery_channel}
                        </span>
                        {signal?.source_url && (
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

                  {!isAcknowledged && (
                    <button
                      onClick={() => acknowledge(alert.id)}
                      className="flex-shrink-0 px-3 py-1.5 text-xs font-medium bg-decimal-navy text-white rounded-lg hover:bg-decimal-navy/90 transition-colors"
                    >
                      Acknowledge
                    </button>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}
