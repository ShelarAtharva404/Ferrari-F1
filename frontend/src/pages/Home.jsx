import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaChevronDown, FaPlay, FaArrowRight } from 'react-icons/fa'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet-async'
import './Home.css'

// Custom animated counter (no react-countup dependency)
function AnimatedNumber({ end, duration = 2500, suffix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })

  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (duration / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end, duration])

  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const latestNews = [
  {
    id: 1,
    category: 'Race Report',
    title: 'Leclerc Conquers Monaco: A Masterclass in Precision',
    date: 'May 26, 2025',
    img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80',
    excerpt: 'Charles Leclerc delivered a flawless performance at his home race, securing Ferrari\'s first Monaco win in decades with tactical brilliance and raw speed.',
  },
  {
    id: 2,
    category: 'Technical',
    title: 'SF-25 Upgrade Package Unveiled at Imola',
    date: 'May 17, 2025',
    img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=600&q=80',
    excerpt: 'The Scuderia reveals a significant aerodynamic package that promises to unlock performance in the mid-speed corners.',
  },
  {
    id: 3,
    category: 'Team News',
    title: 'Hamilton Joins Ferrari for 2025 Season',
    date: 'Feb 1, 2025',
    img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=600&q=80',
    excerpt: 'Seven-time world champion Lewis Hamilton joined Scuderia Ferrari for the 2025 Formula 1 season in a landmark signing.',
  },
]

const partners = ['SHELL', 'HP', 'MAHLE', 'FERRARI', 'UPS', 'KASPERSKY', 'RICHARD MILLE', 'ESTRELLA GALICIA']

