import { Draggable } from '@hello-pangea/dnd';
import { Task } from '../utils/interfaces/task';
import { toggleTaskModal } from '../store/slices/taskSlice';
import { useAppDispatch } from '../store/configureStore';
import IconEdit from '../assets/icons/icon_edit.svg?react';
import './TaskCard.scss';

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  const dispatch = useAppDispatch();

  return (
    <Draggable key={task.id} draggableId={task.id as string} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          <p className="task-card--title">
            {task.title}{' '}
            <IconEdit
              onClick={() => dispatch(dispatch(toggleTaskModal({ isOpen: true, taskId: task.id })))}
              className="icon__edit"
            />
          </p>
        </div>
      )}
    </Draggable>
  );
}
