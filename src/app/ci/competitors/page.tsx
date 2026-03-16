'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  Building2,
  Globe,
  Clock,
  ChevronRight,
  Search,
} from 'lucide-react'
import { useCompetitors } from '@/lib/hooks'
import type { SegmentTier } from '@/types/database'

const tierLabels: Record<number, { label: string; color: string }> = {
  1: { label: 'Tier 1', color: 'bg-red-100 text-red-700' },
  2: { label: 'Tier 2', color: 'bg-orange-100 text-orange-700' },
  3: { label: 'Tier 3', color: 'bg-yellow-100 text-yellow-700' },
  4: { label: 'Tier 4', color: 'bg-blue-100 text-blue-700' },
  5: { label: 'Tier 5', color: 'bg-green-100 text-green-700' },
}

const tierDescriptions: Record<number, string> = {
  1: 'Healthcare Strategy Consultancies — Direct competitors in health system strategy',
  2: 'Global Strategy Firms — Compete at C-suite level on large transformation initiatives',
  3: 'Life Sciences & Specialty Advisory — Clinical trials, life sciences go-to-market',
  4: 'Big Four & Technology Consultancies — Digital transformation and technology implementation',
  5: 'Digital Health & Innovation Ecosystem — Startup advisory and ecosystem building',
}

export default function CompetitorsPage() {
  const { competitors, loading } = useCompetitors()
  const [search, setSearch] = useState('')
  const [tierFilter, setTierFilter] = useState<number | null>(null)

  const filtered = competitors.filter((c) => {
    if (tierFilter && c.segment_tier !== tierFilter) return false
    if (search && !c.name.toLowerCase().includes(search.toLowerCase())) return false
    return true
  })

  const grouped = filtered.reduce(
    (acc, c) => {
      const tier = c.segment_tier
      if (!acc[tier]) acc[tier] = []
      acc[tier].push(c)
      return acc
    },
    {} as Record<number, typeof filtered>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <p className="text-sm text-gray-500">
            Tracking {competitors.length} firms across 5 competitive segments
          </p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search competitors..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-3 py-2 text-sm border border-gray-200 rounded-lg bg-white w-56"
            />
          </div>
          <select
            value={tierFilter ?? ''}
            onChange={(e) => setTierFilter(e.target.value ? Number(e.target.value) : null)}
            className="px-3 py-2 text-sm border border-gray-200 rounded-lg bg-white"
          >
            <option value="">All Tiers</option>
            {[1, 2, 3, 4, 5].map((t) => (
              <option key={t} value={t}>
                Tier {t}
              </option>
            ))}
          </select>
        </div>
      </div>

      {loading ? (
        <div className="p-12 text-center text-gray-400">Loading competitors...</div>
      ) : (
        Object.entries(grouped)
          .sort(([a], [b]) => Number(a) - Number(b))
          .map(([tier, comps]) => (
            <div key={tier}>
              <div className="flex items-center gap-3 mb-3">
                <span
                  className={`text-xs font-semibold px-2.5 py-1 rounded-full ${tierLabels[Number(tier)]?.color}`}
                >
                  {tierLabels[Number(tier)]?.label}
                </span>
                <span className="text-sm text-gray-500">
                  {tierDescriptions[Number(tier)]?.split('—')[0]}
                </span>
                <span className="text-xs text-gray-400">({comps.length})</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3 mb-6">
                {comps.map((comp) => (
                  <Link
                    key={comp.id}
                    href={`/ci/competitors/${comp.id}`}
                    className="bg-white rounded-xl border border-gray-200 p-4 hover:border-decimal-teal/50 hover:shadow-sm transition-all group"
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-decimal-navy/5 flex items-center justify-center">
                          <Building2 className="w-5 h-5 text-decimal-navy/60" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-sm text-decimal-navy group-hover:text-decimal-teal transition-colors">
                            {comp.name}
                          </h3>
                          <p className="text-xs text-gray-400">{comp.segment_label}</p>
                        </div>
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-300 group-hover:text-decimal-teal transition-colors" />
                    </div>

                    <p className="text-xs text-gray-500 mt-3 line-clamp-2">
                      {comp.description}
                    </p>

                    <div className="flex items-center gap-3 mt-3 pt-3 border-t border-gray-100">
                      {comp.offerings_overlap?.length > 0 && (
                        <div className="flex gap-1 flex-wrap flex-1">
                          {(comp.offerings_overlap as string[]).slice(0, 2).map((tag) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 rounded bg-decimal-teal/10 text-decimal-teal"
                            >
                              {tag}
                            </span>
                          ))}
                          {(comp.offerings_overlap as string[]).length > 2 && (
                            <span className="text-[10px] text-gray-400">
                              +{(comp.offerings_overlap as string[]).length - 2}
                            </span>
                          )}
                        </div>
                      )}
                      {comp.last_crawled_at && (
                        <span className="text-[10px] text-gray-400 flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {new Date(comp.last_crawled_at).toLocaleDateString()}
                        </span>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))
      )}
    </div>
  )
}
