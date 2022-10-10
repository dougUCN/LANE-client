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
      <div className="grid grid-cols-12 gap-3">
        <div className={clsx("col-span-9 sm:col-span-6", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Step Description
          </label>
          <div className="mt-2">{step.description}</div>
        </div>
        <div
          className={clsx(
            "col-span-3 col-start-10 lg:col-span-1 lg:col-start-12",
            runConfigItemStyles,
          )}
        >
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            time
          </label>
          <div className="mt-2">{step.time}</div>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 ml-3 sm:ml-12">
        <div className={clsx("col-span-6", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Device Name
          </label>
          <div className="mt-2">{step.deviceName}</div>
        </div>
      </div>

      <div className={clsx("ml-6 sm:ml-24", runConfigItemStyles)}>
        <label className="dark:text-slate-100 font-bold dark:font-semibold">
          Device Options
        </label>
        <div className="mt-6 ml-3 sm:ml-12">
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
    USER_INPUT: (
      <DeviceOptionTextField
        label={deviceOption.optionName}
        savedValue={deviceOption.selected}
      />
    ),
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
  "px-6",
  "sm:px-12",
  "py-4",
  "text-xs",
  "bg-gray-200",
  "dark:bg-dark-blue",
  "text-gray-700",
  "dark:text-gray-400",
].join(" ");

const runConfigItemStyles = ["p-3", "mb-3", "dark:bg-gray-700"].join(" ");
