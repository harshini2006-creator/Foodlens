import { useState, useRef, useEffect, useCallback } from "react";
import "./CameraCapture.css";

export default function CameraCapture({ onCapture, onClose }) {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const [phase, setPhase] = useState("loading"); // loading | live | captured | error
  const [capturedUrl, setCapturedUrl] = useState(null);
  const [capturedFile, setCapturedFile] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");

  const stopStream = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
  }, []);

  const startCamera = useCallback(async () => {
    setPhase("loading");
    setErrorMsg("");
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: { ideal: "environment" }, width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPhase("live");
    } catch (err) {
      stopStream();
      if (err.name === "NotAllowedError" || err.name === "PermissionDeniedError") {
        setErrorMsg("Camera permission denied. Please allow camera access in your browser settings and try again.");
      } else if (err.name === "NotFoundError" || err.name === "DevicesNotFoundError") {
        setErrorMsg("No camera found on this device.");
      } else {
        setErrorMsg(`Camera unavailable: ${err.message}`);
      }
      setPhase("error");
    }
  }, [stopStream]);

  useEffect(() => {
    startCamera();
    return () => stopStream();
  }, [startCamera, stopStream]);

  const handleClose = useCallback(() => {
    stopStream();
    onClose();
  }, [stopStream, onClose]);

  const capture = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);

    canvas.toBlob(
      (blob) => {
        const file = new File([blob], `capture-${Date.now()}.jpg`, { type: "image/jpeg" });
        setCapturedFile(file);
        setCapturedUrl(URL.createObjectURL(blob));
        stopStream();
        setPhase("captured");
      },
      "image/jpeg",
      0.92,
    );
  };

  const retake = () => {
    setCapturedUrl(null);
    setCapturedFile(null);
    startCamera();
  };

  const confirmCapture = () => {
    if (capturedFile) {
      onCapture(capturedFile);
      handleClose();
    }
  };

  return (
    <div className="camera-modal" role="dialog" aria-modal="true" aria-label="Camera capture">
      <div className="camera-modal__backdrop" onClick={handleClose} />
      <div className="camera-modal__panel">
        {/* Header */}
        <div className="camera-modal__header">
          <span className="camera-modal__title">📷 Camera Capture</span>
          <button className="camera-modal__close" onClick={handleClose} aria-label="Close camera">✕</button>
        </div>

        {/* Body */}
        <div className="camera-modal__body">
          {phase === "loading" && (
            <div className="camera-status">
              <div className="camera-spinner" aria-hidden="true" />
              <p>Starting camera…</p>
            </div>
          )}

          {phase === "error" && (
            <div className="camera-status camera-status--error">
              <span className="camera-status__icon">🚫</span>
              <p className="camera-status__msg">{errorMsg}</p>
              <button className="btn-secondary" onClick={startCamera}>Try Again</button>
            </div>
          )}

          {(phase === "live" || phase === "loading") && (
            <video
              ref={videoRef}
              className="camera-video"
              autoPlay
              playsInline
              muted
              style={{ display: phase === "live" ? "block" : "none" }}
            />
          )}

          {phase === "captured" && capturedUrl && (
            <img src={capturedUrl} alt="Captured preview" className="camera-captured-img" />
          )}

          <canvas ref={canvasRef} style={{ display: "none" }} />
        </div>

        {/* Footer actions */}
        <div className="camera-modal__footer">
          {phase === "live" && (
            <button className="camera-capture-btn" onClick={capture} aria-label="Capture photo">
              <span className="camera-capture-btn__ring" />
              <span className="camera-capture-btn__dot" />
            </button>
          )}

          {phase === "captured" && (
            <div className="camera-actions">
              <button className="btn-secondary" onClick={retake}>↺ Retake</button>
              <button className="btn-primary" onClick={confirmCapture}>✓ Use This Photo</button>
            </div>
          )}
        </div>

        <p className="camera-modal__hint">
          {phase === "live" && "Point camera at the food label, then press the button to capture."}
          {phase === "captured" && "Happy with it? Use it, or retake."}
        </p>
      </div>
    </div>
  );
}
