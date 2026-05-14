import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaShoppingCart, FaStar } from 'react-icons/fa'
import './Store.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const products = [
  { id: 1, name: 'SF-25 Team Polo Shirt', category: 'Apparel', price: 89.99, rating: 4.8, reviews: 234, badge: 'Bestseller', img: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { id: 2, name: 'Leclerc 2025 Replica Helmet', category: 'Collectibles', price: 299.99, rating: 5.0, reviews: 89, badge: 'Limited', img: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&q=80' },
  { id: 3, name: 'Ferrari F1 Cap — Race Edition', category: 'Apparel', price: 49.99, rating: 4.7, reviews: 412, badge: null, img: 'https://images.unsplash.com/photo-1534308143481-c55f00be8bd7?w=400&q=80' },
  { id: 4, name: 'Hamilton #44 Race Jacket', category: 'Apparel', price: 199.99, rating: 4.9, reviews: 156, badge: 'New', img: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  { id: 5, name: '1/18 Scale SF-25 Model Car', category: 'Collectibles', price: 149.99, rating: 4.9, reviews: 67, badge: 'New', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=400&q=80' },
  { id: 6, name: 'Ferrari F1 Backpack', category: 'Accessories', price: 79.99, rating: 4.5, reviews: 178, badge: null, img: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80' },
  { id: 7, name: 'Official Team T-Shirt 2025', category: 'Apparel', price: 59.99, rating: 4.6, reviews: 523, badge: null, img: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=400&q=80' },
  { id: 8, name: 'Ferrari Water Bottle', category: 'Accessories', price: 34.99, rating: 4.4, reviews: 289, badge: null, img: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?w=400&q=80' },
  { id: 9, name: 'Scuderia Ferrari Watch', category: 'Accessories', price: 599.99, rating: 4.9, reviews: 44, badge: 'Premium', img: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&q=80' },
  { id: 10, name: 'Leclerc Signed Print', category: 'Collectibles', price: 499.99, rating: 5.0, reviews: 23, badge: 'Limited', img: 'https://images.unsplash.com/photo-1611329695518-1763fc1d5a46?w=400&q=80' },
  { id: 11, name: 'Ferrari F1 Hoodie', category: 'Apparel', price: 119.99, rating: 4.7, reviews: 198, badge: null, img: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=400&q=80' },
  { id: 12, name: 'Team Umbrella', category: 'Accessories', price: 29.99, rating: 4.3, reviews: 134, badge: null, img: 'https://images.unsplash.com/photo-1529923759943-822f4c6ef77e?w=400&q=80' },
]

const categories = ['All', 'Apparel', 'Collectibles', 'Accessories']

function Stars({ rating }) {
  return (
    <div style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
      {[1, 2, 3, 4, 5].map((s) => (
        <FaStar key={s} style={{ color: s <= Math.round(rating) ? 'var(--ferrari-gold)' : 'var(--ferrari-border)', fontSize: '0.7rem' }} />
      ))}
      <span style={{ fontSize: '0.75rem', color: 'var(--ferrari-gray)', marginLeft: '4px' }}>{rating}</span>
    </div>
  )
}

export default function Store() {
  const [category, setCategory] = useState('All')
  const [cart, setCart] = useState([])
  const [added, setAdded] = useState(null)

  const filtered = products.filter((p) => category === 'All' || p.category === category)

  const addToCart = (product) => {
    setCart((prev) => [...prev, product])
    setAdded(product.id)
    setTimeout(() => setAdded(null), 1500)
  }

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>Store | Scuderia Ferrari F1</title></Helmet>

      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>Ferrari <span className="accent-red">Store</span></h1>
          <p>Wear the passion. Own a piece of history.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Cart Indicator */}
          {cart.length > 0 && (
            <div className="store-cart-bar">
              <FaShoppingCart />
              <span>{cart.length} item{cart.length > 1 ? 's' : ''} in your cart</span>
              <button className="btn btn-primary" style={{ marginLeft: 'auto', padding: '8px 20px', fontSize: '0.65rem' }}>
                Checkout (Placeholder)
              </button>
            </div>
          )}

          {/* Filters */}
          <div className="store-filters">
            {categories.map((c) => (
              <button
                key={c}
                className={`calendar-filter-btn ${category === c ? 'active' : ''}`}
                onClick={() => setCategory(c)}
              >
                {c}
              </button>
            ))}
          </div>

          {/* Grid */}
          <div className="store-grid">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                className="product-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <div className="product-card__img-wrap">
                  <img src={product.img} alt={product.name} className="product-card__img" />
                  {product.badge && (
                    <span className={`badge product-card__badge ${
                      product.badge === 'Limited' ? 'badge-gold' :
                      product.badge === 'Bestseller' ? 'badge-red' : 'badge-dark'
                    }`}>
                      {product.badge}
                    </span>
                  )}
                </div>
                <div className="product-card__body">
                  <span className="product-card__category">{product.category}</span>
                  <h3 className="product-card__name">{product.name}</h3>
                  <Stars rating={product.rating} />
                  <span style={{ fontSize: '0.75rem', color: 'var(--ferrari-gray-dark)', display: 'block', margin: '4px 0 12px' }}>
                    ({product.reviews} reviews)
                  </span>
                  <div className="product-card__footer">
                    <span className="product-card__price">€{product.price.toFixed(2)}</span>
                    <button
                      className={`btn ${added === product.id ? 'btn-gold' : 'btn-primary'}`}
                      style={{ padding: '10px 16px', fontSize: '0.65rem' }}
                      onClick={() => addToCart(product)}
                    >
                      {added === product.id ? '✓ Added!' : <><FaShoppingCart /> Add</>}
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
