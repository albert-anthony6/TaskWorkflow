import { useEffect, useState } from 'react';
import './TaskCreationModal.scss';
import { useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import { User } from '../utils/interfaces/user';
import { Task } from '../utils/interfaces/task';
import { ColorOption } from '../utils/interfaces/color-options';
import { colorOptionsData } from '../utils/data/colorOptions';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import DatePicker, { ReactDatePickerProps } from 'react-datepicker';
import { toast } from 'react-toastify';
import {
  createTask,
  deleteTask,
  editTask,
  getTask,
  resetSelectedTask,
  toggleTaskModal
} from '../store/slices/taskSlice';
import { uploadImage } from '../store/slices/taskSlice';
import ImageDropzone from './micro/ImageDropzone';
import ImageCropper from './micro/ImageCropper';
import StyledDropdown from './micro/StyledDropdown';
import MutliSelectDropdown from './micro/MultiSelectDropdown';
import DeleteModal from '../components/DeleteModal';
import IconClose from '../assets/icons/icon_close.svg?react';
import IconEdit from '../assets/icons/icon_edit.svg?react';
import IconUpload from '../assets/icons/icon_upload.svg?react';
import IconDelete from '../assets/icons/icon_delete.svg?react';
import useBlobCleanup from '../utils/hooks/useBlobCleanup';

interface Props extends Partial<ReactDatePickerProps> {
  members: User[];
  getProject: () => void;
}

export default function TaskCreationModal(props: Props) {
  const params = useParams();
  const { taskModal, selectedTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [isWriting, setIsWriting] = useState(false);
  const [isOnDetails, setIsOnDetails] = useState(true);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const {
    blob: attachmentBlob,
    setBlob: setAttachmentBlob,
    blobUrl: attachmentBlobUrl,
    setBlobUrl: setAttachmentBlobUrl,
    files: attachmentFiles,
    setFiles: setAttachmentFiles
  } = useBlobCleanup();
  const [hasAttachmentImage, setHasAttachmentImage] = useState(false);
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
  const titleCharCount = watch('title').length;
  const descriptionCharCount = watch('description').length;
  const startDateValue = watch('startDate');
  const endDateValue = watch('endDate');

  function onAttachmentSave() {
    dispatch(uploadImage({ file: attachmentBlob as Blob, id: `${selectedTask?.id}` }));
  }

  function onSubmit(data: Task) {
    const severityValue: string = (data.severity as ColorOption).value;

    // Only using the value property from the severity object
    const payload = {
      id: taskModal.taskId,
      ...data,
      severity: severityValue,
      appUserIds: data.assignees as string[]
    };

    delete payload.assignees;

    // If we're editing or creating the task
    if (selectedTask && taskModal.taskId) {
      dispatch(editTask(payload))
        .then(() => {
          toast.success('Task successfully edited');
          dispatch(toggleTaskModal({ isOpen: false }));
          props.getProject();
        })
        .catch((err) => handleErrors(err.error));
    } else {
      // Backend will generate the id on task creation
      delete payload.id;
      dispatch(createTask({ projectId: `${params.projectId}`, body: payload }))
        .then(() => {
          toast.success('Task successfully created');
          dispatch(toggleTaskModal({ isOpen: false }));
          props.getProject();
        })
        .catch((err) => handleErrors(err.error));
    }
  }

  function handleDeletion() {
    props.getProject();
    dispatch(toggleTaskModal({ isOpen: false }));
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

  if (!isOnDetails)
    return (
      <div className="task-creation-modal modal-container">
        <div className="form-container">
          <ul>
            <li onClick={() => setIsOnDetails(true)} className={isOnDetails ? 'active' : ''}>
              Details
            </li>
            <li onClick={() => setIsOnDetails(false)} className={isOnDetails ? '' : 'active'}>
              Attachments
            </li>
          </ul>
          <h2 className="title">Attachments</h2>
          {/* Attachment Image Upload */}
          {attachmentFiles.length > 0 && !attachmentBlob && (
            <ImageCropper
              files={attachmentFiles}
              setFiles={setAttachmentFiles}
              setBlob={setAttachmentBlob}
            />
          )}
          <ImageDropzone
            files={attachmentFiles}
            blobUrl={attachmentBlobUrl}
            image={''}
            hasImage={hasAttachmentImage}
            customPreview="img-preview__attachment"
            handleSave={onAttachmentSave}
            setHasImage={setHasAttachmentImage}
            setFiles={setAttachmentFiles}
            setBlob={setAttachmentBlob}
            setBlobUrl={setAttachmentBlobUrl}
          >
            <IconUpload />
            <p className="drop-container">Choose a file or drag it here</p>
          </ImageDropzone>
          {selectedTask?.attachments && (
            <div className="attachments-container">
              {selectedTask.attachments.map((photo) => (
                <img src={photo.url} key={photo.id} />
              ))}
            </div>
          )}
          <IconClose
            onClick={() => dispatch(toggleTaskModal({ isOpen: false }))}
            className="icon-close"
          />
        </div>
      </div>
    );

  return (
    <div className="task-creation-modal modal-container">
      <div className="form-container">
        <ul>
          <li onClick={() => setIsOnDetails(true)} className={isOnDetails ? 'active' : ''}>
            Details
          </li>
          <li onClick={() => setIsOnDetails(false)} className={isOnDetails ? '' : 'active'}>
            Attachments
          </li>
        </ul>
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
            <p className="delete-task" onClick={() => setIsDeleteModalOpen(true)}>
              Delete task <IconDelete />
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
                  minLength: { value: 4, message: 'Title must be at least 4 characters long.' },
                  maxLength: { value: 100, message: 'Title must not be over 100 characters long.' }
                })}
                id="title"
                type="text"
                placeholder="Enter title"
                onChange={(e) => setValue('title', e.target.value)}
              />
              <div className="input--helper">
                <div className="caption text__error">{errors.title?.message}</div>
                <div className={titleCharCount > 100 ? 'caption caption__error' : 'caption'}>
                  {titleCharCount}/100
                </div>
              </div>
            </div>
          )}
          <div className={`input-container ${!errors.title?.message && 'input-container__error'}`}>
            <label htmlFor="description">Description</label>
            <textarea
              className={isViewing ? 'disabled' : ''}
              {...register('description', {
                maxLength: { value: 100, message: 'Bio must not be over 100 characters long.' }
              })}
              id="description"
              placeholder="Enter description"
              onChange={(e) => setValue('description', e.target.value)}
            />
            <div className="input--helper">
              <div className="caption text__error">{errors.description?.message}</div>

              <div className={descriptionCharCount > 100 ? 'caption caption__error' : 'caption'}>
                {descriptionCharCount}/100
              </div>
            </div>
          </div>
          <label>Assignees</label>
          <MutliSelectDropdown
            fieldName="assignees"
            options={props.members}
            defaultValue={selectedTask?.assignees}
            register={register}
            setValue={setValue}
            isReadOnly={isViewing as boolean}
          />
          <StyledDropdown
            value={severityValue as ColorOption}
            isReadOnly={isViewing as boolean}
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
                className={isViewing ? 'date-input disabled' : 'date-input'}
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
                className={isViewing ? 'date-input disabled' : 'date-input'}
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
      {isDeleteModalOpen && (
        <DeleteModal
          title="Are you sure you want to delete this task?"
          closeModal={() => setIsDeleteModalOpen(false)}
          dispatchAction={() => dispatch(deleteTask(`${selectedTask?.id}`))}
          handleDeletion={handleDeletion}
        />
      )}
    </div>
  );
}
