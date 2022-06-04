import NotFound from "components/shared/NotFound";
import { GetHistogramsDocument } from "generated";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";

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

  if (!histograms || !histograms?.length) {
    return <NotFound customText="run" />;
  }

  return <div>Completed Run Goes Here</div>;
};

export default CompletedRun;
