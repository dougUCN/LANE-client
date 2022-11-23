import React from "react";
import clsx from "clsx";
import { UseFormRegisterReturn } from "react-hook-form";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  register?: UseFormRegisterReturn;
  label?: string;
  hasError?: boolean;
  errorMessage?: string;
  className?: string;
  availableOptions: { name: string; value: string }[];
  selectedOptions: { name: string; value: string }[];
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
  {
    register,
    className,
    label,
    hasError,
    errorMessage,
    availableOptions,
    selectedOptions,
    ...props
  }: Props,
  ref: React.ForwardedRef<HTMLInputElement>,
) => {
  const [checkedOptions, setCheckedOptions] = React.useState<string[]>([]);

  React.useEffect(() => {
    if (selectedOptions.length) {
      setCheckedOptions([
        ...checkedOptions,
        ...selectedOptions.map(option => option.value),
      ]);
    }
  }, [checkedOptions, selectedOptions]);
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
      <div className="flex flex-row justify-between align-center my-3">
        {availableOptions.map(option => (
          <div key={option.value}>
            <input
              type="checkbox"
              value={option.value}
              checked={checkedOptions.includes(option.value)}
              onChange={e =>
                setCheckedOptions([...checkedOptions, e.target.value])
              }
              className="w-4 h-4 text-blue-600 bg-gray-100 rounded border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
            />
            <label className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
              {option.name}
            </label>
          </div>
        ))}
      </div>
      {hasError ? (
        <p className="mt-2 text-sm text-red-600 dark:text-red-500">
          <span className="font-medium">{errorMessage}</span>
        </p>
      ) : null}
    </div>
  );
};

export default React.forwardRef(CheckboxField);
