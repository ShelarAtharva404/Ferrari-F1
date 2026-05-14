import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaRuler, FaWeight, FaTachometerAlt, FaFire, FaWind, FaCog } from 'react-icons/fa'
import './Cars.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const specs = [
  { icon: <FaTachometerAlt />, label: 'Max Speed', value: '360 km/h', desc: 'Top speed achieved in qualifying' },
  { icon: <FaFire />, label: 'Power Unit', value: '1000+ hp', desc: 'Ferrari 066/12 hybrid V6 turbo' },
  { icon: <FaWeight />, label: 'Weight', value: '796 kg', desc: 'Including driver & fluids' },
  { icon: <FaRuler />, label: 'Wheelbase', value: '3600 mm', desc: 'Distance front to rear axle' },
  { icon: <FaWind />, label: 'Downforce', value: '1500 kg', desc: 'At 200 km/h aerodynamic load' },
  { icon: <FaCog />, label: 'Gearbox', value: '8-speed', desc: 'Longitudinal semi-auto gearbox' },
]

const carTimeline = [
  { year: '2020', model: 'SF1000', result: 'P6 Constructors', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500&q=80' },
  { year: '2022', model: 'F1-75', result: 'P2 Constructors', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80' },
  { year: '2023', model: 'SF-23', result: 'P3 Constructors', img: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=500&q=80' },
  { year: '2024', model: 'SF-24', result: 'P2 Constructors', img: 'https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=500&q=80' },
  { year: '2025', model: 'SF-25', result: '2025 Season', img: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=500&q=80' },
]

export default function Cars() {
  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>Cars | Scuderia Ferrari F1</title></Helmet>

      {/* Header */}
      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>The <span className="accent-red">SF-25</span></h1>
          <p>Engineering perfection, draped in the most iconic colour in motorsport.</p>
        </div>
      </div>

      {/* Hero Car Showcase */}
      <section className="cars__hero-section">
        <div className="container">
          <motion.div
            className="cars__hero-img-wrap"
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1553440569-bcc63803a83d?w=1400&q=80"
              alt="Ferrari SF-25"
              className="cars__hero-img"
            />
            <div className="cars__hero-overlay" />
            <div className="cars__hero-labels">
              <div className="cars__label cars__label--1">
                <span className="cars__label-dot" />
                <div className="cars__label-text">
                  <strong>Front Wing</strong>
                  <span>5-element flap design</span>
                </div>
              </div>
              <div className="cars__label cars__label--2">
                <span className="cars__label-dot" />
                <div className="cars__label-text">
                  <strong>Sidepod</strong>
                  <span>Zero-pod concept evolution</span>
                </div>
              </div>
              <div className="cars__label cars__label--3">
                <span className="cars__label-dot" />
                <div className="cars__label-text">
                  <strong>Rear Wing</strong>
                  <span>DRS activated drag reduction</span>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Specs */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Technical Specifications</h2>
            <p className="section-subtitle">Every number tells the story of engineering obsession.</p>
          </div>

          <div className="specs-grid">
            {specs.map((spec, i) => (
              <motion.div
                key={spec.label}
                className="spec-card"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
              >
                <div className="spec-card__icon">{spec.icon}</div>
                <div className="spec-card__value">{spec.value}</div>
                <div className="spec-card__label">{spec.label}</div>
                <div className="spec-card__desc">{spec.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <hr className="hr-red" />

      {/* Power Unit Deep Dive */}
      <section className="section cars__power">
        <div className="container cars__power-inner">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="red-bar" />
            <h2 className="section-title">066/12 Power Unit</h2>
            <p style={{ color: 'var(--ferrari-gray)', lineHeight: '1.9', marginBottom: '32px' }}>
              The Ferrari 066/12 represents the culmination of years of hybrid development. 
              The 1.6-litre V6 turbocharged Internal Combustion Engine, combined with two Motor 
              Generator Units (MGU-H and MGU-K), delivers unprecedented power density while 
              meeting Formula 1's strict fuel regulations.
            </p>
            <div className="power-specs-list">
              {[
                ['Configuration', '90° V6 Turbocharged'],
                ['Displacement', '1.6 litres'],
                ['Max RPM', '15,000 rpm'],
                ['ICE Power', '~700 hp'],
                ['ERS Power', '~160 hp (120 kW)'],
                ['Fuel', 'E10 sustainable fuel'],
              ].map(([k, v]) => (
                <div key={k} className="power-spec-row">
                  <span>{k}</span>
                  <strong>{v}</strong>
                </div>
              ))}
            </div>
          </motion.div>
          <motion.div
            className="cars__engine-img-wrap"
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <img
              src="https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=700&q=80"
              alt="Ferrari Engine"
              className="cars__engine-img"
            />
          </motion.div>
        </div>
      </section>

      <hr className="hr-red" />

      {/* Car Timeline */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Car Evolution</h2>
            <p className="section-subtitle">The journey of the Prancing Horse through the modern era.</p>
          </div>

          <div className="cars-timeline">
            {carTimeline.map((car, i) => (
              <motion.div
                key={car.year}
                className="timeline-car"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
              >
                <div className="timeline-car__img-wrap">
                  <img src={car.img} alt={car.model} className="timeline-car__img" />
                  <div className="timeline-car__year">{car.year}</div>
                </div>
                <div className="timeline-car__info">
                  <h3 className="timeline-car__model">{car.model}</h3>
                  <span className="badge badge-dark">{car.result}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
