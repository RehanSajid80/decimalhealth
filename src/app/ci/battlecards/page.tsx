'use client'

import { useState, useEffect } from 'react'
import { Swords, Shield, Target, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import { supabase } from '@/lib/supabase'
import type { Competitor, Signal, OfferingTag } from '@/types/database'

const offerings: { tag: OfferingTag; description: string; icon: typeof Target }[] = [
  {
    tag: 'Rural Health',
    description:
      'Digitally enabled care delivery, access expansion, remote/rural community strategies',
    icon: Shield,
  },
  {
    tag: 'Clinical Trial Acceleration',
    description: 'Trial optimization, digital recruitment, pharma/life sciences sponsor collaboration',
    icon: Target,
  },
  {
    tag: 'US Market Entry',
    description: 'Regulatory navigation, pricing strategy, provider purchasing dynamics',
    icon: Swords,
  },
  {
    tag: 'Build Buyer Partner',
    description: 'Capability growth through acquisition, partnership, or internal development',
    icon: Shield,
  },
  {
    tag: 'GTM / Product-Market Fit',
    description: 'Innovation positioning, target segments, pricing, adoption pathways',
    icon: Target,
  },
  {
    tag: 'Startup Sprint',
    description: 'Rapid strategy-to-execution for digital health startups and innovators',
    icon: Lightbulb,
  },
]

const differentiators = [
  {
    title: 'Execution Over Strategy Theater',
    description:
      'Unlike large consultancies that deliver thick reports and exit, Decimal works side-by-side with clients to move from strategy to implementation.',
  },
  {
    title: 'Digital-Native DNA',
    description:
      'Decimal was built around digital innovation, AI, and emerging care models from day one — not a bolt-on digital practice.',
  },
  {
    title: 'Speed and Agility',
    description:
      'Decimal moves at the speed of startups, not the pace of large consulting bureaucracies. The 90-day sprint mentality is embedded.',
  },
  {
    title: 'Integrated Offering Suite',
    description:
      "Six offerings cover the full lifecycle from market insight to execution. A client working on US Market Entry can seamlessly engage for GTM strategy.",
  },
  {
    title: 'Healthcare-Specific, Innovation-Focused',
    description:
      'At the intersection of healthcare domain expertise and innovation strategy — a position most competitors approach from one side only.',
  },
  {
    title: 'Access-Driven Mission',
    description:
      'Grounded in expanding access to care, particularly in rural and underserved communities — resonates with health system leaders.',
  },
]

export default function BattlecardsPage() {
  const [selectedOffering, setSelectedOffering] = useState<OfferingTag>('Rural Health')
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)
  const [expandedCard, setExpandedCard] = useState<string | null>(null)

  useEffect(() => {
    async function load() {
      setLoading(true)
      const [compRes, sigRes] = await Promise.all([
        supabase.from('dh_competitors').select('*').order('segment_tier'),
        supabase
          .from('dh_signals')
          .select('*, competitor:dh_competitors(id, name, segment_tier)')
          .order('detected_at', { ascending: false })
          .limit(100),
      ])
      if (compRes.data) setCompetitors(compRes.data as Competitor[])
      if (sigRes.data) setSignals(sigRes.data as Signal[])
      setLoading(false)
    }
    load()
  }, [])

  const activeCompetitors = competitors.filter((c) =>
    (c.offerings_overlap as string[])?.includes(selectedOffering)
  )

  const relevantSignals = signals.filter((s) =>
    (s.offering_tags as string[])?.includes(selectedOffering)
  )

  const offering = offerings.find((o) => o.tag === selectedOffering)!

  return (
    <div className="space-y-6">
      {/* Offering Tabs */}
      <div className="flex gap-2 flex-wrap">
        {offerings.map((o) => (
          <button
            key={o.tag}
            onClick={() => setSelectedOffering(o.tag)}
            className={`px-4 py-2 text-sm font-medium rounded-lg border transition-colors ${
              selectedOffering === o.tag
                ? 'bg-decimal-navy text-white border-decimal-navy'
                : 'bg-white text-gray-600 border-gray-200 hover:border-decimal-navy/30'
            }`}
          >
            {o.tag}
          </button>
        ))}
      </div>

      {/* Offering Description */}
      <div className="bg-decimal-teal/5 border border-decimal-teal/20 rounded-xl p-5">
        <div className="flex items-start gap-3">
          <offering.icon className="w-5 h-5 text-decimal-teal mt-0.5" />
          <div>
            <h2 className="font-semibold text-decimal-navy">{selectedOffering}</h2>
            <p className="text-sm text-gray-600 mt-1">{offering.description}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Competitors */}
        <div className="lg:col-span-2 space-y-4">
          <h3 className="text-sm font-semibold text-decimal-navy">
            Active Competitors ({activeCompetitors.length})
          </h3>

          {loading ? (
            <div className="p-8 text-center text-gray-400">Loading...</div>
          ) : activeCompetitors.length === 0 ? (
            <div className="bg-white rounded-xl border border-gray-200 p-8 text-center">
              <p className="text-sm text-gray-400">
                No competitors mapped to this offering yet.
              </p>
            </div>
          ) : (
            activeCompetitors.map((comp) => {
              const compSignals = relevantSignals.filter(
                (s) => s.competitor_id === comp.id
              )
              const isExpanded = expandedCard === comp.id
              return (
                <div
                  key={comp.id}
                  className="bg-white rounded-xl border border-gray-200 overflow-hidden"
                >
                  <button
                    onClick={() => setExpandedCard(isExpanded ? null : comp.id)}
                    className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-decimal-navy/5 flex items-center justify-center">
                        <span className="text-xs font-bold text-decimal-navy">
                          T{comp.segment_tier}
                        </span>
                      </div>
                      <div className="text-left">
                        <p className="font-semibold text-sm text-decimal-navy">{comp.name}</p>
                        <p className="text-xs text-gray-400">
                          {compSignals.length} signals in this offering
                        </p>
                      </div>
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-4 h-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-gray-400" />
                    )}
                  </button>

                  {isExpanded && (
                    <div className="px-4 pb-4 border-t border-gray-100">
                      <p className="text-xs text-gray-500 mt-3">{comp.description}</p>
                      {compSignals.length > 0 && (
                        <div className="mt-3 space-y-2">
                          <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
                            Recent Activity
                          </p>
                          {compSignals.slice(0, 5).map((sig) => (
                            <div
                              key={sig.id}
                              className="text-xs text-gray-600 p-2 bg-gray-50 rounded"
                            >
                              <span className="font-medium">
                                {sig.signal_type.replace(/_/g, ' ')}
                              </span>
                              : {sig.processed_summary}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>

        {/* Decimal Differentiators */}
        <div className="space-y-4">
          <h3 className="text-sm font-semibold text-decimal-navy">
            Decimal Differentiators
          </h3>
          <div className="space-y-3">
            {differentiators.map((d) => (
              <div key={d.title} className="bg-white rounded-xl border border-gray-200 p-4">
                <h4 className="text-sm font-semibold text-decimal-teal">{d.title}</h4>
                <p className="text-xs text-gray-600 mt-1">{d.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
