import { EntryType } from './types'

export function formatTime(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleTimeString('en-US', {
    hour: 'numeric',
    minute: '2-digit',
    hour12: true,
  })
}

export function formatDate(isoString: string): string {
  const date = new Date(isoString)
  return date.toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  })
}

export function pctDelta(current: number, average: number): number {
  return Math.round(((current - average) / average) * 100)
}

export function isAnomaly(current: number, average: number, threshold = 10): boolean {
  return Math.abs(pctDelta(current, average)) >= threshold
}

export function entryTypeLabel(type: EntryType): string {
  const labels: Record<EntryType, string> = {
    food: 'Food',
    drink: 'Drink',
    supplement: 'Supplement',
    symptom: 'Symptom',
    mood: 'Mood',
    energy: 'Energy',
    workout: 'Workout',
  }
  return labels[type]
}

export function entryTypeColor(type: EntryType): string {
  const colors: Record<EntryType, string> = {
    food: 'bg-green-100 text-green-700',
    drink: 'bg-blue-100 text-blue-700',
    supplement: 'bg-purple-100 text-purple-700',
    symptom: 'bg-red-100 text-red-700',
    mood: 'bg-yellow-100 text-yellow-700',
    energy: 'bg-orange-100 text-orange-700',
    workout: 'bg-teal-100 text-teal-700',
  }
  return colors[type]
}
