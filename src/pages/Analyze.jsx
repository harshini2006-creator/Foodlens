import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import { analyzeFood } from "../services/api";
import "./Analyze.css";

export default function Analyze() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setError("");
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setError("");
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload an image first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzeFood(selectedFile);
      // Store result in sessionStorage so Results page can read it
      sessionStorage.setItem("foodlens_result", JSON.stringify(result));
      navigate("/results");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="analyze-page">
      <div className="container analyze-page__inner">
        {/* Header */}
        <div className="analyze-page__header animate-fade-in-up">
          <div className="section-tag">📸 Upload & Analyze</div>
          <h1 className="section-title">Analyze Your Food</h1>
          <p className="section-subtitle">
            Upload a clear photo of any Indian packaged food product. Make sure the
            ingredient and nutrition label is visible in the image.
          </p>
        </div>

        {/* Main upload area */}
        <div className="analyze-page__body">
          <div className="analyze-page__upload-col animate-fade-in-up">
            <UploadBox
              onFileSelected={handleFileSelected}
              selectedFile={selectedFile}
              onRemove={handleRemove}
            />

            {error && (
              <div className="analyze-error" role="alert">
                ⚠️ {error}
              </div>
            )}

            <button
              className={`btn-primary analyze-page__analyze-btn ${loading ? "loading" : ""}`}
              onClick={handleAnalyze}
              disabled={!selectedFile || loading}
              aria-busy={loading}
            >
              {loading ? (
                <>
                  <span className="analyze-spinner" aria-hidden="true" />
                  Analyzing your food…
                </>
              ) : (
                <>🔬 Analyze Food</>
              )}
            </button>

            {loading && (
              <div className="analyze-page__loading-info" role="status" aria-live="polite">
                <p>🤖 Extracting ingredients and nutrition info…</p>
                <p>📚 Cross-referencing WHO & FSSAI guidelines…</p>
                <p>✨ Generating your health report…</p>
              </div>
            )}
          </div>

          {/* Tips panel */}
          <div className="analyze-page__tips-col animate-fade-in">
            <div className="tips-card card">
              <h3 className="tips-card__title">📷 Tips for best results</h3>
              <ul className="tips-list">
                {[
                  "Ensure the ingredient & nutrition label is clearly visible",
                  "Good lighting — avoid shadows and glare",
                  "Hold the camera steady and close to the label",
                  "Include the full label in frame",
                  "Use JPG, JPEG, or PNG format only",
                  "Max file size: 10MB",
                ].map((tip) => (
                  <li key={tip} className="tips-list__item">
                    <span className="tips-list__dot" aria-hidden="true" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>

            <div className="supported-card card">
              <h3 className="supported-card__title">🛒 Supported Products</h3>
              <div className="supported-grid">
                {[
                  { icon: "🍟", name: "Chips" },
                  { icon: "🍪", name: "Biscuits" },
                  { icon: "🍜", name: "Noodles" },
                  { icon: "🥣", name: "Cereals" },
                  { icon: "🧃", name: "Juices" },
                  { icon: "🍫", name: "Chocolates" },
                  { icon: "🥤", name: "Beverages" },
                  { icon: "🍿", name: "Popcorn" },
                ].map((item) => (
                  <div key={item.name} className="supported-item">
                    <span>{item.icon}</span>
                    <span>{item.name}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mock-notice card">
              <h3>🚧 Demo Mode</h3>
              <p>
                The AI backend is not yet connected. Uploading any food image will
                return sample mock data for a potato chips packet to demonstrate
                the analysis interface.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
