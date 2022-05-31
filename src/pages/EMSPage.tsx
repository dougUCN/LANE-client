import { Helmet } from "react-helmet";
import EMS from "../components/EMS";

const EMSPage = () => {
  return (
    <>
      <Helmet>
        <title>LANE - EMS</title>
        <EMS />
      </Helmet>
    </>
  );
};

export default EMSPage;
