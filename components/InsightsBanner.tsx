'use client'

import { useState } from 'react'
import { Insight } from '@/lib/types'
import { AlertTriangle, ChevronDown, ChevronUp } from 'lucide-react'

interface InsightsBannerProps {
  insights: Insight[]
}

export default function InsightsBanner({ insights }: InsightsBannerProps) {
  const [expanded, setExpanded] = useState(false)
  const warnings = insights.filter((i) => i.type === 'warning')

  if (warnings.length === 0) return null

  return (
    <div className="rounded-xl border border-amber-200 bg-amber-50 overflow-hidden">
      <button
        onClick={() => setExpanded(!expanded)}
        className="w-full flex items-center gap-3 px-4 py-3 text-left"
      >
        <AlertTriangle size={16} className="text-amber-600 shrink-0" />
        <span className="text-sm font-semibold text-amber-800 flex-1">
          {warnings.length} active {warnings.length === 1 ? 'warning' : 'warnings'}
        </span>
        {expanded ? (
          <ChevronUp size={16} className="text-amber-500" />
        ) : (
          <ChevronDown size={16} className="text-amber-500" />
        )}
      </button>

      {expanded && (
        <div className="border-t border-amber-200 divide-y divide-amber-100">
          {warnings.map((insight, i) => (
            <div key={i} className="px-4 py-3 flex gap-3">
              <AlertTriangle size={14} className="text-amber-500 mt-0.5 shrink-0" />
              <p className="text-sm text-amber-900 leading-relaxed">{insight.text}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
