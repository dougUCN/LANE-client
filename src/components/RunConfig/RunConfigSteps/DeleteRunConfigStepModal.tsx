import React from "react";
import { CombinedError, useMutation } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import { Button, Modal } from "components/shared";
import { DeleteRunConfigStepDocument, RunConfigStep as Step } from "generated";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  runConfigId: string;
  runConfigStep: Step;
};

const DeleteRunConfigStepModal = ({
  isOpen,
  onClose,
  runConfigId,
  runConfigStep,
}: Props) => {
  const [apiError, setApiError] = React.useState("");
  const [deleteRunConfigStepResult, deleteRunConfigStep] = useMutation(
    DeleteRunConfigStepDocument,
  );

  React.useEffect(() => {
    if (deleteRunConfigStepResult.error) {
      setApiError(deleteRunConfigStepResult.error.message);
    }
  }, [deleteRunConfigStepResult.error]);

  const handleDelete = () => {
    const variables = { runConfigId: runConfigId, stepID: runConfigStep.id };
    deleteRunConfigStep(variables)
      .then(res => {
        if (res.error) {
          setApiError(res.error.message);
          return;
        }
        handleOnClose();
      })
      .catch((error: CombinedError) => {
        setApiError(error.message);
      });
  };

  const handleOnClose = () => {
    setApiError("");
    onClose();
  };

  const { description, deviceName } = runConfigStep;

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {/** Modal Header */}
      <div className="flex justify-center items-center p-4 rounded-t border-b dark:border-gray-600">
        <FontAwesomeIcon
          className="text-yellow-400 mr-4 fa-4x"
          icon={faWarning}
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Are you sure you want to delete this Run Config Step?
        </h3>
      </div>
      {/** Modal Body */}
      {apiError && (
        <div className="text-center mt-2 mx-6 text-sm text-red-600 dark:text-red-500">
          <p>An error occurred during deletion</p>
          <p className="ml-6 mt-2">{apiError}</p>
        </div>
      )}
      <div className="mx-6 my-4 text-sm font-medium">
        <div className="grid grid-cols-2 text-gray-900 dark:text-gray-300">
          <div className="justify-self-center mb-1 dark:text-slate-100 font-bold dark:font-semibold">
            Run Config Step
            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              {deviceName}
            </p>
          </div>
          <div className="justify-self-center mb-1 dark:text-slate-100 font-bold dark:font-semibold">
            Description
            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              {description}
            </p>
          </div>
        </div>
      </div>
      {/** Modal Footer */}
      <div className="flex justify-around items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <Button className="px-8" onClick={handleDelete} type="button">
          Delete
        </Button>
        <Button
          className="px-8"
          onClick={handleOnClose}
          type="button"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default DeleteRunConfigStepModal;
