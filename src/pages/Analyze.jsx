import { useState } from "react";
import { useNavigate } from "react-router-dom";
import UploadBox from "../components/UploadBox";
import CameraCapture from "../components/CameraCapture";
import { analyzeFood } from "../services/api";
import "./Analyze.css";

export default function Analyze() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedImageUrl, setSelectedImageUrl] = useState(null);
  const [showCamera, setShowCamera] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleFileSelected = (file) => {
    setSelectedFile(file);
    setSelectedImageUrl(URL.createObjectURL(file));
    setError("");
  };

  const handleRemove = () => {
    setSelectedFile(null);
    setSelectedImageUrl(null);
    setError("");
  };

  const handleCameraCapture = (file) => {
    handleFileSelected(file);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      setError("Please upload or capture an image first.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const result = await analyzeFood(selectedFile);
      sessionStorage.setItem(
        "foodlens_ocr_result",
        JSON.stringify({ ...result, imageUrl: selectedImageUrl }),
      );
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
            Upload or capture a photo of any packaged food product. Make sure the
            ingredient and nutrition label is clearly visible.
          </p>
        </div>

        {/* Main area */}
        <div className="analyze-page__body">
          <div className="analyze-page__upload-col animate-fade-in-up">
            {/* Input mode tabs */}
            {!selectedFile && (
              <div className="analyze-input-tabs">
                <div className="analyze-input-tabs__label">Choose how to add your image:</div>
                <button
                  className="analyze-camera-btn"
                  onClick={() => setShowCamera(true)}
                  type="button"
                >
                  📷 Use Camera
                </button>
              </div>
            )}

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
                  Extracting text…
                </>
              ) : (
                <>🔬 Analyze Food</>
              )}
            </button>

            {loading && (
              <div className="analyze-page__loading-info" role="status" aria-live="polite">
                <p>📸 Processing image with PaddleOCR…</p>
                <p>🔍 Extracting text from food label…</p>
                <p>✨ Almost done…</p>
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
          </div>
        </div>
      </div>

      {/* Camera modal */}
      {showCamera && (
        <CameraCapture
          onCapture={handleCameraCapture}
          onClose={() => setShowCamera(false)}
        />
      )}
    </main>
  );
}
