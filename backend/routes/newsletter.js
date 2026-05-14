const express = require('express')
const Newsletter = require('../models/Newsletter')
const router = express.Router()

// POST subscribe
router.post('/subscribe', async (req, res, next) => {
  try {
    const { email } = req.body
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, error: 'Valid email address required' })
    }

    const existing = await Newsletter.findOne({ email })
    if (existing) {
      return res.status(409).json({ success: false, error: 'Email already subscribed' })
    }

    const subscriber = await Newsletter.create({ email })
    res.status(201).json({ success: true, message: 'Successfully subscribed to Ferrari F1 updates!', data: { email: subscriber.email } })
  } catch (err) { next(err) }
})

// POST unsubscribe
router.post('/unsubscribe', async (req, res, next) => {
  try {
    const { email } = req.body
    await Newsletter.findOneAndUpdate({ email }, { active: false })
    res.json({ success: true, message: 'Unsubscribed successfully' })
  } catch (err) { next(err) }
})

module.exports = router
