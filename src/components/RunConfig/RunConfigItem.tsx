/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { RunConfig } from "generated";
import clsx from "clsx";
import { formatDate } from "utils/formatters";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";
import { Radio } from "components/shared";
import DeleteRunConfigModal from "./DeleteRunConfigModal";

type Props = {
  runConfig: RunConfig;
  className?: string;
};
const RunConfigItem = ({ runConfig, className }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);

  return (
    <div
      className={clsx(
        "mx-24",
        "mt-6",
        "px-6",
        "py-3",
        "text-xs",
        "text-gray-700",
        "bg-gray-200",
        "dark:bg-gray-700",
        "dark:text-gray-400",
        "flex",
        className,
      )}
    >
      <div className="flex basis-1/12 items-center">
        <Radio />
      </div>
      <div className="flex-auto">
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Config Name
        </div>
        {formatDate(runConfig.name)}
      </div>
      <div className="flex-1">
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Last Loaded
        </div>
        {runConfig.lastLoaded ? formatDate(runConfig.lastLoaded) : "-"}
      </div>
      <div className="flex basis-1/12 items-center">
        <button type="button" onClick={() => {}}>
          <FontAwesomeIcon
            className="mr-4 text-dark-blue dark:text-white fa-xl"
            icon={faPenToSquare}
          />
        </button>
        <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
          <FontAwesomeIcon
            className="ml-4 text-dark-blue dark:text-white fa-xl"
            icon={faTrashCan}
          />
        </button>
      </div>
      <DeleteRunConfigModal
        isOpen={isDeleteModalOpen}
        closeModal={() => setIsDeleteModalOpen(false)}
        runConfig={runConfig}
      />
    </div>
  );
};

export default RunConfigItem;
