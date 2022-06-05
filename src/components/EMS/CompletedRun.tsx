import LoadingSpinner from "components/shared/LoadingSpinner";
import NotFound from "components/shared/NotFound";
import { GetHistogramsDocument } from "generated";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";
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

  console.log("params", runName);
  console.log("result", result);

  const histograms = result.data?.getHistograms;
  const isLoading = result.fetching;

  if (!isLoading && (!histograms || !histograms?.length)) {
    return <NotFound customText="run" />;
  }

  if (isLoading && (!histograms || !histograms?.length)) {
    return <LoadingSpinner className="mt-24" />;
  }

  return (
    <div>
      {histograms.map((histogram, index) => (
        <React.Fragment key={`${histogram?.id}_${index}`}>
          <HistogramChart histogram={histogram} />
        </React.Fragment>
      ))}
    </div>
  );
};

export default CompletedRun;
