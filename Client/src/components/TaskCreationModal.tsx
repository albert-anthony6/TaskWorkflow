import { useForm } from 'react-hook-form';
import agent from '../api/agent';
import { Task } from '../utils/interfaces/task';
import StyledDropdown from './micro/StyledDropdown';
import { ColorOption } from '../utils/interfaces/color-options';
import IconClose from '../assets/icons/IconClose.svg?react';
import './TaskCreationModal.scss';

interface Props {
  onStateChange: (param: boolean) => void;
}

export default function TaskCreationModal({ onStateChange }: Props) {
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors }
  } = useForm({
    defaultValues: {
      title: '',
      description: '',
      severity: { value: 'Low', label: 'Low', color: '#00ff66' },
      startDate: null,
      endDate: null
    }
  });

  const severityValue = watch('severity');

  function onSubmit(data: Task) {
    const severityValue: string = (data.severity as ColorOption).value;

    // Only using the value property from the severity object
    const payload = {
      ...data,
      severity: severityValue
    };

    agent.Tasks.create(payload).then(function (resp) {
      console.log(resp);
    });
  }

  return (
    <div className="task-creation-modal">
      <div className="form-container">
        <h2>Create new task</h2>
        <p className="form-note">Use this form to setup your new task</p>
        <IconClose onClick={() => onStateChange(false)} className="icon-close" />
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="input-container">
            <label htmlFor="title">Title</label>
            <input
              {...register('title', {
                required: 'Task must have a title.',
                minLength: { value: 4, message: 'Title must be at least 4 characters long.' }
              })}
              id="title"
              type="text"
              placeholder="Enter title"
            />
            <div className="input--helper">
              <div className="caption text__error">{errors.title?.message}</div>
              <div className="caption">0/100</div>
            </div>
          </div>
          <div className="input-container">
            <label htmlFor="description">Description</label>
            <input
              {...register('description')}
              id="description"
              type="text"
              placeholder="Enter description"
            />
            <div className="caption">0/100</div>
          </div>
          <StyledDropdown
            value={severityValue}
            onChange={(selectedOption) => setValue('severity', selectedOption)}
          />
          <div className="dates-container">
            <div className="input-container">
              <label htmlFor="start-date">Start Date</label>
              <input {...register('startDate')} id="start-date" type="date" />
            </div>
            <div className="input-container">
              <label htmlFor="end-date">End Date</label>
              <input {...register('endDate')} id="end-date" type="date" />
            </div>
          </div>
          <div className="buttons-container">
            <button type="button" onClick={() => onStateChange(false)} className="button__cancel">
              Cancel
            </button>
            <button className="button__primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
