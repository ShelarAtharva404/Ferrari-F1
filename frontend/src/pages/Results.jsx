import { useState } from 'react'
import { motion } from 'framer-motion'
import { Helmet } from 'react-helmet-async'
import './Results.css'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
}

const constructorStandings = [
  { pos: 1, team: 'Scuderia Ferrari', points: 189, wins: 3, country: '🇮🇹' },
  { pos: 2, team: 'Red Bull Racing', points: 176, wins: 2, country: '🇦🇹' },
  { pos: 3, team: 'Mercedes-AMG', points: 154, wins: 1, country: '🇩🇪' },
  { pos: 4, team: 'McLaren F1 Team', points: 141, wins: 0, country: '🇬🇧' },
  { pos: 5, team: 'Aston Martin', points: 88, wins: 0, country: '🇬🇧' },
  { pos: 6, team: 'Alpine', points: 42, wins: 0, country: '🇫🇷' },
  { pos: 7, team: 'Williams', points: 28, wins: 0, country: '🇬🇧' },
  { pos: 8, team: 'Haas F1', points: 22, wins: 0, country: '🇺🇸' },
  { pos: 9, team: 'Kick Sauber', points: 10, wins: 0, country: '🇨🇭' },
  { pos: 10, team: 'RB', points: 8, wins: 0, country: '🇮🇹' },
]

const driverStandings = [
  { pos: 1, driver: 'Lewis Hamilton', team: 'Ferrari', points: 100, wins: 2, country: '🇬🇧' },
  { pos: 2, driver: 'Charles Leclerc', team: 'Ferrari', points: 89, wins: 1, country: '🇲🇨' },
  { pos: 3, driver: 'Max Verstappen', team: 'Red Bull', points: 88, wins: 2, country: '🇳🇱' },
  { pos: 4, driver: 'Sergio Perez', team: 'Red Bull', points: 88, wins: 0, country: '🇲🇽' },
  { pos: 5, driver: 'George Russell', team: 'Mercedes', points: 82, wins: 1, country: '🇬🇧' },
  { pos: 6, driver: 'Lando Norris', team: 'McLaren', points: 75, wins: 0, country: '🇬🇧' },
  { pos: 7, driver: 'Fernando Alonso', team: 'Aston Martin', points: 52, wins: 0, country: '🇪🇸' },
  { pos: 8, driver: 'Oscar Piastri', team: 'McLaren', points: 66, wins: 0, country: '🇦🇺' },
  { pos: 9, driver: 'Kimi Antonelli', team: 'Mercedes', points: 72, wins: 0, country: '🇮🇹' },
  { pos: 10, driver: 'Lance Stroll', team: 'Aston Martin', points: 36, wins: 0, country: '🇨🇦' },
]

const raceResults = [
  { round: 6, race: 'Miami GP', date: 'May 4', results: [
    { pos: 1, driver: 'Leclerc', team: 'Ferrari', time: '1:30:12.345', points: 25 },
    { pos: 2, driver: 'Hamilton', team: 'Ferrari', time: '+2.341s', points: 18 },
    { pos: 3, driver: 'Verstappen', team: 'Red Bull', time: '+4.123s', points: 15 },
    { pos: 4, driver: 'Norris', team: 'McLaren', time: '+6.234s', points: 12 },
    { pos: 5, driver: 'Russell', team: 'Mercedes', time: '+8.456s', points: 10 },
  ]},
  { round: 5, race: 'China GP', date: 'Apr 20', results: [
    { pos: 1, driver: 'Hamilton', team: 'Ferrari', time: '1:28:44.233', points: 25 },
    { pos: 2, driver: 'Verstappen', team: 'Red Bull', time: '+1.234s', points: 18 },
    { pos: 3, driver: 'Piastri', team: 'McLaren', time: '+3.567s', points: 15 },
    { pos: 4, driver: 'Leclerc', team: 'Ferrari', time: '+5.891s', points: 12 },
    { pos: 5, driver: 'Norris', team: 'McLaren', time: '+7.234s', points: 10 },
  ]},
]

