import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Results.css";

export default function Results() {
  const [result, setResult] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = sessionStorage.getItem("foodlens_ocr_result");
    if (stored) {
      try {
        setResult(JSON.parse(stored));
      } catch {
        navigate("/analyze");
      }
    } else {
      navigate("/analyze");
    }
  }, [navigate]);

  if (!result) {
    return (
      <div className="results-loading">
        <div className="results-loading__spinner" aria-hidden="true" />
        <p>Loading results…</p>
      </div>
    );
  }

  return (
    <main className="results-page">
      <div className="container results-page__inner">
        {/* Header */}
        <div className="results-page__header animate-fade-in-up">
          <button
            className="results-back-btn"
            onClick={() => navigate("/analyze")}
            aria-label="Back to analyze"
          >
            ← Back to Analyze
          </button>
          <div className="section-tag">📊 OCR Result</div>
          <h1 className="section-title">Extracted Text</h1>
        </div>

        {/* Image + raw text */}
        <div className="ocr-result-grid animate-fade-in-up">
          {/* Image preview */}
          {result.imageUrl && (
            <div className="ocr-image-card card">
              <h3 className="ocr-image-card__title">📸 Uploaded Image</h3>
              <img
                src={result.imageUrl}
                alt="Uploaded food packet"
                className="ocr-image-card__img"
              />
            </div>
          )}

          {/* Extracted text */}
          <div className="ocr-text-card card">
            <h3 className="ocr-text-card__title">🔍 Extracted Text</h3>
            <p className="ocr-text-card__note">
              Raw text extracted by PaddleOCR from your food packet image.
            </p>
            <pre className="ocr-text-card__content">
              {result.raw_text || "(No text detected)"}
            </pre>
          </div>
        </div>

        {/* Footer */}
        <div className="results-page__footer">
          <button className="btn-primary" onClick={() => navigate("/analyze")}>
            🔬 Analyze Another Product
          </button>
        </div>
      </div>
    </main>
  );
}
