import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare } from "@fortawesome/free-solid-svg-icons";

import { RunConfigStep as RunConfigStepType } from "generated";
import { DeviceOption as DeviceOptionType } from "generated";
import EditRunConfigStepModal from "./EditRunConfigStepModal";

type Props = {
  step: RunConfigStepType;
  className?: string;
};
const RunConfigStep = ({ step, className }: Props) => {
  const device = step.deviceOption;

  const [isEditRunConfigStepModalOpen, setIsEditRunConfigStepModalOpen] =
    React.useState(false);

  return (
    <div className={clsx(stylesWrapper, className)}>
      <div className="grid grid-cols-12 gap-3">
        <div className={clsx("col-span-9 sm:col-span-6", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Step Description
          </label>
          <div className="mt-2">{step.description}</div>
        </div>
        <button
          type="button"
          onClick={() => setIsEditRunConfigStepModalOpen(true)}
        >
          <FontAwesomeIcon
            className="md:ml-4 md:p-0 p-2 text-dark-blue dark:text-white fa-xl"
            icon={faPenToSquare}
          />
        </button>
        <div
          className={clsx(
            "col-span-3 col-start-10 lg:col-span-1 lg:col-start-12",
            runConfigItemStyles,
          )}
        >
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Time
          </label>
          <div className="mt-2">{`${step.time} sec`}</div>
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

      <EditRunConfigStepModal
        isOpen={isEditRunConfigStepModalOpen}
        onClose={() => setIsEditRunConfigStepModalOpen(false)}
        step={step}
      />
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
      <div>
        <label className="dark:text-slate-100 font-bold dark:font-semibold p-3 pl-0 mb-3">
          {deviceOption.optionName}
        </label>
        <div className="mt-2 ml-3">{deviceOption.selected}</div>
      </div>
    ),
    SELECT_ONE: <div />,
    SELECT_MANY: <div />,
  }[optionType];
};

export default RunConfigStep;

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

const runConfigItemStyles = [
  "p-3",
  "mb-3",
  "dark:bg-gray-700",
  "bg-white",
  "shadow-lg",
  "dark:shadow-none",
].join(" ");
