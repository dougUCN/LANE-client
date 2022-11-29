import React from "react";
import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GetRunConfigDocument } from "generated";

import { Button, LoadingSpinner } from "components/shared";
import { NotFound } from "components/shared";
import RunConfigStep from "./RunConfigStep";
import AddRunConfigStepModal from "./AddRunConfigStepModal";

type RunConfigStepsPageParams = {
  runConfigId: string;
};

const RunConfigSteps = () => {
  const { runConfigId } = useParams<RunConfigStepsPageParams>();

  const [isCreateStepModalOpen, setIsCreateStepModalOpen] =
    React.useState(false);

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

  const isLoading = result.fetching;

  if (!isLoading && (!steps || !steps?.length)) {
    return <NotFound customText="run config step" />;
  }

  if (isLoading) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <>
      <div className="dark:text-slate-100 mb-12">
        <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
          {`Run Config Step #${runConfigId}`}
        </h2>
        <div className="flex md:justify-end justify-center">
          <Button
            size="sm"
            className="mt-3 md:mr-24"
            onClick={() => setIsCreateStepModalOpen(true)}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Add Step
          </Button>
        </div>
        {steps &&
          steps.map(step => (
            <React.Fragment key={step.id}>
              <RunConfigStep step={step} runConfigId={runConfigId || ""} />
            </React.Fragment>
          ))}
      </div>
      <AddRunConfigStepModal
        isOpen={isCreateStepModalOpen}
        closeModal={() => setIsCreateStepModalOpen(false)}
      />
    </>
  );
};

export default RunConfigSteps;
