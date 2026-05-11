export default function SkipToContent({ targetId = "main-content" }) {
  return (
    <a
      href={`#${targetId}`}
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-gold focus:text-surface focus:font-semibold focus:text-sm"
    >
      Skip to main content
    </a>
  );
}
