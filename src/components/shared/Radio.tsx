import clsx from "clsx";

type Props = React.InputHTMLAttributes<HTMLInputElement> & {
  className?: string;
  buttonSize?: "md" | "lg";
};

const Radio = ({ className, buttonSize, ...props }: Props) => {
  return (
    <input
      type="radio"
      className={clsx(
        buttonSize === "lg" ? "scale-150" : "",
        "w-4",
        "h-4",
        "cursor-pointer",
        "text-blue-600",
        "bg-gray-100",
        "border-gray-300",
        "focus:ring-blue-500",
        "dark:focus:ring-blue-600",
        "dark:ring-offset-gray-800",
        "focus:ring-2",
        "dark:bg-gray-700",
        "dark:border-gray-600",
        className,
      )}
      {...props}
    />
  );
};

export default Radio;
