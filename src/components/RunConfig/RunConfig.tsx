/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { useQuery } from "urql";
import { GetRunConfigsDocument } from "generated";
import RunConfigItem from "./RunConfigItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, Modal, LoadingSpinner } from "components/shared";

const RunConfig = () => {
  React.useEffect(() => {
    document.title = "LANE - Run Config";
  }, []);

  const [isCreateModalOpen, setIsCreateModalOpen] =
    React.useState<boolean>(false);

  const [result] = useQuery({
    query: GetRunConfigsDocument,
  });

  const runConfigs = result?.data?.getRunConfigs?.runConfigs ?? [];

  if (result.fetching) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <>
      <div className="dark:text-slate-100">
        <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
          Run Configs
        </h2>
        {runConfigs.map(runConfig => (
          <React.Fragment key={runConfig.id}>
            <RunConfigItem runConfig={runConfig} />
          </React.Fragment>
        ))}
        <div className="flex justify-center mt-4">
          <Button
            size="sm"
            className="m-3"
            onClick={() => setIsCreateModalOpen(true)}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Create New Run Config
          </Button>
        </div>
      </div>
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
      >
        {/** Modal Header */}
        <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Modal Title
          </h3>
        </div>
        {/** Modal Body */}
        <div className="p-6 space-y-6">
          <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
            Modal Content
          </p>
        </div>
        {/** Modal Footer */}
        <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
          <Button type="button">Create</Button>
          <Button
            onClick={() => setIsCreateModalOpen(false)}
            type="button"
            color="secondary"
          >
            Cancel
          </Button>
        </div>
      </Modal>
    </>
  );
};

export default RunConfig;
