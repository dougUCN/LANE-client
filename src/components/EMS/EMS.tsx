import {
  GetCompletedRunsDocument,
  HistTableEntry,
  HistTablePage,
  PageInfo,
} from "generated";
import React from "react";
import { useQuery } from "urql";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUpRightFromSquare } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatDate } from "utils/formatters";
import LoadingSpinner from "components/shared/LoadingSpinner";

const ROWS_PER_QUERY = 15;

type CompletedRunsTableProps = {
  tableEntriesFromProps: HistTablePage["edges"];
  setCursor: (cursor: string | null) => void;
  pageInfo?: PageInfo | null;
};
const CompletedRunsTable = ({
  tableEntriesFromProps,
  setCursor,
  pageInfo,
}: CompletedRunsTableProps) => {
  const [tableEntries, setTableEntries] = React.useState(tableEntriesFromProps);
  const prevTableEntries = React.useRef<typeof tableEntries>();

  React.useEffect(() => {
    if (
      prevTableEntries.current?.length &&
      prevTableEntries.current[0]?.node?.name !== tableEntriesFromProps &&
      tableEntriesFromProps?.length &&
      tableEntriesFromProps[0]?.node?.name
    ) {
      setTableEntries([...prevTableEntries.current, ...tableEntriesFromProps]);
    }
  }, [tableEntriesFromProps]);

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
              tableEntries.map((tableEntry, index) =>
                pageInfo?.hasNextPage && index === tableEntries.length - 1 ? (
                  <tr
                    key={`${tableEntry?.node?.name}_${index}`}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <td>
                      <button
                        onClick={() => {
                          prevTableEntries.current = tableEntries;
                          setCursor(pageInfo?.endCursor || null);
                        }}
                      >
                        load more
                      </button>
                    </td>
                  </tr>
                ) : (
                  <TableRow
                    key={`${tableEntry?.node?.name}_${index}`}
                    tableEntry={tableEntry?.node}
                    isLastEntry={index === tableEntries.length - 1}
                  />
                ),
              )
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

type TableRowProps = {
  tableEntry?: HistTableEntry | null;
  isLastEntry: boolean;
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

const EMS = () => {
  React.useEffect(() => {
    document.title = "LANE - EMS";
  }, []);

  const [cursor, setCursor] = React.useState<string | null>(null);

  const [result] = useQuery({
    query: GetCompletedRunsDocument,
    variables: {
      first: ROWS_PER_QUERY,
      after: cursor,
    },
  });

  const tableEntries = result?.data?.getHistTableEntries?.edges;
  const pageInfo = result?.data?.getHistTableEntries?.pageInfo;

  if (!tableEntries) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div>
      <CompletedRunsTable
        tableEntriesFromProps={tableEntries}
        pageInfo={pageInfo}
        setCursor={setCursor}
      />
    </div>
  );
};

export default EMS;
