import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import { Task } from '../utils/interfaces/task';
import IconAdd from '../assets/icons/icon_add.svg?react';
import './TaskColumn.scss';

interface Props {
  col: {
    id: string;
    columnName: string;
    statusColor: string;
    list: Task[];
  };
  onStateChange: (param: boolean) => void;
}

export default function TaskColumn({
  col: { list, id, columnName, statusColor },
  onStateChange
}: Props) {
  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="task-column">
            <div className="column-header">
              <div className={`status-color status-color__${statusColor}`} />
              <p>{columnName}</p>
              {id === 'todo' && (
                <IconAdd onClick={() => onStateChange(true)} className="add-task" />
              )}
            </div>

            <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((task, index) => (
                <TaskCard key={task.id} task={task} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
}
