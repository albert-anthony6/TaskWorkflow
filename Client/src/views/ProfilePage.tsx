import { useEffect, useMemo, useState } from 'react';
import './ProfilePage.scss';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';
import { getProjects } from '../store/slices/projectSlice';
import { useDebouncedSearch } from '../utils/hooks/useDebouncedSearch';
import { usePagination } from '../utils/hooks/usePagination';
import { toast } from 'react-toastify';
import Skeleton from 'react-loading-skeleton';
import Pagination from 'react-responsive-pagination';
import 'react-responsive-pagination/themes/classic.css';
import ProjectTable from '../components/ProjectTable';
import StyledSearch from '../components/micro/StyledSearch';
import useScreenWidth from '../utils/hooks/useScreenWidth';
import IconAvatar from '../assets/icons/icon_avatar.svg?react';
import IconFacebook from '../assets/icons/icon_facebook.svg?react';
import IconTwitter from '../assets/icons/icon_twitter.svg?react';
import IconInstagram from '../assets/icons/icon_instagram.svg?react';
import IconLinkedin from '../assets/icons/icon_linkedin.svg?react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userId } = useParams();
  const screenWidth = useScreenWidth();
  const { projects, myProjects, myProjectsPagination, projectsPagination } = useAppSelector(
    (state) => state.project
  );
  const { profile, currentUser } = useAppSelector((state) => state.user);

  const [isUserLoading, setIsUserLoading] = useState(true);

  const [myProjectsSearchTerm, setMyProjectsSearchTerm] = useState('');
  const [projectsSearchTerm, setProjectsSearchTerm] = useState('');
  const [isMyProjectsLoading, setIsMyProjectsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const isMyProjectsLoadingSearch = useDebouncedSearch(
    myProjectsSearchTerm,
    dispatch,
    getProjects,
    userId,
    true
  );
  const isProjectsLoadingSearch = useDebouncedSearch(
    projectsSearchTerm,
    dispatch,
    getProjects,
    userId,
    false
  );

  const {
    handlePageClick: handleMyProjectsPageClick,
    isLoadingPagination: isMyProjectsLoadingPagination
  } = usePagination(dispatch, getProjects, userId, myProjectsSearchTerm);

  const {
    handlePageClick: handleProjectsPageClick,
    isLoadingPagination: isProjectsLoadingPagination
  } = usePagination(dispatch, getProjects, userId, projectsSearchTerm);

  function handleRowClick(projectId: string) {
    navigate(`/projects/${projectId}`);
  }

  async function getUpdatedProjects() {
    try {
      setIsMyProjectsLoading(true);
      await dispatch(
        getProjects({
          pagingParams: { pageNumber: 1, pageSize: 10 },
          userId: `${userId}`,
          filterProjects: true,
          searchTerm: ''
        })
      );
      setIsMyProjectsLoading(false);
    } catch (error) {
      toast.error('Failed to get list of projects');
    }

    try {
      setIsProjectsLoading(true);
      await dispatch(
        getProjects({
          pagingParams: { pageNumber: 1, pageSize: 10 },
          userId: `${userId}`,
          filterProjects: false,
          searchTerm: ''
        })
      );
      setIsProjectsLoading(false);
    } catch (error) {
      toast.error('Failed to get list of projects');
    }
  }

  const fullInstagramLink = useMemo(() => {
    if (profile?.instagramLink) {
      if (profile?.instagramLink.startsWith('http')) {
        return profile?.instagramLink;
      }
      return `https://instagram.com/${
        profile?.instagramLink.startsWith('@')
          ? profile?.instagramLink.slice(1)
          : profile?.instagramLink
      }`;
    }
    return '';
  }, [profile?.instagramLink]);

  const fullTwitterLink = useMemo(() => {
    if (profile?.twitterLink) {
      if (profile?.twitterLink.startsWith('http')) {
        return profile?.twitterLink;
      }
      return `https://twitter.com/${
        profile?.twitterLink.startsWith('@') ? profile?.twitterLink.slice(1) : profile?.twitterLink
      }`;
    }
    return '';
  }, [profile?.twitterLink]);

  useEffect(() => {
    dispatch(getProfile(`${userId}`)).finally(() => {
      setIsUserLoading(false);
    });
  }, [dispatch, userId]);

  // Update the combined loading state whenever either loading state changes
  useEffect(() => {
    setIsProjectsLoading(isProjectsLoadingSearch || isProjectsLoadingPagination);
  }, [isProjectsLoadingSearch, isProjectsLoadingPagination]);

  // Update the combined loading state whenever either loading state changes
  useEffect(() => {
    setIsMyProjectsLoading(isMyProjectsLoadingSearch || isMyProjectsLoadingPagination);
  }, [isMyProjectsLoadingSearch, isMyProjectsLoadingPagination]);

  return (
    <main className="profile-page">
      <div className="banner">
        {isUserLoading ? (
          <Skeleton baseColor="#ccc" duration={0.9} className="banner--image" />
        ) : (
          <div
            className="banner--image"
            style={{
              backgroundImage: `url(${
                profile?.coverImage?.url || '/assets/images/placeholder_image.png'
              })`
            }}
          />
        )}
        <div className="banner--content">
          {isUserLoading ? (
            <Skeleton
              baseColor="#ccc"
              duration={0.9}
              width={screenWidth >= 1200 ? '230px' : '175px'}
              circle={true}
              className={screenWidth >= 1200 ? 'avatar avatar__xl' : 'avatar avatar__large'}
            />
          ) : (
            <>
              {profile?.avatar ? (
                <img
                  src={profile.avatar.url}
                  className={screenWidth >= 1200 ? 'avatar avatar__xl' : 'avatar avatar__large'}
                  alt="User Avatar."
                />
              ) : (
                <IconAvatar
                  className={screenWidth >= 1200 ? 'avatar avatar__xl' : 'avatar avatar__large'}
                />
              )}
            </>
          )}
          <div className="user-info">
            {!isUserLoading && (
              <>
                {screenWidth >= 768 ? (
                  <>
                    <div className="user-name">
                      <h1>{profile?.displayName}</h1>
                      <div className="user-socials">
                        {profile?.facebookLink && (
                          <a href={profile.facebookLink} target="_blank">
                            <IconFacebook />
                          </a>
                        )}
                        {profile?.linkedinLink && (
                          <a href={profile.linkedinLink} target="_blank">
                            <IconLinkedin />
                          </a>
                        )}
                        {profile?.instagramLink && (
                          <a href={fullInstagramLink} target="_blank">
                            <IconInstagram />
                          </a>
                        )}
                        {profile?.twitterLink && (
                          <a href={fullTwitterLink} target="_blank">
                            <IconTwitter />
                          </a>
                        )}
                      </div>
                    </div>
                    <p className="user-bio">{profile?.bio}</p>
                  </>
                ) : (
                  <>
                    <div className="user-name">
                      <h1>{profile?.displayName}</h1>
                      <p className="user-bio">{profile?.bio}</p>
                    </div>
                    <div className="user-socials">
                      <a href={profile?.facebookLink} target="_blank">
                        <IconFacebook />
                      </a>
                      <a href={profile?.linkedinLink} target="_blank">
                        <IconLinkedin />
                      </a>
                      <a href={profile?.instagramLink} target="_blank">
                        <IconInstagram />
                      </a>
                      <a href={profile?.twitterLink} target="_blank">
                        <IconTwitter />
                      </a>
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      <div className="profile-content">
        <div className="table-header">
          <h3>{userId === currentUser?.id ? 'Your Projects' : 'Their Projects'}</h3>
          <StyledSearch handleChange={(event) => setMyProjectsSearchTerm(event.target.value)} />
        </div>
        <div className="table-container">
          <ProjectTable
            projects={myProjects}
            handleRowClick={handleRowClick}
            handleDeletion={getUpdatedProjects}
            emptyMessage="No current projects found"
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
        </div>
        <div className="table-header">
          <h3>All Projects</h3>
          <StyledSearch handleChange={(event) => setProjectsSearchTerm(event.target.value)} />
        </div>
        <div className="table-container">
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
        </div>
      </div>
    </main>
  );
}
