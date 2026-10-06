import "./FeatureCard.css";

export default function FeatureCard({ icon, title, description, delay = 0 }) {
  return (
    <div
      className="feature-card card"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="feature-card__icon">{icon}</div>
      <h3 className="feature-card__title">{title}</h3>
      <p className="feature-card__desc">{description}</p>
    </div>
  );
}
