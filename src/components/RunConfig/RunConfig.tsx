import React from "react";
import { useQuery } from "urql";
import { GetRunConfigsDocument } from "generated";
import LoadingSpinner from "components/shared/LoadingSpinner";

const RunConfig = () => {
  React.useEffect(() => {
    document.title = "LANE - Run Config";
  }, []);

  const [result] = useQuery({
    query: GetRunConfigsDocument,
  });

  const runConfigs = result?.data?.getRunConfigs?.runConfigs ?? [];

  console.log("run configs", runConfigs);

  if (result.fetching) {
    return <LoadingSpinner className="mt-24" />;
  }

  return <div className="dark:text-slate-100">This is the Run Config Page</div>;
};

export default RunConfig;
