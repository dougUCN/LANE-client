import React from "react";
import { RunConfigStatusEnum } from "generated";
import { titleize } from "utils/formatters";
import clsx from "clsx";

type Props = {
  status?: RunConfigStatusEnum;
};

const RunConfigStatusBadge = ({ status }: Props) => {
  if (!status) {
    return null;
  }

  return (
    <div className={clsx(badgeStyle, badgeStyleColor(status))}>
      {titleize(status, "_")}
    </div>
  );
};

export default RunConfigStatusBadge;

const badgeStyle = [
  "p-2",
  "text-xs",
  "font-semibold",
  "mr-2",
  "px-3",
  "py-1",
  "rounded-2xl",
].join(" ");

const badgeStyleColor = (status: RunConfigStatusEnum) => {
  switch (status) {
    case "READY":
      return [
        "bg-green-100",
        "text-green-800",
        "dark:bg-green-200",
        "dark:text-green-800",
      ].join(" ");
    case "QUEUED":
      return [
        "bg-yellow-100",
        "text-yellow-800",
        "dark:bg-yellow-200",
        "dark:text-yellow-800",
      ].join(" ");
    case "INVALID":
    case "RUNTIME_ERROR":
      return [
        "bg-red-100",
        "text-red-800",
        "dark:bg-red-200",
        "dark:text-red-800",
      ];
    case "STOPPED":
      return [
        "bg-gray-100",
        "text-gray-800",
        "dark:bg-gray-200",
        "dark:text-gray-800",
      ];
    default:
      return [
        "bg-blue-100",
        "text-blue-800",
        "dark:bg-blue-200",
        "dark:text-blue-800",
      ].join(" ");
  }
};
