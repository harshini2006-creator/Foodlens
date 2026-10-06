/**
 * FoodLens API Service
 *
 * This file contains the API integration layer.
 * Currently uses mock data — replace the implementation of analyzeFood()
 * with a real fetch/axios call to the FastAPI backend when ready.
 *
 * Future backend endpoint: POST /api/analyze
 * Expected request: FormData with key "image" (file)
 * Expected response: JSON matching the shape in src/data/mockData.js
 */

import { mockAnalysisResult } from "../data/mockData";

// Base URL — update this when the FastAPI backend is ready
const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * Analyzes a food packet image.
 * @param {File} imageFile - The image file selected by the user
 * @returns {Promise<object>} - Analysis result JSON
 */
export async function analyzeFood(imageFile) {
  // ── MOCK IMPLEMENTATION ──────────────────────────────────────────────────
  // Simulate a network delay to mimic real API behaviour
  await new Promise((resolve) => setTimeout(resolve, 2500));

  // Return mock data with the uploaded image attached
  return {
    ...mockAnalysisResult,
    image: URL.createObjectURL(imageFile),
  };

  // ── REAL IMPLEMENTATION (uncomment when backend is ready) ────────────────
  // const formData = new FormData();
  // formData.append("image", imageFile);
  //
  // const response = await fetch(`${API_BASE_URL}/api/analyze`, {
  //   method: "POST",
  //   body: formData,
  // });
  //
  // if (!response.ok) {
  //   const error = await response.json().catch(() => ({}));
  //   throw new Error(error.detail || "Analysis failed. Please try again.");
  // }
  //
  // return response.json();
}

export { API_BASE_URL };
