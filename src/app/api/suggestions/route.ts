// Placeholder: in-memory store. Replace with a database later.
const suggestions: { id: string; career: string; votes: number }[] = []

export async function GET() {
  return Response.json({ suggestions })
}

export async function POST(request: Request) {
  const body = await request.json()
  const { career } = body

  if (!career || typeof career !== 'string') {
    return Response.json({ error: 'Career name is required.' }, { status: 400 })
  }

  const suggestion = {
    id: Date.now().toString(),
    career: career.trim(),
    votes: 1,
  }
  suggestions.push(suggestion)

  console.log('[Career Suggestion]', suggestion)

  return Response.json({ success: true, suggestion })
}

export async function PATCH(request: Request) {
  const body = await request.json()
  const { id } = body

  const suggestion = suggestions.find((s) => s.id === id)
  if (!suggestion) {
    return Response.json({ error: 'Suggestion not found.' }, { status: 404 })
  }

  suggestion.votes += 1

  return Response.json({ success: true, suggestion })
}
