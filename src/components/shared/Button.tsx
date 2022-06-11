import React from "react";
import clsx from "clsx";
import useDarkMode from "hooks/useDarkMode";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  children: React.ReactNode;
  size?: "xs" | "tiny" | "sm" | "md" | "lg";
  className?: string;
};

const Button = ({ children, className, size = "md", ...props }: Props) => {
  const [isDark] = useDarkMode();

  return (
    <button
      type="button"
      className={clsx(
        "text-white",
        "font-bold",
        `text-${size}`,
        "px-4",
        "py-2",
        "rounded",
        "shadow",
        "hover:shadow-md",
        "outline-none",
        "focus:outline-none",
        "ease-linear",
        "transition-all",
        "duration-150",
        "disabled:bg-gray-400",
        "disabled:cursor-not-allowed",
        isDark ? "bg-blue-700" : "bg-blue-600",
        isDark ? "hover:bg-blue-900" : "hover:bg-blue-800",

        className,
      )}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
