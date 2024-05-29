import { useEffect, useState } from 'react';
import './ProjectsPage.scss';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { createProject, getProjects } from '../store/slices/projectSlice';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { useDebouncedSearch } from '../utils/hooks/useDebouncedSearch';
import { usePagination } from '../utils/hooks/usePagination';
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ProjectTable from '../components/ProjectTable';
import IconAdd from '../assets/icons/icon_add.svg?react';
import IconClose from '../assets/icons/icon_close.svg?react';
import StyledSearch from '../components/micro/StyledSearch';

export default function ProjectsPage() {
  const { currentUser } = useAppSelector((state) => state.user);
  const { projects, myProjects, myProjectsPagination, projectsPagination } = useAppSelector(
    (state) => state.project
  );
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isCreateProject, setIsCreatingProject] = useState(false);
  const [myProjectsSearchTerm, setMyProjectsSearchTerm] = useState('');
  const [projectsSearchTerm, setProjectsSearchTerm] = useState('');
  const [isMyProjectsLoading, setIsMyProjectsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const isMyProjectsLoadingSearch = useDebouncedSearch(
    myProjectsSearchTerm,
    dispatch,
    getProjects,
    currentUser?.id,
    true
  );
  const isProjectsLoadingSearch = useDebouncedSearch(
    projectsSearchTerm,
    dispatch,
    getProjects,
    currentUser?.id,
    false
  );

  const {
    handlePageClick: handleMyProjectsPageClick,
    isLoadingPagination: isMyProjectsLoadingPagination
  } = usePagination(dispatch, getProjects, currentUser?.id, myProjectsSearchTerm);
  const {
    handlePageClick: handleProjectsPageClick,
    isLoadingPagination: isProjectsLoadingPagination
  } = usePagination(dispatch, getProjects, currentUser?.id, projectsSearchTerm);

  const { register, handleSubmit } = useForm({
    defaultValues: {
      projectName: ''
    }
  });

  function handleRowClick(projectId: string) {
    navigate(`/projects/${projectId}`);
  }

  function onSubmit(data: { projectName: string }) {
    dispatch(createProject(data.projectName));
  }

  // Update the combined loading state whenever either loading state changes
  useEffect(() => {
    setIsProjectsLoading(isProjectsLoadingSearch || isProjectsLoadingPagination);
  }, [isProjectsLoadingSearch, isProjectsLoadingPagination]);

  // Update the combined loading state whenever either loading state changes
  useEffect(() => {
    setIsMyProjectsLoading(isMyProjectsLoadingSearch || isMyProjectsLoadingPagination);
  }, [isMyProjectsLoadingSearch, isMyProjectsLoadingPagination]);

  return (
    <main className="projects-page">
      <button onClick={() => setIsCreatingProject(true)} className="button__secondary__dark">
        New Project <IconAdd />
      </button>
      <div className="table-header">
        <h3>Your Projects</h3>
        <StyledSearch handleChange={(event) => setMyProjectsSearchTerm(event.target.value)} />
      </div>
      <ProjectTable
        projects={myProjects}
        handleRowClick={handleRowClick}
        emptyMessage="You have no current projects"
        isDeletable={true}
        isLoading={isMyProjectsLoading}
      />
      <Pagination
        current={myProjectsPagination?.currentPage as number}
        total={myProjectsPagination?.totalPages as number}
        onPageChange={(event) => handleMyProjectsPageClick(event, true)}
        previousLabel="Previous"
        nextLabel="Next"
      />
      <div className="table-header">
        <h3>All Projects</h3>
        <StyledSearch handleChange={(event) => setProjectsSearchTerm(event.target.value)} />
      </div>
      <ProjectTable
        projects={projects}
        handleRowClick={handleRowClick}
        emptyMessage="No projects found"
        isLoading={isProjectsLoading}
      />
      <Pagination
        current={projectsPagination?.currentPage as number}
        total={projectsPagination?.totalPages as number}
        onPageChange={handleProjectsPageClick}
        previousLabel="Previous"
        nextLabel="Next"
      />
      {isCreateProject && (
        <div className="simple-modal modal-container">
          <div className="simple-modal--content">
            <IconClose onClick={() => setIsCreatingProject(false)} className="icon-close" />
            <h2>Name your new project</h2>
            <form onSubmit={handleSubmit(onSubmit)}>
              <input
                {...register('projectName', {
                  required: 'Project must have a title.',
                  minLength: { value: 4, message: 'Title must be at least 4 characters long.' }
                })}
                type="text"
                placeholder="Enter project name"
              />
              <div className="buttons-container">
                <button
                  type="button"
                  onClick={() => setIsCreatingProject(false)}
                  className="button__cancel"
                >
                  Cancel
                </button>
                <button className="button__primary">Create project</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