function StatsSection() {
  return (
    <section className="home__stats">
      <div className="container">
        <div className="home__stats-grid">
          {[
            { value: 16, suffix: '', label: 'Constructors Championships' },
            { value: 15, suffix: '', label: 'Drivers Championships' },
            { value: 243, suffix: '+', label: 'Grand Prix Victories' },
            { value: 74, suffix: '', label: 'Years in Formula 1' },
          ].map((stat) => (
            <div key={stat.label} className="home__stat-card">
              <span className="stat-number">
                <AnimatedNumber end={stat.value} suffix={stat.suffix} />
              </span>
              <span className="stat-label">{stat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function Home() {
  return (
    <div className="page-fade-in">
      <Helmet>
        <title>Scuderia Ferrari F1 | Home</title>
      </Helmet>

      {/* Hero */}
      <section className="hero">
        <div className="hero__bg">
          <img
            src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80"
            alt="Ferrari F1 Car"
            className="hero__bg-img"
          />
          <div className="hero__overlay" />
          <div className="hero__overlay-red" />
        </div>

        <div className="hero__speed-lines">
          {[...Array(8)].map((_, i) => (
            <div key={i} className={`speed-line speed-line--${i + 1}`} />
          ))}
        </div>

        <div className="container hero__content">
          <div className="hero__content-inner">
            <div className="hero__eyebrow">
              <span className="badge badge-red">2025 Season</span>
              <span className="hero__eyebrow-text">Formula 1 World Championship</span>
            </div>
            <h1 className="hero__title">
              Passion.<br />
              <span className="hero__title-red">Power.</span><br />
              Prancing Horse.
            </h1>
            <p className="hero__subtitle">
              Since 1950, the Scuderia has embodied the relentless pursuit of speed,
              glory and the unmistakable roar of a Ferrari engine at full throttle.
            </p>
            <div className="hero__actions">
              <Link to="/cars" className="btn btn-primary">
                <FaPlay style={{ fontSize: '0.7rem' }} /> Explore SF-25
              </Link>
              <Link to="/results" className="btn btn-outline">
                Race Results <FaArrowRight style={{ fontSize: '0.7rem' }} />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="hero__scroll hero__scroll--bounce">
          <FaChevronDown />
          <span>Scroll</span>
        </div>

        {/* Ticker */}
        <div className="hero__ticker">
          <div className="ticker__track">
            {[...Array(3)].map((_, rep) => (
              <span key={rep} className="ticker__content">
                🏎️ LECLERC P1 MONACO · ✅ HAMILTON WINS BAHRAIN · ⚡ SF-25 FASTEST IN QUALIFYING · 🏁 3 WINS IN FIRST 8 RACES · 🏆 CONSTRUCTORS LEAD · &nbsp;&nbsp;&nbsp;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <StatsSection />

      {/* Latest News */}
      <section className="section home__news">
        <div className="container">
          <div className="home__news-header">
            <div>
              <div className="red-bar" />
              <h2 className="section-title">Latest News</h2>
              <p className="section-subtitle">Stay up to date with the latest from Maranello</p>
            </div>
            <Link to="/news" className="btn btn-outline">
              All News <FaArrowRight style={{ fontSize: '0.7rem' }} />
            </Link>
          </div>

          <div className="home__news-grid">
            {latestNews.map((article) => (
              <motion.article
                key={article.id}
                className="news-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
              >
                <div className="news-card__img-wrap">
                  <img src={article.img} alt={article.title} className="news-card__img" />
                  <span className="badge badge-red news-card__badge">{article.category}</span>
                </div>
                <div className="news-card__body">
                  <span className="news-card__date">{article.date}</span>
                  <h3 className="news-card__title">{article.title}</h3>
                  <p className="news-card__excerpt">{article.excerpt}</p>
                  <Link to={`/news/${article.id}`} className="news-card__link">
                    Read More <FaArrowRight />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* Drivers Teaser */}
      <section className="section home__drivers">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Our Champions</h2>
            <p className="section-subtitle">Two legends. One mission. Victory in red.</p>
          </div>

          <div className="home__drivers-grid">
            {[
              { number: '16', name: 'Charles Leclerc', country: '🇲🇨 Monaco', role: 'Lead Driver', img: 'https://images.unsplash.com/photo-1611329695518-1763fc1d5a46?w=500&q=80' },
              { number: '44', name: 'Lewis Hamilton', country: '🇬🇧 United Kingdom', role: 'Lead Driver', img: 'https://images.unsplash.com/photo-1536246860680-38e5b0b4f95c?w=500&q=80' },
            ].map((driver) => (
              <motion.div
                key={driver.number}
                className="driver-card"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <div className="driver-card__img-wrap">
                  <img src={driver.img} alt={driver.name} className="driver-card__img" />
                  <div className="driver-card__overlay" />
                  <span className="driver-card__number">#{driver.number}</span>
                </div>
                <div className="driver-card__info">
                  <span className="driver-card__role">{driver.role}</span>
                  <h3 className="driver-card__name">{driver.name}</h3>
                  <span className="driver-card__country">{driver.country}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/team" className="btn btn-primary">Meet The Team</Link>
          </div>
        </div>
      </section>

      {/* Car Teaser */}
      <section className="home__car-teaser">
        <div className="container home__car-teaser-inner">
          <motion.div
            className="home__car-text"
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="red-bar" />
            <h2 className="section-title">The SF-25</h2>
            <p style={{ color: 'var(--ferrari-gray)', marginBottom: '24px', lineHeight: '1.8' }}>
              Born from wind tunnels, forged in Maranello. The SF-25 represents the pinnacle 
              of Ferrari's engineering excellence.
            </p>
            <div style={{ display: 'flex', gap: '32px', marginBottom: '32px' }}>
              {[
                { value: '1000+', label: 'Horsepower' },
                { value: '< 0.5s', label: '0-100 km/h' },
                { value: '360', label: 'km/h Top Speed' },
              ].map((s) => (
                <div key={s.label}>
                  <div style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 900, color: 'var(--ferrari-red)' }}>{s.value}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--ferrari-gray)', letterSpacing: '1px' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <Link to="/cars" className="btn btn-primary">
              Explore The Car <FaArrowRight style={{ fontSize: '0.7rem' }} />
            </Link>
          </motion.div>
          <motion.div
            className="home__car-img-wrap"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=800&q=80"
              alt="Ferrari SF-25"
              className="home__car-img"
            />
            <div className="home__car-glow" />
          </motion.div>
        </div>
      </section>

      {/* Partners */}
      <section className="section home__partners">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title" style={{ fontSize: '1.5rem' }}>Our Partners</h2>
          </div>
          <div className="partners-strip">
            {partners.map((p) => (
              <div key={p} className="partner-item">
                <span>{p}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
