/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { RunConfig } from "generated";
import clsx from "clsx";
import { formatDate } from "utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

type Props = {
  runConfig: RunConfig;
  className?: string;
};
const RunConfigItem = ({ runConfig, className }: Props) => {
  return (
    <div
      className={clsx(
        "mx-24",
        "mt-6",
        "px-6",
        "py-3",
        "text-xs",
        "text-gray-700",
        "bg-gray-50",
        "dark:bg-gray-700",
        "dark:text-gray-400",
        "flex",
        className,
      )}
    >
      <div className="flex basis-1/12 items-center">
        <input
          type="radio"
          value=""
          name="default-radio"
          className={clsx(
            "w-4",
            "h-4",
            "text-blue-600",
            "bg-gray-100",
            "border-gray-300",
            "focus:ring-blue-500",
            "dark:focus:ring-blue-600",
            "dark:ring-offset-gray-800",
            "focus:ring-2",
            "dark:bg-gray-700",
            "dark:border-gray-600",
          )}
        />
      </div>
      <div className="flex-auto">
        <div className="dark:text-slate-100">Config Name</div>
        {formatDate(runConfig.name)}
      </div>
      <div className="flex-1">
        <div className="dark:text-slate-100">Last Loaded</div>
        {runConfig.lastLoaded ? formatDate(runConfig.lastLoaded) : "-"}
      </div>
      <div className="flex basis-1/12 items-center">
        <button type="button" onClick={() => {}}>
          <FontAwesomeIcon
            className="mr-4 text-dark-blue dark:text-white fa-xl"
            icon={faPenToSquare}
          />
        </button>
        <button type="button" onClick={() => {}}>
          <FontAwesomeIcon
            className="ml-4 text-dark-blue dark:text-white fa-xl"
            icon={faTrashCan}
          />
        </button>
      </div>
    </div>
  );
};

export default RunConfigItem;
