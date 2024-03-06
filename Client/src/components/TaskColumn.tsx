import TaskCard from './TaskCard';
import { Droppable } from '@hello-pangea/dnd';
import IconAdd from '../assets/icons/icon_add.svg?react';
import './TaskColumn.scss';

interface Props {
  col: {
    id: string;
    name: string;
    statusColor: string;
    list: string[];
  };
  onStateChange: (param: boolean) => void;
}

export default function TaskColumn({ col: { list, id, name, statusColor }, onStateChange }: Props) {
  return (
    <>
      <Droppable droppableId={id}>
        {(provided) => (
          <div className="task-column">
            <div className="column-header">
              <div className={`status-color status-color__${statusColor}`} />
              <p>{name}</p>
              {id === 'todo' && (
                <IconAdd onClick={() => onStateChange(true)} className="add-task" />
              )}
            </div>

            <div className="column" {...provided.droppableProps} ref={provided.innerRef}>
              {list.map((text, index) => (
                <TaskCard key={text} text={text} index={index} />
              ))}
              {provided.placeholder}
            </div>
          </div>
        )}
      </Droppable>
    </>
  );
}
