import "./HowItWorks.css";

const pipeline = [
  {
    step: "01",
    icon: "📸",
    title: "User Uploads Food Packet",
    desc: "The user uploads a photo of an Indian packaged food product through the FoodLens web interface. JPG, JPEG, and PNG formats are supported.",
    tech: "React Frontend",
    color: "#16a34a",
  },
  {
    step: "02",
    icon: "🔍",
    title: "Image & Text Extraction",
    desc: "An OCR engine processes the image to extract all text from the ingredient list, nutrition table, and manufacturer information on the label.",
    tech: "OCR Engine (upcoming)",
    color: "#0891b2",
  },
  {
    step: "03",
    icon: "🧪",
    title: "Ingredient & Nutrition Parsing",
    desc: "The extracted text is parsed to identify individual ingredients, INS/E-number additives, and structured nutrition values per serving.",
    tech: "NLP Parser (upcoming)",
    color: "#7c3aed",
  },
  {
    step: "04",
    icon: "📚",
    title: "WHO & FSSAI Knowledge Retrieval",
    desc: "A RAG-based system retrieves relevant information from a vector database containing WHO dietary guidelines and FSSAI food safety regulations.",
    tech: "LangChain + RAG (upcoming)",
    color: "#d97706",
  },
  {
    step: "05",
    icon: "🤖",
    title: "AI Analysis",
    desc: "A large language model synthesizes the product data and retrieved guidelines to generate ingredient concerns, nutrition assessments, and health flags.",
    tech: "LLM via LangChain (upcoming)",
    color: "#dc2626",
  },
  {
    step: "06",
    icon: "📊",
    title: "Results & Alternatives",
    desc: "The structured JSON response is displayed as a clean dashboard showing overall health score, ingredient breakdown, additive concerns, and healthier alternatives.",
    tech: "React Results Page",
    color: "#16a34a",
  },
];

const techStack = [
  { name: "React + Vite", status: "ready", desc: "Frontend UI" },
  { name: "React Router", status: "ready", desc: "Page navigation" },
  { name: "FastAPI", status: "upcoming", desc: "Backend API" },
  { name: "Tesseract / PaddleOCR", status: "upcoming", desc: "Text extraction from images" },
  { name: "LangChain", status: "upcoming", desc: "LLM orchestration" },
  { name: "RAG Pipeline", status: "upcoming", desc: "Knowledge retrieval" },
  { name: "Vector Database", status: "upcoming", desc: "WHO/FSSAI knowledge store" },
  { name: "LLM (GPT / Gemini)", status: "upcoming", desc: "AI analysis generation" },
];

export default function HowItWorks() {
  return (
    <main className="hiw-page">
      <div className="container">
        {/* Header */}
        <div className="hiw-header animate-fade-in-up">
          <div className="section-tag">⚙️ The Pipeline</div>
          <h1 className="section-title">How FoodLens Works</h1>
          <p className="section-subtitle">
            From a single photo to a detailed health report — here&apos;s every step of
            the FoodLens analysis pipeline.
          </p>
        </div>

        {/* Pipeline Steps */}
        <div className="hiw-pipeline">
          {pipeline.map((step, i) => (
            <div key={step.step} className="hiw-step animate-fade-in-up" style={{ animationDelay: `${i * 80}ms` }}>
              <div className="hiw-step__connector">
                <div className="hiw-step__number" style={{ background: step.color }}>
                  {step.step}
                </div>
                {i < pipeline.length - 1 && (
                  <div className="hiw-step__line" />
                )}
              </div>
              <div className="hiw-step__card card">
                <div className="hiw-step__icon">{step.icon}</div>
                <div className="hiw-step__content">
                  <h3 className="hiw-step__title">{step.title}</h3>
                  <p className="hiw-step__desc">{step.desc}</p>
                  <span
                    className="hiw-step__tech"
                    style={{
                      background: step.tech.includes("upcoming") ? "#fffbeb" : "#f0fdf4",
                      color: step.tech.includes("upcoming") ? "#92400e" : "#166534",
                    }}
                  >
                    {step.tech}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Architecture Diagram */}
        <div className="hiw-arch card animate-fade-in-up">
          <h2 className="hiw-arch__title">System Architecture Overview</h2>
          <p className="hiw-arch__sub">
            High-level data flow from user upload to AI-powered result display.
          </p>
          <div className="hiw-arch-flow">
            {[
              { label: "User", icon: "👤" },
              { label: "React UI", icon: "⚛️" },
              { label: "FastAPI", icon: "🐍" },
              { label: "OCR", icon: "🔍" },
              { label: "RAG + LLM", icon: "🤖" },
              { label: "Results", icon: "📊" },
            ].map((node, i, arr) => (
              <div key={node.label} className="hiw-arch-flow__item">
                <div className="hiw-arch-node">
                  <span className="hiw-arch-node__icon">{node.icon}</span>
                  <span className="hiw-arch-node__label">{node.label}</span>
                </div>
                {i < arr.length - 1 && (
                  <div className="hiw-arch-flow__arrow" aria-hidden="true">→</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <div className="hiw-tech animate-fade-in-up">
          <h2 className="hiw-tech__title">Technology Stack</h2>
          <div className="hiw-tech-grid">
            {techStack.map((tech) => (
              <div key={tech.name} className={`hiw-tech-item card ${tech.status === "upcoming" ? "hiw-tech-item--upcoming" : ""}`}>
                <div className="hiw-tech-item__top">
                  <span className="hiw-tech-item__name">{tech.name}</span>
                  <span className={`hiw-tech-item__badge ${tech.status === "ready" ? "badge--ready" : "badge--upcoming"}`}>
                    {tech.status === "ready" ? "✓ Ready" : "Upcoming"}
                  </span>
                </div>
                <p className="hiw-tech-item__desc">{tech.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* RAG Explainer */}
        <div className="hiw-rag card animate-fade-in-up">
          <div className="hiw-rag__icon">🧠</div>
          <div>
            <h2 className="hiw-rag__title">What is RAG-based AI Analysis?</h2>
            <p className="hiw-rag__desc">
              RAG stands for <strong>Retrieval-Augmented Generation</strong>. Instead of relying
              solely on a language model&apos;s training data, FoodLens first retrieves
              relevant, up-to-date facts from a curated vector database of WHO dietary
              guidelines and FSSAI food safety regulations. The LLM then uses these retrieved
              facts as context to generate accurate, grounded, and regulation-aware food
              analysis — not just generic nutritional advice.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
