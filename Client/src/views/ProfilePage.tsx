import { useEffect } from 'react';
import './ProfilePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';
import { useParams } from 'react-router-dom';
import IconFacebook from '../assets/icons/icon_facebook.svg?react';
import IconTwitter from '../assets/icons/icon_twitter.svg?react';
import IconInstagram from '../assets/icons/icon_instagram.svg?react';
import IconLinkedin from '../assets/icons/icon_linkedin.svg?react';

export default function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile(userId as string));
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
      <table className="all-projects data-table">
        <thead>
          <th scope="col">Name</th>
          <th scope="col">Your Tasks</th>
          <th scope="col">Members</th>
          <th scope="col">Active Tasks</th>
          <th scope="col">Owner</th>
        </thead>
        <tbody>
          <tr className="active-row">
            <td>Apple 2.0</td>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>Samantha S.</td>
          </tr>
          <tr>
            <td>Apple 2.0</td>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>Samantha S.</td>
          </tr>
          <tr>
            <td>Apple 2.0</td>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>Samantha S.</td>
          </tr>
          <tr>
            <td>Apple 2.0</td>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>Samantha S.</td>
          </tr>
          <tr>
            <td>Apple 2.0</td>
            <td>2</td>
            <td>4</td>
            <td>6</td>
            <td>Samantha S.</td>
          </tr>
        </tbody>
      </table>
    </main>
  );
}
