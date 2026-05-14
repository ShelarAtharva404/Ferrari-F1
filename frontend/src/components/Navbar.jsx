import { useState, useEffect, useRef } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { FaBars, FaTimes } from 'react-icons/fa'
import './Navbar.css'

const navLinks = [
  { path: '/', label: 'Home' },
  { path: '/team', label: 'Team' },
  { path: '/cars', label: 'Cars' },
  { path: '/calendar', label: 'Calendar' },
  { path: '/results', label: 'Results' },
  { path: '/news', label: 'News' },
  { path: '/store', label: 'Store' },
  { path: '/about', label: 'About' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [location])

  return (
    <nav className={`navbar ${scrolled ? 'navbar--scrolled' : ''} navbar--animate`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-badge">
            <span className="logo-sf">SF</span>
          </div>
          <div className="navbar__logo-text">
            <span className="logo-scuderia">Scuderia</span>
            <span className="logo-ferrari">Ferrari</span>
          </div>
        </Link>

        {/* Desktop Links */}
        <ul className="navbar__links">
          {navLinks.map((link) => (
            <li key={link.path}>
              <NavLink
                to={link.path}
                className={({ isActive }) =>
                  `navbar__link ${isActive ? 'navbar__link--active' : ''}`
                }
                end={link.path === '/'}
              >
                {link.label}
                <span className="navbar__link-underline" />
              </NavLink>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <Link to="/store" className="btn btn-primary navbar__cta">
          Shop Now
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar__toggle"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <div className="navbar__mobile navbar__mobile--open">
          <ul>
            {navLinks.map((link) => (
              <li key={link.path}>
                <NavLink
                  to={link.path}
                  end={link.path === '/'}
                  className={({ isActive }) =>
                    `navbar__mobile-link ${isActive ? 'active' : ''}`
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  )
}
