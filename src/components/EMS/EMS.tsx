import { GetCompletedRunsDocument, HistTableEntry } from "generated";
import React from "react";
import { useQuery } from "urql";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDate } from "utils/formatters";
import LoadingSpinner from "components/shared/LoadingSpinner";

const limit = 15;

type EMSProps = {
  variables: any;
  isLastPage: boolean;
  onLoadMore: any;
};
const EMS = ({ variables, isLastPage, onLoadMore }: EMSProps) => {
  const [result] = useQuery({
    query: GetCompletedRunsDocument,
    variables: {
      first: variables.first,
      after: variables.after,
    },
  });
  console.log("variables", variables);
  const tableEntries = result.data?.getHistTableEntries?.edges;
  const pageInfo = result.data?.getHistTableEntries?.pageInfo;

  console.log("result data", result.data);

  if (!tableEntries) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div className="mx-48 my-12">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Run Name
              </th>
              <th scope="col" className="px-6 py-3">
                Start Date
              </th>
              <th scope="col" className="px-6 py-3">
                Start Time
              </th>
              <th scope="col" className="px-6 py-3" />
            </tr>
          </thead>
          <tbody>
            {!tableEntries.length ? (
              <p>No completed runs found.</p>
            ) : (
              tableEntries.map(tableEntry => (
                <TableRow tableEntry={tableEntry?.node} />
              ))
            )}
            {isLastPage && pageInfo?.hasNextPage && (
              <button onClick={() => onLoadMore(pageInfo.endCursor)}>
                load more
              </button>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

type TableRowProps = {
  tableEntry?: HistTableEntry | null;
};
const TableRow = ({ tableEntry }: TableRowProps) => {
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

const EMSWrapper = () => {
  React.useEffect(() => {
    document.title = "LANE - EMS";
  }, []);

  const [pageVariables, setPageVariables] = React.useState([
    {
      GetCompletedRunsDocument,
      first: limit,
      after: null,
    },
  ]);

  console.log("page variables", pageVariables);

  return (
    <div>
      {pageVariables.map((variables, i) => (
        <EMS
          key={"" + variables.after}
          variables={variables}
          isLastPage={i === pageVariables.length - 1}
          onLoadMore={(after: null) =>
            setPageVariables([
              ...pageVariables,
              { after, first: limit, GetCompletedRunsDocument },
            ])
          }
        />
      ))}
    </div>
  );
};

export default EMSWrapper;