export default function Results() {
  const [tab, setTab] = useState('drivers')
  const [expandedRace, setExpandedRace] = useState(raceResults[0].round)

  return (
    <motion.div variants={pageVariants} initial="initial" animate="animate" exit="exit">
      <Helmet><title>Results & Standings | Scuderia Ferrari F1</title></Helmet>

      <div className="page-header">
        <div className="container">
          <div className="red-bar" style={{ margin: '0 auto 16px' }} />
          <h1>2025 <span className="accent-red">Standings</span></h1>
          <p>Ferrari leads the Constructors Championship. The battle continues.</p>
        </div>
      </div>

      {/* Standings Tabs */}
      <section className="section">
        <div className="container">
          <div className="tabs">
            {['drivers', 'constructors'].map((t) => (
              <button
                key={t}
                className={`tab-btn ${tab === t ? 'active' : ''}`}
                onClick={() => setTab(t)}
              >
                {t.charAt(0).toUpperCase() + t.slice(1)} Championship
              </button>
            ))}
          </div>

          {tab === 'drivers' && (
            <div className="standings-table-wrap">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>POS</th>
                    <th>Driver</th>
                    <th>Team</th>
                    <th>Wins</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {driverStandings.map((row, i) => (
                    <motion.tr
                      key={row.driver}
                      className={row.team === 'Ferrari' ? 'ferrari-row' : ''}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td className="pos-cell">
                        <span className={`pos-badge pos-badge--${row.pos}`}>{row.pos}</span>
                      </td>
                      <td className="driver-cell">
                        <span>{row.country} {row.driver}</span>
                      </td>
                      <td>
                        {row.team === 'Ferrari' ? (
                          <span className="badge badge-red" style={{ fontSize: '0.6rem' }}>Ferrari</span>
                        ) : row.team}
                      </td>
                      <td className="wins-cell">{row.wins > 0 ? `🏆 ${row.wins}` : row.wins}</td>
                      <td className="pts-cell">{row.points}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {tab === 'constructors' && (
            <div className="standings-table-wrap">
              <table className="standings-table">
                <thead>
                  <tr>
                    <th>POS</th>
                    <th>Team</th>
                    <th>Wins</th>
                    <th>Points</th>
                  </tr>
                </thead>
                <tbody>
                  {constructorStandings.map((row, i) => (
                    <motion.tr
                      key={row.team}
                      className={row.team === 'Scuderia Ferrari' ? 'ferrari-row' : ''}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.04 }}
                    >
                      <td className="pos-cell">
                        <span className={`pos-badge pos-badge--${row.pos}`}>{row.pos}</span>
                      </td>
                      <td className="driver-cell">{row.country} {row.team}</td>
                      <td className="wins-cell">{row.wins > 0 ? `🏆 ${row.wins}` : row.wins}</td>
                      <td className="pts-cell">{row.points}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>

      <hr className="hr-red" />

      {/* Race Results */}
      <section className="section">
        <div className="container">
          <div className="section-header">
            <div className="red-bar" style={{ margin: '0 auto 16px' }} />
            <h2 className="section-title">Race Results</h2>
            <p className="section-subtitle">Latest race breakdown — lap by lap, second by second.</p>
          </div>

          {raceResults.map((race) => (
            <div key={race.round} className="race-results-block">
              <button
                className="race-results-header"
                onClick={() => setExpandedRace(expandedRace === race.round ? null : race.round)}
              >
                <div>
                  <span className="badge badge-dark">Round {race.round}</span>
                  <span style={{ marginLeft: '16px', fontFamily: 'var(--font-heading)', fontSize: '1rem', fontWeight: 700 }}>{race.race}</span>
                  <span style={{ marginLeft: '16px', color: 'var(--ferrari-gray)', fontSize: '0.875rem' }}>{race.date}</span>
                </div>
                <span>{expandedRace === race.round ? '▲' : '▼'}</span>
              </button>

              {expandedRace === race.round && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                >
                  <table className="race-detail-table">
                    <thead>
                      <tr>
                        <th>POS</th>
                        <th>Driver</th>
                        <th>Team</th>
                        <th>Time / Gap</th>
                        <th>Pts</th>
                      </tr>
                    </thead>
                    <tbody>
                      {race.results.map((r) => (
                        <tr key={r.driver} className={r.team === 'Ferrari' ? 'ferrari-row' : ''}>
                          <td className="pos-cell">
                            <span className={`pos-badge pos-badge--${r.pos}`}>{r.pos}</span>
                          </td>
                          <td className="driver-cell">{r.driver}</td>
                          <td>
                            {r.team === 'Ferrari' ? (
                              <span className="badge badge-red" style={{ fontSize: '0.6rem' }}>Ferrari</span>
                            ) : r.team}
                          </td>
                          <td style={{ fontFamily: 'var(--font-heading)', fontSize: '0.8rem' }}>{r.time}</td>
                          <td className="pts-cell">{r.points}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </motion.div>
              )}
            </div>
          ))}
        </div>
      </section>
    </motion.div>
  )
}
