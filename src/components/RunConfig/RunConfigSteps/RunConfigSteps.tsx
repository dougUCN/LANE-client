import React, { useState, useEffect } from "react";
import { useQuery } from "urql";
import { useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import {
  GetDevicesDocument,
  GetRunConfigDocument,
  GetRunConfigStepDocument,
  RunConfigStep as Step,
} from "generated";

import { Button, LoadingSpinner } from "components/shared";
import { NotFound } from "components/shared";
import RunConfigStep from "./RunConfigStep";
import RunConfigStepModal from "./RunConfigStepModal";
import DeleteRunConfigStepModal from "./DeleteRunConfigStepModal";

type RunConfigStepsPageParams = {
  runConfigId: string;
};

const RunConfigSteps = () => {
  const { runConfigId } = useParams<RunConfigStepsPageParams>();

  useEffect(() => {
    document.title = `LANE - Run Config ${runConfigId}`;
  }, [runConfigId]);

  const [isRunConfigModalOpen, setIsRunConfigModalOpen] = useState(false);
  const [isDeleteStepModalOpen, setIsDeleteStepModalOpen] = useState(false);
  const [hasApiError, setHasApiError] = React.useState(false);

  const [loadedStep, setLoadedStep] = useState<Step>();

  // Need to pass the __typename "RunConfig" in case query returns an empty list (required for caching)
  // See https://formidable.com/open-source/urql/docs/basics/document-caching/#document-cache-gotchas
  const [getRunConfigResult] = useQuery({
    query: GetRunConfigDocument,
    variables: { id: runConfigId || "" },
    context: React.useMemo(() => ({ additionalTypenames: ["RunConfig"] }), []),
  });

  useEffect(() => {
    if (getRunConfigResult.error) {
      setHasApiError(true);
    }
  }, [getRunConfigResult.error]);

  const [getDevicesResult] = useQuery({
    query: GetDevicesDocument,
  });

  const [getRunConfigStepResult] = useQuery({
    query: GetRunConfigStepDocument,
    variables: { runConfigId: runConfigId || "", stepID: loadedStep?.id || "" },
    pause: !isRunConfigModalOpen || !loadedStep?.id,
  });

  const steps = getRunConfigResult?.data?.getRunConfig?.steps;
  const isLoading = getRunConfigResult.fetching;

  useEffect(() => {
    if (getRunConfigStepResult.data?.getRunConfigStep?.id) {
      setLoadedStep(getRunConfigStepResult.data?.getRunConfigStep);
    }
  }, [getRunConfigStepResult.data?.getRunConfigStep]);

  // retrieve the names of all available devices
  const availableDevices =
    getDevicesResult.data?.getDevices
      ?.map(device => device?.name || "")
      .filter(el => !!el) ?? [];

  if (!isLoading && hasApiError) {
    return <NotFound customText="run config step" />;
  }

  if (isLoading) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <>
      <div className="dark:text-slate-100 mb-12">
        <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
          {`${runConfigId}`}
        </h2>
        <div className="flex md:justify-end justify-center">
          <Button
            size="sm"
            className="mt-3 md:mr-24"
            onClick={() => {
              setLoadedStep(undefined);
              setIsRunConfigModalOpen(true);
            }}
          >
            <FontAwesomeIcon className="mr-2" icon={faPlus} />
            Add Step
          </Button>
        </div>
        {!steps?.length && (
          <div className="mx-24 mt-12 text-center">
            <p>There are currently no steps for this Run Config.</p>
            <p className="mt-4">
              To create a new step, click on the Add Step button above.
            </p>
          </div>
        )}
        {steps &&
          steps.map(step => (
            <React.Fragment key={step.id}>
              <RunConfigStep
                step={step}
                onEditModalOpen={() => {
                  setLoadedStep(step);
                  setIsRunConfigModalOpen(true);
                }}
                onDeleteModalOpen={() => {
                  setLoadedStep(step);
                  setIsDeleteStepModalOpen(true);
                }}
              />
            </React.Fragment>
          ))}
      </div>
      {isRunConfigModalOpen && runConfigId && (
        <RunConfigStepModal
          availableDevices={availableDevices}
          isOpen={isRunConfigModalOpen}
          runConfigId={runConfigId}
          runConfigStep={loadedStep}
          onClose={() => {
            setIsRunConfigModalOpen(false);
            setLoadedStep(undefined);
          }}
        />
      )}
      {isDeleteStepModalOpen && loadedStep?.id && runConfigId && (
        <DeleteRunConfigStepModal
          isOpen={isDeleteStepModalOpen}
          runConfigId={runConfigId}
          runConfigStep={loadedStep}
          onClose={() => setIsDeleteStepModalOpen(false)}
        />
      )}
    </>
  );
};

export default RunConfigSteps;
