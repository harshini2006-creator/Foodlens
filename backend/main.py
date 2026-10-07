from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import uvicorn
import easyocr
from PIL import Image
import io
import numpy as np

app = FastAPI(title="FoodLens OCR API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# EasyOCR reader — downloads models on first run (~100MB)
# gpu=False works on all machines; set gpu=True if you have CUDA
reader = easyocr.Reader(["en"], gpu=False)

ACCEPTED_TYPES = {"image/jpeg", "image/jpg", "image/png"}


@app.get("/")
def health():
    return {"status": "ok", "service": "FoodLens OCR API"}


@app.post("/api/analyze")
async def analyze(image: UploadFile = File(...)):
    if image.content_type not in ACCEPTED_TYPES:
        raise HTTPException(
            status_code=400,
            detail=f"Unsupported file type '{image.content_type}'. Use JPG, JPEG, or PNG.",
        )

    contents = await image.read()
    if len(contents) > 10 * 1024 * 1024:
        raise HTTPException(status_code=400, detail="File size exceeds 10MB limit.")

    try:
        pil_image = Image.open(io.BytesIO(contents)).convert("RGB")

        # Resize large images to max 1200px wide — keeps OCR fast on CPU
        max_width = 1200
        if pil_image.width > max_width:
            ratio = max_width / pil_image.width
            pil_image = pil_image.resize(
                (max_width, int(pil_image.height * ratio)), Image.LANCZOS
            )

        img_array = np.array(pil_image)
        # paragraph=False keeps individual text lines; batch_size=4 speeds up CPU
        results = reader.readtext(img_array, detail=0, paragraph=False, batch_size=4)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

    raw_text = "\n".join(results)

    return {
        "success": True,
        "raw_text": raw_text if raw_text else "(No text detected in image)",
    }


if __name__ == "__main__":
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
