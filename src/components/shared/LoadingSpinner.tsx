import clsx from "clsx";

const LoadingSpinner = ({ className }: { className?: string }) => {
  return (
    <div className={clsx("flex", "justify-center", "items-center", className)}>
      <div
        className={clsx(
          "spinner-border",
          "animate-spin",
          "inline-block",
          "w-32",
          "h-32",
          "border-4",
          "border-t-blue-500",
          "rounded-full",
        )}
        role="status"
      />
    </div>
  );
};

export default LoadingSpinner;
