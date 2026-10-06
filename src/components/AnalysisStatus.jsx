import "./AnalysisStatus.css";

const STATUS_CONFIG = {
  good: {
    emoji: "✅",
    label: "Better Choice",
    className: "status--good",
  },
  moderate: {
    emoji: "🟡",
    label: "Moderate",
    className: "status--moderate",
  },
  warning: {
    emoji: "⚠️",
    label: "Needs Attention",
    className: "status--warning",
  },
};

export default function AnalysisStatus({ status }) {
  const config = STATUS_CONFIG[status.level] || STATUS_CONFIG.moderate;

  return (
    <div className={`analysis-status ${config.className}`}>
      <div className="analysis-status__header">
        <span className="analysis-status__emoji">{config.emoji}</span>
        <div>
          <p className="analysis-status__label">Overall Health Status</p>
          <h2 className="analysis-status__title">{status.label}</h2>
        </div>
        <div className="analysis-status__score-wrap">
          <ScoreCircle score={status.score} level={status.level} />
        </div>
      </div>
      <p className="analysis-status__summary">{status.summary}</p>
    </div>
  );
}

function ScoreCircle({ score, level }) {
  const colorMap = { good: "#16a34a", moderate: "#d97706", warning: "#dc2626" };
  const color = colorMap[level] || "#d97706";
  const circumference = 2 * Math.PI * 28;
  const dash = (score / 100) * circumference;

  return (
    <div className="score-circle">
      <svg width="72" height="72" viewBox="0 0 72 72" aria-label={`Health score: ${score} out of 100`}>
        <circle cx="36" cy="36" r="28" fill="none" stroke="rgba(0,0,0,0.08)" strokeWidth="6" />
        <circle
          cx="36" cy="36" r="28"
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${dash} ${circumference}`}
          strokeLinecap="round"
          transform="rotate(-90 36 36)"
        />
      </svg>
      <span className="score-circle__value" style={{ color }}>{score}</span>
    </div>
  );
}
