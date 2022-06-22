import React from "react";
import { useQuery } from "urql";
import { GetRunConfigsDocument } from "generated";
import LoadingSpinner from "components/shared/LoadingSpinner";
import RunConfigItem from "./RunConfigItem";

const RunConfig = () => {
  React.useEffect(() => {
    document.title = "LANE - Run Config";
  }, []);

  const [result] = useQuery({
    query: GetRunConfigsDocument,
  });

  const runConfigs = result?.data?.getRunConfigs?.runConfigs ?? [];

  if (result.fetching) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div className="dark:text-slate-100">
      <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
        Run Configs
      </h2>
      {runConfigs.map(runConfig => (
        <RunConfigItem runConfig={runConfig} />
      ))}
    </div>
  );
};

export default RunConfig;
