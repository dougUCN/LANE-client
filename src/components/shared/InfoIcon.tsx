import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleInfo } from "@fortawesome/free-solid-svg-icons";

import Tooltip from "./Tooltip";

const InfoIcon = ({ message }: { message: JSX.Element }) => {
  return (
    <Tooltip message={message}>
      <button className="cursor-default" type="button">
        <FontAwesomeIcon
          className="ml-1 md:p-0 p-2 text-dark-blue dark:text-white"
          icon={faCircleInfo}
        />
      </button>
    </Tooltip>
  );
};

export default InfoIcon;
