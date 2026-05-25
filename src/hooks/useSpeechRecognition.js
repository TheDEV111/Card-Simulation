import { useState, useRef, useCallback, useEffect } from "react";

export function useSpeechRecognition({ lang = "en-US", continuous = false, interimResults = true } = {}) {
  const recognitionRef = useRef(null);
  const [transcript, setTranscript] = useState("");
  const [interim, setInterim] = useState("");
  const [listening, setListening] = useState(false);
  const [error, setError] = useState(null);
  const supported = typeof window !== "undefined" && ("SpeechRecognition" in window || "webkitSpeechRecognition" in window);

  useEffect(() => {
    if (!supported) return;
    const SpeechRecognition = window.SpeechRecognition ?? window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = lang;
    recognition.continuous = continuous;
    recognition.interimResults = interimResults;

    recognition.onresult = (e) => {
      let final = "";
      let interimText = "";
      for (const result of e.results) {
        if (result.isFinal) final += result[0].transcript;
        else interimText += result[0].transcript;
      }
      if (final) setTranscript((prev) => prev + final);
      setInterim(interimText);
    };

    recognition.onerror = (e) => {
      setError(e.error);
      setListening(false);
    };

    recognition.onend = () => setListening(false);
    recognitionRef.current = recognition;

    return () => recognition.abort();
  }, [lang, continuous, interimResults, supported]);

  const start = useCallback(() => {
    if (!supported) return;
    setError(null);
    setInterim("");
    recognitionRef.current?.start();
    setListening(true);
  }, [supported]);

  const stop = useCallback(() => {
    recognitionRef.current?.stop();
    setListening(false);
  }, []);

  const reset = useCallback(() => {
    setTranscript("");
    setInterim("");
  }, []);

  return { transcript, interim, listening, error, supported, start, stop, reset };
}
