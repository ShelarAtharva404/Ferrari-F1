import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState } from 'react'
import './About.css'

// Custom animated counter
function AnimatedNumber({ end, suffix = '' }) {
  const [count, setCount] = useState(0)
  const { ref, inView } = useInView({ triggerOnce: true })
  useEffect(() => {
    if (!inView) return
    let start = 0
    const step = end / (2500 / 16)
    const timer = setInterval(() => {
      start += step
      if (start >= end) { setCount(end); clearInterval(timer) }
      else setCount(Math.floor(start))
    }, 16)
    return () => clearInterval(timer)
  }, [inView, end])
  return <span ref={ref}>{count.toLocaleString()}{suffix}</span>
}

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const milestones = [
  { year: '1929', title: 'Scuderia Ferrari Founded', desc: 'Enzo Ferrari establishes Scuderia Ferrari as a racing team in Modena, Italy.' },
  { year: '1947', title: 'First Ferrari Car', desc: 'The Ferrari 125 S, powered by a 1.5-litre supercharged V12, becomes the first car to bear the Ferrari name.' },
  { year: '1950', title: 'Formula 1 Debut', desc: 'Ferrari enters the inaugural Formula 1 World Championship season, beginning one of sport\'s greatest stories.' },
  { year: '1952', title: 'First Constructors\' Title', desc: 'Alberto Ascari wins the Drivers\' Championship, delivering Ferrari their first F1 world title.' },
  { year: '1975', title: 'Niki Lauda Era', desc: 'Niki Lauda clinches the Drivers\' Championship with Ferrari in a season that defined an era.' },
  { year: '2000', title: 'Schumacher Dynasty Begins', desc: 'Michael Schumacher wins the first of five consecutive Drivers\' Championships with Ferrari.' },
  { year: '2022', title: 'F1-75 Renaissance', desc: 'Ferrari return to championship contention with the dominant F1-75, winning multiple races.' },
  { year: '2025', title: 'Hamilton Joins Ferrari', desc: 'Lewis Hamilton joins in a historic pairing, reigniting the quest for championship glory.' },
]

const partners = [
  { name: 'Shell', type: 'Title Partner', desc: 'Fuels and lubricates the championship-winning powertrains' },
  { name: 'HP', type: 'Title Partner', desc: 'Technology partner powering Ferrari\'s digital infrastructure' },
  { name: 'MAHLE', type: 'Official Supplier', desc: 'Engine components and thermal management solutions' },
  { name: 'Richard Mille', type: 'Official Watch', desc: 'Precision Swiss watchmaking meets Formula 1 engineering' },
  { name: 'Kaspersky', type: 'Technology', desc: 'Cybersecurity protecting Ferrari\'s digital assets' },
  { name: 'UPS', type: 'Official Logistics', desc: 'Global logistics partner for equipment transportation' },
]

function AboutStats() {
  return (
    <div className="about-stats">
      {[
        { value: 1929, suffix: '', label: 'Founded' },
        { value: 243, suffix: '+', label: 'Race Wins' },
        { value: 16, suffix: '', label: 'Constructors Titles' },
        { value: 5500, suffix: '+', label: 'Team Members' },
      ].map((s) => (
        <div key={s.label} className="about-stat">
          <span className="stat-number">
            <AnimatedNumber end={s.value} suffix={s.suffix} />
          </span>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  )
}

export default function About() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>About | Scuderia Ferrari F1</title></Helmet>

      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>The <span className="accent-red">Scuderia</span></h1>
          <p>Almost a century of passion, power and the pursuit of perfection.</p>
        </div>
      </div>

      {/* Story */}
      <section className="section">
        <div className="container about-story">
          <motion.div
            className="about-story__text"
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="red-bar" />
            <h2 className="section-title">The Legend of Maranello</h2>
            <p>
              When Enzo Ferrari founded Scuderia Ferrari in 1929, he created more than a racing team. 
              He ignited a passion that would burn across generations, transcend borders and transform 
              Formula 1 into the spectacle it is today.
            </p>
            <p style={{ marginTop: '20px' }}>
              From the windswept streets of Monaco to the ancient stones of Monza, from the rainswept 
              Spa to the burning tarmac of Bahrain — Ferrari has competed everywhere, won almost everywhere, 
              and inspired millions along the way.
            </p>
            <p style={{ marginTop: '20px' }}>
              Today, over 5,500 people work at the historic Maranello factory, carrying on a tradition 
              of excellence that Enzo Ferrari established nearly a century ago. Each car that rolls out 
              of the factory carries with it the weight of history and the hope of millions of tifosi worldwide.
            </p>
            <AboutStats />
          </motion.div>

          <motion.div
            className="about-story__img-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=700&q=80"
              alt="Ferrari F1 History"
              className="about-story__img"
            />
            <div className="about-story__img-caption">
              <strong>Maranello, Italy</strong>
              <span>Home of the Prancing Horse since 1943</span>
            </div>
          </motion.div>
        </div>
      </section>

      <hr className="hr-red" />

      {/* Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">History of Greatness</h2>
            <p className="section-subtitle">Key milestones in the story of Scuderia Ferrari.</p>
          </div>

          <div className="timeline">
            {milestones.map((m, i) => (
              <motion.div
                key={m.year}
                className={`timeline-item ${i % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-item__content">
                  <span className="timeline-item__year">{m.year}</span>
                  <h3 className="timeline-item__title">{m.title}</h3>
                  <p className="timeline-item__desc">{m.desc}</p>
                </div>
                <div className="timeline-item__dot" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-red" />

      {/* Partners */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Partners & Sponsors</h2>
            <p className="section-subtitle">World-class partners for a world-class team.</p>
          </div>

          <div className="partners-grid">
            {partners.map((p, i) => (
              <motion.div
                key={p.name}
                className="partner-card"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="partner-card__name">{p.name}</div>
                <div className="partner-card__type">{p.type}</div>
                <p className="partner-card__desc">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
