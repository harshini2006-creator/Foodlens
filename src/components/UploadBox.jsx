import { useState, useRef, useCallback } from "react";
import "./UploadBox.css";

const ACCEPTED_TYPES = ["image/jpeg", "image/jpg", "image/png"];
const ACCEPTED_EXTENSIONS = ".jpg,.jpeg,.png";
const MAX_SIZE_MB = 10;

export default function UploadBox({ onFileSelected, selectedFile, onRemove }) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef(null);

  const validate = (file) => {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      setError("Unsupported file type. Please upload a JPG, JPEG, or PNG image.");
      return false;
    }
    if (file.size > MAX_SIZE_MB * 1024 * 1024) {
      setError(`File size exceeds ${MAX_SIZE_MB}MB limit.`);
      return false;
    }
    setError("");
    return true;
  };

  const handleFile = useCallback(
    (file) => {
      if (file && validate(file)) {
        onFileSelected(file);
      }
    },
    [onFileSelected]
  );

  const onDrop = (e) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) handleFile(file);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    setDragging(true);
  };

  const onDragLeave = () => setDragging(false);

  const onInputChange = (e) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset input so same file can be re-selected
    e.target.value = "";
  };

  if (selectedFile) {
    return (
      <ImagePreview file={selectedFile} onRemove={onRemove} />
    );
  }

  return (
    <div className="upload-wrapper">
      <div
        className={`upload-box ${dragging ? "upload-box--dragging" : ""}`}
        onDrop={onDrop}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && inputRef.current?.click()}
        aria-label="Upload food packet image"
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_EXTENSIONS}
          onChange={onInputChange}
          style={{ display: "none" }}
          aria-hidden="true"
        />
        <div className="upload-box__icon">
          {dragging ? "📂" : "📸"}
        </div>
        <p className="upload-box__title">
          {dragging ? "Drop your image here" : "Drag & drop your food packet image"}
        </p>
        <p className="upload-box__subtitle">or click to browse files</p>
        <button
          className="btn-primary upload-box__btn"
          onClick={(e) => { e.stopPropagation(); inputRef.current?.click(); }}
          type="button"
        >
          Upload Image
        </button>
        <p className="upload-box__hint">Supports JPG, JPEG, PNG · Max {MAX_SIZE_MB}MB</p>
      </div>
      {error && (
        <div className="upload-error" role="alert">
          ⚠️ {error}
        </div>
      )}
    </div>
  );
}

function ImagePreview({ file, onRemove }) {
  const previewUrl = URL.createObjectURL(file);
  return (
    <div className="image-preview">
      <div className="image-preview__img-wrap">
        <img src={previewUrl} alt="Selected food packet" className="image-preview__img" />
        <div className="image-preview__overlay">
          <button
            className="image-preview__remove"
            onClick={onRemove}
            type="button"
            aria-label="Remove image"
          >
            ✕ Remove
          </button>
        </div>
      </div>
      <div className="image-preview__info">
        <span className="image-preview__filename">{file.name}</span>
        <span className="image-preview__size">
          {(file.size / 1024).toFixed(1)} KB
        </span>
      </div>
    </div>
  );
}
