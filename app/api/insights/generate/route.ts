import { NextRequest, NextResponse } from 'next/server'
import { dummySummary } from '@/lib/dummy-data'

/**
 * POST /api/insights/generate
 *
 * Owned by: Insights & Delivery — Person B
 *
 * Bundles all available health context and asks Claude to generate a
 * structured end-of-day summary with specific, actionable insights.
 *
 * Request body:
 *   {
 *     entries: JournalEntry[]          // last 30 days confirmed entries
 *     health_snapshots: TrackerSnapshot[] // last 14 days
 *     workouts: Workout[]              // last 14 days
 *     habits: Habit[]
 *     rolling_summary?: string         // compressed older history from health_summaries table
 *   }
 *
 * Response:
 *   DailySummary { what_worked, what_was_average, warnings[], generated_at }
 *
 * TODO (Person B):
 * 1. Read entries, snapshots, workouts, habits from Neon for the correct date ranges
 * 2. Fetch latest health_summaries row for rolling context
 * 3. Call Claude with the bundled context. Key prompt instructions:
 *    - ONLY surface insights that are specific and true for this user today
 *    - Do NOT give generic wellness advice
 *    - Return JSON: { what_worked: string, what_was_average: string, warnings: string[] }
 *    - warnings array may be empty — that is fine and preferred over filler
 *    - Claude also has access to a fetch_historical_data tool if it needs older records
 * 4. Save the result to a daily_summaries table (or similar)
 * 5. Return the DailySummary
 *
 * fetch_historical_data tool schema:
 *   name: "fetch_historical_data"
 *   description: "Fetch journal entries or health data for a specific date range"
 *   input_schema: {
 *     type: "object",
 *     properties: {
 *       data_type: { type: "string", enum: ["journal", "health", "workouts"] },
 *       start_date: { type: "string", description: "YYYY-MM-DD" },
 *       end_date: { type: "string", description: "YYYY-MM-DD" }
 *     },
 *     required: ["data_type", "start_date", "end_date"]
 *   }
 */
export async function POST(_req: NextRequest) {
  // STUB — replace with real Claude call + Neon reads
  await new Promise((r) => setTimeout(r, 500)) // simulate latency

  return NextResponse.json(dummySummary)
}
