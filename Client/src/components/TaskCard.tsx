import { Draggable } from '@hello-pangea/dnd';
import './TaskCard.scss';

interface Props {
  text: string;
  index: number;
}

export default function TaskCard({ text, index }: Props) {
  return (
    <Draggable draggableId={text} index={index}>
      {(provided) => (
        <div
          className="task-card"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {text}
        </div>
      )}
    </Draggable>
  );
}
