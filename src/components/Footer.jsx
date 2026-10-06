import { Link } from "react-router-dom";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__inner">
        <div className="footer__brand">
          <Link to="/" className="footer__logo">
            <span>🔍</span>
            <span>
              Food<span className="footer__logo-accent">Lens</span>
            </span>
          </Link>
          <p className="footer__tagline">
            Know what&apos;s inside your food. Powered by AI and WHO/FSSAI guidelines.
          </p>
          <p className="footer__disclaimer">
            ⚠️ For informational purposes only. Not a substitute for medical advice.
          </p>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Navigation</h4>
          <ul className="footer__links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/analyze">Analyze Food</Link></li>
            <li><Link to="/how-it-works">How It Works</Link></li>
            <li><Link to="/about">About</Link></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Technology</h4>
          <ul className="footer__links">
            <li><span>React + Vite</span></li>
            <li><span>FastAPI (upcoming)</span></li>
            <li><span>LangChain / RAG (upcoming)</span></li>
            <li><span>OCR Engine (upcoming)</span></li>
          </ul>
        </div>

        <div className="footer__links-group">
          <h4 className="footer__links-title">Guidelines</h4>
          <ul className="footer__links">
            <li>
              <a href="https://www.who.int" target="_blank" rel="noopener noreferrer">
                WHO Standards ↗
              </a>
            </li>
            <li>
              <a href="https://www.fssai.gov.in" target="_blank" rel="noopener noreferrer">
                FSSAI Regulations ↗
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© 2024 FoodLens. CSE College Project — Built with React & Vite.</p>
          <p className="footer__bottom-note">Mock data only — AI backend integration in progress.</p>
        </div>
      </div>
    </footer>
  );
}
