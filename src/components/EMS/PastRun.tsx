import { GetHistogramsDocument } from "generated";
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "urql";

type PastRunPageParams = {
  runName: string;
};

const PastRun = () => {
  const { runName } = useParams<PastRunPageParams>();

  const [result] = useQuery({
    query: GetHistogramsDocument,
    variables: { names: [runName || ""] },
  });

  console.log("params", runName);
  console.log("result", result);

  return <div>PastRunComponent</div>;
};

export default PastRun;
