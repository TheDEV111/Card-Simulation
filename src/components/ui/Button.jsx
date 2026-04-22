import { cn } from "../../utils/cn";
import Spinner from "./Spinner";

const VARIANTS = {
  primary:   "btn-primary",
  secondary: "btn-secondary",
  ghost:     "btn-ghost",
  danger:    "btn-danger",
};

const SIZES = {
  sm:  "!py-1.5 !px-3 !text-xs",
  md:  "",
  lg:  "!py-4 !px-8 !text-base",
};

export default function Button({
  children,
  variant = "secondary",
  size = "md",
  loading = false,
  fullWidth = false,
  className,
  ...props
}) {
  return (
    <button
      className={cn(
        VARIANTS[variant],
        SIZES[size],
        fullWidth && "w-full",
        loading && "cursor-wait",
        className
      )}
      disabled={loading || props.disabled}
      {...props}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <Spinner size={14} />
          {children}
        </span>
      ) : (
        children
      )}
    </button>
  );
}
