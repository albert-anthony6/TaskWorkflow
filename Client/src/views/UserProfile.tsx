import { useEffect } from 'react';
import './UserProfile.scss';
import { useAppDispatch, useAppSelector } from '../store/configureStore';
import { getProfile } from '../store/slices/userSlice';

export default function UserProfile() {
  const dispatch = useAppDispatch();
  const { user, profile } = useAppSelector((state) => state.user);

  useEffect(() => {
    dispatch(getProfile('bob'));
  }, [dispatch, user?.username]);

  return (
    <main className="user-profile">
      <div className="banner">
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
