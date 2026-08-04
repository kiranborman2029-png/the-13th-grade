export async function POST(request: Request) {
  const body = await request.json()
  const { name, email, type, message } = body

  if (!name || !email || !message) {
    return Response.json({ error: 'Name, email, and message are required.' }, { status: 400 })
  }

  // Placeholder: log to console. Wire to email service (SendGrid, Resend, etc.) later.
  console.log('[Contact Form Submission]', { name, email, type, message, timestamp: new Date().toISOString() })

  return Response.json({ success: true, message: 'Message received.' })
}
