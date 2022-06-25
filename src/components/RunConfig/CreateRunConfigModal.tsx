import { Button, Modal } from "components/shared";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

const CreateRunConfigModal = ({ isOpen, onClose }: Props) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
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
        <Button onClick={onClose} type="button" color="secondary">
          Cancel
        </Button>
      </div>
    </Modal>
  );
};

export default CreateRunConfigModal;
