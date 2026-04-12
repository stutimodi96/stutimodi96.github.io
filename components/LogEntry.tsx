'use client'

import { useState } from 'react'
import { JournalEntry } from '@/lib/types'
import { formatTime, entryTypeLabel, entryTypeColor } from '@/lib/utils'
import { Check, X, Pencil } from 'lucide-react'

interface LogEntryProps {
  entry: JournalEntry
  onConfirm?: (id: string) => void
  onDismiss?: (id: string) => void
}

export default function LogEntryCard({ entry, onConfirm, onDismiss }: LogEntryProps) {
  const [editing, setEditing] = useState(false)
  const [editValue, setEditValue] = useState(entry.description)
  const isPending = entry.status === 'pending'

  function handleConfirm() {
    onConfirm?.(entry.id)
  }

  function handleDismiss() {
    onDismiss?.(entry.id)
  }

  function handleEditConfirm() {
    setEditing(false)
    onConfirm?.(entry.id)
  }

  return (
    <div
      className={`rounded-xl border p-3 transition-colors ${
        isPending
          ? 'bg-amber-50 border-amber-200'
          : 'bg-white border-gray-100'
      }`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xs text-gray-400 tabular-nums mt-0.5 w-14 shrink-0">
          {formatTime(entry.logged_at)}
        </span>

        <div className="flex-1 min-w-0">
          {editing ? (
            <input
              autoFocus
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full text-sm border border-amber-300 rounded-lg px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-amber-400"
            />
          ) : (
            <p className={`text-sm font-medium leading-snug ${isPending ? 'text-amber-900' : 'text-gray-900'}`}>
              {entry.description}
              {entry.quantity && (
                <span className="font-normal text-gray-500"> · {entry.quantity}</span>
              )}
            </p>
          )}

          <div className="flex items-center gap-1.5 mt-1">
            <span className={`text-[10px] font-medium px-1.5 py-0.5 rounded-full ${entryTypeColor(entry.entry_type)}`}>
              {entryTypeLabel(entry.entry_type)}
            </span>
            {isPending && (
              <span className="text-[10px] font-medium px-1.5 py-0.5 rounded-full bg-amber-100 text-amber-700">
                Tentative
              </span>
            )}
            {entry.source === 'habit' && !isPending && (
              <span className="text-[10px] text-gray-400">from habit</span>
            )}
          </div>
        </div>

        {isPending && !editing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setEditing(true)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
              title="Edit"
            >
              <Pencil size={13} />
            </button>
            <button
              onClick={handleDismiss}
              className="p-1.5 rounded-lg text-red-300 hover:text-red-500 hover:bg-red-50 transition-colors"
              title="Dismiss"
            >
              <X size={13} />
            </button>
            <button
              onClick={handleConfirm}
              className="p-1.5 rounded-lg text-green-500 hover:text-green-700 hover:bg-green-50 transition-colors"
              title="Accept"
            >
              <Check size={13} />
            </button>
          </div>
        )}

        {editing && (
          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={() => setEditing(false)}
              className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
            >
              <X size={13} />
            </button>
            <button
              onClick={handleEditConfirm}
              className="p-1.5 rounded-lg text-green-500 hover:text-green-700 hover:bg-green-50 transition-colors"
            >
              <Check size={13} />
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
