'use client'

import { useState, useEffect, useCallback } from 'react'
import { supabase } from './supabase'
import type { Competitor, Signal, Briefing, Alert, SignalType, Urgency, OfferingTag } from '@/types/database'

// ---- Competitors ----
export function useCompetitors() {
  const [competitors, setCompetitors] = useState<Competitor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('dh_competitors')
      .select('*')
      .order('segment_tier', { ascending: true })
      .order('name', { ascending: true })
      .then(({ data, error }) => {
        if (!error && data) setCompetitors(data as Competitor[])
        setLoading(false)
      })
  }, [])

  return { competitors, loading }
}

export function useCompetitor(id: string) {
  const [competitor, setCompetitor] = useState<Competitor | null>(null)
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!id) return
    Promise.all([
      supabase.from('dh_competitors').select('*').eq('id', id).single(),
      supabase
        .from('dh_signals')
        .select('*')
        .eq('competitor_id', id)
        .order('detected_at', { ascending: false })
        .limit(50),
    ]).then(([compRes, sigRes]) => {
      if (compRes.data) setCompetitor(compRes.data as Competitor)
      if (sigRes.data) setSignals(sigRes.data as Signal[])
      setLoading(false)
    })
  }, [id])

  return { competitor, signals, loading }
}

// ---- Signals ----
export interface SignalFilters {
  competitor_id?: string
  signal_type?: SignalType
  urgency?: Urgency
  offering_tag?: OfferingTag
  days?: number
}

export function useSignals(filters: SignalFilters = {}) {
  const [signals, setSignals] = useState<Signal[]>([])
  const [loading, setLoading] = useState(true)

  const fetchSignals = useCallback(async () => {
    setLoading(true)
    let query = supabase
      .from('dh_signals')
      .select('*, competitor:dh_competitors(id, name, segment_tier, segment_label)')
      .order('detected_at', { ascending: false })
      .limit(200)

    if (filters.competitor_id) {
      query = query.eq('competitor_id', filters.competitor_id)
    }
    if (filters.signal_type) {
      query = query.eq('signal_type', filters.signal_type)
    }
    if (filters.urgency) {
      query = query.eq('urgency', filters.urgency)
    }
    if (filters.days) {
      const since = new Date()
      since.setDate(since.getDate() - filters.days)
      query = query.gte('detected_at', since.toISOString())
    }

    const { data, error } = await query
    if (!error && data) {
      let filtered = data as Signal[]
      if (filters.offering_tag) {
        filtered = filtered.filter((s) =>
          (s.offering_tags as string[]).includes(filters.offering_tag!)
        )
      }
      setSignals(filtered)
    }
    setLoading(false)
  }, [filters.competitor_id, filters.signal_type, filters.urgency, filters.offering_tag, filters.days])

  useEffect(() => {
    fetchSignals()
  }, [fetchSignals])

  return { signals, loading, refetch: fetchSignals }
}

// ---- Briefings ----
export function useBriefings() {
  const [briefings, setBriefings] = useState<Briefing[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('dh_briefings')
      .select('*')
      .order('generated_at', { ascending: false })
      .limit(12)
      .then(({ data, error }) => {
        if (!error && data) setBriefings(data as Briefing[])
        setLoading(false)
      })
  }, [])

  return { briefings, loading }
}

// ---- Alerts ----
export function useAlerts() {
  const [alerts, setAlerts] = useState<Alert[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase
      .from('dh_alerts')
      .select('*, signal:dh_signals(*, competitor:dh_competitors(id, name, segment_tier))')
      .order('delivered_at', { ascending: false })
      .limit(50)
      .then(({ data, error }) => {
        if (!error && data) setAlerts(data as Alert[])
        setLoading(false)
      })
  }, [])

  const acknowledge = async (alertId: string) => {
    const { error } = await supabase
      .from('dh_alerts')
      .update({ acknowledged_at: new Date().toISOString() })
      .eq('id', alertId)
    if (!error) {
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === alertId ? { ...a, acknowledged_at: new Date().toISOString() } : a
        )
      )
    }
  }

  return { alerts, loading, acknowledge }
}

// ---- Stats ----
export interface DashboardStats {
  totalCompetitors: number
  totalSignals: number
  criticalAlerts: number
  signalsThisWeek: number
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    totalCompetitors: 0,
    totalSignals: 0,
    criticalAlerts: 0,
    signalsThisWeek: 0,
  })
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const weekAgo = new Date()
    weekAgo.setDate(weekAgo.getDate() - 7)

    Promise.all([
      supabase.from('dh_competitors').select('id', { count: 'exact', head: true }),
      supabase.from('dh_signals').select('id', { count: 'exact', head: true }),
      supabase
        .from('dh_alerts')
        .select('id', { count: 'exact', head: true })
        .is('acknowledged_at', null),
      supabase
        .from('dh_signals')
        .select('id', { count: 'exact', head: true })
        .gte('detected_at', weekAgo.toISOString()),
    ]).then(([compRes, sigRes, alertRes, weekRes]) => {
      setStats({
        totalCompetitors: compRes.count ?? 0,
        totalSignals: sigRes.count ?? 0,
        criticalAlerts: alertRes.count ?? 0,
        signalsThisWeek: weekRes.count ?? 0,
      })
      setLoading(false)
    })
  }, [])

  return { stats, loading }
}
