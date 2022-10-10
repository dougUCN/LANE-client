import React from "react";
import clsx from "clsx";

import { RunConfigStep } from "generated";
import { DeviceOption as DeviceOptionType } from "generated";
import { DeviceOptionTextField } from "./DeviceOption";

type Props = {
  step: RunConfigStep;
  className?: string;
};
const RunConfigDetails = ({ step, className }: Props) => {
  const device = step.deviceOption;

  return (
    <div className={clsx(stylesWrapper, className)}>
      <div className={runConfigItemStyles}>
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Step Description
        </label>
        <div>{step.description}</div>
      </div>
      <div className={runConfigItemStyles}>
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          time
        </label>
        <div>{step.time}</div>
      </div>
      <div className={runConfigItemStyles}>
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Timeframe
        </label>
        <div>{step.timeFrameOptionType}</div>
      </div>
      <div className={runConfigItemStyles}>
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Device Name
        </label>
        <div>{step.deviceName}</div>
      </div>
      <div className={runConfigItemStyles}>
        <label className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Options
        </label>
        <div>
          <DeviceOption deviceOption={device} />
        </div>
      </div>
    </div>
  );
};

type DeviceOptionProps = {
  deviceOption: DeviceOptionType;
};

const DeviceOption = ({ deviceOption }: DeviceOptionProps) => {
  const optionType = deviceOption.deviceOptionType;
  return {
    USER_INPUT: <DeviceOptionTextField savedValue={deviceOption.selected} />,
    SELECT_ONE: <div />,
    SELECT_MANY: <div />,
  }[optionType];
};

export default RunConfigDetails;

const stylesWrapper = [
  "md:mx-24",
  "mx-12",
  "mt-6",
  "md:px-6",
  "px-12",
  "py-4",
  "text-xs",
  "bg-gray-200",
  "dark:bg-dark-blue",
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

const runConfigItemStyles = ["p-3", "md:mb-0", "mb-2", "dark:bg-gray-700"].join(
  " ",
);
