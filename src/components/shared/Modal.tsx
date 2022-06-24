import clsx from "clsx";
import React from "react";
import Button from "./Button";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const Modal = ({ isOpen, onClose }: Props) => {
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
          {/** Modal Content */}
          <div
            onClick={e => e.stopPropagation()}
            className="border-0 relative flex flex-col w-full outline-none focus:outline-none bg-white opacity-100 rounded-lg shadow dark:bg-gray-700"
          >
            {/** Modal Header */}
            <div className="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Modal Title
              </h3>
            </div>
            {/** Modal Body */}
            <div className="p-6 space-y-6">
              <p className="text-base leading-relaxed text-gray-500 dark:text-gray-400">
                Modal Content
              </p>
            </div>
            {/** Modal Footer */}
            <div className="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
              <Button type="button">Create</Button>
              <Button type="button" color="secondary">
                Cancel
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
