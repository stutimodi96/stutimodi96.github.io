import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/terra/webhook
 *
 * Owned by: Data & Infrastructure — Person C & D
 *
 * Receives health data pushed by Terra from a fitness tracker (e.g. Apple Health, Garmin) and stores it in Neon.
 *
 * Terra sends different event types in the payload. We care about:
 *   - "activity"   → maps to workouts table
 *   - "daily"      → maps to tracker_snapshots (HRV, sleep, steps, resting HR)
 *   - "sleep"      → sleep detail (hours, stages, score)
 *
 * Terra payload shape (simplified):
 *   {
 *     type: "activity" | "daily" | "sleep" | ...
 *     user: { user_id: string }
 *     data: [ { ... } ]
 *   }
 *
 * TODO (Person C & D):
 * 1. Verify Terra webhook secret (Terra sends X-Terra-Signature header)
 *    See: https://docs.tryterra.co/docs/webhooks
 * 2. Parse payload based on type
 * 3. For type === "activity":
 *    - Map each activity to a workouts row
 *    - Upsert using terra_id to avoid duplicates on re-delivery
 * 4. For type === "daily" or "sleep":
 *    - Upsert into tracker_snapshots by date
 * 5. Use @neondatabase/serverless for DB writes:
 *    import { neon } from '@neondatabase/serverless'
 *    const sql = neon(process.env.DATABASE_URL!)
 *
 * Neon env var: DATABASE_URL
 * Terra env var: TERRA_API_KEY, TERRA_DEV_ID
 *
 * Field mappings (Terra → our schema):
 *   activity.workout_type_data.name    → workouts.workout_type
 *   activity.active_durations_data.activity_seconds / 60 → workouts.duration_mins
 *   activity.distance_data.distance_meters / 1000         → workouts.distance_km
 *   activity.calories_data.net_activity_calories           → workouts.calories_active
 *   activity.heart_rate_data.summary.avg_hr_bpm            → workouts.avg_hr
 *   activity.heart_rate_data.summary.max_hr_bpm            → workouts.max_hr
 *   activity.metadata.start_time                           → workouts.started_at
 *   activity.metadata.end_time                             → workouts.ended_at
 *
 *   daily.heart_rate_data.summary.resting_hr_bpm           → tracker_snapshots.resting_hr
 *   daily.hrv_data.summary.rmssd_ms                        → tracker_snapshots.hrv_ms
 *   daily.steps_data.steps                                 → tracker_snapshots.steps
 *   sleep.sleep_durations_data.asleep.duration_asleep_state_seconds / 3600 → sleep_hours
 *   sleep.sleep_durations_data.sleep_efficiency             → sleep_score
 */
export async function POST(req: NextRequest) {
  const payload = await req.json()

  // STUB — log and acknowledge
  console.log('[Terra webhook STUB] type:', payload?.type)

  return NextResponse.json({ ok: true, received: true })
}

/**
 * GET /api/terra/webhook
 * Terra may send a GET verification request on setup.
 */
export async function GET() {
  return NextResponse.json({ ok: true })
}
