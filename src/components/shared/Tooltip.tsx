import { cloneElement, useMemo, useState } from "react";
import {
  Placement,
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
  message: string;
  placement?: Placement;
  children: JSX.Element;
}

const Tooltip = ({ children, message, placement = "top" }: Props) => {
  const [open, setOpen] = useState(false);

  const { x, y, reference, floating, strategy, context } = useFloating({
    placement,
    open,
    onOpenChange: setOpen,
    middleware: [offset(5), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
  });

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
        </div>
      )}
    </>
  );
};

export default Tooltip;

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
