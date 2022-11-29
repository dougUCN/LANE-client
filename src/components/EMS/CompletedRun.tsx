import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";

import { GetHistogramsDocument } from "generated";
import { LoadingSpinner, NotFound } from "components/shared";
import HistogramChart from "./HistogramChart";

type CompletedRunPageParams = {
  runName: string;
};

const CompletedRun = () => {
  const { runName } = useParams<CompletedRunPageParams>();

  const [result] = useQuery({
    query: GetHistogramsDocument,
    variables: { names: [runName || ""] },
  });

  const runNumber = runName?.replace(/\D/g, "") || "";

  const histograms = result.data?.getHistograms;
  const isLoading = result.fetching;

  React.useEffect(() => {
    document.title = runNumber ? `LANE - Run #${runNumber}` : "LANE";
  }, [runNumber]);

  if (!isLoading && (!histograms || !histograms?.length)) {
    return <NotFound customText="run" />;
  }

  if (isLoading && (!histograms || !histograms?.length)) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div>
      <h2 className="text-center dark:text-slate-100 font-bold text-2xl mt-5">
        Run #{runNumber}
      </h2>
      {histograms &&
        histograms.map((histogram, index) => (
          <React.Fragment key={`${histogram?.id}_${index}`}>
            <HistogramChart histogram={histogram} />
          </React.Fragment>
        ))}
    </div>
  );
};

export default CompletedRun;
