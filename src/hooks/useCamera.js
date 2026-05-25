import { useState, useRef, useCallback } from "react";

export function useCamera({ facingMode = "user", width = 640, height = 480 } = {}) {
  const videoRef = useRef(null);
  const streamRef = useRef(null);
  const [active, setActive] = useState(false);
  const [error, setError] = useState(null);

  const start = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode, width, height },
        audio: false,
      });
      streamRef.current = stream;
      if (videoRef.current) videoRef.current.srcObject = stream;
      setActive(true);
      setError(null);
    } catch (err) {
      setError(err.message);
    }
  }, [facingMode, width, height]);

  const stop = useCallback(() => {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    setActive(false);
  }, []);

  const capture = useCallback(() => {
    const video = videoRef.current;
    if (!video) return null;
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    canvas.getContext("2d").drawImage(video, 0, 0);
    return canvas.toDataURL("image/jpeg");
  }, []);

  return { videoRef, active, error, start, stop, capture };
}
