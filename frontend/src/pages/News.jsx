import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaSearch, FaArrowRight } from 'react-icons/fa'
import './News.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const newsArticles = [
  { id: 1, category: 'Race Report', title: 'Leclerc Wins Miami: Ferrari\'s Fourth Victory of the Season', date: 'May 4, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', excerpt: 'Charles Leclerc delivered a dominant performance in Miami, leading from pole to take Ferrari\'s fourth victory of the 2025 season.' },
  { id: 2, category: 'Technical', title: 'SF-25 Upgrade Delivers 0.3s Lap Time Improvement at Barcelona', date: 'Apr 28, 2025', author: 'Ferrari Technical', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80', excerpt: 'Ferrari\'s Barcelona upgrade package has delivered significant performance gains, with the team reporting a 0.3 second improvement.' },
  { id: 3, category: 'Team News', title: 'Hamilton: "Ferrari Feels Like Home Already"', date: 'Apr 20, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1536246860680-38e5b0b4f95c?w=800&q=80', excerpt: 'Lewis Hamilton shares his thoughts on his first months as a Ferrari driver, expressing his excitement and admiration for the team culture.' },
  { id: 4, category: 'Race Report', title: 'China GP: Hamilton Takes Second, Leclerc Fourth', date: 'Apr 20, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', excerpt: 'A strong strategic call gives Ferrari a double points finish in Shanghai as the Scuderia consolidates their championship lead.' },
  { id: 5, category: 'Engineering', title: 'Inside Ferrari\'s Wind Tunnel: Building the SF-25', date: 'Apr 14, 2025', author: 'Ferrari Technical', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80', excerpt: 'An exclusive look inside Maranello\'s state-of-the-art wind tunnel facility where the championship-contending SF-25 was born.' },
  { id: 6, category: 'Team News', title: 'Vasseur: "We Are Building Something Special at Ferrari"', date: 'Apr 10, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=800&q=80', excerpt: 'Team Principal Frédéric Vasseur reflects on the transformation of Scuderia Ferrari and outlines his ambitions for the rest of the season.' },
  { id: 7, category: 'Race Report', title: 'Australian GP: Hamilton Podium on Ferrari Debut', date: 'Mar 23, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1536246860680-38e5b0b4f95c?w=800&q=80', excerpt: 'A fairytale beginning for Lewis Hamilton at Ferrari as the seven-time champion takes second place in his debut race for the Scuderia.' },
  { id: 8, category: 'Technical', title: 'How Ferrari Cracked the 2025 Regulations', date: 'Mar 15, 2025', author: 'Ferrari Technical', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80', excerpt: 'A deep dive into the technical philosophy behind the SF-25 and how Ferrari\'s engineers found a unique interpretation of the 2025 rules.' },
  { id: 9, category: 'Team News', title: 'Ferrari Launches SF-25 at Maranello Reveal', date: 'Feb 14, 2025', author: 'Ferrari Media', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80', excerpt: 'Scuderia Ferrari unveils the SF-25 in a spectacular launch event at their Maranello headquarters, attended by thousands of fans.' },
]

const categories = ['All', 'Race Report', 'Technical', 'Team News', 'Engineering']

export default function News() {
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')

  const filtered = newsArticles.filter((a) =>
    (filter === 'All' || a.category === filter) &&
    (a.title.toLowerCase().includes(search.toLowerCase()) || a.excerpt.toLowerCase().includes(search.toLowerCase()))
  )

  const [featured, ...rest] = filtered

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>News | Scuderia Ferrari F1</title></Helmet>

      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>Latest <span className="accent-red">News</span></h1>
          <p>Stories from Maranello and beyond.</p>
        </div>
      </div>

      <section className="section">
        <div className="container">
          {/* Controls */}
          <div className="news-controls">
            <div className="news-categories">
              {categories.map((c) => (
                <button
                  key={c}
                  className={`calendar-filter-btn ${filter === c ? 'active' : ''}`}
                  onClick={() => setFilter(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <div className="news-search">
              <FaSearch className="news-search__icon" />
              <input
                type="text"
                placeholder="Search news..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="news-search__input"
              />
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="news-empty">
              <p>No articles found. Try a different search or category.</p>
            </div>
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <Link to={`/news/${featured.id}`} className="news-featured">
                  <div className="news-featured__img-wrap">
                    <img src={featured.img} alt={featured.title} className="news-featured__img" />
                    <div className="news-featured__overlay" />
                  </div>
                  <div className="news-featured__content">
                    <span className="badge badge-red">{featured.category}</span>
                    <h2 className="news-featured__title">{featured.title}</h2>
                    <p className="news-featured__excerpt">{featured.excerpt}</p>
                    <div className="news-featured__meta">
                      <span>{featured.date}</span>
                      <span>By {featured.author}</span>
                    </div>
                  </div>
                </Link>
              )}

              {/* Grid */}
              {rest.length > 0 && (
                <div className="news-grid">
                  {rest.map((a, i) => (
                    <motion.div
                      key={a.id}
                      initial={{ opacity: 0, y: 30 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.07 }}
                    >
                      <Link to={`/news/${a.id}`} className="news-card-link">
                        <article className="news-card">
                          <div className="news-card__img-wrap">
                            <img src={a.img} alt={a.title} className="news-card__img" />
                            <span className="badge badge-red news-card__badge">{a.category}</span>
                          </div>
                          <div className="news-card__body">
                            <span className="news-card__date">{a.date}</span>
                            <h3 className="news-card__title">{a.title}</h3>
                            <p className="news-card__excerpt">{a.excerpt}</p>
                            <span className="news-card__link">Read More <FaArrowRight /></span>
                          </div>
                        </article>
                      </Link>
                    </motion.div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </motion.div>
  )
}
