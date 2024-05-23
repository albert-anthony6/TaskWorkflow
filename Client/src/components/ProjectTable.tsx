import { Project } from '../utils/interfaces/project';
import './ProjectTable.scss';

interface Props {
  projects: Project[];
  handleRowClick: (projectId: string) => void;
  emptyMessage: string;
}

export default function ProjectTable({ projects, handleRowClick, emptyMessage }: Props) {
  return (
    <table className="project-table">
      <thead>
        <tr>
          <th scope="col">Name</th>
          <th scope="col">Your Tasks</th>
          <th scope="col">Members</th>
          <th scope="col">Active Tasks</th>
          <th scope="col">Owner</th>
        </tr>
      </thead>
      <tbody>
        {!projects.length ? (
          <tr>
            <td colSpan={5} className="empty-row">
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
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
