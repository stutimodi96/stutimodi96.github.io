'use client'

import { Workout } from '@/lib/types'
import { formatTime } from '@/lib/utils'
import { Flame, Timer, MapPin, Heart } from 'lucide-react'

interface WorkoutCardProps {
  workout: Workout | null
}

const WORKOUT_ICONS: Record<string, string> = {
  Running: '🏃',
  Cycling: '🚴',
  'Strength Training': '🏋️',
  Swimming: '🏊',
  HIIT: '⚡',
  Yoga: '🧘',
  Walking: '🚶',
}

export default function WorkoutCard({ workout }: WorkoutCardProps) {
  if (!workout) {
    return (
      <div className="rounded-xl p-4 border border-dashed border-gray-200 bg-gray-50 flex items-center gap-3">
        <span className="text-2xl opacity-30">🏃</span>
        <div>
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">Workout</p>
          <p className="text-sm text-gray-400">No workout logged today</p>
        </div>
      </div>
    )
  }

  const icon = WORKOUT_ICONS[workout.workout_type] ?? '💪'

  return (
    <div className="rounded-xl p-4 border border-gray-100 bg-white">
      <div className="flex items-center gap-2 mb-3">
        <span className="text-lg">{icon}</span>
        <div>
          <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">Workout</p>
          <p className="font-semibold text-gray-900">{workout.workout_type}</p>
        </div>
        <span className="ml-auto text-xs text-gray-400">{formatTime(workout.started_at)}</span>
      </div>
      <div className="grid grid-cols-4 gap-2">
        <Stat icon={<Timer size={12} />} value={`${workout.duration_mins}m`} label="Duration" />
        {workout.distance_km != null && (
          <Stat icon={<MapPin size={12} />} value={`${workout.distance_km}km`} label="Distance" />
        )}
        {workout.avg_hr != null && (
          <Stat icon={<Heart size={12} />} value={`${workout.avg_hr}`} label="Avg HR" />
        )}
        {workout.calories_active != null && (
          <Stat icon={<Flame size={12} />} value={`${workout.calories_active}`} label="kcal" />
        )}
      </div>
    </div>
  )
}

function Stat({ icon, value, label }: { icon: React.ReactNode; value: string; label: string }) {
  return (
    <div className="flex flex-col items-center gap-0.5">
      <div className="flex items-center gap-0.5 text-gray-400">{icon}</div>
      <span className="text-sm font-bold text-gray-900 tabular-nums">{value}</span>
      <span className="text-[10px] text-gray-400">{label}</span>
    </div>
  )
}
