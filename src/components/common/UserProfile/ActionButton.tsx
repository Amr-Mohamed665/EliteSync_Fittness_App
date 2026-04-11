interface ActionButtonProps {
  text?: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  width?: string;
  icon?: React.ReactNode;
  size?: "sm" | "md";
}

export default function ActionButton({
  text,
  onClick,
  variant = "primary",
  className = "",
  width = "w-fit",
  icon,
  size = "md",
}: ActionButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/15 hover:shadow-primary/40 hover:-translate-y-0.5"
      : "bg-transparent border border-border text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5";

  const sizeClasses =
    size === "sm"
      ? "px-3 py-3.5 text-xs min-h-[44px] md:px-6 md:py-3 md:text-sm md:min-h-[52px]"
      : "px-5 py-2.5 text-sm min-h-[40px]";

  return (
    <button
      onClick={onClick}
      className={`${width} ${sizeClasses} font-semibold rounded-lg transition-all duration-200 cursor-pointer ${variantClasses} ${className} flex items-center justify-center gap-2`}>
      {icon}
      {text}
    </button>
  );
}
