import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@/lib/db'

/**
 * POST /api/workout/save
 *
 * Persists a Claude-generated workout plan to planned_workouts.
 * Body: { workout, scheduled_date }
 *   scheduled_date: ISO date string e.g. "2026-04-12" (today) or "2026-04-13" (tomorrow)
 */
export async function POST(req: NextRequest) {
  const { workout, scheduled_date } = await req.json()

  if (!workout) {
    return NextResponse.json({ error: 'No workout provided' }, { status: 400 })
  }

  await sql`
    INSERT INTO planned_workouts (
      workout_type, duration_mins, muscles, intensity_zone,
      equipment, plan_text, plan_json, status, scheduled_date, generated_at
    ) VALUES (
      ${workout.workout_type},
      ${workout.duration_mins},
      ${workout.muscles ?? null},
      ${workout.intensity_zone ?? null},
      ${workout.equipment ?? null},
      ${workout.plan_text},
      ${JSON.stringify(workout.plan_json)},
      'planned',
      ${scheduled_date ?? null},
      NOW()
    )
  `

  return NextResponse.json({ ok: true })
}
