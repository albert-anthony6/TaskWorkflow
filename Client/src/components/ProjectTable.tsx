import { useState } from 'react';
import './ProjectTable.scss';
import { Project } from '../utils/interfaces/project';
import { useAppDispatch } from '../store/configureStore';
import { deleteProject } from '../store/slices/projectSlice';
import Skeleton from 'react-loading-skeleton';
import DeleteModal from '../components/DeleteModal';
import IconDelete from '../assets/icons/icon_delete.svg?react';

interface Props {
  projects: Project[];
  handleRowClick: (projectId: string) => void;
  emptyMessage: string;
  isLoading: boolean;
  isDeletable?: boolean;
}

export default function ProjectTable({
  projects,
  handleRowClick,
  emptyMessage,
  isLoading,
  isDeletable = false
}: Props) {
  const dispatch = useAppDispatch();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectId, setProjectId] = useState<string | null>(null);

  function preventEvent(event: React.MouseEvent<HTMLDivElement>, id: string) {
    event.stopPropagation();
    setIsDeleteModalOpen(true);
    setProjectId(id);
  }
  return (
    <>
      {isLoading ? (
        <Skeleton baseColor="#ccc" duration={0.9} height="95px" />
      ) : (
        <table className="project-table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Your Tasks</th>
              <th scope="col">Members</th>
              <th scope="col">Active Tasks</th>
              <th scope="col">Owner</th>
              {isDeletable && <th scope="col" />}
            </tr>
          </thead>
          <tbody>
            {!projects.length ? (
              <tr>
                <td colSpan={isDeletable ? 6 : 5} className="empty-row">
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              projects.map((project, index) => (
                <tr key={index} onClick={() => handleRowClick(project.projectId)}>
                  <td>{project.name}</td>
                  <td>{project.currentUserTickets}</td>
                  <td>{project.membersCount}</td>
                  <td>{project.activeTicketsCount}</td>
                  <td>{project.owner}</td>
                  {isDeletable && (
                    <td
                      onClick={(event) => preventEvent(event, project.projectId)}
                      className="deletable"
                    >
                      <IconDelete />
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
      {isDeleteModalOpen && (
        <DeleteModal
          title="Are you sure you want to delete this project?"
          closeModal={() => setIsDeleteModalOpen(false)}
          dispatchAction={() => dispatch(deleteProject(`${projectId}`))}
        />
      )}
    </>
  );
}
