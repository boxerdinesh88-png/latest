import express from 'express'
import pg from 'pg'
import cors from 'cors'
import 'dotenv/config'
import path from 'path'
import { fileURLToPath } from 'url'

const { Pool } = pg

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const app = express()

app.use(cors())
app.use(express.json())

// PostgreSQL connection
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
})

let dbReady = false

async function initDB() {
  try {
    const client = await pool.connect()

    await client.query(`
      CREATE TABLE IF NOT EXISTS contacts (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        message TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `)

    client.release()
    dbReady = true

    console.log('✅ PostgreSQL Connected')
  } catch (err) {
    console.error('❌ Database Error:', err)
    dbReady = false
  }
}

initDB()

// Serve frontend build
const distPath = path.join(__dirname, '..', 'dist')
app.use(express.static(distPath))

// Health check
app.get('/api/health', async (_req, res) => {
  try {
    await pool.query('SELECT 1')

    res.json({
      status: 'ok',
      db: 'connected',
    })
  } catch (err) {
    res.json({
      status: 'error',
      db: 'disconnected',
      error: err.message,
    })
  }
})

// Contact API
app.post('/api/contact', async (req, res) => {
  try {
    if (!dbReady) {
      return res.status(503).json({
        error: 'Database not connected',
      })
    }

    const { name, email, message } = req.body

    const result = await pool.query(
      'INSERT INTO contacts (name, email, message) VALUES ($1, $2, $3) RETURNING id',
      [name, email, message]
    )

    res.json({
      success: true,
      id: result.rows[0].id,
    })
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Failed to save message',
    })
  }
})

// Messages API
app.get('/api/messages', async (_req, res) => {
  try {
    const result = await pool.query(
      'SELECT * FROM contacts ORDER BY created_at DESC'
    )

    res.json(result.rows)
  } catch (err) {
    console.error(err)

    res.status(500).json({
      error: 'Failed to fetch messages',
    })
  }
})

// React routes
app.get('/*', (_req, res) => {
  res.sendFile(path.join(distPath, 'index.html'))
})

// Start server
const PORT = process.env.PORT || 10000

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`)
})
