'use client'

import { Timer, Dumbbell } from 'lucide-react'

interface PlannedWorkout {
  id: string
  workout_type: string
  duration_mins: number
  muscles: string[] | null
  intensity_zone: number | null
  equipment: string | null
  plan_text: string
  scheduled_date: string  // ISO date "YYYY-MM-DD"
}

interface PlannedWorkoutCardProps {
  workout: PlannedWorkout
}

export default function PlannedWorkoutCard({ workout }: PlannedWorkoutCardProps) {
  const isToday = workout.scheduled_date === new Date().toISOString().slice(0, 10)
  const label = isToday ? 'Planned for today' : 'Planned for tomorrow'
  const icon = workout.workout_type === 'running' ? '🏃' : '💪'

  return (
    <div className="rounded-xl p-4 border border-amber-200 bg-amber-50">
      <div className="flex items-center gap-2 mb-2">
        <span className="text-lg">{icon}</span>
        <div className="flex-1 min-w-0">
          <p className="text-[10px] font-semibold text-amber-600 uppercase tracking-wide">{label}</p>
          <p className="font-semibold text-gray-900 capitalize">{workout.workout_type}</p>
        </div>
        <div className="flex items-center gap-1 text-xs text-gray-500">
          <Timer size={11} />
          {workout.duration_mins}m
        </div>
      </div>

      {workout.muscles && workout.muscles.length > 0 && (
        <div className="flex items-center gap-1.5 mb-2">
          <Dumbbell size={11} className="text-gray-400 shrink-0" />
          <span className="text-xs text-gray-500">{workout.muscles.join(', ')}</span>
        </div>
      )}

      <p className="text-xs text-gray-600 leading-relaxed line-clamp-3">{workout.plan_text}</p>
    </div>
  )
}
