// Mock analysis result data for an Indian chips packet
// This will be replaced by real AI/RAG backend response later

export const mockAnalysisResult = {
  productName: "Lay's Classic Salted Potato Chips",
  brand: "Lay's (PepsiCo)",
  category: "Potato Chips / Snacks",
  netWeight: "52g",
  servingSize: "30g (approx. 1 serving)",
  image: null, // will use the uploaded image

  overallStatus: {
    label: "Needs Attention",
    level: "warning", // "good" | "moderate" | "warning"
    score: 42,
    summary:
      "This product contains high sodium and saturated fat levels. Frequent consumption is not recommended.",
  },

  ingredients: [
    { name: "Potato", concern: "none", note: "Primary ingredient" },
    { name: "Vegetable Oil (Palm Oil)", concern: "moderate", note: "High in saturated fat" },
    { name: "Salt", concern: "moderate", note: "High sodium contributor" },
    { name: "Sugar", concern: "low", note: "Trace amount" },
    { name: "Spices & Condiments", concern: "none", note: "" },
    { name: "Flavour Enhancer (INS 627, INS 631)", concern: "high", note: "Synthetic flavour enhancers; not recommended for children" },
    { name: "Acidity Regulator (INS 330)", concern: "low", note: "Citric acid; generally recognised as safe" },
    { name: "Antioxidant (INS 319)", concern: "moderate", note: "TBHQ; high doses linked to adverse effects" },
  ],

  nutrition: {
    perServing: "Per 30g serving",
    items: [
      { name: "Energy", value: "162 kcal", dv: 8, status: "moderate" },
      { name: "Total Fat", value: "10.2g", dv: 13, status: "high" },
      { name: "Saturated Fat", value: "3.0g", dv: 15, status: "high" },
      { name: "Trans Fat", value: "0g", dv: 0, status: "good" },
      { name: "Carbohydrates", value: "17.4g", dv: 6, status: "moderate" },
      { name: "Total Sugars", value: "0.8g", dv: 2, status: "good" },
      { name: "Protein", value: "1.9g", dv: 4, status: "low" },
      { name: "Sodium", value: "210mg", dv: 9, status: "high" },
      { name: "Dietary Fibre", value: "1.2g", dv: 4, status: "low" },
    ],
  },

  additives: [
    {
      code: "INS 627",
      name: "Disodium Guanylate",
      purpose: "Flavour Enhancer",
      concern: "high",
      note: "Synthetic purine; not suitable for children, gout patients, or those with kidney issues.",
    },
    {
      code: "INS 631",
      name: "Disodium Inosinate",
      purpose: "Flavour Enhancer",
      concern: "high",
      note: "Often used with MSG to amplify taste. Avoid if sensitive to purines.",
    },
    {
      code: "INS 330",
      name: "Citric Acid",
      purpose: "Acidity Regulator",
      concern: "low",
      note: "Naturally occurring; generally safe for all age groups.",
    },
    {
      code: "INS 319",
      name: "TBHQ (Tertiary Butylhydroquinone)",
      purpose: "Antioxidant / Preservative",
      concern: "moderate",
      note: "Permitted by FSSAI but linked to adverse effects at high doses. Limit exposure.",
    },
  ],

  fssaiObservations: [
    {
      type: "info",
      text: "Product carries valid FSSAI license number as required under FSS Act 2006.",
    },
    {
      type: "warning",
      text: "Sodium content (210mg/serving) exceeds the FSSAI 'low sodium' threshold of 120mg per 100g.",
    },
    {
      type: "warning",
      text: "TBHQ (INS 319) is permitted under FSSAI Schedule II but should be consumed in moderation.",
    },
    {
      type: "info",
      text: "Nutritional information is declared per serving — consistent with FSSAI labelling norms.",
    },
    {
      type: "warning",
      text: "Palm oil is listed as 'Vegetable Oil'. FSSAI mandates specific disclosure of oil type.",
    },
  ],

  whoObservations: [
    {
      type: "warning",
      text: "WHO recommends limiting saturated fat to less than 10% of total energy. This product provides 15% DV of saturated fat per serving.",
    },
    {
      type: "warning",
      text: "WHO advises sodium intake below 2000mg/day. A single serving provides 210mg — easy to exceed with normal snacking portions.",
    },
    {
      type: "info",
      text: "Trans fat is 0g per serving, consistent with WHO's goal of eliminating industrial trans fats.",
    },
    {
      type: "warning",
      text: "Ultra-processed foods like this product are associated with higher risks of obesity and cardiovascular disease (WHO 2023 report).",
    },
  ],

  healthInfo: [
    "Occasional consumption as part of a balanced diet is generally acceptable for healthy adults.",
    "Not suitable as a regular snack for children due to synthetic flavour enhancers and high sodium.",
    "Individuals with hypertension should be cautious about sodium content.",
    "Palm oil contributes to saturated fat intake; those managing cholesterol should monitor consumption.",
    "This analysis is informational only and does not constitute medical advice.",
  ],

  alternatives: [
    {
      name: "Roasted Makhana (Fox Nuts)",
      reason: "High protein, low fat, naturally flavoured. No synthetic additives.",
      healthScore: 82,
    },
    {
      name: "Baked Multigrain Chips",
      reason: "Lower fat content, no TBHQ or synthetic enhancers, higher fibre.",
      healthScore: 70,
    },
    {
      name: "Roasted Chana (Chickpeas)",
      reason: "Rich in protein and fibre, naturally satisfying, no added additives.",
      healthScore: 88,
    },
    {
      name: "Plain Popcorn (Air-Popped)",
      reason: "Whole grain, low calorie, no artificial additives when unsalted.",
      healthScore: 78,
    },
  ],
};

export const features = [
  {
    icon: "🔬",
    title: "Ingredient Analysis",
    description:
      "Identifies every ingredient in your food packet and flags potentially harmful chemicals, preservatives, and additives.",
  },
  {
    icon: "📊",
    title: "Nutrition Analysis",
    description:
      "Breaks down macronutrients and micronutrients per serving with easy-to-read charts and daily value indicators.",
  },
  {
    icon: "🏛️",
    title: "WHO & FSSAI Guidelines",
    description:
      "Cross-references product data with WHO nutrition standards and FSSAI food safety regulations to give you verified insights.",
  },
  {
    icon: "⚗️",
    title: "Additive Information",
    description:
      "Decodes INS/E-numbers on labels and explains what each additive does and whether it poses any health concern.",
  },
  {
    icon: "🥗",
    title: "Healthier Alternatives",
    description:
      "Suggests better snack options with similar taste profiles but improved nutritional value and fewer harmful additives.",
  },
  {
    icon: "🤖",
    title: "AI-Powered Insights",
    description:
      "RAG-based AI retrieves the latest guidelines and research to provide context-aware, personalised food analysis.",
  },
];

export const howItWorksSteps = [
  {
    step: "01",
    icon: "📸",
    title: "Upload",
    description:
      "Take a photo of any Indian packaged food product — chips, biscuits, noodles, or any snack with a visible ingredient label.",
  },
  {
    step: "02",
    icon: "🔍",
    title: "Extract",
    description:
      "Our OCR engine reads the text from the image and extracts all ingredient and nutrition information automatically.",
  },
  {
    step: "03",
    icon: "🧠",
    title: "Analyze",
    description:
      "The AI compares extracted data against WHO nutrition standards and FSSAI food safety regulations using a RAG pipeline.",
  },
  {
    step: "04",
    icon: "✅",
    title: "Understand",
    description:
      "Get a clear, colour-coded report with ingredient concerns, nutrition scores, additive details, and healthier alternatives.",
  },
];
