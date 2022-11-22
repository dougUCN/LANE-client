import React from "react";
import { FieldValues, useForm } from "react-hook-form";
// import { CombinedError, useMutation } from "urql";
import { Button, Modal, TextField } from "components/shared";
import { RunConfigStep as RunConfigStepType } from "generated";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const AddRunConfigStepModal = ({ isOpen, closeModal }: Props) => {
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [apiError, setApiError] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // React.useEffect(() => {
  //   if (createRunConfigResult.error) {
  //     setApiError(createRunConfigResult.error.message);
  //   }
  // }, [createRunConfigResult.error]);

  // const submit = (data: FieldValues) => {
  //   const { name, totalTime } = data;
  //   const variables = { name, totalTime };
  //   createRunConfig(variables)
  //     .then(() => {
  //       setIsSuccessful(true);
  //     })
  //     .catch((error: CombinedError) => {
  //       setIsSuccessful(false);
  //       setApiError(error.message);
  //     });
  // };

  const onSubmit = (data: FieldValues) => {
    // submit(data);
    if (isSuccessful && !apiError) {
      setApiError("");
    }
    handleOnClose();
  };

  const handleOnClose = () => {
    reset();
    setApiError("");
    closeModal();
  };

  const hasFormErrors = !!errors.runConfigName || !!errors.totalTime;

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {/** Modal Header */}
      <div className="p-4 rounded-t border-b dark:border-gray-600">
        <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
          Add Run Config Step
        </h3>
      </div>
      {apiError && (
        <div className="mt-2 mx-6 text-sm text-red-600 dark:text-red-500">
          <p>An error occurred:</p>
          <p className="ml-6 mt-2">{apiError}</p>
        </div>
      )}
      {/** Modal Body */}
      <div className="p-6 space-y-6">
        <form className="dark:text-white" onSubmit={handleSubmit(onSubmit)}>
          Form goes here
        </form>
      </div>
      {/** Modal Footer */}
      <div className="flex justify-around items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <Button
          disabled={hasFormErrors}
          className="px-8"
          onClick={handleSubmit(onSubmit)}
          type="button"
        >
          Create
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

export default AddRunConfigStepModal;
