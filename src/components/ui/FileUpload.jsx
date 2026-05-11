import { useState, useRef } from "react";

export default function FileUpload({
  accept,
  multiple = false,
  maxSizeMB = 5,
  onFiles,
  className = "",
}) {
  const [dragging, setDragging] = useState(false);
  const [error, setError] = useState(null);
  const inputRef = useRef(null);

  function process(fileList) {
    const files = Array.from(fileList);
    const oversized = files.filter((f) => f.size > maxSizeMB * 1024 * 1024);
    if (oversized.length) {
      setError(`File exceeds ${maxSizeMB}MB limit`);
      return;
    }
    setError(null);
    onFiles?.(multiple ? files : files[0]);
  }

  return (
    <div className={className}>
      <div
        className={`flex flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed px-6 py-10 text-center transition-colors ${
          dragging
            ? "border-indigo-400 bg-indigo-50 dark:bg-indigo-900/20"
            : "border-gray-300 hover:border-gray-400 dark:border-gray-600 dark:hover:border-gray-500"
        }`}
        onDragEnter={() => setDragging(true)}
        onDragLeave={() => setDragging(false)}
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); setDragging(false); process(e.dataTransfer.files); }}
        onClick={() => inputRef.current?.click()}
      >
        <span className="text-3xl">📁</span>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          <span className="font-medium text-indigo-600 dark:text-indigo-400">Click to upload</span>
          {" or drag and drop"}
        </p>
        {accept && <p className="text-xs text-gray-400">{accept.split(",").join(", ")}</p>}
        <p className="text-xs text-gray-400">Max {maxSizeMB}MB</p>
      </div>
      {error && <p className="mt-2 text-xs text-red-500">{error}</p>}
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        multiple={multiple}
        className="hidden"
        onChange={(e) => process(e.target.files)}
      />
    </div>
  );
}
