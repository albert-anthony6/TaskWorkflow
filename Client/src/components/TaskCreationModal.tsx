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
  const params = useParams();
  const { taskModal, selectedTask } = useAppSelector((state) => state.task);
  const dispatch = useAppDispatch();
  const [isWriting, setIsWriting] = useState(false);
  const [isOnDetails, setIsOnDetails] = useState(true);
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
      dispatch(editTask(payload)).catch((err) => handleErrors(err.error));
    } else {
      // Backend will generate the id on task creation
      delete payload.id;
      dispatch(createTask({ projectId: `${params.projectId}`, body: payload })).catch((err) =>
        handleErrors(err.error)
      );
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
          <p className="edit-task" onClick={() => setIsWriting(true)}>
            Upload image <IconEdit />
          </p>
          <h2 className="title">Attachments</h2>
          <div className="attachments-container">
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBhQIBwgWFgkXGCAbGRgYGR4gIRwiHh0dIB0gHh4fIDQpHyUnIR0eJjMlKCs1LjEwIyg2ODsuOC0vMCsBCgoKBQUFDgUFDisZExkrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrKysrK//AABEIAMgAyAMBIgACEQEDEQH/xAAcAAEAAwEBAQEBAAAAAAAAAAAABgcIBQQDAgH/xAA+EAACAQMCAwUFAwoGAwAAAAAAAQIDBAUGEQcSITFBUWFxIlKBkaEjMmITFBVCU3KSorHwCBYzssHSF4Lh/8QAFAEBAAAAAAAAAAAAAAAAAAAAAP/EABQRAQAAAAAAAAAAAAAAAAAAAAD/2gAMAwEAAhEDEQA/AKdAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAJvwk0tS1PqhK8hvYUVz1F3S67Ri/V/RMD16E4V5PUtGN/f1PyGNf3W1vOa8Yx7l+J/BMtrGcKNIWFNKWOdWp71Wcm38FtH6E1jFRjyxXQ/QEUr8ONH14ck8DTS/DzRfzi0QnU/BK0q0nW01dyhW/Z1XvF+Sl2x+O/wAC4QBjfK4y9xF/KxyVtKncxezi/wCvmvNHkNPcT9FUdWYVzoU0srTTdKXj3uD8n3eD+O+YpRcZcsltLvA/hINKaMzeq63LirX7FP2qk+kI/Hvfkt2d/hbw/nqy7d7kE44im9nt0dSXup+Hi/7WjLKzt7C1ja2VGMLeK2jGK2SXoBWGC4IYi2gp5q+qVqvuw9iPp3yfzRK7fhto+3hywwVNr8TlL6ykyWACJXPDXR1zDlng4L91yj/tkiHah4H2FaDqaeyEqdXuhV9qL8uZLmj9S3gBkHUWncppu+/M8vauFTufbGS8YvsZyjX2pMBj9SYuWPylHmpPsffF90ovuZlzWGm7vSucnjLzrt1hPbpOL7Gv77UwOIAAAAAAAAAAAAAF4f4c4QVjeTX+pz00/Tae39WUeWNwP1JRwuppWF3U5be5Sju+xTi/Y39d5R9WgNGlXceMvlcZgqFPG1pwoVJtVJxbT6JOMd12J+18i0TyZLH2eVspWWRt41LaS2lGS3T/AL8QMj43N5TF3SusfkKkKye+6k+vqu/0ZeWneMOIqaZ/O89PlyUHyypwW7qPbpKC7En37vo/gczUvA+jUbraav8Akf7Kru16Ka6r4p+pVeotKZzTdTly+PlCG+yn2wfpNdPh2gSPWfFTN6i5razk7fHvpywftSX45/8AC2XqQ7C42vmMtSxtqvtqk1FeW77X5Lt+B4iyuAeOjd6zld1F0o0pSX70mor+VyAvrCYq1wmJp42xhtQpxUV5+Lfm3u36nvBxtYZn/L+mbjK7Lnpw3in7z9mG/wD7NARXiHxOs9K1Hj7Ckq2U26pv2afhz7dr/Cvmin8lxN1fkKjlLMShHujTSgl8lv8ANkTua9W6uJXFxUcq0m5Sk+1tvdtnzAluP4lavsaqnDNTmvColNP+Jb/It/h3xStdT1ljcpSVHKP7uz9ip+7v91/hfz7jOZ+6VSpRqqrRm1Ui9009mmuxpgal1rrzD6Ro7XVTnvmt40YP2n4OXuLzfwTM76y1dktX5FXeScVCO6hCK6QT7vF+rOHcV61zXde5quVaT3lKTbbfi2+0+YAAAAAAAAAAAAAAHYABb+gOMM7KjHHaqUp0l0jXXWSX41+t+8uvky5sVlcfmLVXOLvIVaPjB77eT8H5Mx3GMpPaEd32/LtPTjsje4y5VzjrudOsv1oSaf0A2SfK4oUrmi6NxSUqUls4ySaa8Gn2lEaR4z5K0rRt9S01Wtux1IpKcfNpdJfR+Ze9vWp3NCNehNOlJKUWu9NbpgUxxM4UUre2nmNLUmoxXNUodvTvdP8A6/LwPj/h02/SF573JT/rL/4XkVBo+3oaZ40XeIpLa3rU3KmvN8tTZeSXOvgBb5AeOHP/AOPqvL2c9Pf05l/zsT44etsM9QaVuMXD/UnD2f3ovmh/MkBkgH6q050qjp1YNVE9mn2prtTPyBs23hD8hH2F2Lu8j6fk4e4vkQalxZ0XGkovKvfb9lV/6HSwWv8ATeoMksfib6U7mSbS/J1F0S3bbcdkBJ/ycPcXyOBr22p1tE3sXFdLeo+z3YNr+hISOcRbmNpoW9qTfR0Jx/jXIvrIDJ4AAAAAAAAAAAAAWroLhE87YU8tl8io2U1zRhS6ya85PpH5P4FVFx8DtbUrVf5ZylVRg5b0JN9N5feh8X1Xm34oC1MNpPBYSxlZ47GwjSlHlnut3NNbNSk+rXl2FC6+4aZXT1/KtjbWdbFN7xlBOTgvCaXVbe92P6GlgBkTC6XzebvFa47HVJTb2bcWox85SfRI1dhrFYzEUbBT3VKlCG/jyxUd/oe0ADOnE3OzxnFp5Gyf2lB0/jtFNx+O7iy8dWajstL4WeSvp9EtoR36zl3RX99FuzJ+Svq+TyFS/u5b16knOT85Pdga9xGStsxjKeRsZ729SKlF+vc/Ndj9D2mceFHEJ6XuP0blZN4ib337XSk/1kvdfeviu/fRFtcUbq3jcWtVSoyW8ZRe6a8UwK04lcK4aguJZbBTjDIv78H0jUfjv+rL6Py7Smslo7UmMquneYSumu9Qcl8JR3T+ZrYAZJxmjdSZSsqdnhKzb73Bxj8ZS2S+ZfPC/QENH2srq9mp5SotpNdkI9vLF9/Xq35Lw6z0ACp+P+eha4Ong6U/t60uea8IQfTf1nt/Cyf6p1JjtL4qWQydXaP6sV96b7oxX97GWtT5671Jm6mUvn9pN9EuyMV2RXkkBygAAAAAAAAAAAAALowALP0ZxhyWHpRs87SdxaLop7/aRXq+k/j18y0MZxS0hkIJ/pVU5+7VjKLXx25fkzMAA1bX1/pKjDnnqCi1+GXM/lHciWoeNeEs6bhhLedet3SacIevX2n6bL1M/gDs6o1PldUX/wCd5a45mvuxXSMF4RXd/VnGAAEn0hrrOaTny4+45rTfd0p9YvzXuvzRGABoLB8bMDdwUcvb1KFXvaXPH5x9r+UlVvxB0jcR5qefopfibj9JJGUwBqi74jaQtI81TO02vwc0/wDamQvUXHCyowdLTthKpV7p1fZivNRT5pfQosAdPP57J6hvne5e6c6vdv2RXhFdiRzAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA/9k="
              alt=""
            />
            <img
              src="data:image/jpeg;base64,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"
              alt=""
            />
          </div>
          <IconClose
            onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: false })))}
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
    </div>
  );
}
