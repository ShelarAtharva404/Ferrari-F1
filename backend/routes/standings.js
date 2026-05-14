const express = require('express')
const router = express.Router()

// Static standings data
const standings = {
  2025: {
    drivers: [
      { pos: 1, driver: 'Lewis Hamilton', team: 'Ferrari', points: 100, wins: 2 },
      { pos: 2, driver: 'Charles Leclerc', team: 'Ferrari', points: 89, wins: 1 },
      { pos: 3, driver: 'Max Verstappen', team: 'Red Bull', points: 88, wins: 2 },
    ],
    constructors: [
      { pos: 1, team: 'Scuderia Ferrari', points: 189, wins: 3 },
      { pos: 2, team: 'Red Bull Racing', points: 176, wins: 2 },
      { pos: 3, team: 'Mercedes-AMG', points: 154, wins: 1 },
    ],
  },
}

router.get('/', (req, res) => {
  const season = parseInt(req.query.season) || 2025
  const type = req.query.type || 'both'
  const data = standings[season] || standings[2025]

  if (type === 'drivers') return res.json({ success: true, type: 'drivers', data: data.drivers })
  if (type === 'constructors') return res.json({ success: true, type: 'constructors', data: data.constructors })
  res.json({ success: true, data })
})

module.exports = router
