export type SignalType =
  | 'NEW_OFFERING'
  | 'CLIENT_WIN'
  | 'THOUGHT_LEADERSHIP'
  | 'TALENT_MOVE'
  | 'PARTNERSHIP'
  | 'ACQUISITION'
  | 'EVENT_PRESENCE'
  | 'PRICING_SIGNAL'
  | 'REGULATORY_COMMENT'
  | 'CAPABILITY_SHIFT'

export type Urgency = 'critical' | 'high' | 'medium' | 'low'

export type SegmentTier = 1 | 2 | 3 | 4 | 5

export type OfferingTag =
  | 'Rural Health'
  | 'Clinical Trial Acceleration'
  | 'US Market Entry'
  | 'Build Buyer Partner'
  | 'GTM / Product-Market Fit'
  | 'Startup Sprint'

export interface Competitor {
  id: string
  name: string
  segment_tier: SegmentTier
  segment_label: string
  website_url: string
  description: string
  offerings_overlap: OfferingTag[]
  last_crawled_at: string | null
  profile_summary: string | null
  logo_url: string | null
  created_at: string
}

export interface Signal {
  id: string
  competitor_id: string
  signal_type: SignalType
  source_url: string
  raw_content: string | null
  processed_summary: string
  offering_tags: OfferingTag[]
  urgency: Urgency
  strategic_assessment: string | null
  detected_at: string
  processed_at: string | null
  competitor?: Competitor
}

export interface Briefing {
  id: string
  period_start: string
  period_end: string
  briefing_content: BriefingContent
  key_themes: string[]
  recommended_actions: RecommendedAction[]
  generated_at: string
}

export interface BriefingContent {
  executive_summary: string
  key_movements: string[]
  offering_insights: Record<string, string>
  competitive_landscape: string
}

export interface RecommendedAction {
  action: string
  priority: Urgency
  related_offering: OfferingTag
  rationale: string
}

export interface CrawlHistory {
  id: string
  competitor_id: string
  source_type: string
  url: string
  content_hash: string | null
  last_crawled_at: string
  change_detected: boolean
}

export interface SearchQuery {
  id: string
  query_template: string
  category: string
  last_run_at: string | null
  results_count: number
}

export interface Alert {
  id: string
  signal_id: string
  alert_type: string
  delivered_at: string
  delivery_channel: string
  acknowledged_at: string | null
  signal?: Signal
}

export interface Database {
  public: {
    Tables: {
      dh_competitors: {
        Row: Competitor
        Insert: Omit<Competitor, 'id' | 'created_at'>
        Update: Partial<Omit<Competitor, 'id' | 'created_at'>>
      }
      dh_signals: {
        Row: Signal
        Insert: Omit<Signal, 'id'>
        Update: Partial<Omit<Signal, 'id'>>
      }
      dh_briefings: {
        Row: Briefing
        Insert: Omit<Briefing, 'id'>
        Update: Partial<Omit<Briefing, 'id'>>
      }
      dh_crawl_history: {
        Row: CrawlHistory
        Insert: Omit<CrawlHistory, 'id'>
        Update: Partial<Omit<CrawlHistory, 'id'>>
      }
      dh_search_queries: {
        Row: SearchQuery
        Insert: Omit<SearchQuery, 'id'>
        Update: Partial<Omit<SearchQuery, 'id'>>
      }
      dh_alerts: {
        Row: Alert
        Insert: Omit<Alert, 'id'>
        Update: Partial<Omit<Alert, 'id'>>
      }
    }
  }
}
