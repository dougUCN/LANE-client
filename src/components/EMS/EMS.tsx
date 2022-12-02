import React from "react";
import { useQuery } from "urql";

import { GetCompletedRunsDocument } from "generated";
import { LoadingSpinner } from "components/shared";
import CompletedRunsTable from "./CompletedRunsTable";

const ROWS_PER_QUERY = 15;

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
