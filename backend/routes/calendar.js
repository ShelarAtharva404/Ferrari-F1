const express = require('express')
const router = express.Router()

// Static calendar data (could be moved to DB in production)
const calendar2025 = [
  { round: 1, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', country: 'Bahrain', date: '2025-03-02', status: 'completed' },
  { round: 2, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', country: 'Saudi Arabia', date: '2025-03-09', status: 'completed' },
  { round: 3, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', country: 'Australia', date: '2025-03-23', status: 'completed' },
  { round: 4, name: 'Japanese Grand Prix', circuit: 'Suzuka', country: 'Japan', date: '2025-04-06', status: 'completed' },
  { round: 5, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: 'China', date: '2025-04-20', status: 'completed' },
  { round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: 'USA', date: '2025-05-04', status: 'completed' },
  { round: 7, name: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Enzo e Dino Ferrari', country: 'Italy', date: '2025-05-18', status: 'upcoming' },
  { round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: 'Monaco', date: '2025-05-25', status: 'upcoming' },
]

router.get('/', (req, res) => {
  const season = parseInt(req.query.season) || 2025
  if (season === 2025) {
    return res.json({ success: true, season: 2025, count: calendar2025.length, data: calendar2025 })
  }
  res.json({ success: true, season, count: 0, data: [] })
})

module.exports = router
