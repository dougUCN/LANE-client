import React from "react";
import { Context, useQuery } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import { GetRunConfigsDocument } from "generated";
import { Button, LoadingSpinner } from "components/shared";
import RunConfigItem from "./RunConfigItem";
import CreateRunConfigModal from "./CreateRunConfigModal";

const maxMessage = `Run Config limit reached.
To create a new run config, please delete an existing run config first.`;

const RunConfig = () => {
  React.useEffect(() => {
    document.title = "LANE - Run Config";
  }, []);

  const [isCreateModalOpen, setIsCreateModalOpen] =
    React.useState<boolean>(false);

  const [result] = useQuery({
    query: GetRunConfigsDocument,
    context: React.useMemo(() => ({ additionalTypenames: ["RunConfig"] }), []),
  });

  const runConfigs = result?.data?.getRunConfigs?.runConfigs ?? [];
  const isMax = runConfigs.length >= 10;

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
            className="m-3 mb-24"
            onClick={() => setIsCreateModalOpen(true)}
            disabled={isMax}
            title={isMax ? maxMessage : ""}
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
