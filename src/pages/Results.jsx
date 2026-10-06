import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AnalysisStatus from "../components/AnalysisStatus";
import NutritionCard from "../components/NutritionCard";
import IngredientList from "../components/IngredientList";
import AdditiveList from "../components/AdditiveList";
import AlternativeFoodCard from "../components/AlternativeFoodCard";
import { mockAnalysisResult } from "../data/mockData";
import "./Results.css";

export default function Results() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("foodlens_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        setResult(mockAnalysisResult);
      }
    } else {
      // No upload — show mock data with a banner
      setResult(mockAnalysisResult);
    }
  }, []);

  if (!result) {
    return (
      <div className="results-loading">
        <div className="results-loading__spinner" aria-hidden="true" />
        <p>Loading results…</p>
      </div>
    );
  }

  const isMockImage = !result.image;

  return (
    <main className="results-page">
      <div className="container results-page__inner">
        {/* Demo Banner */}
        <div className="results-demo-banner" role="status">
          🚧 <strong>Demo Mode:</strong> Results below are mock data only. The AI backend is not yet connected.
        </div>

        {/* Page header */}
        <div className="results-page__header animate-fade-in-up">
          <button
            className="results-back-btn"
            onClick={() => navigate("/analyze")}
            aria-label="Back to analyze"
          >
            ← Back to Analyze
          </button>
          <div className="section-tag">📊 Analysis Report</div>
          <h1 className="section-title">Analysis Results</h1>
        </div>

        {/* Product info card */}
        <div className="product-info-card card animate-fade-in-up">
          <div className="product-info-card__img-wrap">
            {result.image ? (
              <img src={result.image} alt={result.productName} className="product-info-card__img" />
            ) : (
              <div className="product-info-card__img-placeholder">
                🍟
              </div>
            )}
          </div>
          <div className="product-info-card__details">
            <p className="product-info-card__brand">{result.brand}</p>
            <h2 className="product-info-card__name">{result.productName}</h2>
            <div className="product-info-card__meta">
              <span>📦 {result.category}</span>
              <span>⚖️ {result.netWeight}</span>
              <span>🥄 {result.servingSize}</span>
            </div>
            {isMockImage && (
              <p className="product-info-card__mock-note">
                ⓘ No image available — real product image will appear here after upload.
              </p>
            )}
          </div>
        </div>

        {/* Overall Status */}
        <div className="animate-fade-in-up">
          <AnalysisStatus status={result.overallStatus} />
        </div>

        {/* Two column layout */}
        <div className="results-grid">
          <div className="results-grid__left">
            <IngredientList ingredients={result.ingredients} />
            <AdditiveList additives={result.additives} />
          </div>
          <div className="results-grid__right">
            <NutritionCard nutrition={result.nutrition} />
            <ObservationsCard
              title="🏛️ FSSAI Observations"
              items={result.fssaiObservations}
              noteText="Based on FSSAI FSS Act 2006 and labelling regulations."
            />
            <ObservationsCard
              title="🌍 WHO Nutrition Observations"
              items={result.whoObservations}
              noteText="Based on WHO dietary guidelines and 2023 nutrition reports."
            />
          </div>
        </div>

        {/* Health Info */}
        <div className="health-info-card card animate-fade-in-up">
          <h3 className="health-info-card__title">💚 Health Information</h3>
          <p className="health-info-card__disclaimer">
            ⚠️ The following is informational content only and does not constitute medical advice.
            Consult a qualified nutritionist or doctor for personalised dietary guidance.
          </p>
          <ul className="health-info-list">
            {result.healthInfo.map((item, i) => (
              <li key={i} className="health-info-list__item">
                <span className="health-info-list__dot" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        {/* Alternatives */}
        <div className="animate-fade-in-up">
          <AlternativeFoodCard alternatives={result.alternatives} />
        </div>

        {/* Analyze another */}
        <div className="results-page__footer">
          <button className="btn-primary" onClick={() => navigate("/analyze")}>
            🔬 Analyze Another Product
          </button>
        </div>
      </div>
    </main>
  );
}

function ObservationsCard({ title, items, noteText }) {
  const TYPE_CONFIG = {
    info: { icon: "ℹ️", className: "obs--info" },
    warning: { icon: "⚠️", className: "obs--warning" },
    good: { icon: "✅", className: "obs--good" },
  };

  return (
    <div className="obs-card card">
      <h3 className="obs-card__title">{title}</h3>
      <p className="obs-card__note">{noteText}</p>
      <div className="obs-card__note-mock">
        ⓘ Mock data — real observations will be generated by the RAG-based AI pipeline.
      </div>
      <div className="obs-list">
        {items.map((item, i) => {
          const config = TYPE_CONFIG[item.type] || TYPE_CONFIG.info;
          return (
            <div key={i} className={`obs-item ${config.className}`}>
              <span className="obs-item__icon" aria-hidden="true">{config.icon}</span>
              <p className="obs-item__text">{item.text}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
