import React, { useState, useEffect } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { CombinedError, useMutation, useQuery } from "urql";

import {
  DeviceOption,
  GetDeviceDocument,
  RunConfigStep,
  UpdateRunConfigStepDocument,
  CreateRunConfigStepDocument,
  RunConfigStepUpdateInput,
  RunConfigStepInput,
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
  runConfigId: string;
  runConfigStep?: RunConfigStep;
  onClose: () => void;
};

const RunConfigStepModal = ({
  availableDevices,
  isOpen,
  runConfigId,
  runConfigStep,
  onClose,
}: Props) => {
  const [isSuccessful, setIsSuccessful] = useState<boolean>(false);
  const [apiError, setApiError] = useState("");
  const [hasInputChange, setHasInputChange] = useState(false);
  const [currentDeviceName, setCurrentDeviceName] = useStateFromProps(
    runConfigStep?.deviceName || availableDevices[0],
  );

  const [updateRunConfigStepResult, updateRunConfigStep] = useMutation(
    UpdateRunConfigStepDocument,
  );

  const [createRunConfigStepResult, createRunConfigStep] = useMutation(
    CreateRunConfigStepDocument,
  );

  const selectedDevices = React.useMemo(
    () => runConfigStep?.deviceOptions ?? [],
    [runConfigStep?.deviceOptions],
  );

  const {
    handleSubmit,
    formState: { errors },
    register,
    reset,
    watch,
  } = useForm();

  const watchDeviceDropdownOptions: DeviceOption[] = watch(
    "deviceDropdownOptions",
  );
  const { time, description } = watch();

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
    if (selectedDevices.length) {
      const options = selectedDevices;
      options.forEach(option => {
        delete option.__typename;
      });
      reset({
        deviceDropdownOptions: options,
      });
    }
  }, [reset, selectedDevices]);

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

  useEffect(() => {
    if (typeof runConfigStep?.time === "number" && runConfigStep.time >= 0) {
      reset({
        time: runConfigStep.time.toString(),
      });
    }
  }, [reset, runConfigStep?.time]);

  useEffect(() => {
    if (runConfigStep?.description) {
      reset({
        description: runConfigStep.description,
      });
    }
  }, [reset, runConfigStep?.description]);

  const submit = (
    dropdownOptions: DeviceOption[],
    action: "create" | "edit",
  ) => {
    const payload = {
      ...(runConfigStep?.id && { id: runConfigStep.id }),
      time: parseFloat(time),
      description,
      deviceName: currentDeviceName,
      deviceOptions: dropdownOptions,
    };
    if (action === "edit") {
      updateRunConfigStep({
        runConfigId,
        step: payload as NonNullable<RunConfigStepUpdateInput>,
      })
        .then(res => {
          if (res.error) {
            setIsSuccessful(false);
            setApiError(res.error.message);
            return;
          }
          setIsSuccessful(true);
          handleOnClose();
        })
        .catch((error: CombinedError) => {
          setIsSuccessful(false);
          setApiError(error.message);
        });
      return;
    }
    createRunConfigStep(
      { runConfigId, step: payload as RunConfigStepInput },
      { additionalTypenames: ["RunConfig"] },
    )
      .then(res => {
        if (res.error) {
          setIsSuccessful(false);
          setApiError(res.error.message);
          return;
        }
        setIsSuccessful(true);
        handleOnClose();
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
      if (!option.name) {
        dropdownOptions[index].selected = [];
        return;
      }
      dropdownOptions[index].selected = option.name;
    });
    runConfigStep?.id
      ? submit(dropdownOptions, "edit")
      : submit(dropdownOptions, "create");
    if (isSuccessful && !apiError) {
      setApiError("");
    }
  };

  const handleOnClose = () => {
    reset();
    setApiError("");
    onClose();
  };

  const hasFormErrors = !!errors.runConfigName || !!errors.time;

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {/** Modal Header */}
      <div className="p-4 rounded-t border-b dark:border-gray-600">
        <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
          {`${runConfigStep?.id ? "Update" : "Create"} Run Config Step`}
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
              defaultValue={description}
              register={register("description", {
                required: true,
              })}
              hasError={!!errors.description}
              errorMessage="Please enter a description."
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
                defaultValue={
                  runConfigStep?.time ? runConfigStep.time.toString() : ""
                }
                register={register("time", {
                  validate: value => typeof parseFloat(value) === "number",
                })}
                hasError={!!errors.time}
                errorMessage="Please enter a valid time in seconds."
              />
            </div>
            {currentDeviceOptions?.length &&
              currentDeviceOptions.map((deviceOption, index) => {
                return (
                  <React.Fragment key={deviceOption.optionName}>
                    {deviceOption.deviceOptionType === "SELECT_ONE" && (
                      <Dropdown
                        className="mb-2 ml-16"
                        register={register(`deviceOptions.${index}.name.0`)}
                        label={deviceOption.optionName}
                        options={
                          deviceOption.options?.map(option => {
                            return {
                              value: option,
                              name: option,
                            };
                          }) || []
                        }
                        defaultValue={
                          selectedDevices.length
                            ? selectedDevices[index]?.selected?.[0]
                            : ""
                        }
                      />
                    )}
                    {deviceOption.deviceOptionType === "USER_INPUT" && (
                      <TextField
                        className="mb-2 ml-16"
                        register={register(`deviceOptions.${index}.name.0`)}
                        defaultValue={
                          selectedDevices.length
                            ? selectedDevices[index]?.selected?.[0] || ""
                            : ""
                        }
                        label={deviceOption.optionName}
                      />
                    )}
                    {deviceOption.deviceOptionType === "SELECT_MANY" &&
                      deviceOption.options?.length && (
                        <>
                          <label className="block mb-2 ml-16 text-sm font-medium text-gray-900 dark:text-gray-300">
                            {deviceOption.optionName}
                          </label>
                          <div className="flex flex-row justify-around">
                            {deviceOption.options.map(option => (
                              <div
                                key={option}
                                className="mb-2 ml-16 flex flex-row items-center space-x-3"
                              >
                                <CheckboxField
                                  register={register(
                                    `deviceOptions.${index}.name`,
                                  )}
                                  value={option}
                                  label={option}
                                  defaultChecked={
                                    !!(
                                      selectedDevices.length &&
                                      selectedDevices[
                                        index
                                      ]?.selected?.includes(option)
                                    )
                                  }
                                />
                              </div>
                            ))}
                          </div>
                        </>
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
          {runConfigStep?.id ? "Update" : "Create"}
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
