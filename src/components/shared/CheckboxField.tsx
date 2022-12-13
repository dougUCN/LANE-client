import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
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

const CheckboxField = (
  { register, label, hasError, errorMessage, ...props }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  return (
    <>
      <div className="flex flex-row justify-between items-center">
        <input
          {...register}
          {...props}
          {...ref}
          type="checkbox"
          className={clsx(
            "w-4",
            "h-4",
            "text-blue-600",
            "bg-gray-100",
            "rounded",
            "border-gray-300",
            "focus:ring-blue-500",
            "dark:focus:ring-blue-600",
            "dark:ring-offset-gray-800",
            "focus:ring-2",
            "dark:bg-gray-700",
            "dark:border-gray-600",
            "cursor-pointer",
            hasError && errorStyling,
          )}
        />
        <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
          {label}
        </label>
      </div>
      {hasError ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </>
  );
};

export default React.forwardRef(CheckboxField);
