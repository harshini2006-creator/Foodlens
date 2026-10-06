import { useNavigate } from "react-router-dom";
import "./About.css";

const problems = [
  {
    icon: "🔤",
    title: "Unreadable Ingredient Lists",
    desc: "Most Indian packaged food labels list ingredients using technical chemical names and INS codes that are impossible for a layperson to interpret.",
  },
  {
    icon: "📋",
    title: "Complex FSSAI Regulations",
    desc: "FSSAI has detailed regulations on permissible additives, labelling norms, and nutrition disclosure — but they are scattered and not user-friendly.",
  },
  {
    icon: "🌍",
    title: "WHO Guidelines Not Applied",
    desc: "WHO issues dietary guidelines on sodium, sugar, saturated fat, and trans fat that directly apply to packaged foods — but most people never see this context applied to their snack.",
  },
  {
    icon: "🤷",
    title: "No Easy Reference Tool",
    desc: "There is no simple, free tool that bridges the gap between a food label and authoritative health information in an accessible way for Indian consumers.",
  },
];

const team = [
  { name: "AI Analysis", icon: "🤖", desc: "RAG-based AI pipeline using LangChain and LLM" },
  { name: "OCR Extraction", icon: "🔍", desc: "Image text extraction from food packet photos" },
  { name: "WHO Data", icon: "🌍", desc: "WHO dietary guidelines integrated via vector database" },
  { name: "FSSAI Data", icon: "🏛️", desc: "FSSAI FSS Act 2006 and Schedule II regulations" },
];

const roadmap = [
  { phase: "Phase 1", status: "done", item: "React + Vite frontend with mock data" },
  { phase: "Phase 2", status: "upcoming", item: "FastAPI backend with OCR integration" },
  { phase: "Phase 3", status: "upcoming", item: "LangChain + RAG pipeline with vector DB" },
  { phase: "Phase 4", status: "upcoming", item: "WHO & FSSAI knowledge base ingestion" },
  { phase: "Phase 5", status: "upcoming", item: "Full AI analysis with real product results" },
  { phase: "Phase 6", status: "upcoming", item: "Mobile-responsive PWA & performance tuning" },
];

