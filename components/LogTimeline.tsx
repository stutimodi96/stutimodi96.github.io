'use client'

import { useState } from 'react'
import { JournalEntry } from '@/lib/types'
import LogEntryCard from './LogEntry'

interface LogTimelineProps {
  initialEntries: JournalEntry[]
}

export default function LogTimeline({ initialEntries }: LogTimelineProps) {
  const [entries, setEntries] = useState(initialEntries)

  function confirmEntry(id: string) {
    setEntries((prev) =>
      prev.map((e) => (e.id === id ? { ...e, status: 'confirmed' as const } : e))
    )
  }

  function dismissEntry(id: string) {
    setEntries((prev) => prev.filter((e) => e.id !== id))
  }

  // Sort newest first
  const sorted = [...entries].sort(
    (a, b) => new Date(b.logged_at).getTime() - new Date(a.logged_at).getTime()
  )

  if (sorted.length === 0) {
    return (
      <div className="text-center py-10 text-gray-400 text-sm">
        No entries yet today. Tap the mic to log something.
      </div>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {sorted.map((entry) => (
        <LogEntryCard
          key={entry.id}
          entry={entry}
          onConfirm={confirmEntry}
          onDismiss={dismissEntry}
        />
      ))}
    </div>
  )
}
