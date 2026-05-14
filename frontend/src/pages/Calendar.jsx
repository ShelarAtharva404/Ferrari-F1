import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import { FaMapMarkerAlt, FaClock, FaFlag } from 'react-icons/fa'
import './Calendar.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const races = [
  { round: 1, name: 'Bahrain Grand Prix', circuit: 'Bahrain International Circuit', country: '🇧🇭 Bahrain', city: 'Sakhir', date: '2025-03-02', status: 'completed', ferrariResult: { pos: 1, driver: 'Hamilton' } },
  { round: 2, name: 'Saudi Arabian Grand Prix', circuit: 'Jeddah Corniche Circuit', country: '🇸🇦 Saudi Arabia', city: 'Jeddah', date: '2025-03-09', status: 'completed', ferrariResult: { pos: 3, driver: 'Leclerc' } },
  { round: 3, name: 'Australian Grand Prix', circuit: 'Albert Park Circuit', country: '🇦🇺 Australia', city: 'Melbourne', date: '2025-03-23', status: 'completed', ferrariResult: { pos: 2, driver: 'Hamilton' } },
  { round: 4, name: 'Japanese Grand Prix', circuit: 'Suzuka International Racing Course', country: '🇯🇵 Japan', city: 'Suzuka', date: '2025-04-06', status: 'completed', ferrariResult: { pos: 4, driver: 'Leclerc' } },
  { round: 5, name: 'Chinese Grand Prix', circuit: 'Shanghai International Circuit', country: '🇨🇳 China', city: 'Shanghai', date: '2025-04-20', status: 'completed', ferrariResult: { pos: 1, driver: 'Leclerc' } },
  { round: 6, name: 'Miami Grand Prix', circuit: 'Miami International Autodrome', country: '🇺🇸 USA', city: 'Miami', date: '2025-05-04', status: 'completed', ferrariResult: { pos: 2, driver: 'Leclerc' } },
  { round: 7, name: 'Emilia Romagna Grand Prix', circuit: 'Autodromo Enzo e Dino Ferrari', country: '🇮🇹 Italy', city: 'Imola', date: '2025-05-18', status: 'upcoming', ferrariResult: null },
  { round: 8, name: 'Monaco Grand Prix', circuit: 'Circuit de Monaco', country: '🇲🇨 Monaco', city: 'Monte Carlo', date: '2025-05-25', status: 'upcoming', ferrariResult: null },
  { round: 9, name: 'Canadian Grand Prix', circuit: 'Circuit Gilles Villeneuve', country: '🇨🇦 Canada', city: 'Montreal', date: '2025-06-15', status: 'upcoming', ferrariResult: null },
  { round: 10, name: 'Spanish Grand Prix', circuit: 'Circuit de Barcelona-Catalunya', country: '🇪🇸 Spain', city: 'Barcelona', date: '2025-06-29', status: 'upcoming', ferrariResult: null },
  { round: 11, name: 'Austrian Grand Prix', circuit: 'Red Bull Ring', country: '🇦🇹 Austria', city: 'Spielberg', date: '2025-06-29', status: 'upcoming', ferrariResult: null },
  { round: 12, name: 'British Grand Prix', circuit: 'Silverstone Circuit', country: '🇬🇧 UK', city: 'Silverstone', date: '2025-07-06', status: 'upcoming', ferrariResult: null },
  { round: 13, name: 'Hungarian Grand Prix', circuit: 'Hungaroring', country: '🇭🇺 Hungary', city: 'Budapest', date: '2025-07-27', status: 'upcoming', ferrariResult: null },
  { round: 14, name: 'Belgian Grand Prix', circuit: 'Circuit de Spa-Francorchamps', country: '🇧🇪 Belgium', city: 'Spa', date: '2025-08-03', status: 'upcoming', ferrariResult: null },
  { round: 15, name: 'Dutch Grand Prix', circuit: 'Circuit Zandvoort', country: '🇳🇱 Netherlands', city: 'Zandvoort', date: '2025-08-31', status: 'upcoming', ferrariResult: null },
  { round: 16, name: 'Italian Grand Prix', circuit: 'Autodromo Nazionale Monza', country: '🇮🇹 Italy', city: 'Monza', date: '2025-09-07', status: 'upcoming', ferrariResult: null },
  { round: 17, name: 'Azerbaijan Grand Prix', circuit: 'Baku City Circuit', country: '🇦🇿 Azerbaijan', city: 'Baku', date: '2025-09-21', status: 'upcoming', ferrariResult: null },
  { round: 18, name: 'Singapore Grand Prix', circuit: 'Marina Bay Street Circuit', country: '🇸🇬 Singapore', city: 'Singapore', date: '2025-10-05', status: 'upcoming', ferrariResult: null },
  { round: 19, name: 'United States Grand Prix', circuit: 'Circuit of the Americas', country: '🇺🇸 USA', city: 'Austin', date: '2025-10-19', status: 'upcoming', ferrariResult: null },
  { round: 20, name: 'Mexico City Grand Prix', circuit: 'Autodromo Hermanos Rodriguez', country: '🇲🇽 Mexico', city: 'Mexico City', date: '2025-10-26', status: 'upcoming', ferrariResult: null },
  { round: 21, name: 'São Paulo Grand Prix', circuit: 'Autodromo Jose Carlos Pace', country: '🇧🇷 Brazil', city: 'São Paulo', date: '2025-11-09', status: 'upcoming', ferrariResult: null },
  { round: 22, name: 'Las Vegas Grand Prix', circuit: 'Las Vegas Street Circuit', country: '🇺🇸 USA', city: 'Las Vegas', date: '2025-11-22', status: 'upcoming', ferrariResult: null },
  { round: 23, name: 'Qatar Grand Prix', circuit: 'Lusail International Circuit', country: '🇶🇦 Qatar', city: 'Lusail', date: '2025-11-30', status: 'upcoming', ferrariResult: null },
  { round: 24, name: 'Abu Dhabi Grand Prix', circuit: 'Yas Marina Circuit', country: '🇦🇪 UAE', city: 'Abu Dhabi', date: '2025-12-07', status: 'upcoming', ferrariResult: null },
]

