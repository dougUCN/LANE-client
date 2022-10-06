import React from "react";
import clsx from "clsx";

import { RunConfigStep } from "generated";

type Props = {
  step: RunConfigStep;
  className?: string;
};
const RunConfigDetails = ({ step, className }: Props) => {
  const device = step.deviceOption;

  return (
    <div className={clsx(configItemStyles, className)}>
      <div className="md:mb-0 mb-2">
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Step Description
        </label>
        <div>{step.description}</div>
      </div>
      <div className="md:mb-0 mb-2">
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          time
        </label>
        <div>{step.time}</div>
      </div>
      <div className="md:mb-0 mb-2">
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Timeframe
        </label>
        <div>{step.timeFrameOptionType}</div>
      </div>
      <div className="md:mb-0 mb-2">
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Device Name
        </label>
        <div>{step.deviceName}</div>
      </div>
    </div>
  );
};

export default RunConfigDetails;

const configItemStyles = [
  "md:mx-24",
  "mx-12",
  "mt-6",
  "md:px-6",
  "px-12",
  "py-4",
  "text-xs",
  "bg-gray-200",
  "dark:bg-gray-700",
  "text-gray-700",
  "dark:text-gray-400",
  "grid",
  "md:grid-cols-5",
  "grid-cols-2",
  "md:grid-rows-1",
  "grid-rows-4",
  "place-items-center",
  "md:items-start",
  "items-center",
].join(" ");
