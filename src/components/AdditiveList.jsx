import "./AdditiveList.css";

const CONCERN_MAP = {
  none: { label: "Safe", bg: "#dcfce7", color: "#15803d" },
  low: { label: "Low", bg: "#dbeafe", color: "#1d4ed8" },
  moderate: { label: "Moderate", bg: "#fef3c7", color: "#92400e" },
  high: { label: "High Concern", bg: "#fee2e2", color: "#991b1b" },
};

export default function AdditiveList({ additives }) {
  return (
    <div className="additive-list card">
      <div className="additive-list__header">
        <h3 className="additive-list__title">⚗️ Additives & E-Numbers</h3>
        <span className="additive-list__count">{additives.length} found</span>
      </div>
      <div className="additive-list__note">
        ⓘ Mock data — additives will be decoded from the product label by the AI pipeline.
      </div>
      <div className="additive-list__items">
        {additives.map((add, i) => {
          const concern = CONCERN_MAP[add.concern] || CONCERN_MAP.low;
          return (
            <div key={i} className="additive-item">
              <div className="additive-item__top">
                <span className="additive-item__code">{add.code}</span>
                <span className="additive-item__name">{add.name}</span>
                <span
                  className="additive-item__badge"
                  style={{ background: concern.bg, color: concern.color }}
                >
                  {concern.label}
                </span>
              </div>
              <p className="additive-item__purpose">
                <strong>Purpose:</strong> {add.purpose}
              </p>
              <p className="additive-item__note">{add.note}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
