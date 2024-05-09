import { useEffect } from 'react';
import './TaskCreationModal.scss';
import { useForm } from 'react-hook-form';
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

export default function TaskCreationModal(props: Partial<ReactDatePickerProps>) {
  const { taskModal, selectedTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
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
      endDate: null
    }
  });

  const severityValue = watch('severity');
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  function onSubmit(data: Task) {
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
    if (taskModal.taskId) {
      dispatch(getTask(taskModal.taskId));
    } else {
      dispatch(resetSelectedTask());
    }
  }, [dispatch, taskModal]);

  useEffect(() => {
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

  return (
    <div className="task-creation-modal">
      <div className="form-container">
        {selectedTask ? (
          <h2>Edit this task</h2>
        ) : (
          <>
            <h2>Create new task</h2>
            <p className="form-note">Use this form to setup your new task</p>
          </>
        )}
        <IconClose
          onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: false })))}
          className="icon-close"
        />
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
          <div className={`input-container ${!errors.title?.message && 'input-container__error'}`}>
            <label htmlFor="description">Description</label>
            <input
              {...register('description')}
              id="description"
              type="text"
              placeholder="Enter description"
            />
            <div className="caption">0/100</div>
          </div>
          <label>Assignees</label>
          <MutliSelectDropdown />
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
          <div className="buttons-container">
            <button
              type="button"
              onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: false })))}
              className="button__cancel"
            >
              Cancel
            </button>
            <button className="button__primary">Create Task</button>
          </div>
        </form>
      </div>
    </div>
  );
}
