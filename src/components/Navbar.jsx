import { useState, useEffect } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/analyze", label: "Analyze Food" },
    { to: "/how-it-works", label: "How It Works" },
    { to: "/about", label: "About" },
  ];

  return (
    <header className={`navbar ${scrolled ? "navbar--scrolled" : ""}`}>
      <div className="container navbar__inner">
        {/* Logo */}
        <Link to="/" className="navbar__logo">
          <span className="navbar__logo-icon">🔍</span>
          <span className="navbar__logo-text">
            Food<span className="navbar__logo-accent">Lens</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="navbar__links" aria-label="Main navigation">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === "/"}
              className={({ isActive }) =>
                `navbar__link ${isActive ? "navbar__link--active" : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* CTA */}
        <button
          className="btn-primary navbar__cta"
          onClick={() => navigate("/analyze")}
        >
          Try FoodLens
        </button>

        {/* Hamburger */}
        <button
          className="navbar__hamburger"
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((o) => !o)}
        >
          <span className={`hamburger__bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger__bar ${menuOpen ? "open" : ""}`} />
          <span className={`hamburger__bar ${menuOpen ? "open" : ""}`} />
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`navbar__mobile ${menuOpen ? "navbar__mobile--open" : ""}`}>
        {navLinks.map((link) => (
          <NavLink
            key={link.to}
            to={link.to}
            end={link.to === "/"}
            className={({ isActive }) =>
              `navbar__mobile-link ${isActive ? "navbar__mobile-link--active" : ""}`
            }
            onClick={() => setMenuOpen(false)}
          >
            {link.label}
          </NavLink>
        ))}
        <button
          className="btn-primary"
          onClick={() => { setMenuOpen(false); navigate("/analyze"); }}
          style={{ marginTop: "8px", width: "100%", justifyContent: "center" }}
        >
          Try FoodLens
        </button>
      </div>
    </header>
  );
}
