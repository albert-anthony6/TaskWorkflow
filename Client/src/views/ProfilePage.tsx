import { useEffect } from 'react';
import './ProfilePage.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';
import { useParams } from 'react-router-dom';

export default function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useAppDispatch();
  const { profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile(userId as string));
  }, [dispatch, userId]);
  return (
    <main className="profile-page">
      <div
        className="banner"
        style={{
          backgroundImage: `url(${
            profile?.coverImage.url || '/src/assets/images/placeholder_image.png'
          })`
        }}
      >
        {profile?.avatar ? (
          <img src={profile.avatar.url} className="avatar avatar__big" alt="User Avatar." />
        ) : (
          <img
            src="/src/assets/icons/icon_avatar.svg?react"
            className="avatar avatar__big"
            alt="User Avatar."
          />
        )}
      </div>
    </main>
  );
}
