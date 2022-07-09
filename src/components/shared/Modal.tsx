import React from "react";
import clsx from "clsx";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
};

const Modal = ({ isOpen, onClose, children, className }: Props) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className="opacity-75 fixed inset-0 z-40 bg-black" />
      <div
        id="defaultModal"
        onClick={() => onClose()}
        className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div
            onClick={e => e.stopPropagation()}
            className={clsx(
              "border-0 relative",
              "flex",
              "flex-col",
              "w-full",
              "outline-none",
              "focus:outline-none",
              "bg-white",
              "opacity-100",
              "rounded-lg",
              "shadow",
              "dark:bg-gray-800",
              className,
            )}
          >
            {children}
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
