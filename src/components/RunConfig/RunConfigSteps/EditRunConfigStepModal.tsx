import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery } from "urql";
import { Button, Modal, TextField } from "components/shared";
import {
  RunConfigStep as RunConfigStepType,
  GetDevicesDocument,
  GetDeviceDocument,
  DeviceOptionEnum,
} from "generated";
import Dropdown from "components/shared/Dropdown";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  step: RunConfigStepType;
};

const EditRunConfigStepModal = ({ isOpen, onClose, step }: Props) => {
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [apiError, setApiError] = React.useState("");
  const [currentDeviceOptionType, setCurrentDeviceOptionType] =
    React.useState<DeviceOptionEnum>();

  const [getDevicesResult] = useQuery({
    query: GetDevicesDocument,
  });

  const { deviceName, deviceOption, time } = step;
  const description = step.description;

  const [getDeviceResult, reexecuteQuery] = useQuery({
    query: GetDeviceDocument,
    variables: { name: currentDeviceOptionType || "" },
    pause: !!currentDeviceOptionType,
  });

  // need to figure out if this variable is of type DeviceOption! or [DeviceOption!]
  const currentDeviceOptions = getDeviceResult.data?.getDevice?.deviceOptions;

  // retrieve the names of all available devices
  const availableDevices =
    getDevicesResult.data?.getDevices?.map(device => ({
      name: device?.name || "",
      value: device?.name || "",
    })) ?? [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  React.useEffect(() => {
    if (description) {
      reset({
        description,
        selectedDevice: deviceName,
      });
    }
  }, [description, deviceName, reset]);

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
    onClose();
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
          <TextField
            className="mb-2"
            label="Description"
            register={register("description")}
          />
          <Dropdown
            className="mb-2"
            label="Device Name"
            register={register("selectedDevice")}
            options={availableDevices}
          />
          {deviceOption.deviceOptionType === "SELECT_ONE" && (
            <Dropdown
              className="mb-2"
              label="Device Option"
              register={register("options")}
              options={
                deviceOption.options?.map(option => ({
                  name: option,
                  value: option,
                })) || []
              }
            />
          )}
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

export default EditRunConfigStepModal;
