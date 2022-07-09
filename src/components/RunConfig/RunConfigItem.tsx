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
    <div className={clsx(configItemStyles, className)}>
      <div className="md:justify-self-start justify-self-center md:col-auto col-span-12">
        <Radio buttonSize="lg" />
      </div>
      <div className={clsx(configItemTextFieldStyles, "md:mb-0", "mb-2")}>
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Config Name
        </div>
        {runConfig.name}
      </div>
      <div className={clsx(configItemTextFieldStyles)}>
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Last Loaded
        </div>
        {runConfig.lastLoaded ? formatDate(runConfig.lastLoaded) : "Never"}
      </div>
      <div className="md:justify-self-end md:col-auto col-span-12">
        <button type="button">
          <FontAwesomeIcon
            className="md:mr-4 md:p-0 p-2 text-dark-blue dark:text-white fa-xl"
            icon={faPenToSquare}
          />
        </button>
        <button type="button" onClick={() => setIsDeleteModalOpen(true)}>
          <FontAwesomeIcon
            className="md:ml-4 md:p-0 p-2 text-dark-blue dark:text-white fa-xl"
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

const configItemStyles = [
  "md:mx-24",
  "mx-12",
  "mt-6",
  "md:px-6",
  "px-12",
  "py-3",
  "text-xs",
  "bg-gray-200",
  "dark:bg-gray-700",
  "text-gray-700",
  "dark:text-gray-400",
  "grid",
  "md:grid-cols-4",
  "grid-cols-2",
  "md:grid-rows-1",
  "grid-rows-4",
  "place-items-center",
].join(" ");

const configItemTextFieldStyles = [
  "md:justify-self-start",
  "md:self-start",
  "justify-self-center",
  "md:col-auto",
  "col-span-12",
  "pr-4",
  "md:text-start",
  "text-center",
].join(" ");
