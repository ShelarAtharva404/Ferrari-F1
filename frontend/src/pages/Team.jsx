import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { FaTrophy, FaFlag, FaStar } from 'react-icons/fa'
import './Team.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const drivers = [
  {
    number: '16',
    name: 'Charles Leclerc',
    nationality: '🇲🇨 Monegasque',
    born: 'October 16, 1997',
    championships: 0,
    wins: 8,
    podiums: 45,
    poles: 26,
    debut: '2018',
    team_since: '2019',
    helmet: '#DC0000',
    bio: 'Born in Monaco, Charles Leclerc is one of the most naturally gifted drivers of his generation. His debut victory at Spa-Francorchamps announced him to the world, and he has since become the face of Ferrari\'s resurgence. Known for his extraordinary one-lap pace and passionate racing style, Leclerc is the driver tasked with ending Ferrari\'s championship drought.',
    img: 'https://images.unsplash.com/photo-1611329695518-1763fc1d5a46?w=600&q=80',
  },
  {
    number: '44',
    name: 'Lewis Hamilton',
    nationality: '🇬🇧 British',
    born: 'January 7, 1985',
    championships: 7,
    wins: 104,
    podiums: 197,
    poles: 104,
    debut: '2007',
    team_since: '2025',
    helmet: '#DC0000',
    bio: 'The most decorated Formula 1 driver in history, Sir Lewis Hamilton brings seven World Championship titles and a record-equalling 104 victories to Ferrari. His move to Maranello represents one of the most seismic shifts in motorsport history — a union of the sport\'s greatest driver with its most iconic team. The 2025 season marks the beginning of a new era.',
    img: 'https://images.unsplash.com/photo-1536246860680-38e5b0b4f95c?w=600&q=80',
  },
]

const management = [
  { name: 'Frédéric Vasseur', role: 'Team Principal', img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80' },
  { name: 'Benedetto Vigna', role: 'CEO, Ferrari N.V.', img: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&q=80' },
  { name: 'Enrico Cardile', role: 'Chief Designer', img: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&q=80' },
  { name: 'Loic Serra', role: 'Technical Director', img: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=300&q=80' },
]

export default function Team() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>Our Team | Scuderia Ferrari F1</title></Helmet>

      {/* Page Header */}
      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>The <span className="accent-red">Team</span></h1>
          <p>The finest drivers, engineers and minds united by one colour — Ferrari Red.</p>
        </div>
      </div>

      {/* Drivers */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">2025 Drivers</h2>
            <p className="section-subtitle">Two champions carrying the Prancing Horse into battle.</p>
          </div>

          {drivers.map((driver, i) => (
            <motion.div
              key={driver.number}
              className={`driver-profile ${i % 2 !== 0 ? 'driver-profile--reverse' : ''}`}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <div className="driver-profile__img-wrap">
                <img src={driver.img} alt={driver.name} className="driver-profile__img" />
                <div className="driver-profile__number-bg">{driver.number}</div>
              </div>

              <div className="driver-profile__info">
                <div className="driver-profile__meta">
                  <span className="badge badge-red">Driver #{driver.number}</span>
                  <span className="driver-profile__nationality">{driver.nationality}</span>
                </div>
                <h2 className="driver-profile__name">{driver.name}</h2>
                <p className="driver-profile__bio">{driver.bio}</p>

                <div className="driver-profile__stats">
                  {[
                    { icon: <FaTrophy />, value: driver.championships, label: 'Championships' },
                    { icon: <FaFlag />, value: driver.wins, label: 'Race Wins' },
                    { icon: <FaStar />, value: driver.podiums, label: 'Podiums' },
                    { icon: '🔴', value: driver.poles, label: 'Pole Positions' },
                  ].map((stat) => (
                    <div key={stat.label} className="driver-stat">
                      <span className="driver-stat__icon">{stat.icon}</span>
                      <span className="driver-stat__value">{stat.value}</span>
                      <span className="driver-stat__label">{stat.label}</span>
                    </div>
                  ))}
                </div>

                <div className="driver-profile__details">
                  <div><span>Born</span><strong>{driver.born}</strong></div>
                  <div><span>F1 Debut</span><strong>{driver.debut}</strong></div>
                  <div><span>Ferrari Since</span><strong>{driver.team_since}</strong></div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <hr className="hr-red" />

      {/* Management */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Team Leadership</h2>
            <p className="section-subtitle">The brains behind the Scuderia.</p>
          </div>

          <div className="team__management-grid">
            {management.map((person, i) => (
              <motion.div
                key={person.name}
                className="mgmt-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="mgmt-card__img-wrap">
                  <img src={person.img} alt={person.name} className="mgmt-card__img" />
                </div>
                <div className="mgmt-card__info">
                  <h3 className="mgmt-card__name">{person.name}</h3>
                  <span className="mgmt-card__role">{person.role}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
