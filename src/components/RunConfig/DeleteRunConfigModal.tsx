import React from "react";
import clsx from "clsx";
import { CombinedError, useMutation } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faWarning } from "@fortawesome/free-solid-svg-icons";

import { Button, Modal } from "components/shared";
import { DeleteRunConfigDocument, RunConfig } from "generated";
import { formatDate } from "utils/formatters";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
  runConfig: RunConfig;
};

const DeleteRunConfigModal = ({ isOpen, closeModal, runConfig }: Props) => {
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [apiError, setApiError] = React.useState("");
  const [deleteRunConfigResult, deleteRunConfig] = useMutation(
    DeleteRunConfigDocument,
  );

  React.useEffect(() => {
    if (deleteRunConfigResult.error) {
      setApiError(deleteRunConfigResult.error.message);
    }
  }, [deleteRunConfigResult.error]);

  const handleDelete = () => {
    const variables = { id: runConfig.id };
    deleteRunConfig(variables)
      .then(() => {
        setIsSuccessful(true);
      })
      .catch((error: CombinedError) => {
        setIsSuccessful(false);
        setApiError(error.message);
      });
  };

  const handleOnClose = () => {
    setApiError("");
    closeModal();
  };

  const { name, lastLoaded } = runConfig;

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {/** Modal Header */}
      <div className="flex justify-center items-center p-4 rounded-t border-b dark:border-gray-600">
        <FontAwesomeIcon
          className="text-yellow-400 mr-4 fa-4x"
          icon={faWarning}
        />
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Are you sure you want to delete this Run Config?
        </h3>
      </div>
      {/** Modal Body */}
      {apiError && (
        <div className="text-center mt-2 mx-6 text-sm text-red-600 dark:text-red-500">
          <p>An error occurred during deletion</p>
          <p className="ml-6 mt-2">{apiError}</p>
        </div>
      )}
      <div className="mx-6 my-6 text-sm font-medium">
        <div className="flex flex-row justify-around text-gray-900 dark:text-gray-300">
          <div className={clsx("block", "font-bold", "mb-2")}>
            Run Config Name
            <p className="mt-2 font-normal">{name}</p>
          </div>
          <div className={clsx("block", "font-bold", "mb-2")}>
            Last Loaded
            <p className="mt-2 font-normal">
              {lastLoaded ? formatDate(lastLoaded) : "Never Used"}
            </p>
          </div>
        </div>
      </div>
      {/** Modal Footer */}
      <div className="flex justify-between items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
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

export default DeleteRunConfigModal;
