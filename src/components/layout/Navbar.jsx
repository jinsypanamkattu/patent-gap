import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useStore } from '../../hooks/useStore'
import { useAuth } from '../../hooks/useAuth'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const menuRef = useRef(null)
  const hamburgerRef = useRef(null)
  const location = useLocation()
  const navigate = useNavigate()

  // ── Auth ──
  const { auth } = useStore()
  const { logout } = useAuth()

  const doLogout = () => {
    logout()
    navigate('/login')
    setMenuOpen(false)
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    if (!menuOpen) return
    const onClick = (e) => {
      if (
        hamburgerRef.current && !hamburgerRef.current.contains(e.target) &&
        menuRef.current && !menuRef.current.contains(e.target)
      ) {
        setMenuOpen(false)
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [menuOpen])

  useEffect(() => {
    setMenuOpen(false)
  }, [location])

  const toggleMenu = (e) => {
    e.stopPropagation()
    setMenuOpen(o => !o)
  }

  const isHome = location.pathname === '/'

  return (
    <>
      <nav className={`nav${scrolled ? ' scrolled' : ''}`} id="siteNav">
        <Link to="/" className="nav-brand">
          <div className="nav-glyph">
            <img
              src="logo.png"
              alt="Patent Gap AI"
              className="w-5.5 h-5.5 object-contain block"
            />
          </div>
          <span className="nav-wordmark">Patent Gap AI</span>
        </Link>

        <ul className="nav-links">
          {isHome ? (
            <>
              <li><a href="#opportunity">Opportunity</a></li>
              <li><a href="#how-it-works">How It Works</a></li>
              <li><a href="#attorneys">Attorneys</a></li>
              <li><a href="#early-access">Early Access</a></li>
            </>
          ) : (
            <>
              <li><Link to="/#opportunity">Opportunity</Link></li>
              <li><Link to="/#how-it-works">How It Works</Link></li>
              <li><Link to="/#attorneys">Attorneys</Link></li>
              <li><Link to="/#early-access">Early Access</Link></li>
            </>
          )}
        </ul>

        {/* ── Desktop Actions — auth-aware ── */}
        <div className="nav-actions">
          {auth.isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className={`nav-btn-login${location.pathname === '/dashboard' ? ' active' : ''}`}
              >
                Dashboard
              </Link>
              <Link
                to="/profile"
                className={`nav-btn-ghost${location.pathname === '/profile' ? ' active' : ''}`}
              >
                Profile
              </Link>
              <button className="nav-btn-dark" onClick={doLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="nav-btn-login">Login</Link>
              <Link to="/contact" className="nav-btn-ghost">Contact Us</Link>
              <Link to="/request-demo" className="nav-btn-dark">Request Demo</Link>
            </>
          )}
        </div>

        <button
          ref={hamburgerRef}
          className={`nav-hamburger${menuOpen ? ' open' : ''}`}
          aria-label="Menu"
          onClick={toggleMenu}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* ── Mobile Menu — auth-aware ── */}
      <div
        ref={menuRef}
        className={`nav-mobile-menu${menuOpen ? ' visible open' : ''}`}
      >
        {isHome ? (
          <>
            <a href="#opportunity"  className="mob-link" onClick={() => setMenuOpen(false)}>Opportunity</a>
            <a href="#how-it-works" className="mob-link" onClick={() => setMenuOpen(false)}>How It Works</a>
            <a href="#attorneys"    className="mob-link" onClick={() => setMenuOpen(false)}>Attorneys</a>
            <a href="#early-access" className="mob-link" onClick={() => setMenuOpen(false)}>Early Access</a>
          </>
        ) : (
          <>
            <Link to="/#opportunity"  className="mob-link">Opportunity</Link>
            <Link to="/#how-it-works" className="mob-link">How It Works</Link>
            <Link to="/#attorneys"    className="mob-link">Attorneys</Link>
            <Link to="/#early-access" className="mob-link">Early Access</Link>
          </>
        )}

        <div className="mob-actions">
          {auth.isAuthenticated ? (
            <>
              <Link to="/dashboard" className="mob-ghost" onClick={() => setMenuOpen(false)}>
                Dashboard
              </Link>
              <Link to="/profile" className="mob-ghost" onClick={() => setMenuOpen(false)}>
                Profile
              </Link>
              <button className="mob-cta" onClick={doLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login"        className="mob-ghost" onClick={() => setMenuOpen(false)}>Login</Link>
              <Link to="/contact"      className="mob-ghost" onClick={() => setMenuOpen(false)}>Contact Us</Link>
              <Link to="/request-demo" className="mob-cta"   onClick={() => setMenuOpen(false)}>Request Demo</Link>
            </>
          )}
        </div>
      </div>
    </>
  )
}