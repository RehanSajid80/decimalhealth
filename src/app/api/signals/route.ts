import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const competitor_id = searchParams.get('competitor_id')
  const signal_type = searchParams.get('signal_type')
  const urgency = searchParams.get('urgency')
  const days = searchParams.get('days')
  const limit = Number(searchParams.get('limit') || 100)

  let query = supabase
    .from('dh_signals')
    .select('*, competitor:dh_competitors(id, name, segment_tier, segment_label)')
    .order('detected_at', { ascending: false })
    .limit(limit)

  if (competitor_id) query = query.eq('competitor_id', competitor_id)
  if (signal_type) query = query.eq('signal_type', signal_type)
  if (urgency) query = query.eq('urgency', urgency)
  if (days) {
    const since = new Date()
    since.setDate(since.getDate() - Number(days))
    query = query.gte('detected_at', since.toISOString())
  }

  const { data, error } = await query
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data)
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { data, error } = await supabase.from('dh_signals').insert(body).select()
  if (error) return NextResponse.json({ error: error.message }, { status: 500 })
  return NextResponse.json(data[0], { status: 201 })
}
