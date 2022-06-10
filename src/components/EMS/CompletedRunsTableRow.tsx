import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";

import { formatDate } from "utils/formatters";
import { HistTableEntry } from "generated";

type Props = {
  tableEntry?: HistTableEntry | null;
};
const CompletedRunsTableRow = ({ tableEntry }: Props) => {
  if (!tableEntry) {
    return null;
  }
  const runNumber = tableEntry.name?.replace(/\D/g, "") || "";
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
      >
        #{runNumber}
      </th>
      <td className="px-6 py-4">{formatDate(tableEntry.created, "date")}</td>
      <td className="px-6 py-4">{formatDate(tableEntry.created, "time")}</td>
      <td className="px-6 py-4 text-right">
        <Link
          to={`/ems/${tableEntry.name}`}
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
        >
          <FontAwesomeIcon
            className="text-dark-blue dark:text-white"
            icon={faArrowUpRightFromSquare}
          />
        </Link>
      </td>
    </tr>
  );
};

export default CompletedRunsTableRow;
