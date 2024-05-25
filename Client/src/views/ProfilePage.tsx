import { useEffect, useState } from 'react';
import './ProfilePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';
import { getProjects } from '../store/slices/projectSlice';
import { useParams, useNavigate } from 'react-router-dom';
import Skeleton from 'react-loading-skeleton';
import ProjectTable from '../components/ProjectTable';
import StyledSearch from '../components/micro/StyledSearch';
import IconFacebook from '../assets/icons/icon_facebook.svg?react';
import IconTwitter from '../assets/icons/icon_twitter.svg?react';
import IconInstagram from '../assets/icons/icon_instagram.svg?react';
import IconLinkedin from '../assets/icons/icon_linkedin.svg?react';

export default function ProfilePage() {
  const navigate = useNavigate();
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { projects, myProjects } = useAppSelector((state) => state.project);
  const { profile } = useAppSelector((state) => state.user);

  const [isUserLoading, setIsUserLoading] = useState(true);
  const [isMyProjectsLoading, setIsMyProjectsLoading] = useState(true);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);

  const [myProjectsSearchTerm, setMyProjectsSearchTerm] = useState('');
  const [projectsSearchTerm, setProjectsSearchTerm] = useState('');

  function handleRowClick(projectId: string) {
    navigate(`/projects/${projectId}`);
  }

  useEffect(() => {
    dispatch(getProfile(`${userId}`)).finally(() => {
      setIsUserLoading(false);
    });
  }, [dispatch, userId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        setIsMyProjectsLoading(true);
        dispatch(
          getProjects({
            userId: `${userId}`,
            filterProjects: true,
            searchTerm: myProjectsSearchTerm
          })
        ).finally(() => {
          setIsMyProjectsLoading(false);
        });
      },
      myProjectsSearchTerm ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [myProjectsSearchTerm, dispatch, userId]);

  useEffect(() => {
    const delayDebounceFn = setTimeout(
      () => {
        setIsProjectsLoading(true);
        dispatch(
          getProjects({
            userId: `${userId}`,
            filterProjects: false,
            searchTerm: projectsSearchTerm
          })
        ).finally(() => {
          setIsProjectsLoading(false);
        });
      },
      projectsSearchTerm ? 500 : 0
    );

    return () => clearTimeout(delayDebounceFn);
  }, [projectsSearchTerm, dispatch, userId]);

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
                profile?.coverImage?.url || '/src/assets/images/placeholder_image.png'
              })`
            }}
          />
        )}
        <div className="banner--content">
          {isUserLoading ? (
            <Skeleton
              baseColor="#ccc"
              duration={0.9}
              width="230px"
              circle={true}
              className="avatar avatar__big"
            />
          ) : (
            <>
              {profile?.avatar ? (
                <img src={profile.avatar.url} className="avatar avatar__big" alt="User Avatar." />
              ) : (
                <img
                  src="/src/assets/icons/icon_avatar.svg?react"
                  className="avatar avatar__big"
                  alt="User Avatar."
                />
              )}
            </>
          )}
          <div className="user-info">
            {!isUserLoading && (
              <>
                <div className="user-name">
                  <h1>{profile?.displayName}</h1>
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
                </div>
                <p className="user-bio">{profile?.bio}</p>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="profile-content">
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
      </div>
    </main>
  );
}
