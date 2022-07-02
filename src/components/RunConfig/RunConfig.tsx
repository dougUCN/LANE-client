/* eslint-disable @typescript-eslint/no-empty-function */
import React from "react";
import { useQuery } from "urql";
import { GetRunConfigsDocument } from "generated";
import RunConfigItem from "./RunConfigItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { Button, LoadingSpinner } from "components/shared";
import CreateRunConfigModal from "./CreateRunConfigModal";

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
      <CreateRunConfigModal
        isOpen={isCreateModalOpen}
        closeModal={() => setIsCreateModalOpen(false)}
      />
    </>
  );
};

export default RunConfig;
