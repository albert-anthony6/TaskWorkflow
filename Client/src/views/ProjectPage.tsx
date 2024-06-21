import { useState, useRef, useCallback } from 'react';
import './ProjectPage.scss';
import { Link, NavLink, useParams } from 'react-router-dom';
import { Task } from '../utils/interfaces/task';
import { User } from '../utils/interfaces/user';
import { useDebouncedSearch } from '../utils/hooks/useDebouncedSearch';
import { DragDropContext, DropResult } from '@hello-pangea/dnd';
import Skeleton from 'react-loading-skeleton';
import TaskColumn from '../components/TaskColumn';
import TaskCreationModal from '../components/TaskCreationModal';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProject } from '../store/slices/projectSlice';
import { updateStatus } from '../store/slices/taskSlice';
import { toast } from 'react-toastify';
import MemberModal from '../components/MemberModal';
import StyledSearch from '../components/micro/StyledSearch';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';
import IconAddUser from '../assets/icons/icon_add_user.svg?react';
import { Project } from '../utils/interfaces/project';

export default function ProjectPage() {
  const params = useParams();
  const { project } = useAppSelector((state) => state.project);
  const dispatch = useAppDispatch();
  const { taskModal } = useAppSelector((state) => state.task);
  const [searchTerm, setSearchTerm] = useState('');
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const updateColumns = useCallback((action: { payload: Project }) => {
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
  }, []);

  const isLoadingSearch = useDebouncedSearch(
    searchTerm,
    dispatch,
    getProject,
    params.projectId,
    false,
    updateColumns
  );

  function onDragEnd({ source, destination }: DropResult) {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null;

    const draggedItem = columns[source.droppableId].list[source.index];
    // console.log('Dragged Item:', draggedItem, destination.droppableId);

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (source.droppableId === destination.droppableId && destination.index === source.index) {
      return null;
    }

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
      {isLoading || isLoadingSearch ? (
        <div className="project-page--header">
          <Skeleton baseColor="#ccc" duration={0.9} width={'25vw'} height={'30px'} circle={false} />
          <Skeleton baseColor="#ccc" duration={0.9} width={'15vw'} height={'15px'} circle={false} />
        </div>
      ) : (
        <div className="project-page--header">
          <h1>{project?.name}</h1>
          <Link to="/projects" className="breadcrumbs">
            Projects/{project?.name}
          </Link>
        </div>
      )}
      <div className="project-page--actions">
        <StyledSearch handleChange={(event) => setSearchTerm(event.target.value)} />
        <div className="members">
          {isLoading || isLoadingSearch ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div className="member" key={index}>
                <Skeleton
                  key={index}
                  baseColor="#ccc"
                  duration={0.9}
                  width={'30px'}
                  circle={true}
                  className={'avatar avatar__xs'}
                />
              </div>
            ))
          ) : (
            <>
              {project?.members.map((member) => (
                <div className="member" key={member.id}>
                  <NavLink to={`/user/${member.id}`}>
                    {member.avatar ? (
                      <img
                        src={member.avatar.url}
                        alt={member.displayName}
                        className="avatar avatar__xs"
                      />
                    ) : (
                      <IconAvatar className="avatar avatar__xs" />
                    )}
                  </NavLink>
                </div>
              ))}
            </>
          )}
          <div onClick={() => setIsMemberModalOpen(true)} className="member">
            <IconAddUser />
          </div>
        </div>
      </div>
      <div className="main-content">
        <DragDropContext onDragEnd={onDragEnd}>
          <div className="columns-container">
            {Object.values(columns).map((col) => (
              <TaskColumn col={col} key={col.id} isLoading={isLoadingSearch} />
            ))}
          </div>
        </DragDropContext>
      </div>
      {taskModal.isOpen && (
        <TaskCreationModal
          members={project?.members as User[]}
          getProject={() =>
            dispatch(getProject({ id: `${params.projectId}`, searchTerm })).then((action) =>
              updateColumns(action as { payload: Project })
            )
          }
        />
      )}
      {isMemberModalOpen && (
        <MemberModal
          members={project?.members as User[]}
          closeModal={() => setIsMemberModalOpen(false)}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
          getProject={() => {
            setIsLoading(true);
            dispatch(getProject({ id: `${params.projectId}`, searchTerm }))
              .then((action) => {
                updateColumns(action as { payload: Project });
              })
              .finally(() => setIsLoading(false));
          }}
        />
      )}
    </main>
  );
}
