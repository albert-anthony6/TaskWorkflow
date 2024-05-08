import { useEffect } from 'react';
import './ProfilePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';
import { getProjects } from '../store/slices/projectSlice';
import { useParams, useNavigate } from 'react-router-dom';
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

  function handleRowClick(projectId: string) {
    navigate(`/projects/${projectId}`);
  }

  useEffect(() => {
    (async () => {
      await Promise.all([
        dispatch(getProfile(userId as string)),
        dispatch(getProjects(true)),
        dispatch(getProjects(false))
      ]);
    })();
  }, [dispatch, userId]);

  return (
    <main className="profile-page">
      <div className="banner">
        <div
          className="banner--image"
          style={{
            backgroundImage: `url(${
              profile?.coverImage?.url || '/src/assets/images/placeholder_image.png'
            })`
          }}
        />
        <div className="banner--content">
          {profile?.avatar ? (
            <img src={profile.avatar.url} className="avatar avatar__big" alt="User Avatar." />
          ) : (
            <img
              src="/src/assets/icons/icon_avatar.svg?react"
              className="avatar avatar__big"
              alt="User Avatar."
            />
          )}
          <div className="user-info">
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
          </div>
        </div>
      </div>
      <h3>Your Projects</h3>
      <table className="data-table">
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Your Tasks</th>
          <th scope="col">Members</th>
          <th scope="col">Active Tasks</th>
          <th scope="col">Owner</th>
        </thead>
        <tbody>
          {myProjects.map((project, index) => (
            <tr key={index} onClick={() => handleRowClick(project.projectId)}>
              <td>{project.name}</td>
              <td>{project.currentUserTickets}</td>
              <td>{project.membersCount}</td>
              <td>{project.activeTicketsCount}</td>
              <td>{project.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>All Projects</h3>
      <table className="data-table">
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Your Tasks</th>
          <th scope="col">Members</th>
          <th scope="col">Active Tasks</th>
          <th scope="col">Owner</th>
        </thead>
        <tbody>
          {projects.map((project, index) => (
            <tr key={index} onClick={() => handleRowClick(project.projectId)}>
              <td>{project.name}</td>
              <td>{project.currentUserTickets}</td>
              <td>{project.membersCount}</td>
              <td>{project.activeTicketsCount}</td>
              <td>{project.owner}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
