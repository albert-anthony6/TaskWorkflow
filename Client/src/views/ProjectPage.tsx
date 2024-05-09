import { useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Task } from '../utils/interfaces/task';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import TaskColumn from '../components/TaskColumn';
// import TaskCreationModal from '../components/TaskCreationModal';
// import { getTasks } from '../store/slices/taskSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import './ProjectPage.scss';
import { getProject } from '../store/slices/projectSlice';
import { updateStatus } from '../store/slices/taskSlice';
import { toast } from 'react-toastify';

export default function ProjectPage() {
  const params = useParams();
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  // const { taskModal } = useAppSelector((state) => state.task);

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
  const initialColumnsRef = useRef(initialColumns);

  useEffect(() => {
    dispatch(getProject(`${params.projectId}`)).then((action) => {
      const { tickets } = action.payload as { tickets: Task[] };
      const newColumns: Columns = {
        todo: { ...initialColumnsRef.current.todo, list: [] },
        inProgress: { ...initialColumnsRef.current.inProgress, list: [] },
        readyForReview: { ...initialColumnsRef.current.readyForReview, list: [] },
        done: { ...initialColumnsRef.current.done, list: [] }
      };

      tickets.forEach((ticket: Task) => {
        const columnName = ticket.status || 'todo';
        if (columnName in newColumns) {
          // Add the ticket to the appropriate column
          newColumns[columnName].list.push(ticket);
        } else {
          console.warn(`Invalid column name '${columnName}' for ticket ${ticket.id}`);
        }
      });

      // Update the state with the new columns
      setColumns(newColumns);
    });
  }, [dispatch, params.projectId]);

  function onDragEnd({ source, destination }: DropResult) {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    const draggedItem = columns[source.droppableId].list[source.index];
    console.log('Dragged Item:', draggedItem, destination.droppableId);

    dispatch(updateStatus({ id: `${draggedItem.id}`, status: destination.droppableId })).catch(
      () => {
        toast.error('Task transition failed.');
        return;
      }
    );

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
        <h1>{project?.name}</h1>
        <Link to="/projects">Projects/{project?.name}</Link>
      </div>
      <div className="main-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {Object.values(columns).map((col) => (
              <TaskColumn col={col} key={col.id} />
            ))}
          </div>
        </DragDropContext>
      </div>
      {/* {taskModal.isOpen && <TaskCreationModal />} */}
    </main>
  );
}
