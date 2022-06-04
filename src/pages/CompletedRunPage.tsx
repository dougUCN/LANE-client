import CompletedRun from "components/EMS/CompletedRun";
import React from "react";
import { useParams } from "react-router-dom";

const CompletedRunPage = () => {
  const params = useParams();

  React.useEffect(() => {
    document.title = `LANE - ${params.runId}`;
  }, [params.runId]);

  return (
    <div>
      <CompletedRun />
    </div>
  );
};

export default CompletedRunPage;
