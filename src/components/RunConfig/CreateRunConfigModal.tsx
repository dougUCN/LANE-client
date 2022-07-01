import { FieldValues, useForm } from "react-hook-form";
import { useMutation } from "urql";
import { Button, Modal, TextField } from "components/shared";
import { CreateRunConfigDocument } from "generated";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateRunConfigModal = ({ isOpen, onClose }: Props) => {
  const [createRunConfigResult, createRunConfig] = useMutation(
    CreateRunConfigDocument,
  );

  const submit = (data: FieldValues) => {
    const { name, totalTime } = data;
    const variables = { name, totalTime };
    createRunConfig(variables).then(result => {
      console.log("result", result);
    });
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: FieldValues) => {
    submit(data);
    onClose();
  };

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
            className="mb-2"
            type="submit"
            label="Config Name"
            minLength={1}
            hasError={!!errors.name}
            errorMessage="This field is required."
            register={register("name", { required: true })}
          />
          <TextField
            className="mt-2"
            type="submit"
            label="Duration (in seconds)"
            minLength={1}
            hasError={!!errors.totalTime}
            errorMessage="This field is required."
            register={register("totalTime", {
              required: true,
              valueAsNumber: true,
            })}
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
