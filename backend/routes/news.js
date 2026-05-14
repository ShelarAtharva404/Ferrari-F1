const express = require('express')
const News = require('../models/News')
const router = express.Router()

// GET all news (with optional category filter & pagination)
router.get('/', async (req, res, next) => {
  try {
    const { category, page = 1, limit = 9 } = req.query
    const filter = {}
    if (category && category !== 'All') filter.category = category

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const [articles, total] = await Promise.all([
      News.find(filter).sort({ publishedAt: -1 }).skip(skip).limit(parseInt(limit)),
      News.countDocuments(filter),
    ])

    res.json({
      success: true,
      data: articles,
      pagination: { page: parseInt(page), limit: parseInt(limit), total, pages: Math.ceil(total / parseInt(limit)) },
    })
  } catch (err) { next(err) }
})

// GET single article by slug
router.get('/:slug', async (req, res, next) => {
  try {
    const article = await News.findOne({ slug: req.params.slug })
    if (!article) return res.status(404).json({ success: false, error: 'Article not found' })
    res.json({ success: true, data: article })
  } catch (err) { next(err) }
})

module.exports = router
