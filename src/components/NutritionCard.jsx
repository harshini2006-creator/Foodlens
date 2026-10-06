import "./NutritionCard.css";

const STATUS_COLOR = {
  good: { bar: "#16a34a", bg: "#dcfce7", text: "#15803d" },
  moderate: { bar: "#d97706", bg: "#fef3c7", text: "#92400e" },
  high: { bar: "#dc2626", bg: "#fee2e2", text: "#991b1b" },
  low: { bar: "#64748b", bg: "#f1f5f9", text: "#475569" },
};

export default function NutritionCard({ nutrition }) {
  return (
    <div className="nutrition-card card">
      <div className="nutrition-card__header">
        <h3 className="nutrition-card__title">📊 Nutrition Information</h3>
        <span className="nutrition-card__serving">{nutrition.perServing}</span>
      </div>
      <div className="nutrition-card__note">
        ⓘ Mock data — real values will be extracted from the product image by the AI backend.
      </div>
      <div className="nutrition-card__list">
        {nutrition.items.map((item) => {
          const colors = STATUS_COLOR[item.status] || STATUS_COLOR.low;
          return (
            <div key={item.name} className="nutrition-item">
              <div className="nutrition-item__top">
                <span className="nutrition-item__name">{item.name}</span>
                <span className="nutrition-item__value">{item.value}</span>
                <span
                  className="nutrition-item__dv"
                  style={{ background: colors.bg, color: colors.text }}
                >
                  {item.dv}% DV
                </span>
              </div>
              <div className="nutrition-item__bar-bg">
                <div
                  className="nutrition-item__bar"
                  style={{
                    width: `${Math.min(item.dv * 3, 100)}%`,
                    background: colors.bar,
                  }}
                  role="progressbar"
                  aria-valuenow={item.dv}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-label={`${item.name} ${item.dv}% daily value`}
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="nutrition-card__dv-note">
        * Percent Daily Values (DV) are based on a 2000 kcal diet.
      </div>
    </div>
  );
}
