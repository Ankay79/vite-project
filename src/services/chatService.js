const API_BASE = '/api'

const API = {
  getMessages: `${API_BASE}/messages`,
  postMessage: `${API_BASE}/messages`,
  clearMessages: `${API_BASE}/messages`,
}

export async function fetchMessages() {
  const res = await fetch(API.getMessages)
  if (!res.ok) throw new Error('Failed to fetch messages')
  return res.json()
}

export async function sendMessage({ author, text }) {
  const res = await fetch(API.postMessage, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ author, text }),
  })
  if (!res.ok) throw new Error('Failed to send message')
  return res.json()
}

export async function clearMessages() {
  const res = await fetch(API.clearMessages, { method: 'DELETE' })
  if (!res.ok) throw new Error('Failed to clear messages')
  return res.json()
}
