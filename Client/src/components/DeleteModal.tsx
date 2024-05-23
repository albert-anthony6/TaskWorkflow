import { useAppDispatch } from '../store/configureStore';
import IconClose from '../assets/icons/icon_close.svg?react';
import { deleteProject } from '../store/slices/projectSlice';

interface Props {
  id: string;
  closeModal: () => void;
}

export default function MemberModal({ closeModal, id }: Props) {
  const dispatch = useAppDispatch();

  function handleDelete() {
    dispatch(deleteProject(id));
  }

  return (
    <div className="simple-modal modal-container">
      <div className="simple-modal--content">
        <IconClose onClick={closeModal} className="icon-close" />
        <h2>Are you sure you want to delete this project?</h2>
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
