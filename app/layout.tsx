import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Project Trace',
  description: 'Triangulate your health data. Surface real insights.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-[#f8f9fa] antialiased">
        <div className="max-w-md mx-auto min-h-screen bg-white shadow-sm relative">
          {children}
        </div>
      </body>
    </html>
  )
}
