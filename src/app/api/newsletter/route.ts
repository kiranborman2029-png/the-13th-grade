export async function POST(request: Request) {
  const body = await request.json()
  const { email } = body

  if (!email || typeof email !== 'string') {
    return Response.json({ error: 'Valid email is required.' }, { status: 400 })
  }

  // Placeholder: log to console. Wire to Mailchimp, ConvertKit, etc. later.
  console.log('[Newsletter Signup]', { email, timestamp: new Date().toISOString() })

  return Response.json({ success: true, message: 'Subscribed.' })
}
