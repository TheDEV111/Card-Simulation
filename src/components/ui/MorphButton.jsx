import { useState } from "react";

export default function MorphButton({ children, loadingText = "Loading…", loading = false, onClick, className = "", ...props }) {
  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`relative overflow-hidden transition-all duration-300 ${
        loading ? "opacity-80 cursor-not-allowed" : ""
      } ${className}`}
      {...props}
    >
      <span
        className="transition-all duration-300"
        style={{ opacity: loading ? 0 : 1, transform: loading ? "translateY(-4px)" : "none" }}
      >
        {children}
      </span>
      {loading && (
        <span className="absolute inset-0 flex items-center justify-center">
          <span className="flex gap-1">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="w-1.5 h-1.5 rounded-full bg-current animate-bounce"
                style={{ animationDelay: `${i * 120}ms` }}
              />
            ))}
          </span>
        </span>
      )}
    </button>
  );
}
