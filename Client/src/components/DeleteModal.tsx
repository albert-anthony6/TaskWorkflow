import IconClose from '../assets/icons/icon_close.svg?react';

interface Props {
  title: string;
  closeModal: () => void;
  dispatchAction: () => void;
}

export default function MemberModal({ closeModal, dispatchAction, title }: Props) {
  function handleDelete() {
    dispatchAction();
  }

  return (
    <div className="simple-modal modal-container">
      <div className="simple-modal--content">
        <IconClose onClick={closeModal} className="icon-close" />
        <h2>{title}</h2>
        <div className="buttons-container">
          <button type="button" onClick={closeModal} className="button__cancel">
            Cancel
          </button>
          <button onClick={() => handleDelete()} className="button__primary__delete">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
