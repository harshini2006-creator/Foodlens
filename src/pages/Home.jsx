import { useNavigate } from "react-router-dom";
import FeatureCard from "../components/FeatureCard";
import { features, howItWorksSteps } from "../data/mockData";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <main className="home">
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="hero">
        <div className="container hero__inner">
          <div className="hero__content animate-fade-in-up">
            <div className="section-tag">🇮🇳 Made for Indian Food Labels</div>
            <h1 className="hero__title">
              Know What&apos;s Inside<br />
              <span className="hero__title-accent">Your Food</span>
            </h1>
            <p className="hero__desc">
              FoodLens analyzes the ingredients and nutrition information on Indian
              packaged food products — chips, biscuits, noodles, and more — and
              compares them against WHO and FSSAI guidelines to give you clear,
              actionable health insights.
            </p>
            <div className="hero__actions">
              <button
                className="btn-primary hero__btn"
                onClick={() => navigate("/analyze")}
              >
                🔬 Analyze Your Food
              </button>
              <button
                className="btn-secondary hero__btn"
                onClick={() => navigate("/how-it-works")}
              >
                How It Works
              </button>
            </div>
            <div className="hero__stats">
              <div className="hero__stat">
                <span className="hero__stat-value">WHO</span>
                <span className="hero__stat-label">Guidelines</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">FSSAI</span>
                <span className="hero__stat-label">Regulations</span>
              </div>
              <div className="hero__stat-divider" />
              <div className="hero__stat">
                <span className="hero__stat-value">AI</span>
                <span className="hero__stat-label">Powered RAG</span>
              </div>
            </div>
          </div>

          <div className="hero__visual animate-fade-in">
            <div className="hero__visual-card">
              <div className="hero__visual-header">
                <span className="hero__visual-tag">📦 Sample Analysis</span>
                <span className="hero__visual-status warning">Needs Attention</span>
              </div>
              <div className="hero__visual-product">
                <div className="hero__visual-product-icon">🍟</div>
                <div>
                  <p className="hero__visual-product-name">Potato Chips — Salted</p>
                  <p className="hero__visual-product-brand">Example Indian Snack</p>
                </div>
              </div>
              <div className="hero__visual-divider" />
              <div className="hero__visual-flags">
                <div className="hero__visual-flag flag--red">
                  <span>⚠️</span>
                  <span>High Sodium: 210mg/serving</span>
                </div>
                <div className="hero__visual-flag flag--yellow">
                  <span>🔶</span>
                  <span>TBHQ (INS 319) detected</span>
                </div>
                <div className="hero__visual-flag flag--red">
                  <span>⚠️</span>
                  <span>Synthetic Flavour Enhancers</span>
                </div>
                <div className="hero__visual-flag flag--green">
                  <span>✅</span>
                  <span>Zero Trans Fat</span>
                </div>
              </div>
              <div className="hero__visual-score">
                <span>Health Score</span>
                <div className="hero__visual-score-bar">
                  <div className="hero__visual-score-fill" style={{ width: "42%" }} />
                </div>
                <span className="hero__visual-score-val">42 / 100</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── How It Works ────────────────────────────────── */}
      <section className="how-section" id="how-it-works">
        <div className="container">
          <div className="how-section__head">
            <div className="section-tag">⚙️ The Process</div>
            <h2 className="section-title">How FoodLens Works</h2>
            <p className="section-subtitle">
              From a single photo to a detailed health report — four simple steps.
            </p>
          </div>
          <div className="how-grid">
            {howItWorksSteps.map((step, i) => (
              <div key={step.step} className="how-card" style={{ animationDelay: `${i * 100}ms` }}>
                {i < howItWorksSteps.length - 1 && (
                  <div className="how-card__arrow" aria-hidden="true">→</div>
                )}
                <div className="how-card__step">{step.step}</div>
                <div className="how-card__icon">{step.icon}</div>
                <h3 className="how-card__title">{step.title}</h3>
                <p className="how-card__desc">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Features ────────────────────────────────────── */}
      <section className="features-section">
        <div className="container">
          <div className="features-section__head">
            <div className="section-tag">✨ Capabilities</div>
            <h2 className="section-title">Everything FoodLens Offers</h2>
            <p className="section-subtitle">
              A complete food intelligence platform built on AI, OCR, and authoritative health data.
            </p>
          </div>
          <div className="features-grid">
            {features.map((f, i) => (
              <FeatureCard
                key={f.title}
                icon={f.icon}
                title={f.title}
                description={f.description}
                delay={i * 80}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ── Why FoodLens ────────────────────────────────── */}
      <section className="why-section">
        <div className="container why-section__inner">
          <div className="why-section__content">
            <div className="section-tag">💡 Why FoodLens?</div>
            <h2 className="section-title">Ingredient labels are confusing.<br />We decode them.</h2>
            <p className="section-subtitle">
              Most Indian packaged food labels list ingredients using obscure INS codes and
              technical names. FoodLens translates this into plain language, flags concerns,
              and shows you exactly what you&apos;re eating — in seconds.
            </p>
            <ul className="why-list">
              {[
                "INS codes decoded in plain language",
                "WHO & FSSAI based health context",
                "No sign-up or account required",
                "Built for Indian food products",
                "AI-powered, not just keyword matching",
              ].map((item) => (
                <li key={item} className="why-list__item">
                  <span className="why-list__check">✓</span> {item}
                </li>
              ))}
            </ul>
            <button
              className="btn-primary"
              onClick={() => navigate("/analyze")}
              style={{ marginTop: "32px" }}
            >
              Try It Now — It&apos;s Free
            </button>
          </div>
          <div className="why-section__visual">
            <div className="why-card">
              <p className="why-card__label">Before FoodLens</p>
              <p className="why-card__text">
                &ldquo;Flavour Enhancer (INS 627, INS 631), Antioxidant (INS 319),
                Acidity Regulator (INS 330)…&rdquo;
              </p>
              <p className="why-card__question">😕 What does any of this mean?</p>
            </div>
            <div className="why-arrow">↓</div>
            <div className="why-card why-card--after">
              <p className="why-card__label">After FoodLens</p>
              <div className="why-card__flags">
                <span className="why-flag why-flag--red">⚠️ INS 627 — Synthetic purine, avoid for children</span>
                <span className="why-flag why-flag--red">⚠️ INS 319 — TBHQ preservative, limit exposure</span>
                <span className="why-flag why-flag--green">✅ INS 330 — Citric acid, generally safe</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA Banner ──────────────────────────────────── */}
      <section className="cta-section">
        <div className="container cta-section__inner">
          <h2 className="cta-section__title">Ready to know what&apos;s in your food?</h2>
          <p className="cta-section__sub">
            Upload a photo of any Indian food packet and get your free analysis.
          </p>
          <button className="btn-primary cta-section__btn" onClick={() => navigate("/analyze")}>
            🔬 Analyze Your Food
          </button>
        </div>
      </section>
    </main>
  );
}
