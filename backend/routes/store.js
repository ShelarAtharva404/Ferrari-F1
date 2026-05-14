const express = require('express')
const router = express.Router()

const products = [
  { id: 1, name: 'SF-25 Team Polo Shirt', category: 'Apparel', price: 89.99, rating: 4.8, reviews: 234, inStock: true },
  { id: 2, name: 'Leclerc 2025 Replica Helmet', category: 'Collectibles', price: 299.99, rating: 5.0, reviews: 89, inStock: true },
  { id: 3, name: 'Ferrari F1 Cap — Race Edition', category: 'Apparel', price: 49.99, rating: 4.7, reviews: 412, inStock: true },
  { id: 4, name: 'Hamilton #44 Race Jacket', category: 'Apparel', price: 199.99, rating: 4.9, reviews: 156, inStock: true },
  { id: 5, name: '1/18 Scale SF-25 Model Car', category: 'Collectibles', price: 149.99, rating: 4.9, reviews: 67, inStock: true },
  { id: 6, name: 'Ferrari F1 Backpack', category: 'Accessories', price: 79.99, rating: 4.5, reviews: 178, inStock: true },
]

router.get('/', (req, res) => {
  const { category } = req.query
  let data = products
  if (category && category !== 'All') {
    data = products.filter((p) => p.category === category)
  }
  res.json({ success: true, count: data.length, data })
})

router.get('/:id', (req, res) => {
  const product = products.find((p) => p.id === parseInt(req.params.id))
  if (!product) return res.status(404).json({ success: false, error: 'Product not found' })
  res.json({ success: true, data: product })
})

module.exports = router
