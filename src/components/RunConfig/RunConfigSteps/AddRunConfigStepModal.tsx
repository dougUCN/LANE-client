import { Button, Modal } from "components/shared";

type Props = {
  isOpen: boolean;
  closeModal: () => void;
};

const AddRunConfigStepModal = ({ isOpen, closeModal }: Props) => {
  const handleOnClose = () => {
    closeModal();
  };

  return (
    <Modal isOpen={isOpen} onClose={handleOnClose}>
      {/** Modal Header */}
      <div className="p-4 rounded-t border-b dark:border-gray-600">
        <h3 className="text-center text-xl font-semibold text-gray-900 dark:text-white">
          Add Run Config Step
        </h3>
      </div>
      {/** Modal Body */}
      <div className="p-6 space-y-6">
        <form className="dark:text-white">Form goes here</form>
      </div>
      {/** Modal Footer */}
      <div className="flex justify-around items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
        <Button className="px-8" type="button">
          Create
        </Button>
        <Button
          className="px-8"
          onClick={handleOnClose}
          type="button"
          color="secondary"
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default AddRunConfigStepModal;
