import IconClose from '../assets/icons/IconClose.svg?react';
import './TaskCreationModal.scss';

interface Props {
  onStateChange: (param: boolean) => void;
}

export default function TaskCreationModal({ onStateChange }: Props) {
  return (
    <div className="task-creation-modal">
      <div className="form-container">
        <h2>Create new task</h2>
        <p>Use this form to setup your new task</p>
        <IconClose onClick={() => onStateChange(false)} className="icon-close" />
        <form>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input id="title" type="text" placeholder="Enter title" />
            <div className="caption">0/100</div>
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input id="description" type="text" placeholder="Enter description" />
            <div className="caption">0/100</div>
          </div>
        </form>
      </div>
    </div>
  );
}
