import TaskCard from './TaskCard';
import './TaskColumn.scss';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '../utils/interfaces/task';
import { toggleTaskModal } from '../store/slices/taskSlice';
import { useAppDispatch } from '../store/configureStore';
import Collapsible from 'react-collapsible';
import Skeleton from 'react-loading-skeleton';
import IconAdd from '../assets/icons/icon_add.svg?react';

interface Props {
  col: {
    id: string;
    columnName: string;
    statusColor: string;
    list: Task[];
  };
  isLoading: boolean;
}

export default function TaskColumn({
  col: { list, id, columnName, statusColor },
  isLoading
}: Props) {
  const dispatch = useAppDispatch();

  function handleAddTaskClick(event: React.MouseEvent) {
    dispatch(toggleTaskModal({ isOpen: true }));
    event.stopPropagation();
  }
  return (
    <div className="task-column-container">
      <Droppable droppableId={id}>
        {(provided) => (
          <Collapsible
            trigger={
              <div className="task-column--header">
                <div className={`status-color status-color__${statusColor}`} />
                <p>{columnName}</p>
                {id === 'todo' && (
                  <IconAdd onClick={(event) => handleAddTaskClick(event)} className="add-task" />
                )}
              </div>
            }
            contentInnerClassName="task-column"
            open={true}
          >
            {isLoading ? (
              <div className="task-column--content" ref={provided.innerRef}>
                <Skeleton
                  baseColor="#ccc"
                  duration={0.9}
                  width={'100%'}
                  circle={false}
                  className={'task-card'}
                />
                <Skeleton
                  baseColor="#ccc"
                  duration={0.9}
                  width={'100%'}
                  circle={false}
                  className={'task-card'}
                />
              </div>
            ) : (
              <div
                className="task-column--content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {list.map((task, index) => (
                  <TaskCard key={task.id} task={task} index={index} />
                ))}
                {provided.placeholder}
              </div>
            )}
          </Collapsible>
        )}
      </Droppable>
    </div>
  );
}
