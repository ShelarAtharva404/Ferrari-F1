import { Link } from 'react-router-dom'
import { FaInstagram, FaTwitter, FaYoutube, FaFacebook, FaTwitch } from 'react-icons/fa'
import './Footer.css'

const footerLinks = {
  Racing: [
    { label: 'Race Calendar', path: '/calendar' },
    { label: 'Results', path: '/results' },
    { label: 'Standings', path: '/results' },
    { label: 'Cars', path: '/cars' },
  ],
  Team: [
    { label: 'Drivers', path: '/team' },
    { label: 'About Ferrari', path: '/about' },
    { label: 'History', path: '/about' },
    { label: 'Partners', path: '/about' },
  ],
  Media: [
    { label: 'Latest News', path: '/news' },
    { label: 'Gallery', path: '/news' },
    { label: 'Videos', path: '/news' },
    { label: 'Press', path: '/news' },
  ],
  Shop: [
    { label: 'Merchandise', path: '/store' },
    { label: 'Apparel', path: '/store' },
    { label: 'Accessories', path: '/store' },
    { label: 'Gifts', path: '/store' },
  ],
}

const socials = [
  { icon: <FaInstagram />, href: 'https://instagram.com/scuderiaferrari', label: 'Instagram' },
  { icon: <FaTwitter />, href: 'https://twitter.com/scuderiaferrari', label: 'Twitter' },
  { icon: <FaYoutube />, href: 'https://youtube.com/ferrari', label: 'YouTube' },
  { icon: <FaFacebook />, href: 'https://facebook.com/ferrari', label: 'Facebook' },
  { icon: <FaTwitch />, href: 'https://twitch.tv/ferrari', label: 'Twitch' },
]

export default function Footer() {
  return (
    <footer className="footer">
      {/* Newsletter Strip */}
      <div className="footer__newsletter">
        <div className="container footer__newsletter-inner">
          <div>
            <h3 className="footer__newsletter-title">Stay in the Race</h3>
            <p className="footer__newsletter-sub">Get exclusive Ferrari F1 updates, race results and behind-the-scenes content.</p>
          </div>
          <form className="footer__newsletter-form" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email address"
              className="footer__newsletter-input"
              id="newsletter-email"
            />
            <button type="submit" className="btn btn-primary">Subscribe</button>
          </form>
        </div>
      </div>

      {/* Main Footer */}
      <div className="footer__main">
        <div className="container">
          <div className="footer__grid">
            {/* Brand */}
            <div className="footer__brand">
              <Link to="/" className="footer__logo">
                <div className="footer__logo-badge">SF</div>
                <div>
                  <span className="footer__logo-scuderia">Scuderia</span>
                  <span className="footer__logo-ferrari">Ferrari</span>
                </div>
              </Link>
              <p className="footer__brand-text">
                Since 1950, Scuderia Ferrari has been the heart and soul of Formula 1. 
                The most successful team in the history of the sport, driven by passion 
                and powered by excellence.
              </p>
              <div className="footer__socials">
                {socials.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="footer__social-link"
                    aria-label={s.label}
                  >
                    {s.icon}
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category} className="footer__col">
                <h4 className="footer__col-title">{category}</h4>
                <ul className="footer__col-links">
                  {links.map((link) => (
                    <li key={link.label}>
                      <Link to={link.path} className="footer__col-link">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copyright">
            © {new Date().getFullYear()} Scuderia Ferrari Fan Portal. Not affiliated with the official Ferrari N.V. or Formula 1.
          </p>
          <div className="footer__bottom-links">
            <a href="#" className="footer__bottom-link">Privacy Policy</a>
            <a href="#" className="footer__bottom-link">Terms of Use</a>
            <a href="#" className="footer__bottom-link">Cookie Settings</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
