const express = require('express')
const Driver = require('../models/Driver')
const router = express.Router()

// GET all drivers
router.get('/', async (req, res, next) => {
  try {
    const drivers = await Driver.find({ active: true }).sort({ number: 1 })
    res.json({ success: true, count: drivers.length, data: drivers })
  } catch (err) { next(err) }
})

// GET driver by number
router.get('/:number', async (req, res, next) => {
  try {
    const driver = await Driver.findOne({ number: req.params.number })
    if (!driver) return res.status(404).json({ success: false, error: 'Driver not found' })
    res.json({ success: true, data: driver })
  } catch (err) { next(err) }
})

module.exports = router
