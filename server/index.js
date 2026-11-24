const express = require('express')

const app = express()
const PORT = 3001

// In-memory storage for messages
const messages = []

app.use(express.json())

// Получить все сообщения
app.get('/api/messages', (req, res) => {
  res.json(messages)
})

// Отправить сообщение
app.post('/api/messages', (req, res) => {
  const { author, text } = req.body

  if (!author || !text) {
    return res.status(400).json({ error: 'author and text are required' })
  }

  const message = {
    id: Date.now() + Math.random(),
    author: author.trim(),
    text: text.trim(),
    timestamp: Date.now(),
  }

  messages.push(message)
  res.status(201).json(message)
})

// Очистить чат
app.delete('/api/messages', (req, res) => {
  messages.length = 0
  res.json({ ok: true })
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`)
})
