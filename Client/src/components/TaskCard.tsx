import { Draggable } from '@hello-pangea/dnd';
import './TaskCard.scss';
import { Task } from '../utils/interfaces/task';

interface Props {
  task: Task;
  index: number;
}

export default function TaskCard({ task, index }: Props) {
  return (
    <Draggable key={task.id} draggableId={task.id as string} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {task.title}
        </div>
      )}
    </Draggable>
  );
}
