import React, { useState, useEffect } from "react";
import { FieldValues, useForm, useFieldArray } from "react-hook-form";
import { CombinedError, useMutation, useQuery } from "urql";

import {
  DeviceOption,
  GetDeviceDocument,
  RunConfigStep,
  UpdateRunConfigStepDocument,
  CreateRunConfigDocument,
} from "generated";
import {
  Button,
  Modal,
  TextField,
  Dropdown,
  CheckboxField,
} from "components/shared";
import useStateFromProps from "hooks/useStateFromProps";

type Props = {
  availableDevices: string[];
  isOpen: boolean;
  runConfigID: string;
  runConfigStep?: RunConfigStep;
  onClose: () => void;
};

const RunConfigStepModal = ({
  availableDevices,
  isOpen,
  runConfigID,
  runConfigStep,
  onClose,
}: Props) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [apiError, setApiError] = useState("");
  const [currentTime, setCurrentTime] = useState("0");
  const [currentDescription, setCurrentDescription] = useState("");
  const [hasInputChange, setHasInputChange] = useState(false);
  const [currentDeviceName, setCurrentDeviceName] = useStateFromProps(
    runConfigStep?.deviceName,
  );

  const [updateRunConfigStepResult, updateRunConfigStep] = useMutation(
    UpdateRunConfigStepDocument,
  );

  const [createRunConfigStepResult, createRunConfigStep] = useMutation(
    CreateRunConfigDocument,
  );

  const {
    handleSubmit,
    formState: { errors },
    control,
    register,
    reset,
    watch,
  } = useForm();
  const { fields } = useFieldArray({
    control,
    name: "deviceDropdownOptions",
  });

  const watchDeviceDropdownOptions: DeviceOption[] = watch(
    "deviceDropdownOptions",
  );
  const controlledDeviceDropdownOptions = fields.map((field, index) => {
    return {
      ...field,
      ...watchDeviceDropdownOptions[index],
    };
  });

  const [getDeviceResult, reexecuteQuery] = useQuery({
    query: GetDeviceDocument,
    variables: { name: currentDeviceName || availableDevices[0] },
  });

  const currentDeviceOptions = getDeviceResult.data?.getDevice?.deviceOptions;

  useEffect(() => {
    if (!runConfigStep) {
      reexecuteQuery();
    }
  }, [reexecuteQuery, runConfigStep]);

  useEffect(() => {
    if (runConfigStep?.description) {
      setCurrentDescription(runConfigStep?.description);
    }
  }, [reset, runConfigStep?.description]);

  useEffect(() => {
    if (runConfigStep?.time) {
      setCurrentTime(runConfigStep?.time.toString());
    }
  }, [reset, runConfigStep?.time]);

  useEffect(() => {
    if (hasInputChange || !runConfigStep) {
      const options = currentDeviceOptions ?? [];
      options.forEach(option => {
        delete option.__typename;
      });
      reset({
        deviceDropdownOptions: options,
      });
    }
  }, [currentDeviceOptions, hasInputChange, reset, runConfigStep]);

  useEffect(() => {
    const selectedDevices = runConfigStep?.deviceOptions ?? [];
    if (selectedDevices.length) {
      const options = selectedDevices;
      options.forEach(option => {
        delete option.__typename;
      });
      reset({
        deviceDropdownOptions: options,
      });
    }
  }, [reset, runConfigStep?.deviceOptions]);

  useEffect(() => {
    if (updateRunConfigStepResult.error) {
      setApiError(updateRunConfigStepResult.error.message);
    }
  }, [updateRunConfigStepResult.error]);

  useEffect(() => {
    if (createRunConfigStepResult.error) {
      setApiError(createRunConfigStepResult.error.message);
    }
  }, [createRunConfigStepResult.error]);

  const submit = (dropdownOptions: DeviceOption[]) => {
    const payload = {
      id: runConfigStep?.id || "",
      time: parseFloat(currentTime),
      description: currentDescription,
      ...(currentDeviceName && { deviceName: currentDeviceName }),
      deviceOptions: dropdownOptions,
    };
    updateRunConfigStep({ runConfigID, step: payload })
      .then(res => {
        if (res.error?.message) {
          setIsSuccessful(false);
          setApiError(res.error.message);
          return;
        }
        setIsSuccessful(true);
      })
      .catch((error: CombinedError) => {
        setIsSuccessful(false);
        setApiError(error.message);
      });
  };

  const onSubmit = (data: FieldValues) => {
    const { deviceOptions } = data;
    const dropdownOptions = watchDeviceDropdownOptions;
    deviceOptions.forEach((option: { name?: string[] }, index: number) => {
      dropdownOptions[index].selected = option.name;
    });
    submit(dropdownOptions);
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
            <div className="flex flex-row justify-between">
              <Dropdown
                className="ml-8 mb-2"
                label="Device Name"
                onChange={e => {
                  setCurrentDeviceName(e.target.value);
                  setHasInputChange(true);
                }}
                value={currentDeviceName}
                options={availableDevices.map(deviceName => ({
                  name: deviceName,
                  value: deviceName,
                }))}
              />
              <TextField
                label="Time (sec)"
                value={currentTime}
                onChange={e => setCurrentTime(e.target.value)}
              />
            </div>
            {controlledDeviceDropdownOptions.map((deviceOption, index) => {
              return (
                <React.Fragment key={deviceOption.optionName}>
                  {deviceOption.deviceOptionType === "SELECT_ONE" && (
                    <Dropdown
                      className="mb-2 ml-16"
                      register={register(
                        `deviceOptions.${index}.name` as const,
                      )}
                      label={deviceOption.optionName}
                      options={
                        deviceOption.options?.map(option => ({
                          value: option,
                          name: option,
                        })) || []
                      }
                      value={deviceOption.selected?.[0]}
                    />
                  )}
                  {deviceOption.deviceOptionType === "USER_INPUT" && (
                    <TextField
                      className="mb-2 ml-16"
                      register={register(
                        `deviceOptions.${index}.name` as const,
                      )}
                      defaultValue={deviceOption.selected?.[0] || ""}
                      label={deviceOption.optionName}
                    />
                  )}
                  {deviceOption.deviceOptionType === "SELECT_MANY" && (
                    <CheckboxField
                      className="mb-2 ml-16"
                      register={register(
                        `deviceOptions.${index}.name` as const,
                      )}
                      label={deviceOption.optionName}
                      availableOptions={
                        deviceOption.options?.map(option => ({
                          value: option,
                          name: option,
                        })) || []
                      }
                      selectedOptions={
                        deviceOption.selected?.map(option => option) || []
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

export default RunConfigStepModal;