import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/log/parse
 *
 * Owned by: Voice & Parsing — Person A
 *
 * Takes a transcript from ElevenLabs STT and uses Claude to parse it into
 * structured journal entries. Also detects habit declarations.
 *
 * Request body:
 *   { transcript: string }
 *
 * Response:
 *   { entries: JournalEntry[], habits_detected: Habit[] }
 *
 * TODO (Person A):
 * 1. Call Claude claude-sonnet-4-6 with the transcript + system prompt that instructs it to:
 *    - Extract entry_type, description, quantity, logged_at from natural language
 *    - Detect habit declarations ("I drink coffee every morning around 9am") and return them separately
 *    - Return structured JSON
 * 2. Write returned entries to Neon (journal_entries table)
 * 3. If habits_detected is non-empty, upsert into habits table
 * 4. Return the new entries to the client so they appear in the timeline
 *
 * Claude prompt skeleton:
 *   System: You are a health logging assistant. Parse the user's voice transcript into
 *           structured journal entries. Return JSON: { entries: [...], habits_detected: [...] }
 *           Entry fields: entry_type (food|drink|supplement|symptom|mood|energy|workout),
 *           description, quantity (optional), logged_at (ISO8601, infer from context or use now).
 *           Habit fields: description, entry_type, usual_time (HH:MM).
 *
 * Anthropic SDK:
 *   import Anthropic from '@anthropic-ai/sdk'
 *   const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })
 *   const msg = await client.messages.create({ model: 'claude-sonnet-4-6', max_tokens: 1024, messages: [...] })
 */
export async function POST(req: NextRequest) {
  const { transcript } = await req.json()

  if (!transcript || typeof transcript !== 'string') {
    return NextResponse.json({ error: 'transcript is required' }, { status: 400 })
  }

  // STUB — replace with real Claude call
  const stubEntries = [
    {
      id: crypto.randomUUID(),
      entry_type: 'food',
      description: 'Parsed from: ' + transcript.slice(0, 40),
      logged_at: new Date().toISOString(),
      created_at: new Date().toISOString(),
      status: 'confirmed',
      source: 'voice',
    },
  ]

  return NextResponse.json({
    entries: stubEntries,
    habits_detected: [],
  })
}
