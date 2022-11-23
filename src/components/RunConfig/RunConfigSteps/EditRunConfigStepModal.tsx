import React from "react";
import { FieldValues, useForm } from "react-hook-form";
import { useQuery } from "urql";
import { Button, Modal, TextField } from "components/shared";
import { GetDeviceDocument, Device, Scalars } from "generated";
import Dropdown from "components/shared/Dropdown";
import CheckboxField from "components/shared/CheckboxField";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  stepId: Scalars["ID"];
  deviceName?: string;
  stepDescription?: string | null;
  availableDevices: string[];
};

const EditRunConfigStepModal = ({
  isOpen,
  onClose,
  stepId,
  deviceName,
  stepDescription,
  availableDevices,
}: Props) => {
  const [isSuccessful, setIsSuccessful] = React.useState<boolean>(false);
  const [apiError, setApiError] = React.useState("");
  const [currentDescription, setCurrentDescription] = React.useState("");
  const [currentDeviceName, setCurrentDeviceName] = React.useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    watch,
  } = useForm();

  const { selectedDevice } = watch();

  const [getDeviceResult, reexecuteQuery] = useQuery({
    query: GetDeviceDocument,
    variables: { name: selectedDevice },
    pause: !deviceName,
  });

  React.useEffect(() => {
    if (stepDescription) {
      setCurrentDescription(stepDescription);
    }
  }, [reset, stepDescription]);

  React.useEffect(() => {
    if (deviceName) {
      reset({
        selectedDevice: deviceName,
      });
    }
  }, [deviceName, reset]);

  const device = getDeviceResult.data?.getDevice;

  console.log("device", device);
  console.log("current description", currentDescription);

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
          Update Run Config Step
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
          <>
            <TextField
              className="mb-2"
              label="Config Step Description"
              value={currentDescription}
              onChange={e => setCurrentDescription(e.target.value)}
            />
            <Dropdown
              className="ml-8 mb-2"
              label="Device Name"
              onChange={e => {
                setCurrentDeviceName(e.target.value);
                reexecuteQuery({ requestPolicy: "network-only" });
              }}
              value={currentDeviceName}
              options={availableDevices.map(deviceName => ({
                name: deviceName,
                value: deviceName,
              }))}
            />
            {device?.deviceOptions &&
              device.deviceOptions.length &&
              device.deviceOptions.map(deviceOption => {
                return (
                  <React.Fragment key={deviceOption.optionName}>
                    {deviceOption.deviceOptionType === "SELECT_ONE" && (
                      <Dropdown
                        className="mb-2 ml-16"
                        label={deviceOption.optionName}
                        register={register("selectedDeviceOption")}
                        options={
                          deviceOption.options?.map(option => ({
                            value: option,
                            name: option,
                          })) || []
                        }
                      />
                    )}
                    {deviceOption.deviceOptionType === "USER_INPUT" && (
                      <TextField
                        className="mb-2 ml-16"
                        label={deviceOption.optionName}
                        register={register("selectedDeviceOption")}
                      />
                    )}
                    {deviceOption.deviceOptionType === "SELECT_MANY" && (
                      <CheckboxField
                        className="mb-2 ml-16"
                        label={deviceOption.optionName}
                        register={register("selectedDeviceOptions")}
                        availableOptions={
                          deviceOption.options?.map(option => ({
                            value: option,
                            name: option,
                          })) || []
                        }
                        selectedOptions={
                          deviceOption.selected?.map(option => ({
                            value: option,
                            name: option,
                          })) || []
                        }
                      />
                    )}
                  </React.Fragment>
                );
              })}
          </>
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
          Update
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
