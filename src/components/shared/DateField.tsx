import React from "react";
import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  className?: string;
};

const errorStyling = [
  "bg-red-50",
  "border",
  "border-red-500",
  "text-red-900",
  "placeholder-red-700",
  "text-sm",
  "rounded-lg",
  "focus:ring-red-500",
  "dark:bg-gray-700",
  "focus:border-red-500",
  "block",
  "w-full",
  "p-2.5",
  "dark:text-red-500",
  "dark:placeholder-red-500",
  "dark:border-red-500",
].join(" ");

const DateField = (
  { className, label, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div>
      {label ? (
        <label
          className={clsx(
            "block",
            "mb-2",
            "text-sm",
            "font-medium",
            "text-gray-900",
            "dark:text-gray-300",
          )}
        >
          {label}
        </label>
      ) : null}
      <input
        type="date"
        className={clsx(
          "bg-gray-50 border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "focus:ring-blue-500",
          "focus:border-blue-500",
          "outline-none",
          "block",
          "w-full",
          "p-2.5",
          "dark:bg-gray-700",
          "dark:border-gray-600",
          "dark:placeholder-gray-400",
          "dark:text-white",
          "dark:focus:ring-blue-500",
          "dark:focus:border-blue-500",
          "dark:outline-none",
          className,
        )}
      />
    </div>
  );
};

export default DateField;
