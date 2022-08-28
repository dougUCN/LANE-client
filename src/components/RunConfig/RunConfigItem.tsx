import React from "react";
import clsx from "clsx";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrashCan } from "@fortawesome/free-solid-svg-icons";

import { Radio, InfoIcon } from "components/shared";
import { RunConfig } from "generated";
import { formatDate } from "utils/formatters";
import DeleteRunConfigModal from "./DeleteRunConfigModal";
import LoadRunConfigModal from "./LoadRunConfigModal";
import RunConfigStatusBadge from "./RunConfigStatusBadge";

type Props = {
  runConfig: RunConfig;
  className?: string;
};
const RunConfigItem = ({ runConfig, className }: Props) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] =
    React.useState<boolean>(false);
  const [isLoadConfigModalOpen, setIsLoadConfigModalOpen] =
    React.useState<boolean>(false);

  const runConfigStatus = runConfig.runConfigStatus;

  const isRunConfigLoaded = !!(
    runConfigStatus?.status === "RUNNING" ||
    runConfigStatus?.status === "QUEUED"
  );

  return (
    <div
      className={clsx(
        configItemStyles,
        isRunConfigLoaded && loadedConfigItemStyles,
        className,
      )}
    >
      <div className="md:justify-self-start justify-self-center md:col-auto col-span-12">
        <Radio
          checked={isRunConfigLoaded}
          disabled={runConfigStatus?.status !== "READY"}
          onChange={() => setIsLoadConfigModalOpen(true)}
        />
      </div>
      <div className={clsx(configItemTextFieldStyles, "md:mb-0", "mb-2")}>
        <div className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
          Config Name
        </div>
        {runConfig.name}
      </div>
      <div className={clsx(configItemTextFieldStyles)}>
        <div className="mb-1 dark:text-slate-100 font-bold dark:font-semibold">
          Status
          {runConfigStatus?.status !== "READY" &&
          runConfigStatus?.messages?.length ? (
            <InfoIcon
              message={
                <div>
                  {runConfigStatus.messages.map((message, index) => (
                    <React.Fragment key={`${message}_${index}`}>
                      <div>{message}</div>
                    </React.Fragment>
                  ))}
                </div>
              }
            />
          ) : null}
        </div>
        <RunConfigStatusBadge
          className="mt-2"
          status={runConfigStatus?.status}
        />
      </div>
      <div className={clsx(configItemTextFieldStyles)}>
        <div className="mb-1 pb-2 dark:text-slate-100 font-bold dark:font-semibold">
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
      <LoadRunConfigModal
        isOpen={isLoadConfigModalOpen}
        closeModal={() => setIsLoadConfigModalOpen(false)}
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
].join(" ");

const loadedConfigItemStyles = ["bg-green-400", "dark:bg-green-900"].join(" ");

const configItemTextFieldStyles = [
  "md:justify-self-start",
  "md:self-start",
  "justify-self-center",
  "md:col-auto",
  "col-span-12",
  "md:text-start",
  "text-center",
].join(" ");
