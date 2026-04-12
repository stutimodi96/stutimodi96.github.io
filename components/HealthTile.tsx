'use client'

import { isAnomaly, pctDelta } from '@/lib/utils'
import { TrendingDown, TrendingUp, Minus } from 'lucide-react'

interface HealthTileProps {
  label: string
  value: string | number
  unit?: string
  average?: number
  averageLabel?: string
  rawValue?: number
  higherIsBetter?: boolean // default true; false for HR (lower is better)
}

export default function HealthTile({
  label,
  value,
  unit,
  average,
  averageLabel,
  rawValue,
  higherIsBetter = true,
}: HealthTileProps) {
  const numericValue = rawValue ?? (typeof value === 'number' ? value : parseFloat(String(value)))
  const delta = average != null ? pctDelta(numericValue, average) : null
  const anomaly = average != null ? isAnomaly(numericValue, average) : false

  // bad = anomaly in the wrong direction
  const isBad = anomaly && (higherIsBetter ? delta! < 0 : delta! > 0)

  const TrendIcon = delta == null
    ? null
    : delta > 2
    ? TrendingUp
    : delta < -2
    ? TrendingDown
    : Minus

  return (
    <div
      className={`rounded-xl p-4 flex flex-col gap-1 border transition-colors ${
        isBad
          ? 'bg-amber-50 border-amber-200'
          : 'bg-white border-gray-100'
      }`}
    >
      <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">{label}</span>
      <div className="flex items-end gap-1">
        <span className={`text-2xl font-bold tabular-nums ${isBad ? 'text-amber-700' : 'text-gray-900'}`}>
          {value}
        </span>
        {unit && <span className="text-sm text-gray-400 mb-0.5">{unit}</span>}
      </div>
      {delta != null && TrendIcon && (
        <div className={`flex items-center gap-1 text-xs ${isBad ? 'text-amber-600' : 'text-gray-400'}`}>
          <TrendIcon size={12} />
          <span>
            {Math.abs(delta)}% {delta > 0 ? 'above' : 'below'} {averageLabel ?? 'avg'}
          </span>
        </div>
      )}
    </div>
  )
}
