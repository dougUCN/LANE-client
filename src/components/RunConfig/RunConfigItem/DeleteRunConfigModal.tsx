import React from "react";
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
      .then(res => {
        if (res.error) {
          setApiError(res.error?.message);
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
      <div className="mx-6 my-4 text-sm font-medium">
        <div className="grid grid-cols-2 text-gray-900 dark:text-gray-300">
          <div className="justify-self-center mb-1 dark:text-slate-100 font-bold dark:font-semibold">
            Run Config Name
            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              {name}
            </p>
          </div>
          <div className="justify-self-center mb-1 dark:text-slate-100 font-bold dark:font-semibold">
            Last Loaded
            <p className="mt-1 text-sm font-normal text-gray-700 dark:text-gray-400">
              {lastLoaded ? formatDate(lastLoaded) : "Never Used"}
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

export default DeleteRunConfigModal;
