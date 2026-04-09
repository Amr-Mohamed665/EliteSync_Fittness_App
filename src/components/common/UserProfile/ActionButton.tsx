interface ActionButtonProps {
  text: string;
  onClick?: () => void;
  variant?: "primary" | "outline";
  className?: string;
  width?: string;
}

export default function ActionButton({
  text,
  onClick,
  variant = "primary",
  className = "",
  width = "w-fit",
}: ActionButtonProps) {
  const variantClasses =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/90 shadow-lg shadow-primary/15 hover:shadow-primary/40 hover:-translate-y-0.5"
      : "bg-transparent border border-border text-foreground hover:border-primary hover:text-primary hover:-translate-y-0.5";

  return (
    <button
      onClick={onClick}
      className={`${width} px-5 py-2.5 text-sm font-semibold rounded-lg transition-all duration-200 cursor-pointer ${variantClasses} ${className}`}>
      {text}
    </button>
  );
}
