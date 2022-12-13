import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { RunConfigStep as Step } from "generated";

type Props = {
  step: Step;
  className?: string;
  onEditModalOpen: () => void;
  onDeleteModalOpen: () => void;
};
const RunConfigStep = ({
  step,
  className,
  onEditModalOpen,
  onDeleteModalOpen,
}: Props) => {
  const { deviceOptions, description, time, deviceName } = step;

  return (
    <div className={clsx(stylesWrapper, className)}>
      <div className="grid grid-cols-12 gap-3">
        <div className={clsx("col-span-8 sm:col-span-6", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Step Description
          </label>
          <div className="mt-2">{description}</div>
        </div>
        <div className={clsx("col-span-3 sm:col-span-4", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Time
          </label>
          <div className="mt-2">{`${time} sec`}</div>
        </div>
        <div className="col-span-1 sm:col-span-2 mb-3 sm:ml-8 flex flex-col justify-around items-baseline sm:flex-row sm:justify-around sm:items-center">
          <button type="button" onClick={() => onEditModalOpen()}>
            <FontAwesomeIcon
              className="sm:mr-2 lg:m-0 text-dark-blue dark:text-white fa-xl"
              icon={faPenToSquare}
            />
          </button>
          <button type="button" onClick={() => onDeleteModalOpen()}>
            <FontAwesomeIcon
              className=" sm:ml-2  lg:m-0 text-dark-blue dark:text-white fa-xl"
              icon={faTrashCan}
            />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-12 gap-3 ml-3 sm:ml-12">
        <div className={clsx("col-span-6", runConfigItemStyles)}>
          <label className="dark:text-slate-100 font-bold dark:font-semibold">
            Device Name
          </label>
          <div className="mt-2">{deviceName}</div>
        </div>
      </div>

      <div className={clsx("ml-6 sm:ml-24", runConfigItemStyles)}>
        <label className="dark:text-slate-100 font-bold dark:font-semibold">
          Device Options
        </label>
        <div className="md:flex md:flex-row md:justify-items-between md:space-x-5 mt-4 ml-3 sm:ml-6">
          {deviceOptions?.length &&
            deviceOptions.map(deviceOption => (
              <div key={deviceOption.optionName} className="mb-3">
                <div>
                  <label className="dark:text-slate-100 font-bold dark:font-semibold p-3 pl-0 mb-3">
                    {deviceOption.optionName}
                  </label>
                  {deviceOption.selected &&
                    deviceOption.selected.map(selectedOption => (
                      <div key={selectedOption} className="mt-2 ml-3 sm:ml-0">
                        {selectedOption}
                      </div>
                    ))}
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
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
