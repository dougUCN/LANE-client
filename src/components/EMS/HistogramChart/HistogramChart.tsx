import clsx from "clsx";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ReferenceArea,
  ResponsiveContainer,
} from "recharts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearchMinus } from "@fortawesome/free-solid-svg-icons";
import { Histogram, LiveHistogram } from "generated";
import Button from "components/shared/Button";
import { formatDate, formatName } from "utils/formatters";
import useChart from "./hooks/useChart";

type Props = {
  histogram: LiveHistogram | Histogram | null;
};

const HistogramChart = ({ histogram }: Props) => {
  const {
    data,
    left,
    right,
    refAreaLeft,
    refAreaRight,
    bottom,
    top,
    setRefAreaLeft,
    setRefAreaRight,
    zoomOut,
    zoom,
  } = useChart(histogram);

  if (!histogram) {
    return null;
  }

  return (
    <div
      className="highlight-bar-charts"
      style={{ userSelect: "none", width: "100%" }}
    >
      <div className="mx-3 flex flex-row justify-between items-center">
        <div className="select-text">
          <strong>{formatName(histogram.type)}</strong>
          <div>
            <strong>Creation Date: </strong>
            {formatDate(histogram.created)}
          </div>
        </div>
        <Button
          type="button"
          className={clsx("px-4", "py-2", "mx-3", "my-3")}
          onClick={() => zoomOut()}
        >
          <FontAwesomeIcon icon={faSearchMinus} /> Reset Zoom
        </Button>
      </div>

      <ResponsiveContainer width="100%" height={400}>
        <LineChart
          width={800}
          height={400}
          data={data}
          onMouseDown={e => {
            if (e.activeLabel) setRefAreaLeft(parseInt(e.activeLabel));
          }}
          onMouseMove={e => {
            if (e.activeLabel && refAreaLeft) {
              setRefAreaRight(parseInt(e.activeLabel));
            }
          }}
          onMouseUp={() => zoom()}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            allowDataOverflow
            dataKey="x"
            domain={[left, right]}
            type="number"
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="2"
          />
          <Tooltip />
          <Line
            yAxisId="1"
            type="linear"
            dot={false}
            dataKey="y"
            stroke="#8884d8"
            isAnimationActive={false}
          />

          {refAreaLeft && refAreaRight ? (
            <ReferenceArea
              yAxisId="1"
              x1={refAreaLeft}
              x2={refAreaRight}
              strokeOpacity={0.3}
            />
          ) : null}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default HistogramChart;