export default function About() {
  const navigate = useNavigate();

  return (
    <main className="about-page">
      <div className="container">
        {/* Hero */}
        <div className="about-hero animate-fade-in-up">
          <div className="section-tag">ℹ️ About FoodLens</div>
          <h1 className="section-title">
            An AI tool that reads your<br />
            <span style={{ color: "var(--green-600)" }}>food labels for you</span>
          </h1>
          <p className="section-subtitle">
            FoodLens is a CSE college project that aims to make ingredient labels on
            Indian packaged food products understandable and actionable for everyone —
            not just nutritionists.
          </p>
        </div>

        {/* What is FoodLens */}
        <div className="about-what animate-fade-in-up">
          <div className="about-what__text">
            <div className="section-tag">🔬 What is FoodLens?</div>
            <h2 className="about-section-title">Food intelligence powered by AI</h2>
            <p className="about-body-text">
              FoodLens is a web application that lets users upload a photo of any Indian
              packaged food product. The system extracts ingredient and nutrition
              information from the image using OCR, then analyzes it against WHO dietary
              guidelines and FSSAI food safety regulations using a RAG-based AI pipeline.
            </p>
            <p className="about-body-text">
              The result is a clear, colour-coded health report that explains what each
              ingredient is, whether any additives are concerning, how the nutrition
              profile compares to recommended daily values, and what healthier
              alternatives are available.
            </p>
          </div>
          <div className="about-what__stats">
            {[
              { value: "WHO", label: "Dietary Guidelines", icon: "🌍" },
              { value: "FSSAI", label: "Food Regulations", icon: "🏛️" },
              { value: "RAG", label: "AI Architecture", icon: "🤖" },
              { value: "OCR", label: "Text Extraction", icon: "🔍" },
            ].map((stat) => (
              <div key={stat.value} className="about-stat card">
                <span className="about-stat__icon">{stat.icon}</span>
                <span className="about-stat__value">{stat.value}</span>
                <span className="about-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* The Problem */}
        <div className="about-problem animate-fade-in-up">
          <div className="section-tag">❓ The Problem</div>
          <h2 className="about-section-title">Why do we need FoodLens?</h2>
          <div className="problem-grid">
            {problems.map((p) => (
              <div key={p.title} className="problem-card card">
                <div className="problem-card__icon">{p.icon}</div>
                <h3 className="problem-card__title">{p.title}</h3>
                <p className="problem-card__desc">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How AI will be used */}
        <div className="about-ai animate-fade-in-up">
          <div className="section-tag">🤖 AI Integration</div>
          <h2 className="about-section-title">How WHO and FSSAI data will be used</h2>
          <div className="about-ai__body">
            <div className="about-ai__text">
              <p className="about-body-text">
                FoodLens will build a curated vector database of WHO dietary guidelines,
                FSSAI Schedule II additive regulations, and FSSAI labelling norms. This
                database will be embedded using a text embedding model and indexed for
                fast semantic retrieval.
              </p>
              <p className="about-body-text">
                When a user uploads a food packet, the extracted product data is
                converted into a query. The RAG pipeline retrieves the most relevant
                regulatory context and passes it to a large language model (LLM) which
                generates a structured analysis — ingredient concerns, nutrition flags,
                additive explanations, and alternative suggestions.
              </p>
              <p className="about-body-text">
                This approach ensures the AI&apos;s output is grounded in authoritative
                sources rather than generating unconstrained responses.
              </p>
            </div>
            <div className="about-ai__cards">
              {team.map((item) => (
                <div key={item.name} className="ai-card card">
                  <span className="ai-card__icon">{item.icon}</span>
                  <div>
                    <h4 className="ai-card__name">{item.name}</h4>
                    <p className="ai-card__desc">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Roadmap */}
        <div className="about-roadmap animate-fade-in-up">
          <div className="section-tag">🗺️ Project Roadmap</div>
          <h2 className="about-section-title">Development phases</h2>
          <div className="roadmap-list">
            {roadmap.map((item) => (
              <div key={item.phase} className={`roadmap-item ${item.status === "done" ? "roadmap-item--done" : ""}`}>
                <div className="roadmap-item__indicator">
                  {item.status === "done" ? "✓" : "○"}
                </div>
                <div className="roadmap-item__content">
                  <span className="roadmap-item__phase">{item.phase}</span>
                  <span className="roadmap-item__text">{item.item}</span>
                </div>
                <span className={`roadmap-item__badge ${item.status === "done" ? "badge--ready" : "badge--upcoming"}`}>
                  {item.status === "done" ? "Complete" : "Upcoming"}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Disclaimer */}
        <div className="about-disclaimer card animate-fade-in-up">
          <h3 className="about-disclaimer__title">⚠️ Important Disclaimer</h3>
          <p>
            FoodLens is a CSE academic college project and is intended for educational
            and demonstration purposes only. The analysis provided — including ingredient
            concerns, nutrition assessments, and health information — is informational content
            and does not constitute medical advice, nutritional advice, or a clinical
            assessment.
          </p>
          <p style={{ marginTop: "12px" }}>
            Results should not be used as the basis for medical or dietary decisions.
            Always consult a qualified nutritionist, dietitian, or healthcare provider
            for personal dietary guidance.
          </p>
        </div>

        {/* CTA */}
        <div className="about-cta animate-fade-in-up">
          <h2>Ready to try FoodLens?</h2>
          <p>Upload any Indian packaged food packet and get a free mock analysis.</p>
          <button className="btn-primary" onClick={() => navigate("/analyze")}>
            🔬 Analyze a Food Product
          </button>
        </div>
      </div>
    </main>
  );
}
