const express = require('express')
const RaceResult = require('../models/RaceResult')
const router = express.Router()

// GET all results for a season
router.get('/', async (req, res, next) => {
  try {
    const season = parseInt(req.query.season) || new Date().getFullYear()
    const results = await RaceResult.find({ season }).sort({ round: -1 })
    res.json({ success: true, count: results.length, data: results })
  } catch (err) { next(err) }
})

// GET single race result
router.get('/:season/:round', async (req, res, next) => {
  try {
    const result = await RaceResult.findOne({ season: req.params.season, round: req.params.round })
    if (!result) return res.status(404).json({ success: false, error: 'Race result not found' })
    res.json({ success: true, data: result })
  } catch (err) { next(err) }
})

module.exports = router
