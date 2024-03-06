import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import IconAdd from '../assets/icons/icon_add.svg?react';
import './TaskColumn.scss';

interface Task {
  id: string;
  title: string;
  date: Date;
  description: string;
  status: string;
  dueDate: Date;
}

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
              {list.map((text, index) => (
                <TaskCard key={text.id} text={text.title} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
}
