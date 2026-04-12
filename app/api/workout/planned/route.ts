import { NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * GET /api/workout/planned
 *
 * Returns today's and tomorrow's planned workouts so the home screen
 * can show what's scheduled.
 */
export async function GET() {
  const rows = await sql`
    SELECT id, workout_type, duration_mins, muscles, intensity_zone,
           equipment, plan_text, status, scheduled_date
    FROM planned_workouts
    WHERE scheduled_date IN (CURRENT_DATE, CURRENT_DATE + INTERVAL '1 day')
      AND status = 'planned'
    ORDER BY scheduled_date ASC
  `
  return NextResponse.json(rows)
}
