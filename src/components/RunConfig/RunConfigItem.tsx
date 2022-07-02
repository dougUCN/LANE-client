import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Radio } from "components/shared";
import { RunConfig } from "generated";
import { formatDate } from "utils/formatters";
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
        "bg-gray-200",
        "dark:bg-gray-700",
        "text-gray-700",
        "dark:text-gray-400",
        "grid",
        "grid-cols-4",
        "place-items-center",
        className,
      )}
    >
      <div className="justify-self-start">
        <Radio />
      </div>
      <div className="justify-self-start">
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Config Name
        </div>
        {formatDate(runConfig.name)}
      </div>
      <div className="justify-self-start">
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Last Loaded
        </div>
        {runConfig.lastLoaded ? formatDate(runConfig.lastLoaded) : "Never"}
      </div>
      <div className="justify-self-end">
        <button type="button">
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
