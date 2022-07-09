import React from "react";
import clsx from "clsx";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  color?: "primary" | "secondary";
  size?: "xs" | "tiny" | "sm" | "md" | "lg";
  className?: string;
};

const Button = (
  { children, color = "primary", size = "md", className, ...props }: Props,
  ref?: React.ForwardedRef<HTMLButtonElement>,
) => {
  const primaryColor = [
    "text-white",
    "shadow",
    "outline-none",
    "ease-linear",
    "transition-all",
    "duration-150",
    "bg-blue-600",
    "hover:shadow-md",
    "dark:bg-blue-700",
    "hover:bg-blue-800",
    "dark:hover:bg-blue-900",
    "focus:ring-blue-300",
    "dark:focus:ring-blue-800",
    "disabled:bg-gray-400",
    "disabled:hover:bg-gray-400",
  ].join(" ");

  const secondaryColor = [
    "text-gray-700",
    "bg-gray-300",
    "border",
    "border-gray-400",
    "hover:bg-gray-200",
    "disabled:hover:bg-white",
    "disabled:hover:text-gray-500",
    "hover:text-gray-900",
    "dark:bg-gray-700",
    "dark:text-gray-300",
    "dark:border-gray-500",
    "dark:hover:text-white",
    "dark:hover:bg-gray-600",
    "disabled:hover:bg:white",
    "focus:ring-gray-200",
    "dark:focus:ring-gray-700",
    "dark:disabled:hover:bg-gray-700",
    "dark:disabled:hover:text-gray-300",
  ].join(" ");

  return (
    <button
      ref={ref}
      type="button"
      className={clsx(
        "focus:ring-4",
        "rounded",
        "font-bold",
        `text-${size}`,
        "px-4",
        "py-2",
        "focus:outline-none",
        "disabled:cursor-not-allowed",
        color === "primary" ? primaryColor : secondaryColor,
        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default React.forwardRef(Button);
