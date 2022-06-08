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
import useDarkMode from "hooks/useDarkMode";

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
    canZoom,
    setRefAreaLeft,
    setRefAreaRight,
    zoomOut,
    zoom,
  } = useChart(histogram);

  const [isDark] = useDarkMode();

  if (!histogram) {
    return null;
  }

  return (
    <div
      className="highlight-bar-charts dark:text-slate-300 dark:bg-gray-900"
      style={{ userSelect: "none", width: "100%" }}
    >
      <div className="mx-3 flex flex-row justify-between items-center">
        <div className="select-text">
          <strong className="dark:text-slate-100">
            {formatName(histogram.type)}
          </strong>
          <div>
            <strong className="dark:text-slate-100">Creation Date: </strong>
            {formatDate(histogram.created)}
          </div>
        </div>
        <Button
          disabled={!canZoom}
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
          <CartesianGrid strokeDasharray={isDark ? "7 7" : "3 3"} />
          <XAxis
            allowDataOverflow
            dataKey="x"
            domain={[left, right]}
            type="number"
            stroke={isDark ? "#cbd5e1" : ""} // slate-300
            axisLine={false}
          />
          <YAxis
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="1"
            stroke={isDark ? "#cbd5e1" : ""}
          />
          <YAxis
            orientation="right"
            allowDataOverflow
            domain={[bottom, top]}
            type="number"
            yAxisId="2"
            stroke={isDark ? "#cbd5e1" : ""}
            axisLine={false}
          />
          <Tooltip
            contentStyle={{ backgroundColor: isDark ? "#374151" : "#F1F5F9" }} // gray-700 slate-100
          />
          <Line
            yAxisId="1"
            type="linear"
            dot={false}
            dataKey="y"
            stroke={isDark ? "#03ac1d" : "#8884d8"} // line-green line-blue
            strokeWidth={2}
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
