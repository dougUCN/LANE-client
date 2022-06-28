import { useForm } from "react-hook-form";
import { Button, Modal, TextField } from "components/shared";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateRunConfigModal = ({ isOpen, onClose }: Props) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const onSubmit = (data: any) => console.log("data", data);

  console.log("has error", !!errors.exampleRequired);
  console.log(watch("exampleRequired")); // watch input value by passing the name of it
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      {/** Modal Header */}
      <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
          Modal Title
        </h3>
      </div>
      {/** Modal Body */}
      <div className="p-6 space-y-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <TextField
            type="submit"
            label="Config Name"
            hasError={!!errors.exampleRequired}
            errorMessage="This field is required."
            register={register("runConfigName", { required: true })}
          />
          <TextField
            className="mt-2"
            type="submit"
            label="Duration"
            minLength={1}
            hasError={!!errors.duration}
            errorMessage="This field is required."
            register={register("duration", { required: true })}
          />
        </form>
      </div>
      {/** Modal Footer */}
      <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <Button onClick={handleSubmit(onSubmit)} type="button">
          Create
        </Button>
        <Button onClick={onClose} type="button" color="secondary">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRunConfigModal;
