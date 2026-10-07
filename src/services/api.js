/**
 * FoodLens API Service
 * POST /api/analyze — sends image to FastAPI backend, returns OCR text.
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

/**
 * @param {File} imageFile
 * @returns {Promise<{ success: boolean, raw_text: string }>}
 */
export async function analyzeFood(imageFile) {
  const formData = new FormData();
  formData.append("image", imageFile);

  let response;
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 120000); // 2 min timeout
    response = await fetch(`${API_BASE_URL}/api/analyze`, {
      method: "POST",
      body: formData,
      signal: controller.signal,
    });
    clearTimeout(timeout);
  } catch (err) {
    if (err.name === "AbortError") {
      throw new Error("Request timed out. The image may be too large — try a smaller one.");
    }
    throw new Error(
      `Cannot reach the backend at ${API_BASE_URL}. Make sure the FastAPI server is running:\n  cd foodlens/backend\n  python main.py`,
    );
  }

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.detail || "Analysis failed. Please try again.");
  }

  return response.json();
}

export { API_BASE_URL };
