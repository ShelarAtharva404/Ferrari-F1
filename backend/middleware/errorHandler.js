const errorHandler = (err, req, res, next) => {
  console.error('❌ Error:', err.message)

  if (err.name === 'ValidationError') {
    const errors = Object.values(err.errors).map((e) => e.message)
    return res.status(400).json({ success: false, error: 'Validation error', details: errors })
  }

  if (err.code === 11000) {
    return res.status(409).json({ success: false, error: 'Duplicate entry — resource already exists' })
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ success: false, error: 'Invalid ID format' })
  }

  res.status(err.status || 500).json({
    success: false,
    error: process.env.NODE_ENV === 'production' ? 'Internal server error' : err.message,
  })
}

module.exports = errorHandler
