const mongoose = require('mongoose')

const newsSchema = new mongoose.Schema({
  title: { type: String, required: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, enum: ['Race Report', 'Technical', 'Team News', 'Engineering', 'Other'], required: true },
  author: { type: String, required: true },
  excerpt: { type: String, required: true },
  content: { type: String, required: true },
  imageUrl: { type: String },
  publishedAt: { type: Date, default: Date.now },
  featured: { type: Boolean, default: false },
  tags: [{ type: String }],
}, { timestamps: true })

newsSchema.index({ publishedAt: -1 })
newsSchema.index({ category: 1 })

module.exports = mongoose.model('News', newsSchema)
