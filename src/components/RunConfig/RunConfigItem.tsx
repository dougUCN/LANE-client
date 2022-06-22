import React from "react";
import { RunConfig } from "generated";

type Props = {
  runConfig: RunConfig;
};
const RunConfigItem = ({ runConfig }: Props) => {
  return <div>{runConfig.name}</div>;
};

export default RunConfigItem;
