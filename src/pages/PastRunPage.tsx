import PastRun from "components/EMS/PastRun";
import React from "react";
import { useParams } from "react-router-dom";

const PastRunPage = () => {
  const params = useParams();

  React.useEffect(() => {
    document.title = `LANE - ${params.runId}`;
  }, [params.runId]);

  return (
    <div>
      <PastRun />
    </div>
  );
};

export default PastRunPage;
