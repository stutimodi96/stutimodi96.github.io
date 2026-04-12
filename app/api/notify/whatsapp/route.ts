import { NextRequest, NextResponse } from 'next/server'

/**
 * POST /api/notify/whatsapp
 *
 * Owned by: Insights & Delivery — Person B
 *
 * Formats a DailySummary into the agreed WhatsApp message format and sends
 * it via Twilio's WhatsApp sandbox.
 *
 * Request body:
 *   { summary: DailySummary, phone?: string }
 *   phone defaults to process.env.DEMO_PHONE_NUMBER if not provided
 *
 * WhatsApp message format (per spec §7.5):
 *   🟢 What worked well
 *   • {what_worked}
 *
 *   🟡 What was average
 *   • {what_was_average}
 *
 *   ⚠️ Watch out          ← omit entirely if warnings is empty
 *   • {warning 1}
 *   • {warning 2}
 *
 * TODO (Person B):
 * 1. npm install twilio
 * 2. import twilio from 'twilio'
 *    const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN)
 * 3. Format the message string from the DailySummary
 * 4. client.messages.create({
 *      from: 'whatsapp:' + process.env.TWILIO_WHATSAPP_FROM,  // sandbox: whatsapp:+14155238886
 *      to:   'whatsapp:' + phone,
 *      body: formattedMessage,
 *    })
 *
 * Required env vars:
 *   TWILIO_ACCOUNT_SID
 *   TWILIO_AUTH_TOKEN
 *   TWILIO_WHATSAPP_FROM   (sandbox number, e.g. +14155238886)
 *   DEMO_PHONE_NUMBER      (recipient, e.g. +919876543210)
 */
export async function POST(req: NextRequest) {
  const { summary, phone } = await req.json()

  if (!summary) {
    return NextResponse.json({ error: 'summary is required' }, { status: 400 })
  }

  const recipient = phone ?? process.env.DEMO_PHONE_NUMBER

  // Build message string
  const lines: string[] = [
    '🟢 *What worked well*',
    `• ${summary.what_worked}`,
    '',
    '🟡 *What was average*',
    `• ${summary.what_was_average}`,
  ]

  if (summary.warnings?.length > 0) {
    lines.push('', '⚠️ *Watch out*')
    for (const w of summary.warnings) {
      lines.push(`• ${w}`)
    }
  }

  const message = lines.join('\n')

  // STUB — replace with real Twilio call
  console.log('[WhatsApp STUB] Would send to', recipient)
  console.log(message)

  return NextResponse.json({
    ok: true,
    stub: true,
    recipient,
    message,
  })
}
