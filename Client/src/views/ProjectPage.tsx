import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import './ProjectPage.scss';
import TaskColumn from '../components/TaskColumn';
import TaskCreationModal from '../components/TaskCreationModal';
import agent from '../api/agent';

export default function ProjectPage() {
  interface Task {
    id: string;
    title: string;
    date: Date;
    description: string;
    status: string;
    dueDate: Date;
  }

  interface Column {
    id: string;
    columnName: string;
    statusColor: string;
    list: Task[];
  }

  interface Columns {
    [key: string]: Column;
    todo: Column;
    inProgress: Column;
    readyForReview: Column;
    done: Column;
  }

  const initialColumns: Columns = {
    todo: {
      id: 'todo',
      columnName: 'To Do',
      statusColor: 'red',
      list: []
    },
    inProgress: {
      id: 'inProgress',
      columnName: 'In Progress',
      statusColor: 'yellow',
      list: []
    },
    readyForReview: {
      id: 'readyForReview',
      columnName: 'Ready for Review',
      statusColor: 'blue',
      list: []
    },
    done: {
      id: 'done',
      columnName: 'Done',
      statusColor: 'green',
      list: []
    }
  };

  const [columns, setColumns] = useState(initialColumns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    agent.Tasks.list().then((resp: Task[]) => {
      setColumns((prevState) => ({
        ...prevState,
        todo: {
          ...prevState.todo,
          list: resp
        }
      }));
    });
  }, []);

  function toggleModalState(newState: boolean) {
    setIsModalOpen(newState);
  }

  function onDragEnd({ source, destination }: DropResult) {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (source.droppableId === destination.droppableId && destination.index === source.index)
      return null;

    // Set start and end variables
    const start = columns[source.droppableId];
    const end = columns[destination.droppableId];

    // If start is the same as end, we're in the same column
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      const newList = start.list.filter((_, idx: number) => idx !== source.index);

      // Then insert the item at the right location
      newList.splice(destination.index, 0, start.list[source.index]);

      // Then create a new copy of the column object
      const newCol = {
        id: start.id,
        columnName: start.columnName,
        statusColor: start.statusColor,
        list: newList
      };

      // Update the state
      setColumns((state) => ({ ...state, [newCol.id]: newCol }));
      return null;
    } else {
      // If start is different from end, we need to update multiple columns
      // Filter the start list like before
      const newStartList = start.list.filter((_, idx: number) => idx !== source.index);

      // Create a new start column
      const newStartCol = {
        id: start.id,
        columnName: start.columnName,
        statusColor: start.statusColor,
        list: newStartList
      };

      // Make a new end list array
      const newEndList = end.list;

      // Insert the item into the end list
      newEndList.splice(destination.index, 0, start.list[source.index]);

      // Create a new end column
      const newEndCol = {
        id: end.id,
        columnName: end.columnName,
        statusColor: end.statusColor,
        list: newEndList
      };

      // Update the state
      setColumns((state) => ({
        ...state,
        [newStartCol.id]: newStartCol,
        [newEndCol.id]: newEndCol
      }));
      return null;
    }
  }

  return (
    <main className="project-page">
      <div className="project-page--header">
        <h1>Apple 2.0</h1>
        <Link to="/projects">Projects/Apple2.0</Link>
      </div>
      <div className="main-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {Object.values(columns).map((col) => (
              <TaskColumn col={col} key={col.id} onStateChange={toggleModalState} />
            ))}
          </div>
        </DragDropContext>
      </div>
      {isModalOpen && <TaskCreationModal onStateChange={toggleModalState} />}
    </main>
  );
}
