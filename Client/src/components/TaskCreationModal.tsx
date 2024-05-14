import { useEffect, useState } from 'react';
import './TaskCreationModal.scss';
import { useForm } from 'react-hook-form';
import { User } from '../utils/interfaces/user';
import { Task } from '../utils/interfaces/task';
import { ColorOption } from '../utils/interfaces/color-options';
import { colorOptionsData } from '../utils/data/colorOptions';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import {
  createTask,
  editTask,
  getTask,
  resetSelectedTask,
  toggleTaskModal
} from '../store/slices/taskSlice';
import StyledDropdown from './micro/StyledDropdown';
import MutliSelectDropdown from './micro/MultiSelectDropdown';
import IconClose from '../assets/icons/icon_close.svg?react';
import IconEdit from '../assets/icons/icon_edit.svg?react';

interface Props extends Partial<ReactDatePickerProps> {
  members: User[];
}

export default function TaskCreationModal(props: Props) {
  const { taskModal, selectedTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [isWriting, setIsWriting] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    setError
  } = useForm<Task>({
    defaultValues: {
      title: '',
      description: '',
      severity: { value: 'Low', label: 'Low', color: '#00ff66' },
      startDate: null,
      endDate: null,
      assignees: null
    }
  });

  const severityValue = watch('severity');
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  function onSubmit(data: Task) {
    console.log(data);
    return;
    const severityValue: string = (data.severity as ColorOption).value;

    // Only using the value property from the severity object
    const payload = {
      id: taskModal.taskId,
      ...data,
      severity: severityValue
    };

    // If we're editing or creating the task
    if (selectedTask && taskModal.taskId) {
      dispatch(editTask(payload)).catch((err) => handleErrors(err.error));
    } else {
      // Backend will generate the id on task creation
      delete payload.id;
      dispatch(createTask(payload)).catch((err) => handleErrors(err.error));
    }
  }

  function handleErrors(errors: any) {
    errors.forEach((err: string) => {
      if (err.includes('Title')) {
        setError('title', { message: err });
      } else if (err.includes('startDate')) {
        setError('startDate', { message: err });
      }
    });
  }

  useEffect(() => {
    // Viewing an existing task
    if (taskModal.taskId) {
      dispatch(getTask(taskModal.taskId));
    } else {
      // Creating a new task
      dispatch(resetSelectedTask());
      setIsWriting(true);
    }
  }, [dispatch, taskModal]);

  useEffect(() => {
    // Populating fields with values from existing task
    if (selectedTask && taskModal.taskId) {
      // Formatting severity string
      const colorOption = colorOptionsData.find(
        (option: ColorOption) => option.value === selectedTask.severity
      );

      setValue('title', selectedTask.title);
      setValue('description', selectedTask.description);
      setValue('severity', colorOption as ColorOption);

      setValue('startDate', selectedTask.startDate);
      setValue('endDate', selectedTask.endDate);
    }
  }, [setValue, selectedTask, taskModal.taskId]);

  // Computed properties
  const isViewing = !isWriting && selectedTask;
  const isCreating = isWriting && !selectedTask;
  const isEditing = isWriting && selectedTask;

  return (
    <div className="task-creation-modal">
      <div className="form-container">
        {isEditing && (
          <>
            <h2>Edit task</h2>
            <p className="form-note">Use this form to edit the task</p>
          </>
        )}
        {isCreating && (
          <>
            <h2>Create new task</h2>
            <p className="form-note">Use this form to setup your new task</p>
          </>
        )}
        {isViewing && (
          <>
            <p className="edit-task" onClick={() => setIsWriting(true)}>
              Edit task <IconEdit />
            </p>
            <h2 className="title">{selectedTask.title}</h2>
          </>
        )}
        <IconClose
          onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: false })))}
          className="icon-close"
        />
        <form onSubmit={handleSubmit(onSubmit)}>
          {(isCreating || isEditing) && (
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
          )}
          <div className={`input-container ${!errors.title?.message && 'input-container__error'}`}>
            <label htmlFor="description">Description</label>
            <textarea
              className={isViewing ? 'disabled' : ''}
              {...register('description')}
              id="description"
              placeholder="Enter description"
            />
            <div className="caption">0/100</div>
          </div>
          <label>Assignees</label>
          <MutliSelectDropdown
            options={props.members}
            defaultValue={selectedTask?.assignees}
            register={register}
            setValue={setValue}
          />
          <StyledDropdown
            value={severityValue as ColorOption}
            onChange={(selectedOption) => setValue('severity', selectedOption)}
          />
          <div className="dates-container">
            <div className="input-container">
              <label htmlFor="start-date">Start Date</label>
              <DatePicker
                id="start-date"
                {...register('startDate', {
                  required: 'Task must have a start date.'
                })}
                {...props}
                selected={(startDateValue && new Date(startDateValue)) || null}
                onChange={(value) => setValue('startDate', value)}
                placeholderText="Start Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-input"
              />
              <div className="input--helper">
                <div className="caption text__error">{errors.startDate?.message}</div>
              </div>
            </div>
            <div className="input-container">
              <label htmlFor="end-date">End Date</label>
              <DatePicker
                id="end-date"
                {...register('endDate')}
                {...props}
                selected={(endDateValue && new Date(endDateValue)) || null}
                onChange={(value) => setValue('endDate', value)}
                placeholderText="End Date"
                showTimeSelect
                timeCaption="time"
                dateFormat="MMMM d, yyyy h:mm aa"
                className="date-input"
              />
            </div>
          </div>
          {(isCreating || isEditing) && (
            <div className="buttons-container">
              <button
                type="button"
                onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: false })))}
                className="button__cancel"
              >
                Cancel
              </button>
              {isCreating ? (
                <button className="button__primary">Create Task</button>
              ) : (
                <button className="button__primary">Edit Task</button>
              )}
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
