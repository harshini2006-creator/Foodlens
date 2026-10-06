import "./AlternativeFoodCard.css";

export default function AlternativeFoodCard({ alternatives }) {
  return (
    <div className="alt-section card">
      <h3 className="alt-section__title">🥗 Healthier Alternatives</h3>
      <p className="alt-section__subtitle">
        Based on the nutritional profile of this product, here are some better snack options:
      </p>
      <div className="alt-section__note">
        ⓘ Mock suggestions — AI will personalise alternatives based on actual product data.
      </div>
      <div className="alt-grid">
        {alternatives.map((alt, i) => (
          <div key={i} className="alt-card">
            <div className="alt-card__top">
              <span className="alt-card__name">{alt.name}</span>
              <div className="alt-card__score">
                <span className="alt-card__score-value">{alt.healthScore}</span>
                <span className="alt-card__score-label">/100</span>
              </div>
            </div>
            <p className="alt-card__reason">{alt.reason}</p>
            <div className="alt-card__bar-bg">
              <div
                className="alt-card__bar"
                style={{ width: `${alt.healthScore}%` }}
                role="progressbar"
                aria-valuenow={alt.healthScore}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`${alt.name} health score: ${alt.healthScore}`}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
