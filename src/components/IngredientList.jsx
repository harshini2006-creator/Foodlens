import "./IngredientList.css";

const CONCERN_CONFIG = {
  none: { label: "Safe", className: "concern--none" },
  low: { label: "Low Concern", className: "concern--low" },
  moderate: { label: "Moderate", className: "concern--moderate" },
  high: { label: "High Concern", className: "concern--high" },
};

export default function IngredientList({ ingredients }) {
  return (
    <div className="ingredient-list card">
      <div className="ingredient-list__header">
        <h3 className="ingredient-list__title">🧪 Ingredients</h3>
        <span className="ingredient-list__count">{ingredients.length} identified</span>
      </div>
      <div className="ingredient-list__note">
        ⓘ Mock data — ingredients will be extracted from the product label image by OCR.
      </div>
      <div className="ingredient-list__items">
        {ingredients.map((ing, i) => {
          const config = CONCERN_CONFIG[ing.concern] || CONCERN_CONFIG.none;
          return (
            <div key={i} className="ingredient-item">
              <div className="ingredient-item__left">
                <span className="ingredient-item__name">{ing.name}</span>
                {ing.note && (
                  <span className="ingredient-item__note">{ing.note}</span>
                )}
              </div>
              <span className={`ingredient-item__concern ${config.className}`}>
                {config.label}
              </span>
            </div>
          );
        })}
      </div>
      <div className="ingredient-list__legend">
        <span className="legend-item">
          <span className="legend-dot concern--none" />Safe
        </span>
        <span className="legend-item">
          <span className="legend-dot concern--low" />Low
        </span>
        <span className="legend-item">
          <span className="legend-dot concern--moderate" />Moderate
        </span>
        <span className="legend-item">
          <span className="legend-dot concern--high" />High
        </span>
      </div>
    </div>
  );
}
