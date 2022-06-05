import React from "react";
import { EMS } from "components/EMS";

const EMSPage = () => {
  React.useEffect(() => {
    document.title = "LANE - EMS";
  }, []);

  return (
    <>
      <EMS />
    </>
  );
};

export default EMSPage;
