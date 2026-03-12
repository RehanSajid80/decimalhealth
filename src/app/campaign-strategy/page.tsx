'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  Target,
  Megaphone,
  FileText,
  Mail,
  BarChart3,
  Linkedin,
  Search,
  BookOpen,
  Podcast,
  Video,
  ArrowUpRight,
  CheckCircle2,
  AlertCircle,
  Clock,
  Zap,
  TrendingUp,
  Calendar,
  ChevronDown,
  ChevronRight,
  Lightbulb,
  Layers,
  ArrowRight,
} from 'lucide-react'
import { Navigation, Footer } from '@/components'

// ─── Types ────────────────────────────────────────────────────────────────────

interface Channel {
  name: string
  icon: React.ReactNode
  priority: 'high' | 'medium' | 'low'
  effort: string
  timeline: string
  description: string
  tactics: string[]
  kpis: string[]
  status: 'not-started' | 'in-progress' | 'live'
}

interface ContentPillar {
  title: string
  description: string
  formats: string[]
  frequency: string
  audience: string
}

interface FunnelStage {
  stage: string
  color: string
  goal: string
  tactics: string[]
  metrics: string[]
  width: string
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const websiteAuditFindings = {
  strengths: [
    'Strong positioning as physician-led consultancy',
    'Clear three-segment audience (Life Sciences, Investors, Health Tech)',
    'Interactive tools exist (Assessment, ROI Calculator)',
    'Compelling differentiators and social proof',
    'Calendly integration for meeting booking',
    'VIVE event landing page shows event marketing capability',
  ],
  gaps: [
    'No blog or content hub — zero organic search presence',
    'Newsletter form logs to console — no email service connected',
    'Assessment lead capture not connected to CRM',
    'No analytics or tracking pixels installed',
    'No UTM parameter capture on any page',
    'No retargeting infrastructure (LinkedIn Insight, Meta Pixel)',
    'No gated content or downloadable lead magnets',
    'ROI Calculator captures zero contact info',
    'No SEO beyond basic meta tags — no content strategy',
    'Events section is static — no registration flow',
  ],
  opportunities: [
    'Assessment tool is a high-value lead magnet ready for distribution',
    'ROI Calculator can be gated behind email capture',
    'Three distinct audience segments enable targeted campaigns',
    'Physician-led positioning is unique and ownable in content',
    'Existing Calendly flow is a strong bottom-of-funnel closer',
  ],
}

const channels: Channel[] = [
  {
    name: 'LinkedIn Organic + Ads',
    icon: <Linkedin className="w-5 h-5" />,
    priority: 'high',
    effort: 'Medium',
    timeline: 'Week 1-2',
    description:
      'Primary channel for reaching healthcare decision-makers. 80% of B2B healthcare leads come from LinkedIn.',
    tactics: [
      'Founder thought leadership posts (3x/week)',
      'Company page content calendar',
      'LinkedIn Articles from clinical team',
      'Sponsored Content campaigns targeting VP+ at health systems',
      'Lead Gen Forms driving to Assessment tool',
      'Retargeting website visitors with case study ads',
    ],
    kpis: [
      'Impressions & engagement rate',
      'Lead Gen Form submissions',
      'Cost per lead (CPL)',
      'Website clicks from LinkedIn',
    ],
    status: 'not-started',
  },
  {
    name: 'Content Marketing / SEO',
    icon: <BookOpen className="w-5 h-5" />,
    priority: 'high',
    effort: 'High',
    timeline: 'Week 2-4',
    description:
      'Build organic search presence around digital health transformation, regulatory strategy, and market adoption topics.',
    tactics: [
      'Launch /insights blog section on website',
      'Publish 2 long-form articles per week',
      'Target keywords: "digital health consulting", "FDA digital therapeutics", "health system innovation"',
      'Create pillar pages for each service area',
      'Internal linking to Assessment and ROI tools',
      'Guest posts on Health Affairs, STAT News, Fierce Healthcare',
    ],
    kpis: [
      'Organic traffic growth',
      'Keyword rankings (target top 10)',
      'Time on page',
      'Blog-to-lead conversion rate',
    ],
    status: 'not-started',
  },
  {
    name: 'Email Nurture Sequences',
    icon: <Mail className="w-5 h-5" />,
    priority: 'high',
    effort: 'Medium',
    timeline: 'Week 2-3',
    description:
      'Convert captured leads into meetings through targeted drip campaigns segmented by audience type.',
    tactics: [
      'Connect newsletter form to ESP (HubSpot / ConvertKit)',
      'Build 3 nurture sequences (Life Sciences, Investors, Health Tech)',
      'Welcome sequence (5 emails over 14 days)',
      'Assessment follow-up sequence based on results',
      'Monthly newsletter with insights + events',
      'Re-engagement campaign for cold leads',
    ],
    kpis: [
      'Open rate (target 35%+)',
      'Click-through rate (target 5%+)',
      'Email-to-meeting conversion rate',
      'List growth rate',
    ],
    status: 'not-started',
  },
  {
    name: 'Google Search Ads',
    icon: <Search className="w-5 h-5" />,
    priority: 'medium',
    effort: 'Medium',
    timeline: 'Week 3-4',
    description:
      'Capture high-intent searchers looking for digital health consulting and advisory services.',
    tactics: [
      'Brand campaigns for "Decimal Health"',
      'Non-brand campaigns: "digital health consultant", "healthcare innovation advisory"',
      'Landing pages per ad group with lead capture',
      'Remarketing campaigns for site visitors',
      'Competitor conquest campaigns',
    ],
    kpis: [
      'Cost per click (CPC)',
      'Conversion rate',
      'Cost per qualified lead',
      'Return on ad spend (ROAS)',
    ],
    status: 'not-started',
  },
  {
    name: 'Webinars & Virtual Events',
    icon: <Video className="w-5 h-5" />,
    priority: 'medium',
    effort: 'High',
    timeline: 'Week 4-6',
    description:
      'Position Decimal leadership as thought leaders while generating high-quality leads through registration.',
    tactics: [
      'Monthly webinar series: "Digital Health Decoded"',
      'Co-hosted events with health system partners',
      'Post-event recordings as gated content',
      'LinkedIn Live sessions for quick insights',
      'Conference speaking submissions (HIMSS, VIVE, ViVE, Health 2.0)',
    ],
    kpis: [
      'Registration rate',
      'Attendance rate (target 40%+)',
      'Post-webinar meeting requests',
      'Content repurposing reach',
    ],
    status: 'not-started',
  },
  {
    name: 'Podcast & Media',
    icon: <Podcast className="w-5 h-5" />,
    priority: 'low',
    effort: 'Low-Medium',
    timeline: 'Week 6+',
    description:
      'Amplify brand awareness through earned media and podcast guest appearances.',
    tactics: [
      'Guest appearances on digital health podcasts',
      'Launch Decimal Health podcast (Phase 2)',
      'Press releases for major partnerships / milestones',
      'Byline articles in industry publications',
      'Quote sourcing for journalist requests (HARO)',
    ],
    kpis: [
      'Podcast appearances per month',
      'Referral traffic from media',
      'Brand mention volume',
      'Domain authority growth',
    ],
    status: 'not-started',
  },
]

const contentPillars: ContentPillar[] = [
  {
    title: 'Digital Health Strategy',
    description:
      'Thought leadership on building and scaling digital health programs within health systems and life sciences.',
    formats: ['Blog posts', 'LinkedIn articles', 'Webinars', 'White papers'],
    frequency: '2x per week',
    audience: 'Health System CIOs, VP Innovation',
  },
  {
    title: 'Regulatory & Market Access',
    description:
      'Guidance on FDA pathways, clinical evidence generation, and payer strategy for digital health products.',
    formats: ['Case studies', 'Guides', 'Webinars', 'Podcast episodes'],
    frequency: '1x per week',
    audience: 'Life Sciences leaders, Regulatory teams',
  },
  {
    title: 'Innovation-to-Adoption',
    description:
      'Real-world insights on moving from pilot to scale — the hardest problem in health tech.',
    formats: ['Blog posts', 'Data reports', 'Infographics', 'Social clips'],
    frequency: '2x per week',
    audience: 'Health Tech founders, Investors',
  },
  {
    title: 'Ecosystem Intelligence',
    description:
      'Market analysis, partnership models, and ecosystem trends across digital health.',
    formats: ['Monthly reports', 'Newsletter', 'LinkedIn posts'],
    frequency: '1x per week',
    audience: 'Investors, Corporate Development',
  },
]

const funnelStages: FunnelStage[] = [
  {
    stage: 'AWARENESS',
    color: 'bg-decimal-purple/20 border-decimal-purple',
    goal: 'Get Decimal Health on the radar of target decision-makers',
    tactics: [
      'LinkedIn thought leadership',
      'SEO content',
      'Podcast appearances',
      'Conference presence',
      'Industry reports',
    ],
    metrics: ['Website visitors', 'LinkedIn impressions', 'Brand searches', 'Content reach'],
    width: 'w-full',
  },
  {
    stage: 'INTEREST',
    color: 'bg-decimal-teal/20 border-decimal-teal',
    goal: 'Engage prospects with valuable, relevant content',
    tactics: [
      'Blog articles',
      'Webinar series',
      'Case studies',
      'Newsletter',
      'White papers',
    ],
    metrics: ['Email subscribers', 'Content downloads', 'Time on site', 'Return visitors'],
    width: 'w-[85%]',
  },
  {
    stage: 'CONSIDERATION',
    color: 'bg-decimal-gold/20 border-decimal-gold',
    goal: 'Help prospects self-qualify and see Decimal as the solution',
    tactics: [
      'Assessment tool',
      'ROI Calculator',
      'Comparison guides',
      'Client testimonials',
      'Detailed service pages',
    ],
    metrics: ['Assessment completions', 'ROI calculations', 'Service page views', 'Lead score'],
    width: 'w-[70%]',
  },
  {
    stage: 'CONVERSION',
    color: 'bg-decimal-coral/20 border-decimal-coral',
    goal: 'Turn qualified leads into booked meetings',
    tactics: [
      'Email nurture sequences',
      'Calendly booking',
      'Personalized outreach',
      'Free consultation offer',
      'Event follow-ups',
    ],
    metrics: ['Meetings booked', 'SQL rate', 'Email reply rate', 'Proposal requests'],
    width: 'w-[55%]',
  },
]

const techStack = [
  {
    category: 'Analytics & Tracking',
    tools: [
      { name: 'Google Analytics 4', purpose: 'Website traffic & behavior', priority: 'Critical' },
      { name: 'LinkedIn Insight Tag', purpose: 'Ad targeting & conversion tracking', priority: 'Critical' },
      { name: 'Google Tag Manager', purpose: 'Tag management & event tracking', priority: 'Critical' },
      { name: 'Hotjar or PostHog', purpose: 'Heatmaps, session recordings, user behavior', priority: 'High' },
    ],
  },
  {
    category: 'Email & CRM',
    tools: [
      { name: 'HubSpot (Free CRM + Marketing)', purpose: 'Contact management, email sequences, forms', priority: 'Critical' },
      { name: 'Calendly (existing)', purpose: 'Meeting scheduling', priority: 'Already live' },
    ],
  },
  {
    category: 'Content & SEO',
    tools: [
      { name: 'Next.js Blog Section', purpose: 'Blog/insights content hub (build on existing site)', priority: 'Critical' },
      { name: 'Ahrefs or SEMrush', purpose: 'Keyword research & rank tracking', priority: 'High' },
      { name: 'Canva / Figma', purpose: 'Social graphics & infographics', priority: 'Medium' },
    ],
  },
  {
    category: 'Advertising',
    tools: [
      { name: 'LinkedIn Campaign Manager', purpose: 'Sponsored content & lead gen forms', priority: 'Critical' },
      { name: 'Google Ads', purpose: 'Search campaigns for high-intent keywords', priority: 'High' },
    ],
  },
]

const thirtyDayPlan = [
  {
    week: 'Week 1: Foundation',
    color: 'border-decimal-purple',
    tasks: [
      { task: 'Install GA4 + Google Tag Manager on website', owner: 'Dev', status: 'todo' },
      { task: 'Install LinkedIn Insight Tag', owner: 'Dev', status: 'todo' },
      { task: 'Set up HubSpot Free CRM account', owner: 'Marketing', status: 'todo' },
      { task: 'Connect newsletter form to HubSpot', owner: 'Dev', status: 'todo' },
      { task: 'Connect Assessment lead capture to HubSpot', owner: 'Dev', status: 'todo' },
      { task: 'Add UTM parameter capture to all landing pages', owner: 'Dev', status: 'todo' },
      { task: 'Set up LinkedIn Company page content calendar', owner: 'Marketing', status: 'todo' },
      { task: 'Create 3 audience segments in HubSpot (Life Sci, Investors, Health Tech)', owner: 'Marketing', status: 'todo' },
    ],
  },
  {
    week: 'Week 2: Content Engine',
    color: 'border-decimal-teal',
    tasks: [
      { task: 'Build /insights blog section on website', owner: 'Dev', status: 'todo' },
      { task: 'Write + publish 3 pillar articles (1 per audience segment)', owner: 'Content', status: 'todo' },
      { task: 'Create downloadable lead magnet: "Digital Health Readiness Guide"', owner: 'Content', status: 'todo' },
      { task: 'Build gated content landing page template', owner: 'Dev', status: 'todo' },
      { task: 'Set up welcome email sequence in HubSpot (5 emails)', owner: 'Marketing', status: 'todo' },
      { task: 'Begin founder LinkedIn posting cadence (3x/week)', owner: 'Leadership', status: 'todo' },
      { task: 'Add email gate to ROI Calculator results', owner: 'Dev', status: 'todo' },
    ],
  },
  {
    week: 'Week 3: Amplification',
    color: 'border-decimal-gold',
    tasks: [
      { task: 'Launch LinkedIn Sponsored Content campaign (Assessment tool)', owner: 'Marketing', status: 'todo' },
      { task: 'Set up LinkedIn Lead Gen Forms connected to HubSpot', owner: 'Marketing', status: 'todo' },
      { task: 'Launch Google Ads brand campaign', owner: 'Marketing', status: 'todo' },
      { task: 'Publish 2 more blog articles', owner: 'Content', status: 'todo' },
      { task: 'Create retargeting audience from website visitors', owner: 'Marketing', status: 'todo' },
      { task: 'Submit guest post pitches to 3 industry publications', owner: 'Content', status: 'todo' },
      { task: 'Set up assessment follow-up email sequence by persona', owner: 'Marketing', status: 'todo' },
    ],
  },
  {
    week: 'Week 4: Optimize & Scale',
    color: 'border-decimal-coral',
    tasks: [
      { task: 'Review GA4 data — identify top-performing pages and drop-offs', owner: 'Marketing', status: 'todo' },
      { task: 'A/B test LinkedIn ad creatives (2 variants)', owner: 'Marketing', status: 'todo' },
      { task: 'Launch first webinar registration page', owner: 'Dev + Marketing', status: 'todo' },
      { task: 'Publish weekly insights newsletter (first edition)', owner: 'Content', status: 'todo' },
      { task: 'Review lead quality + meeting conversion rates', owner: 'Sales', status: 'todo' },
      { task: 'Plan Month 2 content calendar', owner: 'Marketing', status: 'todo' },
      { task: 'Set up monthly KPI dashboard in HubSpot', owner: 'Marketing', status: 'todo' },
    ],
  },
]

// ─── Subcomponents ────────────────────────────────────────────────────────────

function PriorityBadge({ priority }: { priority: string }) {
  const colors = {
    high: 'bg-decimal-coral/10 text-decimal-coral border-decimal-coral/30',
    medium: 'bg-decimal-gold/10 text-decimal-gold border-decimal-gold/30',
    low: 'bg-decimal-teal/10 text-decimal-teal border-decimal-teal/30',
    Critical: 'bg-decimal-coral/10 text-decimal-coral border-decimal-coral/30',
    High: 'bg-decimal-gold/10 text-decimal-gold border-decimal-gold/30',
    Medium: 'bg-decimal-teal/10 text-decimal-teal border-decimal-teal/30',
    'Already live': 'bg-green-50 text-green-600 border-green-200',
  }
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 text-xs font-semibold rounded-full border ${
        colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-600'
      }`}
    >
      {priority}
    </span>
  )
}

function StatusDot({ status }: { status: string }) {
  const colors = {
    'not-started': 'bg-gray-300',
    'in-progress': 'bg-decimal-gold',
    live: 'bg-green-500',
    todo: 'bg-gray-300',
  }
  const labels = {
    'not-started': 'Not Started',
    'in-progress': 'In Progress',
    live: 'Live',
    todo: 'To Do',
  }
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-decimal-navy/60">
      <span className={`w-2 h-2 rounded-full ${colors[status as keyof typeof colors]}`} />
      {labels[status as keyof typeof labels]}
    </span>
  )
}

// ─── Main Page ────────────────────────────────────────────────────────────────

export default function CampaignStrategyPage() {
  const [expandedChannel, setExpandedChannel] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState<'overview' | 'channels' | 'content' | 'tech' | 'plan'>('overview')

  const tabs = [
    { id: 'overview' as const, label: 'Executive Overview', icon: <Target className="w-4 h-4" /> },
    { id: 'channels' as const, label: 'Channel Strategy', icon: <Megaphone className="w-4 h-4" /> },
    { id: 'content' as const, label: 'Content Playbook', icon: <FileText className="w-4 h-4" /> },
    { id: 'tech' as const, label: 'Tech Stack', icon: <Layers className="w-4 h-4" /> },
    { id: 'plan' as const, label: '30-Day Plan', icon: <Calendar className="w-4 h-4" /> },
  ]

  return (
    <>
      <Navigation />
      <main className="pt-24 bg-decimal-cream min-h-screen">
        {/* ── Hero ────────────────────────────────────────────────────── */}
        <section className="bg-decimal-navy text-white py-16 md:py-20">
          <div className="container-lg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-flex items-center gap-2 px-3 py-1 bg-decimal-coral/20 text-decimal-coral rounded-full text-sm font-semibold">
                  <Zap className="w-3.5 h-3.5" /> Internal Strategy
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                Top-of-Funnel{' '}
                <span className="text-decimal-teal">Campaign Strategy</span>
              </h1>
              <p className="text-xl text-white/70 max-w-2xl mb-8">
                A comprehensive plan to generate awareness, capture leads, and fill the
                pipeline for Decimal Health — built from a full audit of decimal.health.
              </p>
              <div className="flex flex-wrap gap-6 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-decimal-teal" />
                  <span className="text-white/60">30-day launch plan</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="w-4 h-4 text-decimal-coral" />
                  <span className="text-white/60">3 audience segments</span>
                </div>
                <div className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-decimal-gold" />
                  <span className="text-white/60">6 channels mapped</span>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* ── Tab Navigation ─────────────────────────────────────────── */}
        <div className="sticky top-[72px] z-40 bg-white border-b border-decimal-cream-dark shadow-sm">
          <div className="container-lg">
            <div className="flex overflow-x-auto gap-1 py-2 -mx-2 px-2 scrollbar-hide">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-medium whitespace-nowrap transition-all ${
                    activeTab === tab.id
                      ? 'bg-decimal-navy text-white'
                      : 'text-decimal-navy/60 hover:bg-decimal-cream hover:text-decimal-navy'
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Tab Content ────────────────────────────────────────────── */}
        <div className="container-lg py-12 md:py-16">
          {/* ═══ OVERVIEW TAB ═══ */}
          {activeTab === 'overview' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              {/* Website Audit */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  Website Audit: decimal.health
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Full analysis of current website capabilities, gaps, and opportunities for
                  top-of-funnel lead generation.
                </p>

                <div className="grid md:grid-cols-3 gap-6">
                  {/* Strengths */}
                  <div className="bg-white rounded-2xl p-6 border border-green-100">
                    <div className="flex items-center gap-2 mb-4">
                      <CheckCircle2 className="w-5 h-5 text-green-500" />
                      <h3 className="font-bold text-decimal-navy">Strengths</h3>
                    </div>
                    <ul className="space-y-3">
                      {websiteAuditFindings.strengths.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-decimal-navy/70">
                          <span className="text-green-400 mt-0.5 shrink-0">+</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Gaps */}
                  <div className="bg-white rounded-2xl p-6 border border-red-100">
                    <div className="flex items-center gap-2 mb-4">
                      <AlertCircle className="w-5 h-5 text-decimal-coral" />
                      <h3 className="font-bold text-decimal-navy">Critical Gaps</h3>
                    </div>
                    <ul className="space-y-3">
                      {websiteAuditFindings.gaps.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-decimal-navy/70">
                          <span className="text-decimal-coral mt-0.5 shrink-0">&times;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Opportunities */}
                  <div className="bg-white rounded-2xl p-6 border border-decimal-gold/30">
                    <div className="flex items-center gap-2 mb-4">
                      <Lightbulb className="w-5 h-5 text-decimal-gold" />
                      <h3 className="font-bold text-decimal-navy">Opportunities</h3>
                    </div>
                    <ul className="space-y-3">
                      {websiteAuditFindings.opportunities.map((item, i) => (
                        <li key={i} className="flex gap-2 text-sm text-decimal-navy/70">
                          <span className="text-decimal-gold mt-0.5 shrink-0">&#9733;</span>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Funnel Visualization */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  The Funnel Framework
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Every tactic maps to a stage. Top-of-funnel is about Awareness and Interest — getting the right people to know Decimal exists and engage with your content.
                </p>

                <div className="space-y-4">
                  {funnelStages.map((stage, i) => (
                    <motion.div
                      key={stage.stage}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: i * 0.1 }}
                      className={`${stage.width} mx-auto`}
                    >
                      <div
                        className={`${stage.color} border-l-4 rounded-xl p-5 md:p-6`}
                      >
                        <div className="flex flex-col md:flex-row md:items-start gap-4">
                          <div className="md:w-1/4">
                            <span className="text-xs font-bold tracking-widest text-decimal-navy/40">
                              STAGE {i + 1}
                            </span>
                            <h3 className="text-lg font-bold text-decimal-navy">
                              {stage.stage}
                            </h3>
                            <p className="text-sm text-decimal-navy/60 mt-1">{stage.goal}</p>
                          </div>
                          <div className="md:w-[38%]">
                            <p className="text-xs font-semibold text-decimal-navy/50 mb-2 uppercase tracking-wider">
                              Key Tactics
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.tactics.map((t) => (
                                <span
                                  key={t}
                                  className="inline-block px-2.5 py-1 bg-white/60 rounded-lg text-xs text-decimal-navy/70"
                                >
                                  {t}
                                </span>
                              ))}
                            </div>
                          </div>
                          <div className="md:w-[38%]">
                            <p className="text-xs font-semibold text-decimal-navy/50 mb-2 uppercase tracking-wider">
                              Metrics
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                              {stage.metrics.map((m) => (
                                <span
                                  key={m}
                                  className="inline-flex items-center gap-1 px-2.5 py-1 bg-white/60 rounded-lg text-xs text-decimal-navy/70"
                                >
                                  <BarChart3 className="w-3 h-3" />
                                  {m}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  { label: 'Channels', value: '6', sub: 'Mapped & prioritized' },
                  { label: 'Content Pillars', value: '4', sub: 'Weekly cadence' },
                  { label: 'Tech Tools', value: '9', sub: 'To implement' },
                  { label: 'Week 1 Tasks', value: '8', sub: 'Foundation sprint' },
                ].map((stat) => (
                  <div key={stat.label} className="bg-white rounded-2xl p-5 text-center">
                    <p className="text-3xl font-bold text-decimal-purple">{stat.value}</p>
                    <p className="text-sm font-semibold text-decimal-navy mt-1">{stat.label}</p>
                    <p className="text-xs text-decimal-navy/50 mt-0.5">{stat.sub}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ CHANNELS TAB ═══ */}
          {activeTab === 'channels' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  Channel Strategy
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Six channels prioritized by impact and effort. Start with High priority
                  channels in weeks 1-2, then layer in Medium and Low over time.
                </p>
              </div>

              <div className="space-y-4">
                {channels.map((channel, i) => (
                  <motion.div
                    key={channel.name}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                    className="bg-white rounded-2xl border border-decimal-cream-dark overflow-hidden"
                  >
                    <button
                      onClick={() =>
                        setExpandedChannel(
                          expandedChannel === channel.name ? null : channel.name
                        )
                      }
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-decimal-cream/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-xl bg-decimal-navy/5 flex items-center justify-center text-decimal-navy">
                          {channel.icon}
                        </div>
                        <div>
                          <h3 className="font-bold text-decimal-navy">{channel.name}</h3>
                          <p className="text-sm text-decimal-navy/50">{channel.description.slice(0, 80)}...</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <PriorityBadge priority={channel.priority} />
                        <StatusDot status={channel.status} />
                        <ChevronDown
                          className={`w-5 h-5 text-decimal-navy/40 transition-transform ${
                            expandedChannel === channel.name ? 'rotate-180' : ''
                          }`}
                        />
                      </div>
                    </button>

                    {expandedChannel === channel.name && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        transition={{ duration: 0.2 }}
                        className="border-t border-decimal-cream-dark"
                      >
                        <div className="px-6 py-5 grid md:grid-cols-2 gap-6">
                          <div>
                            <p className="text-sm text-decimal-navy/70 mb-4">
                              {channel.description}
                            </p>
                            <div className="flex gap-4 mb-4 text-xs">
                              <span className="text-decimal-navy/50">
                                <strong className="text-decimal-navy">Effort:</strong> {channel.effort}
                              </span>
                              <span className="text-decimal-navy/50">
                                <strong className="text-decimal-navy">Timeline:</strong> {channel.timeline}
                              </span>
                            </div>
                            <h4 className="text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider mb-2">
                              Tactics
                            </h4>
                            <ul className="space-y-2">
                              {channel.tactics.map((tactic) => (
                                <li
                                  key={tactic}
                                  className="flex items-start gap-2 text-sm text-decimal-navy/70"
                                >
                                  <ChevronRight className="w-3.5 h-3.5 text-decimal-teal mt-0.5 shrink-0" />
                                  {tactic}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h4 className="text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider mb-2">
                              KPIs to Track
                            </h4>
                            <ul className="space-y-2">
                              {channel.kpis.map((kpi) => (
                                <li
                                  key={kpi}
                                  className="flex items-center gap-2 text-sm text-decimal-navy/70"
                                >
                                  <BarChart3 className="w-3.5 h-3.5 text-decimal-purple shrink-0" />
                                  {kpi}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* ═══ CONTENT TAB ═══ */}
          {activeTab === 'content' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-12"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  Content Playbook
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Four content pillars that align to Decimal&apos;s expertise and audience needs.
                  Every piece of content should map to one of these pillars.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {contentPillars.map((pillar, i) => (
                  <motion.div
                    key={pillar.title}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.1 }}
                    className="bg-white rounded-2xl p-6 border border-decimal-cream-dark"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-bold text-decimal-navy">{pillar.title}</h3>
                      <span className="text-xs font-medium text-decimal-teal bg-decimal-teal/10 px-2.5 py-1 rounded-full">
                        {pillar.frequency}
                      </span>
                    </div>
                    <p className="text-sm text-decimal-navy/60 mb-4">{pillar.description}</p>
                    <div className="mb-3">
                      <p className="text-xs font-semibold text-decimal-navy/40 uppercase tracking-wider mb-1.5">
                        Target Audience
                      </p>
                      <p className="text-sm text-decimal-navy/70">{pillar.audience}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-decimal-navy/40 uppercase tracking-wider mb-1.5">
                        Formats
                      </p>
                      <div className="flex flex-wrap gap-1.5">
                        {pillar.formats.map((f) => (
                          <span
                            key={f}
                            className="px-2.5 py-1 bg-decimal-cream rounded-lg text-xs text-decimal-navy/70"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Content Calendar Framework */}
              <div className="bg-white rounded-2xl p-6 md:p-8 border border-decimal-cream-dark">
                <h3 className="text-xl font-bold text-decimal-navy mb-6">
                  Weekly Content Calendar Framework
                </h3>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-decimal-cream-dark">
                        <th className="text-left py-3 px-4 text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider">
                          Day
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider">
                          Content Type
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider">
                          Channel
                        </th>
                        <th className="text-left py-3 px-4 text-xs font-semibold text-decimal-navy/50 uppercase tracking-wider">
                          Pillar
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-decimal-cream">
                      {[
                        ['Monday', 'Blog article publish', 'Website + Newsletter', 'Rotating'],
                        ['Tuesday', 'Founder LinkedIn post', 'LinkedIn', 'Digital Health Strategy'],
                        ['Wednesday', 'Case study / Data insight', 'LinkedIn + Blog', 'Innovation-to-Adoption'],
                        ['Thursday', 'Founder LinkedIn post', 'LinkedIn', 'Regulatory & Market Access'],
                        ['Friday', 'Industry commentary / Hot take', 'LinkedIn', 'Ecosystem Intelligence'],
                      ].map(([day, type, channel, pillar]) => (
                        <tr key={day} className="hover:bg-decimal-cream/30">
                          <td className="py-3 px-4 font-medium text-decimal-navy">{day}</td>
                          <td className="py-3 px-4 text-decimal-navy/70">{type}</td>
                          <td className="py-3 px-4 text-decimal-navy/70">{channel}</td>
                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 bg-decimal-purple/10 text-decimal-purple rounded text-xs">
                              {pillar}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Lead Magnets */}
              <div>
                <h3 className="text-xl font-bold text-decimal-navy mb-6">
                  Lead Magnets to Create
                </h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {[
                    {
                      title: 'Digital Health Readiness Assessment',
                      type: 'Interactive Tool',
                      status: 'Exists — needs email gate + CRM connection',
                      priority: 'Critical',
                    },
                    {
                      title: 'ROI Calculator for Digital Health',
                      type: 'Interactive Tool',
                      status: 'Exists — needs email capture before results',
                      priority: 'Critical',
                    },
                    {
                      title: '2026 Digital Health Landscape Report',
                      type: 'PDF Download',
                      status: 'To create',
                      priority: 'High',
                    },
                    {
                      title: 'FDA Digital Health Pathway Guide',
                      type: 'PDF Download',
                      status: 'To create',
                      priority: 'High',
                    },
                    {
                      title: 'Health System Innovation Playbook',
                      type: 'PDF Download',
                      status: 'To create',
                      priority: 'Medium',
                    },
                    {
                      title: 'Investor Due Diligence Checklist',
                      type: 'PDF Download',
                      status: 'To create',
                      priority: 'Medium',
                    },
                  ].map((magnet) => (
                    <div
                      key={magnet.title}
                      className="bg-white rounded-xl p-5 border border-decimal-cream-dark"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <FileText className="w-5 h-5 text-decimal-purple" />
                        <PriorityBadge priority={magnet.priority} />
                      </div>
                      <h4 className="font-bold text-decimal-navy text-sm mb-1">
                        {magnet.title}
                      </h4>
                      <p className="text-xs text-decimal-navy/50 mb-2">{magnet.type}</p>
                      <p className="text-xs text-decimal-navy/60">{magnet.status}</p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ TECH STACK TAB ═══ */}
          {activeTab === 'tech' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  Marketing Tech Stack
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Tools and integrations needed to run the campaign engine. Prioritized by
                  what&apos;s critical for launch vs. nice-to-have.
                </p>
              </div>

              <div className="space-y-6">
                {techStack.map((category) => (
                  <div
                    key={category.category}
                    className="bg-white rounded-2xl p-6 border border-decimal-cream-dark"
                  >
                    <h3 className="text-lg font-bold text-decimal-navy mb-4">
                      {category.category}
                    </h3>
                    <div className="space-y-3">
                      {category.tools.map((tool) => (
                        <div
                          key={tool.name}
                          className="flex items-center justify-between py-3 border-b border-decimal-cream last:border-0"
                        >
                          <div>
                            <p className="font-semibold text-decimal-navy text-sm">
                              {tool.name}
                            </p>
                            <p className="text-xs text-decimal-navy/50">{tool.purpose}</p>
                          </div>
                          <PriorityBadge priority={tool.priority} />
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {/* Website Technical Changes */}
              <div className="bg-decimal-navy rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-6">
                  Website Code Changes Required
                </h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {[
                    {
                      title: 'Form Backend Integration',
                      description:
                        'Newsletter and Assessment forms currently log to console. Need API routes or client-side SDK to push to HubSpot.',
                      files: ['Newsletter.tsx', 'AssessmentResults.tsx', 'ROICalculator.tsx'],
                    },
                    {
                      title: 'Analytics Installation',
                      description:
                        'Add GA4 and GTM scripts to layout.tsx. Set up custom events for form submissions, CTA clicks, tool usage.',
                      files: ['layout.tsx'],
                    },
                    {
                      title: 'UTM Parameter Capture',
                      description:
                        'Read UTM params from URL on page load, store in sessionStorage, attach to all form submissions.',
                      files: ['layout.tsx', 'All form components'],
                    },
                    {
                      title: 'Blog / Insights Section',
                      description:
                        'New /insights route with MDX or CMS-powered blog. Category filtering, search, and related content.',
                      files: ['New: src/app/insights/'],
                    },
                    {
                      title: 'Landing Page Templates',
                      description:
                        'Reusable campaign landing page with hero, value props, lead capture form, and social proof.',
                      files: ['New: src/app/lp/[slug]/'],
                    },
                    {
                      title: 'Email Gate on Tools',
                      description:
                        'Add email capture step before showing ROI Calculator results. Connect to HubSpot with persona tagging.',
                      files: ['ROICalculator.tsx'],
                    },
                  ].map((change) => (
                    <div
                      key={change.title}
                      className="bg-white/5 rounded-xl p-5 border border-white/10"
                    >
                      <h4 className="font-bold text-white mb-2">{change.title}</h4>
                      <p className="text-sm text-white/60 mb-3">{change.description}</p>
                      <div className="flex flex-wrap gap-1.5">
                        {change.files.map((f) => (
                          <span
                            key={f}
                            className="px-2 py-0.5 bg-white/10 rounded text-xs text-white/70 font-mono"
                          >
                            {f}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══ 30-DAY PLAN TAB ═══ */}
          {activeTab === 'plan' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-decimal-navy mb-2">
                  30-Day Launch Plan
                </h2>
                <p className="text-decimal-navy/60 mb-8 max-w-2xl">
                  Week-by-week execution plan to go from zero to a fully operational
                  top-of-funnel campaign engine.
                </p>
              </div>

              <div className="space-y-6">
                {thirtyDayPlan.map((week, weekIdx) => (
                  <motion.div
                    key={week.week}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: weekIdx * 0.1 }}
                    className={`bg-white rounded-2xl overflow-hidden border-l-4 ${week.color}`}
                  >
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-bold text-decimal-navy">{week.week}</h3>
                        <span className="text-xs text-decimal-navy/40">
                          {week.tasks.length} tasks
                        </span>
                      </div>
                      <div className="space-y-3">
                        {week.tasks.map((item, taskIdx) => (
                          <div
                            key={taskIdx}
                            className="flex items-center justify-between py-2.5 border-b border-decimal-cream last:border-0"
                          >
                            <div className="flex items-center gap-3">
                              <div className="w-5 h-5 rounded border-2 border-decimal-cream-dark shrink-0" />
                              <span className="text-sm text-decimal-navy/80">
                                {item.task}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 shrink-0 ml-4">
                              <span className="text-xs px-2 py-0.5 bg-decimal-cream rounded-full text-decimal-navy/60">
                                {item.owner}
                              </span>
                              <StatusDot status={item.status} />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Success Metrics */}
              <div className="bg-decimal-navy rounded-2xl p-6 md:p-8 text-white">
                <h3 className="text-xl font-bold mb-6">30-Day Success Metrics</h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {[
                    { metric: 'Website Visitors', target: '2,000+', baseline: 'Unknown (no analytics)' },
                    { metric: 'Email Subscribers', target: '150+', baseline: '0 (form broken)' },
                    { metric: 'LinkedIn Impressions', target: '50,000+', baseline: 'Unknown' },
                    { metric: 'Meetings Booked', target: '10+', baseline: 'Calendly only' },
                  ].map((item) => (
                    <div
                      key={item.metric}
                      className="bg-white/5 rounded-xl p-4 border border-white/10"
                    >
                      <p className="text-2xl font-bold text-decimal-teal">{item.target}</p>
                      <p className="text-sm font-medium text-white mt-1">{item.metric}</p>
                      <p className="text-xs text-white/40 mt-1">
                        Current: {item.baseline}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </div>

        {/* ── Bottom CTA ─────────────────────────────────────────────── */}
        <section className="bg-decimal-navy py-12">
          <div className="container-lg text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">
              Ready to execute?
            </h2>
            <p className="text-white/60 mb-6 max-w-lg mx-auto">
              This strategy is ready for implementation. Start with Week 1 foundation tasks
              and build from there.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/"
                className="inline-flex items-center gap-2 px-6 py-3 bg-decimal-teal text-white rounded-full font-semibold hover:bg-decimal-teal/90 transition-colors"
              >
                Back to Main Site
                <ArrowUpRight className="w-4 h-4" />
              </Link>
              <Link
                href="/decimalhealth/tools"
                className="inline-flex items-center gap-2 px-6 py-3 bg-white/10 text-white rounded-full font-semibold hover:bg-white/20 transition-colors"
              >
                View Existing Tools
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
