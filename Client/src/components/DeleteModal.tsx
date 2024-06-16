import { useState } from 'react';
import { toast } from 'react-toastify';
import IconClose from '../assets/icons/icon_close.svg?react';

interface Props {
  title: string;
  closeModal: () => void;
  dispatchAction: () => void;
  handleDeletion: () => void;
}

export default function MemberModal({ title, closeModal, dispatchAction, handleDeletion }: Props) {
  const [isLoading, setIsLoading] = useState(false);

  async function handleDelete() {
    setIsLoading(true);
    try {
      await dispatchAction();
      handleDeletion();
      toast.success('Item deleted successfully!');
    } catch {
      toast.error('Failed to delete item');
    }
    setIsLoading(false);
    closeModal();
  }

  return (
    <div onClick={closeModal} className="delete-modal simple-modal modal-container">
      <div onClick={(event) => event.stopPropagation()} className="simple-modal--content">
        <IconClose onClick={closeModal} className="icon-close" />
        <h2>{title}</h2>
        <div className="buttons-container">
          <button type="button" onClick={closeModal} className="button__cancel">
            Cancel
          </button>
          <button
            onClick={() => handleDelete()}
            style={{ minWidth: '128px' }}
            className="button__primary__delete"
          >
            {isLoading ? <div className="loading-spinner" /> : <span>Delete</span>}
          </button>
        </div>
      </div>
    </div>
  );
}
