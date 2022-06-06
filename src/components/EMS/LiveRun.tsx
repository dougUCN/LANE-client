import React from "react";
import { useSubscription } from "urql";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHourglassEnd } from "@fortawesome/free-solid-svg-icons";

import {
  GetAllLiveHistogramsDocument,
  GetAllLiveHistogramsSubscription,
} from "generated";
import HistogramChart from "./HistogramChart";

const handleSubscription = (
  _liveHistograms: GetAllLiveHistogramsSubscription["getLiveHistograms"] = [],
  response: GetAllLiveHistogramsSubscription,
) => {
  const incomingHistograms = response?.getLiveHistograms
    ? response?.getLiveHistograms
    : [];
  return incomingHistograms;
};

const LiveRun = () => {
  const [result] = useSubscription(
    {
      query: GetAllLiveHistogramsDocument,
    },
    handleSubscription,
  );

  const liveHistograms = result.data;

  if (!liveHistograms?.length) {
    return (
      <div className="flex justify-center items-center mt-24">
        <div className="text-center dark:text-slate-300">
          <FontAwesomeIcon
            className="text-dark-blue dark:text-slate-300 mx-4 my-8 fa-4x"
            icon={faHourglassEnd}
          />
          <p className="text-slate-400 font-medium text-sm md:text-xl lg:text-2xl mt-8">
            No Histograms are currently running.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div>
      {liveHistograms?.map(
        (liveHistogram: typeof liveHistograms[0], index: number) => (
          <React.Fragment key={`${liveHistogram?.id}_${index}`}>
            <HistogramChart histogram={liveHistogram} />
          </React.Fragment>
        ),
      )}
    </div>
  );
};

export default LiveRun;