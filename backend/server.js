require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const helmet = require('helmet')
const morgan = require('morgan')
const rateLimit = require('express-rate-limit')

const driversRouter = require('./routes/drivers')
const newsRouter = require('./routes/news')
const resultsRouter = require('./routes/results')
const calendarRouter = require('./routes/calendar')
const standingsRouter = require('./routes/standings')
const storeRouter = require('./routes/store')
const newsletterRouter = require('./routes/newsletter')
const errorHandler = require('./middleware/errorHandler')

const app = express()
const PORT = process.env.PORT || 5000

// Security Middleware
app.use(helmet())

// CORS
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true,
}))

// Rate Limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 200,
  message: { error: 'Too many requests, please try again later.' },
})
app.use('/api', limiter)

// Logging
if (process.env.NODE_ENV !== 'test') {
  app.use(morgan('combined'))
}

// Body parsing
app.use(express.json({ limit: '10kb' }))
app.use(express.urlencoded({ extended: true }))

// Health Check
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    env: process.env.NODE_ENV || 'development',
  })
})

// API Routes
app.use('/api/drivers', driversRouter)
app.use('/api/news', newsRouter)
app.use('/api/results', resultsRouter)
app.use('/api/calendar', calendarRouter)
app.use('/api/standings', standingsRouter)
app.use('/api/store', storeRouter)
app.use('/api/newsletter', newsletterRouter)

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' })
})

// Error handler
app.use(errorHandler)

// MongoDB Connection
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('✅ Connected to MongoDB Atlas')
    app.listen(PORT, () => {
      console.log(`🏎️  Ferrari F1 API running on http://localhost:${PORT}`)
      console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  })
  .catch((err) => {
    console.error('❌ MongoDB connection failed:', err.message)
    process.exit(1)
  })

module.exports = app
