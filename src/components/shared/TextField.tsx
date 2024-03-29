import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
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

const TextField = (
  { register, className, label, hasError, errorMessage, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <div className={className}>
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
        {...register}
        {...ref}
        type="text"
        className={clsx(
          "bg-gray-50 border",
          "border-gray-300",
          "text-gray-900",
          "text-sm",
          "rounded-lg",
          "focus:ring-blue-500",
          "focus:border-blue-500",
          "block",
          "w-full",
          "p-2.5",
          "bg-gray-100 border-2",
          "border-gray-300",
          "dark:bg-gray-700",
          "dark:border-gray-600",
          "dark:placeholder-gray-400",
          "dark:text-white",
          "focus:ring-blue-700",
          "focus:border-blue-700",
          "outline-none",
          hasError && errorStyling,
        )}
        {...props}
      />
      {hasError ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};

export default React.forwardRef(TextField);
