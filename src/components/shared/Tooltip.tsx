import React, { cloneElement, useMemo, useState, useRef } from "react";
import {
  Placement,
  arrow,
  offset,
  flip,
  shift,
  autoUpdate,
  useFloating,
  useInteractions,
  useHover,
  useFocus,
  useRole,
  useDismiss,
} from "@floating-ui/react-dom-interactions";
import { mergeRefs } from "react-merge-refs";

interface Props {
  message: JSX.Element;
  defaultPlacement?: Placement;
  children: JSX.Element;
}

const Tooltip = ({ children, message, defaultPlacement = "top" }: Props) => {
  const [open, setOpen] = useState(false);
  const arrowRef = useRef(null);

  const {
    x,
    y,
    reference,
    floating,
    strategy,
    context,
    placement,
    middlewareData: { arrow: { x: arrowX, y: arrowY } = {} },
  } = useFloating({
    open,
    onOpenChange: setOpen,
    middleware: [
      offset({ mainAxis: 8, crossAxis: -8 }),
      flip(),
      shift({ padding: 5 }),
      arrow({ element: arrowRef }),
    ],
    whileElementsMounted: autoUpdate,
  });

  const staticSide = mapPlacementSideToCSSProperty(placement);

  console.log("static side", staticSide);

  const { getReferenceProps, getFloatingProps } = useInteractions([
    useHover(context),
    useFocus(context),
    useRole(context, { role: "tooltip" }),
    useDismiss(context),
  ]);

  // Preserve the consumer's ref
  const ref = useMemo(
    () => mergeRefs([reference, (children as any).ref]),
    [reference, children],
  );

  return (
    <>
      {cloneElement(children, getReferenceProps({ ref, ...children.props }))}
      {open && (
        <div
          {...getFloatingProps({
            className: tooltipStyles,
            ref: floating,
            style: {
              position: strategy,
              top: y ?? 0,
              left: x ?? 0,
            },
          })}
        >
          {message}
          <div
            className={arrowStyles}
            ref={arrowRef}
            style={{
              left: arrowX != null ? `${arrowX}px` : "",
              top: arrowY != null ? `${arrowY}px` : "",
              [staticSide as string]: "-4px",
              transform: "rotate(45deg)",
            }}
          />
        </div>
      )}
    </>
  );
};

export default Tooltip;

function mapPlacementSideToCSSProperty(placement: Placement) {
  const staticPosition = placement.split("-")[0];

  const staticSide = {
    top: "bottom",
    right: "left",
    bottom: "top",
    left: "right",
  }[staticPosition];

  return staticSide;
}

const tooltipStyles = [
  "inline-block",
  "absolute",
  "z-10",
  "py-2",
  "px-3",
  "text-sm",
  "font-medium",
  "text-white",
  "bg-gray-900",
  "rounded-lg",
  "shadow-sm",
  "dark:bg-black",
].join(" ");

const arrowStyles = [
  "absolute",
  "bg-gray-900",
  "dark:bg-black",
  "w-3",
  "h-3",
  "rotate-45",
  "left-3",
].join(" ");
