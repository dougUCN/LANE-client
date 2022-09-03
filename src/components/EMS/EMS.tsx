import React from "react";
import { useQuery } from "urql";

import LoadingSpinner from "components/shared/LoadingSpinner";
import Dropdown from "components/shared/Dropdown";
import DateRangePicker from "components/shared/DateRangePicker";
import CompletedRunsTable from "./CompletedRunsTable";
import { GetCompletedRunsDocument } from "generated";

const ROWS_PER_QUERY = 15;

const options = [
  { label: "All", value: "all" },
  { label: "Date Range", value: "range" },
];

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
    <div className="lg:mx-48 md:mx-24 mx-0 my-12">
      <div className="flex flex-row space-x-12">
        <Dropdown className="mb-6" options={options} label="Filter by" />
        <DateRangePicker />
      </div>
      <CompletedRunsTable
        tableEntriesFromProps={tableEntries}
        pageInfo={pageInfo}
        setCursor={setCursor}
      />
    </div>
  );
};

export default EMS;