function Countdown({ targetDate }) {
  const [timeLeft, setTimeLeft] = useState({})

  useEffect(() => {
    const calculate = () => {
      const diff = new Date(targetDate) - new Date()
      if (diff <= 0) return setTimeLeft({ expired: true })
      setTimeLeft({
        days: Math.floor(diff / 86400000),
        hours: Math.floor((diff % 86400000) / 3600000),
        mins: Math.floor((diff % 3600000) / 60000),
      })
    }
    calculate()
    const t = setInterval(calculate, 60000)
    return () => clearInterval(t)
  }, [targetDate])

  if (timeLeft.expired) return null

  return (
    <div className="countdown">
      {[['days', 'Days'], ['hours', 'Hrs'], ['mins', 'Min']].map(([k, l]) => (
        <div key={k} className="countdown__unit">
          <span className="countdown__value">{timeLeft[k] ?? '--'}</span>
          <span className="countdown__label">{l}</span>
        </div>
      ))}
    </div>
  )
}

export default function Calendar() {
  const [filter, setFilter] = useState('all')

  const filtered = races.filter((r) => filter === 'all' || r.status === filter)
  const nextRace = races.find((r) => r.status === 'upcoming')

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>Race Calendar | Scuderia Ferrari F1</title></Helmet>

      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>2025 <span className="accent-red">Season</span></h1>
          <p>24 races. 24 chances to stand on the top step.</p>
        </div>
      </div>

      {/* Next Race Countdown */}
      {nextRace && (
        <section className="next-race-banner">
          <div className="container next-race-inner">
            <div>
              <div className="next-race__eyebrow">Next Race · Round {nextRace.round}</div>
              <h2 className="next-race__name">{nextRace.name}</h2>
              <div className="next-race__meta">
                <span><FaMapMarkerAlt /> {nextRace.city}, {nextRace.country}</span>
                <span><FaClock /> {new Date(nextRace.date).toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            </div>
            <Countdown targetDate={nextRace.date} />
          </div>
        </section>
      )}

      {/* Filter */}
      <section className="section">
        <div className="container">
          <div className="calendar-filters">
            {['all', 'completed', 'upcoming'].map((f) => (
              <button
                key={f}
                className={`calendar-filter-btn ${filter === f ? 'active' : ''}`}
                onClick={() => setFilter(f)}
              >
                {f.charAt(0).toUpperCase() + f.slice(1)}
              </button>
            ))}
          </div>

          <div className="calendar-list">
            {filtered.map((race, i) => (
              <motion.div
                key={race.round}
                className={`race-row ${race.status}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.03 }}
              >
                <div className="race-row__round">
                  <span className="race-row__round-num">{String(race.round).padStart(2, '0')}</span>
                </div>
                <div className="race-row__flag">{race.country.split(' ')[0]}</div>
                <div className="race-row__main">
                  <h3 className="race-row__name">{race.name}</h3>
                  <span className="race-row__circuit"><FaMapMarkerAlt /> {race.circuit}</span>
                </div>
                <div className="race-row__date">
                  {new Date(race.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}
                </div>
                <div className="race-row__result">
                  {race.status === 'completed' && race.ferrariResult ? (
                    <div className={`race-result-badge race-result-badge--p${race.ferrariResult.pos}`}>
                      P{race.ferrariResult.pos} · {race.ferrariResult.driver}
                    </div>
                  ) : race.status === 'upcoming' ? (
                    <span className="badge badge-dark">Upcoming</span>
                  ) : null}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </motion.div>
  )
}
