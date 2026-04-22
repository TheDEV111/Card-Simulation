/**
 * Placeholder wrapper for future Lottie animation integration.
 * Renders children or a static fallback until lottie-react is added.
 */
export default function LottieWrap({ fallback = null, children }) {
  return children ?? fallback;
}
