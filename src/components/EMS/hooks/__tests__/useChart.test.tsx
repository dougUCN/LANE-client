import { act, renderHook } from "@testing-library/react-hooks";
import liveHistogramsFixture from "fixtures/ems";
import useChart from "../useChart";

describe("useChart", () => {
  const histogramFixture = liveHistogramsFixture[0];

  it("should zoom correctly", () => {
    const { result } = renderHook(() => useChart(histogramFixture));

    // user drags and clicks chart from left to right
    act(() => {
      result.current.setRefAreaLeft(1);
      result.current.setRefAreaRight(2);
    });
    // zoom is called on mouseDOwn when user releases mouse
    act(() => {
      result.current.zoom();
    });
    expect(result.current.left).toBe(1);
    expect(result.current.right).toBe(2);
    expect(result.current.bottom).toBe(229);
    expect(result.current.top).toBe(274);
    expect(result.current.refAreaLeft).toBe(null);
    expect(result.current.refAreaLeft).toBe(null);
  });

  it("should swap refArea values when users highlight the chart from right to left", () => {
    const { result } = renderHook(() => useChart(histogramFixture));

    // user drags and clicks chart from left to right
    act(() => {
      result.current.setRefAreaLeft(2);
      result.current.setRefAreaRight(1);
    });

    act(() => {
      result.current.zoom();
    });
    expect(result.current.left).toBe(1);
    expect(result.current.right).toBe(2);
    expect(result.current.bottom).toBe(229);
    expect(result.current.top).toBe(274);
    expect(result.current.refAreaLeft).toBe(null);
    expect(result.current.refAreaLeft).toBe(null);
  });

  it("should zoom out correctly", () => {
    const { result } = renderHook(() => useChart(histogramFixture));

    // assume that chart before zoomOut() is called
    result.current.setLeft(1);
    result.current.setRight(2);

    act(() => {
      result.current.zoomOut();
    });
    expect(result.current.left).toBe(0);
    expect(result.current.right).toBe(12);
    expect(result.current.bottom).toBe(0);
    expect(result.current.top).toBe(1000);
    expect(result.current.refAreaLeft).toBe(null);
    expect(result.current.refAreaLeft).toBe(null);
  });
});
