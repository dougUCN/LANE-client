import React from "react";

import { HistTablePage, PageInfo } from "generated";
import { LoadingSpinner, Button } from "components/shared";
import CompletedRunsTableRow from "./CompletedRunsTableRow";

type Props = {
  tableEntriesFromProps: HistTablePage["edges"];
  setCursor: (cursor: string | null) => void;
  pageInfo?: PageInfo | null;
};

const CompletedRunsTable = ({
  tableEntriesFromProps,
  setCursor,
  pageInfo,
}: Props) => {
  const [tableEntries, setTableEntries] = React.useState(tableEntriesFromProps);
  const prevTableEntries = React.useRef<typeof tableEntries>();

  React.useEffect(() => {
    if (prevTableEntries.current?.length && tableEntriesFromProps?.length) {
      setTableEntries([...prevTableEntries.current, ...tableEntriesFromProps]);
    }
  }, [tableEntriesFromProps]);

  if (!tableEntries) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div className="lg:mx-48 md:mx-24 mx-0 my-12 text-center">
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
              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <td colSpan={4} className="px-6 py-4 text-center">
                  No completed runs found
                </td>
              </tr>
            ) : (
              tableEntries.map((tableEntry, index) => (
                <CompletedRunsTableRow
                  key={`${tableEntry?.node?.name}_${index}`}
                  tableEntry={tableEntry?.node}
                />
              ))
            )}
          </tbody>
        </table>
      </div>
      {pageInfo?.hasNextPage && (
        <Button
          className="mt-5"
          onClick={() => {
            prevTableEntries.current = tableEntries;
            setCursor(pageInfo?.endCursor || null);
          }}
        >
          Load More
        </Button>
      )}
    </div>
  );
};

export default CompletedRunsTable;
