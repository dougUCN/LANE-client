import React from "react";
import { useQuery } from "urql";
import { useParams } from "react-router-dom";

import { GetRunConfigDocument } from "generated";
import { LoadingSpinner } from "components/shared";
import NotFound from "components/shared/NotFound";

type RunConfigStepsPageParams = {
  runConfigId: string;
};

const RunConfigSteps = () => {
  const { runConfigId } = useParams<RunConfigStepsPageParams>();
  React.useEffect(() => {
    document.title = `LANE - Run Config ${runConfigId}`;
  }, [runConfigId]);

  // Need to pass the __typename "RunConfig" in case query returns an empty list (required for caching)
  // See https://formidable.com/open-source/urql/docs/basics/document-caching/#document-cache-gotchas
  const [result] = useQuery({
    query: GetRunConfigDocument,
    variables: { id: runConfigId || "" },
    context: React.useMemo(() => ({ additionalTypenames: ["RunConfig"] }), []),
  });

  const steps = result?.data?.getRunConfig?.steps;
  const totalTime = result?.data?.getRunConfig?.totalTime;

  const isLoading = result.fetching;

  if (!isLoading && (!steps || !steps?.length)) {
    return <NotFound customText="run config step" />;
  }

  if (isLoading) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <>
      <div className="dark:text-slate-100">
        <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
          {`Run Config Step #${runConfigId}`}
        </h2>
        {steps &&
          steps.map((step, index) => (
            <React.Fragment key={index}>
              <div>Run Config Step at time: {step.time}</div>
            </React.Fragment>
          ))}
      </div>
    </>
  );
};

export default RunConfigSteps;
